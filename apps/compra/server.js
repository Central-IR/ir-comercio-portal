const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// ==========================================
// ======== CONFIGURAÇÃO DO SUPABASE ========
// ==========================================
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ ERRO: Variáveis de ambiente do Supabase para COMPRA não configuradas');
    console.error('   SUPABASE_URL:', supabaseUrl ? 'definido' : 'não definido');
    console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'definido' : 'não definido');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// ======== MIDDLEWARES =====================
// ==========================================
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Token']
}));

app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// ======== AUTENTICAÇÃO ====================
// ==========================================
const PORTAL_URL = process.env.PORTAL_URL;

console.log('🔧 PORTAL_URL configurada como:', PORTAL_URL);

async function verificarAutenticacao(req, res, next) {
    const publicPaths = ['/', '/health'];
    if (publicPaths.includes(req.path)) {
        return next();
    }

    const sessionToken = req.headers['x-session-token'] || req.query.sessionToken;

    if (!sessionToken) {
        console.log('❌ Token ausente na requisição');
        return res.status(401).json({
            error: 'Não autenticado',
            redirectToLogin: true
        });
    }

    if (!PORTAL_URL) {
        console.error('❌ PORTAL_URL não definida no ambiente');
        return res.status(500).json({ error: 'Erro de configuração do servidor' });
    }

    try {
        const verifyUrl = `${PORTAL_URL}/api/verify-session`;
        console.log(`🔍 Verificando sessão em: ${verifyUrl} com token: ${sessionToken.substring(0,10)}...`);

        const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionToken })
        });

        console.log(`📡 Resposta do portal: status ${verifyResponse.status}`);

        if (!verifyResponse.ok) {
            const errorText = await verifyResponse.text();
            console.log(`❌ Resposta do portal não ok: ${verifyResponse.status} - ${errorText}`);
            return res.status(401).json({
                error: 'Sessão inválida',
                redirectToLogin: true
            });
        }

        const sessionData = await verifyResponse.json();
        console.log('✅ Sessão válida:', sessionData);

        if (!sessionData.valid) {
            console.log('❌ Sessão inválida (valid=false)');
            return res.status(401).json({
                error: 'Sessão inválida',
                redirectToLogin: true
            });
        }

        req.user = sessionData.session;
        req.sessionToken = sessionToken;
        next();
    } catch (error) {
        console.error('❌ Erro ao verificar autenticação:', error);
        return res.status(500).json({
            error: 'Erro ao verificar autenticação'
        });
    }
}

// ==========================================
// ======== ROTAS PÚBLICAS ==================
// ==========================================
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        app: 'ordem-compra',
        supabase: supabaseUrl ? 'configurado' : 'não configurado'
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==========================================
// ======== ROTAS DA API (protegidas) =======
// ==========================================
app.use('/api', verificarAutenticacao);

// GET /api/ordens - listar ordens do mês
app.get('/api/ordens', async (req, res) => {
    try {
        const mes = parseInt(req.query.mes);
        const ano = parseInt(req.query.ano);
        if (isNaN(mes) || isNaN(ano)) {
            return res.status(400).json({ error: 'Mês e ano são obrigatórios' });
        }

        console.log(`📦 Buscando ordens da tabela ordens_compra para mês=${mes}, ano=${ano}`);

        // Primeiro, tenta uma consulta simples para verificar a tabela
        const { error: testError } = await supabase
            .from('ordens_compra')
            .select('id')
            .limit(1);

        if (testError) {
            console.error('❌ Erro ao acessar tabela ordens_compra:', testError);
            return res.status(500).json({
                error: 'Erro de acesso à tabela',
                details: testError.message,
                code: testError.code,
                hint: testError.hint
            });
        }

        const { data, error } = await supabase
            .from('ordens_compra')
            .select('*')
            .eq('mes', mes)
            .eq('ano', ano)
            .order('numero_ordem', { ascending: true });

        if (error) {
            console.error('❌ Erro no Supabase (ordens):', error);
            return res.status(500).json({
                error: 'Erro ao buscar ordens',
                details: error.message,
                code: error.code
            });
        }

        console.log(`✅ Encontradas ${data ? data.length : 0} ordens`);
        res.json(data || []);
    } catch (error) {
        console.error('❌ Erro inesperado ao buscar ordens:', error);
        res.status(500).json({ error: 'Erro interno ao buscar ordens' });
    }
});

// GET /api/ordens/ultimo-numero
app.get('/api/ordens/ultimo-numero', async (req, res) => {
    try {
        console.log('🔢 Buscando último número de ordem na tabela ordens_compra');
        const { data, error } = await supabase
            .from('ordens_compra')
            .select('numero_ordem')
            .order('numero_ordem', { ascending: false })
            .limit(1);

        if (error) {
            console.error('❌ Erro no Supabase (ultimo-numero):', error);
            return res.status(500).json({
                error: 'Erro ao buscar último número',
                details: error.message
            });
        }
        const ultimoNumero = data && data.length > 0 ? data[0].numero_ordem : 0;
        console.log(`✅ Último número: ${ultimoNumero}`);
        res.json({ ultimoNumero });
    } catch (error) {
        console.error('❌ Erro ao buscar último número:', error);
        res.status(500).json({ error: 'Erro ao buscar último número' });
    }
});

// GET /api/fornecedores - lista de fornecedores únicos (para autocomplete)
app.get('/api/fornecedores', async (req, res) => {
    try {
        console.log('👥 Buscando fornecedores na tabela ordens_compra');
        const { data, error } = await supabase
            .from('ordens_compra')
            .select('razao_social, nome_fantasia, cnpj, endereco_fornecedor, site, contato, telefone, email')
            .not('razao_social', 'is', null)
            .order('razao_social');

        if (error) {
            console.error('❌ Erro no Supabase (fornecedores):', error);
            return res.status(500).json({
                error: 'Erro ao buscar fornecedores',
                details: error.message
            });
        }

        // Remove duplicatas baseado na razão social
        const unique = [];
        const seen = new Set();
        data.forEach(item => {
            if (item.razao_social && !seen.has(item.razao_social)) {
                seen.add(item.razao_social);
                unique.push(item);
            }
        });
        console.log(`✅ ${unique.length} fornecedores únicos encontrados`);
        res.json(unique);
    } catch (error) {
        console.error('❌ Erro ao buscar fornecedores:', error);
        res.status(500).json({ error: 'Erro ao buscar fornecedores' });
    }
});

// GET /api/ordens/:id
app.get('/api/ordens/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('ordens_compra')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            console.error('❌ Erro ao buscar ordem por ID:', error);
            return res.status(404).json({ error: 'Ordem não encontrada' });
        }
        res.json(data);
    } catch (error) {
        console.error('❌ Erro ao buscar ordem:', error);
        res.status(500).json({ error: 'Erro ao buscar ordem' });
    }
});

// POST /api/ordens
app.post('/api/ordens', async (req, res) => {
    try {
        const ordem = req.body;
        const dataAtual = new Date();
        const mes = dataAtual.getMonth();
        const ano = dataAtual.getFullYear();

        console.log('➕ Criando nova ordem na tabela ordens_compra:', ordem.numero_ordem);

        const { data, error } = await supabase
            .from('ordens_compra')
            .insert([{
                ...ordem,
                mes,
                ano,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('❌ Erro no Supabase (insert):', error);
            return res.status(500).json({
                error: 'Erro ao criar ordem',
                details: error.message
            });
        }
        console.log('✅ Ordem criada com ID:', data.id);
        res.status(201).json(data);
    } catch (error) {
        console.error('❌ Erro ao criar ordem:', error);
        res.status(500).json({ error: 'Erro ao criar ordem' });
    }
});

// PUT /api/ordens/:id
app.put('/api/ordens/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('ordens_compra')
            .update(req.body)
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            console.error('❌ Erro ao atualizar ordem:', error);
            return res.status(404).json({ error: 'Ordem não encontrada' });
        }
        res.json(data);
    } catch (error) {
        console.error('❌ Erro ao atualizar ordem:', error);
        res.status(500).json({ error: 'Erro ao atualizar ordem' });
    }
});

// PATCH /api/ordens/:id/status
app.patch('/api/ordens/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const { data, error } = await supabase
            .from('ordens_compra')
            .update({ status })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            console.error('❌ Erro ao atualizar status:', error);
            return res.status(404).json({ error: 'Ordem não encontrada' });
        }
        res.json(data);
    } catch (error) {
        console.error('❌ Erro ao atualizar status:', error);
        res.status(500).json({ error: 'Erro ao atualizar status' });
    }
});

// DELETE /api/ordens/:id
app.delete('/api/ordens/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('ordens_compra')
            .delete()
            .eq('id', req.params.id);

        if (error) {
            console.error('❌ Erro ao deletar ordem:', error);
            throw error;
        }
        res.status(204).end();
    } catch (error) {
        console.error('❌ Erro ao deletar ordem:', error);
        res.status(500).json({ error: 'Erro ao deletar ordem' });
    }
});

// ==========================================
// ======== ROTA 404 ========================
// ==========================================
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// ==========================================
// ======== TRATAMENTO DE ERROS =============
// ==========================================
app.use((error, req, res, next) => {
    console.error('❌ Erro não tratado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// ==========================================
// ======== EXPORTA APP =====================
// ==========================================
module.exports = app;

// Se executado diretamente, inicia o servidor
if (require.main === module) {
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
        console.log(`✅ Ordem de Compra rodando isoladamente na porta ${PORT}`);
        console.log(`📍 Portal URL: ${PORTAL_URL}`);
        console.log(`📍 Supabase URL: ${supabaseUrl}`);
    });
}
