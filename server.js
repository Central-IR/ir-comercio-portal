require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// ======== CONFIGURAÇÃO - IPS AUTORIZADOS ==
// ==========================================
const AUTHORIZED_IPS = process.env.AUTHORIZED_IPS 
  ? process.env.AUTHORIZED_IPS.split(',').map(ip => ip.trim())
  : ['187.36.172.217', '187.59.239.143'];

// ==========================================
// ======== CONFIGURAÇÃO DO SUPABASE ========
// ==========================================
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// ======== RATE LIMITING MANUAL ============
// ==========================================
const loginAttempts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  
  if (!attempt) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 5 * 60 * 1000 });
    return true;
  }
  
  if (now > attempt.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 5 * 60 * 1000 });
    return true;
  }
  
  if (attempt.count >= 5) {
    return false;
  }
  
  attempt.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, attempt] of loginAttempts.entries()) {
    if (now > attempt.resetTime) {
      loginAttempts.delete(ip);
    }
  }
}, 60 * 60 * 1000);

// ==========================================
// ======== FUNÇÕES AUXILIARES ==============
// ==========================================
function getClientIP(req) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const clientIP = xForwardedFor
    ? xForwardedFor.split(',')[0].trim()
    : req.socket.remoteAddress;
  
  return clientIP.replace('::ffff:', '');
}

function isIPAuthorized(ip) {
  if (AUTHORIZED_IPS.length === 0) {
    console.warn('⚠️ Nenhum IP autorizado configurado!');
    return false;
  }
  return AUTHORIZED_IPS.includes(ip);
}

function isBusinessHours() {
  const now = new Date();
  const brasiliaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const dayOfWeek = brasiliaTime.getDay();
  const hour = brasiliaTime.getHours();
  
  return dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 8 && hour < 18;
}

function generateSecureToken() {
  return 'sess_' + crypto.randomBytes(32).toString('hex');
}

function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9._-]{3,50}$/.test(username);
}

async function logLoginAttempt(username, success, reason, deviceToken, ip) {
  try {
    await supabase.from('login_attempts').insert({
      username: sanitizeString(username),
      ip_address: ip,
      device_token: sanitizeString(deviceToken),
      success: success,
      failure_reason: reason,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Erro ao registrar log:', error);
  }
}

// ==========================================
// ======== MIDDLEWARES =====================
// ==========================================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// ======== ROTA PRINCIPAL ==================
// ==========================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==========================================
// ======== API - OBTER IP PÚBLICO ==========
// ==========================================
app.get('/api/ip', (req, res) => {
  const cleanIP = getClientIP(req);
  res.json({ ip: cleanIP });
});

// ==========================================
// ======== API - VERIFICAR IP AUTORIZADO ===
// ==========================================
app.get('/api/check-ip-access', (req, res) => {
  const cleanIP = getClientIP(req);
  const authorized = isIPAuthorized(cleanIP);

  console.log(`🔒 Verificação de IP: ${cleanIP} | Autorizado: ${authorized ? '✅' : '❌'}`);

  res.json({ 
    authorized: authorized,
    ip: cleanIP,
    message: authorized ? 'IP autorizado' : 'IP não autorizado'
  });
});

// ==========================================
// ======== API - VERIFICAR HORÁRIO =========
// ==========================================
app.get('/api/business-hours', (req, res) => {
  const now = new Date();
  const brasiliaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const dayOfWeek = brasiliaTime.getDay();
  const hour = brasiliaTime.getHours();
  const inBusinessHours = isBusinessHours();

  res.json({
    isBusinessHours: inBusinessHours,
    currentTime: brasiliaTime.toLocaleString('pt-BR'),
    day: dayOfWeek,
    hour: hour
  });
});

// ==========================================
// ======== API - LOGIN =====================
// ==========================================
app.post('/api/login', async (req, res) => {
  try {
    const { username, password, deviceToken } = req.body;

    console.log('📥 Requisição de login recebida:', { username, hasPassword: !!password, hasDeviceToken: !!deviceToken });

    if (!username || !password || !deviceToken) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios ausentes' 
      });
    }

    const cleanIP = getClientIP(req);

    if (!checkRateLimit(cleanIP)) {
      console.log('❌ Rate limit excedido:', cleanIP);
      return res.status(429).json({ 
        error: 'Muitas tentativas de login',
        message: 'Tente novamente em 5 minutos.' 
      });
    }

    const sanitizedUsername = sanitizeString(username);
    const sanitizedDeviceToken = sanitizeString(deviceToken);

    if (!isValidUsername(sanitizedUsername)) {
      return res.status(400).json({ 
        error: 'Formato de usuário inválido' 
      });
    }

    if (password.length < 1 || password.length > 100) {
      return res.status(400).json({ 
        error: 'Senha inválida' 
      });
    }

    if (!isIPAuthorized(cleanIP)) {
      console.log('❌ IP não autorizado tentando fazer login:', cleanIP);
      await logLoginAttempt(sanitizedUsername, false, 'IP não autorizado', sanitizedDeviceToken, cleanIP);
      return res.status(403).json({ 
        error: 'Acesso negado',
        message: 'Este acesso não está autorizado fora do ambiente de trabalho.' 
      });
    }

    const usernameSearch = sanitizedUsername.toLowerCase();
    console.log('🔍 Buscando usuário:', usernameSearch);

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, username, password, name, is_admin, is_active, sector')
      .ilike('username', usernameSearch)
      .single();

    if (userError || !userData) {
      console.log('❌ Usuário não encontrado:', usernameSearch);
      await logLoginAttempt(sanitizedUsername, false, 'Usuário não encontrado', sanitizedDeviceToken, cleanIP);
      return res.status(401).json({ 
        error: 'Usuário ou senha incorretos' 
      });
    }

    console.log('✅ Usuário encontrado:', userData.username, '| Setor:', userData.sector);

    if (userData.is_active === false) {
      console.log('❌ Usuário inativo:', sanitizedUsername);
      await logLoginAttempt(sanitizedUsername, false, 'Usuário inativo', sanitizedDeviceToken, cleanIP);
      return res.status(401).json({ 
        error: 'Usuário inativo' 
      });
    }

    if (!userData.is_admin && !isBusinessHours()) {
      console.log('❌ Tentativa de login fora do horário comercial:', sanitizedUsername);
      await logLoginAttempt(sanitizedUsername, false, 'Fora do horário comercial', sanitizedDeviceToken, cleanIP);
      return res.status(403).json({ 
        error: 'Fora do horário comercial',
        message: 'Este acesso é disponibilizado em conformidade com o horário comercial da empresa.' 
      });
    }

    if (password !== userData.password) {
      console.log('❌ Senha incorreta para usuário:', sanitizedUsername);
      await logLoginAttempt(sanitizedUsername, false, 'Senha incorreta', sanitizedDeviceToken, cleanIP);
      return res.status(401).json({ 
        error: 'Usuário ou senha incorretos' 
      });
    }

    console.log('✅ Senha correta');

    const deviceFingerprint = crypto.createHash('sha256')
      .update(sanitizedDeviceToken + cleanIP)
      .digest('hex');
    
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const truncatedUserAgent = sanitizeString(userAgent.substring(0, 95));
    const truncatedDeviceName = sanitizeString(userAgent.substring(0, 95));

    console.log('ℹ️ Registrando/atualizando dispositivo');

    const { error: deviceError } = await supabase
      .from('authorized_devices')
      .upsert({
        user_id: userData.id,
        device_token: sanitizedDeviceToken,
        device_fingerprint: deviceFingerprint,
        device_name: truncatedDeviceName,
        ip_address: cleanIP,
        user_agent: truncatedUserAgent,
        is_active: true,
        last_access: new Date().toISOString()
      }, {
        onConflict: 'device_token',
        ignoreDuplicates: false
      });

    if (deviceError) {
      console.error('❌ Erro ao registrar dispositivo:', deviceError);
      return res.status(500).json({ 
        error: 'Erro ao registrar dispositivo'
      });
    }
    console.log('✅ Dispositivo registrado/atualizado');

    const sessionToken = generateSecureToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // ← 24 HORAS (era 8)

    const { data: existingSession } = await supabase
      .from('active_sessions')
      .select('*')
      .eq('user_id', userData.id)
      .eq('device_token', sanitizedDeviceToken)
      .eq('is_active', true)
      .maybeSingle();

    if (existingSession) {
      console.log('Sessão ativa encontrada - atualizando');

      const { error: sessionError } = await supabase
        .from('active_sessions')
        .update({
          ip_address: cleanIP,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
          last_activity: new Date().toISOString()
        })
        .eq('id', existingSession.id);

      if (sessionError) {
        console.error('❌ Erro ao atualizar sessão:', sessionError);
        return res.status(500).json({ 
          error: 'Erro ao atualizar sessão'
        });
      }

      console.log('✅ Sessão atualizada com sucesso');
    } else {
      console.log('Criando nova sessão');

      await supabase
        .from('active_sessions')
        .update({ is_active: false })
        .eq('user_id', userData.id)
        .eq('device_token', sanitizedDeviceToken);

      const { error: sessionError } = await supabase
        .from('active_sessions')
        .insert({
          user_id: userData.id,
          device_token: sanitizedDeviceToken,
          ip_address: cleanIP,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
          is_active: true,
          last_activity: new Date().toISOString()
        });

      if (sessionError) {
        console.error('❌ Erro ao criar sessão:', sessionError);
        return res.status(500).json({ 
          error: 'Erro ao criar sessão'
        });
      }

      console.log('✅ Nova sessão criada com sucesso');
    }

    await logLoginAttempt(sanitizedUsername, true, null, sanitizedDeviceToken, cleanIP);
    console.log('✅ Login realizado com sucesso:', sanitizedUsername, '| IP:', cleanIP);

    res.json({
      success: true,
      session: {
        userId: userData.id,
        username: userData.username,
        name: userData.name,
        sector: userData.sector,
        isAdmin: userData.is_admin,
        sessionToken: sessionToken,
        deviceToken: sanitizedDeviceToken,
        ip: cleanIP,
        expiresAt: expiresAt.toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno no servidor'
    });
  }
});

// ==========================================
// ======== API - LOGOUT ====================
// ==========================================
app.post('/api/logout', async (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: 'Session token ausente' });
    }

    const sanitizedToken = sanitizeString(sessionToken);

    const { error } = await supabase
      .from('active_sessions')
      .update({ 
        is_active: false,
        logout_at: new Date().toISOString()
      })
      .eq('session_token', sanitizedToken);

    if (error) {
      console.error('❌ Erro ao fazer logout:', error);
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }

    console.log('✅ Logout realizado:', sanitizedToken.substr(0, 20) + '...');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Erro no logout:', error);
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
});

// ==========================================
// ======== API - VERIFICAR SESSÃO ==========
// ==========================================
app.post('/api/verify-session', async (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ 
        valid: false, 
        reason: 'token_missing' 
      });
    }

    const sanitizedToken = sanitizeString(sessionToken);

    const { data: session, error } = await supabase
      .from('active_sessions')
      .select(`
        *,
        users:user_id (
          id,
          username,
          name,
          sector,
          is_admin,
          is_active
        )
      `)
      .eq('session_token', sanitizedToken)
      .eq('is_active', true)
      .single();

    if (error || !session) {
      return res.status(401).json({ 
        valid: false, 
        reason: 'session_not_found' 
      });
    }

    // ==========================================
    // REMOVIDO: Verificação de IP (causava logout)
    // Agora apenas atualiza o IP atual
    // ==========================================
    const currentIP = getClientIP(req);

    if (!session.users.is_active) {
      await supabase
        .from('active_sessions')
        .update({ is_active: false })
        .eq('session_token', sanitizedToken);

      return res.status(401).json({ 
        valid: false, 
        reason: 'user_inactive' 
      });
    }

    if (new Date(session.expires_at) < new Date()) {
      await supabase
        .from('active_sessions')
        .update({ is_active: false })
        .eq('session_token', sanitizedToken);

      return res.status(401).json({ 
        valid: false, 
        reason: 'session_expired' 
      });
    }

    // ==========================================
    // REMOVIDO: Verificação de horário comercial
    // Usuário pode continuar usando após fazer login
    // ==========================================

    // Atualiza última atividade e IP
    await supabase
      .from('active_sessions')
      .update({ 
        last_activity: new Date().toISOString(),
        ip_address: currentIP
      })
      .eq('session_token', sanitizedToken);

    res.json({ 
      valid: true,
      session: {
        userId: session.users.id,
        username: session.users.username,
        name: session.users.name,
        sector: session.users.sector,
        isAdmin: session.users.is_admin
      }
    });
  } catch (error) {
    console.error('❌ Erro ao verificar sessão:', error);
    res.status(500).json({ 
      valid: false,
      reason: 'server_error',
      error: 'Erro ao verificar sessão' 
    });
  }
});

// ==========================================
// ======== HEALTH CHECK ====================
// ==========================================
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    supabase: supabaseUrl ? 'configured' : 'not configured',
    authorizedIPs: AUTHORIZED_IPS.length > 0 ? 'configured' : 'not configured'
  });
});

// ==========================================
// ======== ROTA 404 ========================
// ==========================================
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// ==========================================
// ======== ERROR HANDLER ===================
// ==========================================
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);
  
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'Erro interno do servidor' 
    : err.message;
  
  res.status(500).json({ 
    error: errorMessage 
  });
});

// ==========================================
// ======== INICIAR SERVIDOR ================
// ==========================================
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Portal Central rodando na porta ${PORT}`);
  console.log(`💾 Supabase configurado: ${supabaseUrl ? 'Sim ✅' : 'Não ❌'}`);
  console.log(`🔒 IPs autorizados: ${AUTHORIZED_IPS.join(', ')}`);
  console.log('⏰ Horário comercial: Seg-Sex, 8h-18h (apenas LOGIN)');
  console.log(`🛡️ Rate limiting ativo: 5 tentativas/15min por IP`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('✅ Melhorias: Tokens seguros, Rate limiting, Sanitização, Validação');
  console.log('🔓 Sessão: 24 horas | Sem verificação de IP/horário após login');
  console.log('='.repeat(50));
});
