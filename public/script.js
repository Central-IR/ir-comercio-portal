// Configuração
const API_URL = 'https://ir-comercio-portal-zcan.onrender.com/api';

let currentUser = null;

// ==========================================
// ======== MODAIS PADRONIZADOS =============
// ==========================================

function showConfirmModal(options) {
    return new Promise((resolve) => {
        const {
            title = 'Confirmar Ação',
            message = 'Tem certeza que deseja realizar esta ação?',
            confirmText = 'Confirmar',
            cancelText = 'Cancelar'
        } = options;

        const modalHTML = `
            <div class="modal-confirm-overlay" id="confirmModalOverlay">
                <div class="modal-confirm-content">
                    <h3 class="modal-confirm-title">${title}</h3>
                    <p class="modal-confirm-message">${message}</p>
                    <div class="modal-confirm-actions">
                        <button class="modal-confirm-btn cancel" id="confirmModalCancel">${cancelText}</button>
                        <button class="modal-confirm-btn confirm" id="confirmModalConfirm">${confirmText}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('confirmModalOverlay');
        const confirmBtn = document.getElementById('confirmModalConfirm');
        const cancelBtn = document.getElementById('confirmModalCancel');

        const closeModal = (result) => {
            overlay.style.animation = 'fadeOut 0.2s ease';
            setTimeout(() => {
                overlay.remove();
                resolve(result);
            }, 200);
        };

        confirmBtn.addEventListener('click', () => closeModal(true));
        cancelBtn.addEventListener('click', () => closeModal(false));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(false);
        });
    });
}

// ==========================================
// ======== INICIALIZAÇÃO ===================
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});

// ==========================================
// ======== STATUS DO SERVIDOR ==============
// ==========================================

async function checkServerStatus() {
    try {
        const response = await fetch(`${API_URL}/health`, { method: 'GET' });
        const isOnline = response.ok;
        updateConnectionStatus(isOnline);
    } catch (error) {
        updateConnectionStatus(false);
    }
}

function updateConnectionStatus(isOnline) {
    const statusDiv = document.getElementById('connectionStatus');
    if (statusDiv) {
        statusDiv.className = `connection-status ${isOnline ? 'online' : 'offline'}`;
        statusDiv.innerHTML = `
            <span class="status-dot"></span>
            <span>${isOnline ? 'Online' : 'Offline'}</span>
        `;
    }
}

// ==========================================
// ======== CUMPRIMENTO POR HORÁRIO =========
// ==========================================

function getCumprimento() {
    const hora = new Date().getHours();
    if (hora >= 0 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
}

// ==========================================
// ======== LOGIN ===========================
// ==========================================

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Obter informações do cliente (IP será obtido no backend)
    const deviceId = getDeviceId();

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha, deviceId })
        });

        const data = await response.json();

        if (!response.ok) {
            // Mensagens personalizadas
            let errorMessage = data.message;
            
            if (data.message.includes('IP')) {
                errorMessage = 'Acesso negado. Verifique sua conexão.';
            } else if (data.message.includes('horário')) {
                errorMessage = 'Acesso negado. O acesso foi bloqueado por estar fora do horário de expediente autorizado.';
            }
            
            showError(errorMessage);
            return;
        }

        // Login bem-sucedido
        currentUser = data.usuario;
        sessionStorage.setItem('sessionToken', data.sessionToken);
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

        showMainScreen();
    } catch (error) {
        console.error('Erro no login:', error);
        showError('Erro ao conectar com o servidor. Tente novamente.');
    }
}

function getDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'dev_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');

    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}

// ==========================================
// ======== TELA PRINCIPAL ==================
// ==========================================

function showMainScreen() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');

    // Cumprimento personalizado
    const cumprimento = getCumprimento();
    document.getElementById('welcomeMessage').textContent = `${cumprimento}, ${currentUser.nome}`;

    renderModules();
}

function renderModules() {
    const modulesGrid = document.getElementById('modulesGrid');
    const sessionToken = sessionStorage.getItem('sessionToken');

    // Módulos disponíveis
    const allModules = [
        {
            id: 'controle_frete',
            title: 'Controle de Frete',
            description: 'Gerenciar entregas e transportes',
            icon: '🚚',
            url: `https://controle-frete.onrender.com?sessionToken=${sessionToken}`
        },
        {
            id: 'tabela_precos',
            title: 'Tabela de Preços',
            description: 'Consultar e gerenciar preços',
            icon: '💰',
            url: `https://tabela-precos.onrender.com?sessionToken=${sessionToken}`
        },
        {
            id: 'cotacoes_frete',
            title: 'Cotações de Frete',
            description: 'Gerenciar cotações',
            icon: '📊',
            url: `https://cotacoes-frete.onrender.com?sessionToken=${sessionToken}`
        },
        {
            id: 'gerenciador_permissoes',
            title: 'Gerenciador de Permissões',
            description: 'Administrar usuários e acessos',
            icon: '⚙️',
            url: `https://gerenciador-permissoes.onrender.com?sessionToken=${sessionToken}`
        }
    ];

    // Filtrar módulos permitidos para o usuário
    const userPermissoes = currentUser.permissoes || [];
    const allowedModules = allModules.filter(module => 
        userPermissoes.includes(module.id)
    );

    if (allowedModules.length === 0) {
        modulesGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Nenhum módulo disponível. Entre em contato com o administrador.</p>';
        return;
    }

    modulesGrid.innerHTML = allowedModules.map(module => `
        <a href="${module.url}" class="module-card">
            <div class="module-icon">${module.icon}</div>
            <div class="module-title">${module.title}</div>
            <div class="module-description">${module.description}</div>
        </a>
    `).join('');
}

// ==========================================
// ======== LOGOUT ==========================
// ==========================================

async function showLogoutConfirm() {
    const confirmed = await showConfirmModal({
        title: 'Sair do Portal',
        message: 'Tem certeza que deseja sair?',
        confirmText: 'Sair',
        cancelText: 'Cancelar'
    });

    if (confirmed) {
        logout();
    }
}

function logout() {
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('currentUser');
    currentUser = null;

    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginForm').reset();
}

// Verificar status do servidor periodicamente
setInterval(checkServerStatus, 30000);
