<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="png" href="I.R.-COMERCIO-E-MATERIAIS-ELETRICOS-PRETO.png">
    <title>Portal I.R. Comércio</title>
    <style>
        /* ============================================
           VARIÁVEIS BASE (DARK THEME - PADRÃO)
           ============================================ */
        :root {
            --primary: #ff5100;
            --primary-dark: #E67E00;
            --primary-light: #FF6A1A;
            --bg-primary: #000000;
            --bg-secondary: #0A0A0A;
            --bg-sidebar: #0F0F0F;
            --bg-card: #1A1A1A;
            --text-primary: #FFFFFF;
            --text-secondary: #A0A0A0;
            --border-color: rgba(255, 81, 0, 0.15);
            --input-bg: #2A2A2A;
            --error: #EF4444;
            --success: #22C55E;
            --warning: #F59E0B;
            --shadow: rgba(0, 0, 0, 0.5);
            --online-green: #22C55E;
        }

        /* ============================================
           LIGHT THEME (quando navegador está em light mode)
           ============================================ */
        @media (prefers-color-scheme: light) {
            :root {
                --bg-primary: #FFFFFF;
                --bg-secondary: #F5F5F5;
                --bg-sidebar: #FAFAFA;
                --bg-card: #FFFFFF;
                --text-primary: #1E1E1E;
                --text-secondary: #666666;
                --border-color: #E5E5E5;
                --input-bg: #FFFFFF;
                --shadow: rgba(0, 0, 0, 0.08);
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', 'Segoe UI', Roboto, Arial, sans-serif;
            background: var(--bg-secondary);
            color: var(--text-primary);
            height: 100vh;
            overflow: hidden;
        }

        /* ============================================
           TELA DE LOGIN
           ============================================ */
        .login-screen {
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background: var(--bg-secondary);
        }

        .login-screen::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 50%, rgba(255, 81, 0, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 81, 0, 0.02) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
        }

        .login-content {
            width: 100%;
            max-width: 500px;
            position: relative;
            z-index: 1;
        }

        .logo-container {
            text-align: center;
            margin-bottom: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .logo-img {
            width: auto;
            height: 200px;
            max-width: 100%;
            object-fit: contain;
            object-position: center;
            margin-bottom: 1rem;
            filter: drop-shadow(0 4px 12px rgba(255, 81, 0, 0.15));
            transition: opacity 0.3s ease;
        }

        /* Logo escura visível apenas no tema escuro */
        .logo-dark {
            display: block;
        }

        .logo-light {
            display: none;
        }

        @media (prefers-color-scheme: light) {
            .logo-dark {
                display: none;
            }
            
            .logo-light {
                display: block;
            }
        }

        .form-group {
            margin-bottom: 1.8rem;
        }

        label {
            display: block;
            margin-bottom: 0.6rem;
            font-weight: 600;
            color: var(--text-primary);
            font-size: 1rem;
        }

        input {
            width: 100%;
            padding: 18px 20px;
            border: 2px solid var(--border-color);
            border-radius: 14px;
            background-color: var(--input-bg);
            color: var(--text-primary);
            font-size: 1.05rem;
            transition: all 0.3s ease;
        }

        input:focus {
            outline: none;
            border-color: var(--primary);
            background-color: var(--bg-card);
        }

        .password-container {
            position: relative;
        }

        .toggle-password {
            position: absolute;
            right: 18px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.75rem;
            color: var(--text-secondary);
            font-weight: 600;
            text-transform: uppercase;
        }

        .toggle-password:hover {
            color: var(--primary);
        }

        .btn-login {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
        }

        .btn-login:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(255, 81, 0, 0.5);
        }

        .btn-login:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .message {
            padding: 14px 18px;
            border-radius: 12px;
            margin-bottom: 1.8rem;
            font-size: 0.95rem;
            display: none;
            font-weight: 500;
        }

        .message.show {
            display: block;
        }

        .message.error {
            background: rgba(239, 68, 68, 0.15);
            border-left: 4px solid var(--error);
            color: #DC2626;
        }

        .message.success {
            background: rgba(34, 197, 94, 0.15);
            border-left: 4px solid var(--success);
            color: #15803D;
        }

        /* ============================================
           DASHBOARD LAYOUT
           ============================================ */
        .dashboard-screen {
            display: none;
            height: 100vh;
            overflow: hidden;
        }

        .dashboard-container {
            display: flex;
            height: 100vh;
        }

        /* ============================================
           SIDEBAR (MENU LATERAL)
           ============================================ */
        .sidebar {
            width: 280px;
            background: var(--bg-sidebar);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            transition: width 0.3s ease;
            position: relative;
            z-index: 100;
            flex-shrink: 0;
        }

        .sidebar.collapsed {
            width: 70px;
        }

        .sidebar.collapsed .sidebar-header {
            padding: 1.5rem 0.75rem;
        }

        .sidebar.collapsed .company-name,
        .sidebar.collapsed .user-greeting {
            display: none;
        }

        .sidebar.collapsed .module-item span:not(.module-icon) {
            display: none;
        }

        .sidebar.collapsed .module-item {
            justify-content: center;
            padding: 1rem 0.75rem;
        }

        .sidebar-header {
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
            transition: padding 0.3s ease;
        }

        .sidebar-logo {
            width: 40px;
            height: 40px;
            background: var(--primary);
            border-radius: 8px;
            display: none;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
            font-size: 1.2rem;
            margin: 0 auto;
        }

        .sidebar.collapsed .sidebar-logo {
            display: flex;
        }

        .company-name {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1.3;
        }

        .sidebar-modules {
            flex: 1;
            overflow-y: auto;
            padding: 1rem 0;
        }

        .sidebar-modules::-webkit-scrollbar {
            width: 6px;
        }

        .sidebar-modules::-webkit-scrollbar-track {
            background: transparent;
        }

        .sidebar-modules::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 3px;
        }

        .module-item {
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
            color: var(--text-secondary);
            font-size: 0.95rem;
            font-weight: 500;
            position: relative;
        }

        .module-item:hover {
            background: rgba(255, 81, 0, 0.1);
            color: var(--text-primary);
            border-left-color: var(--primary);
        }

        .module-item.active {
            background: rgba(255, 81, 0, 0.15);
            color: var(--primary);
            border-left-color: var(--primary);
            font-weight: 600;
        }

        .module-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .module-icon svg {
            width: 100%;
            height: 100%;
            stroke: currentColor;
            fill: none;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        /* Tooltip para modo retraído */
        .sidebar.collapsed .module-item::after {
            content: attr(data-tooltip);
            position: absolute;
            left: 70px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 12px var(--shadow);
            border: 1px solid var(--border-color);
            z-index: 1000;
        }

        .sidebar.collapsed .module-item:hover::after {
            opacity: 1;
        }

        /* ============================================
           MAIN CONTENT
           ============================================ */
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .top-bar {
            height: 60px;
            background: var(--bg-primary);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.5rem;
            flex-shrink: 0;
        }

        .top-bar-left {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .menu-toggle {
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .menu-toggle:hover {
            background: var(--bg-card);
        }

        .top-bar-company {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--text-primary);
        }

        .top-bar-right {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .status-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .status-dot {
            width: 12px;
            height: 12px;
            background: var(--online-green);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 0 8px var(--online-green);
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.15);
            }
        }

        .user-menu {
            position: relative;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1rem;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .user-avatar:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 81, 0, 0.4);
        }

        .user-dropdown {
            position: absolute;
            top: calc(100% + 0.5rem);
            right: 0;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 0;
            min-width: 280px;
            display: none;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .user-dropdown.show {
            display: block;
        }

        .user-dropdown-header {
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-bottom: 1px solid var(--border-color);
        }

        .user-dropdown-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem;
            color: white;
            flex-shrink: 0;
        }

        .user-dropdown-info {
            flex: 1;
            min-width: 0;
        }

        .user-dropdown-name {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.25rem;
            font-size: 0.95rem;
        }

        .user-dropdown-sector {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        .user-dropdown-item {
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--text-primary);
            font-size: 0.9rem;
            font-weight: 500;
        }

        .user-dropdown-item:hover {
            background: rgba(239, 68, 68, 0.1);
            color: var(--error);
        }

        .user-dropdown-item svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            fill: none;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        /* ============================================
           CONTENT AREA
           ============================================ */
        .content-area {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .welcome-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            padding: 2rem;
        }

        .welcome-greeting {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }

        .welcome-user-name {
            color: var(--primary);
        }

        .welcome-instruction {
            font-size: 1.1rem;
            color: var(--text-secondary);
            margin-top: 1rem;
        }

        #iframesContainer {
            flex: 1;
            width: 100%;
            height: 100%;
            position: relative;
        }

        .iframe-container {
            display: none;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .iframe-container.active {
            display: block;
        }

        .iframe-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        .hidden {
            display: none !important;
        }

        /* ============================================
           RESPONSIVIDADE
           ============================================ */
        @media (max-width: 768px) {
            .sidebar {
                position: fixed;
                left: 0;
                top: 0;
                height: 100%;
                z-index: 1000;
                transform: translateX(0);
            }

            .sidebar.collapsed {
                transform: translateX(-280px);
                width: 280px;
            }

            .company-name {
                font-size: 0.85rem;
            }

            .top-bar-company {
                font-size: 0.8rem;
            }

            .welcome-greeting {
                font-size: 1.5rem;
            }

            .logo-img {
                height: 150px;
            }
        }
    </style>
</head>
<body>
    <!-- TELA DE LOGIN -->
    <div id="loginScreen" class="login-screen">
        <div class="login-content">
            <div class="logo-container">
                <!-- Logo para tema escuro -->
                <img src="I.R.-COMERCIO-MATERIAIS-ELETRICOS-LTDA.png" 
                     alt="Logo I.R. Comércio" 
                     class="logo-img logo-dark"
                     onerror="this.style.display='none'">
                <!-- Logo para tema claro -->
                <img src="I.R.-COMERCIO-E-MATERIAIS-ELETRICOS.png" 
                     alt="Logo I.R. Comércio" 
                     class="logo-img logo-light"
                     onerror="this.style.display='none'">
            </div>

            <div id="messageBox" class="message"></div>

            <form id="loginForm">
                <div class="form-group">
                    <label for="username">Usuário</label>
                    <input type="text" 
                           id="username" 
                           name="username" 
                           required 
                           autofocus 
                           placeholder="Digite seu usuário"
                           autocomplete="username">
                </div>

                <div class="form-group">
                    <label for="password">Senha</label>
                    <div class="password-container">
                        <input type="password" 
                               id="password" 
                               name="password" 
                               required 
                               placeholder="Digite sua senha"
                               autocomplete="current-password">
                        <button type="button" 
                                class="toggle-password" 
                                onclick="togglePassword()">MOSTRAR</button>
                    </div>
                </div>

                <button type="submit" class="btn-login" id="loginBtn">
                    Entrar
                </button>
            </form>
        </div>
    </div>

    <!-- DASHBOARD -->
    <div id="dashboardScreen" class="dashboard-screen">
        <div class="dashboard-container">
            <!-- SIDEBAR -->
            <div id="sidebar" class="sidebar">
                <div class="sidebar-header">
                    <div class="sidebar-logo">IR</div>
                    <div class="company-name">I.R. COMÉRCIO E MATERIAIS ELÉTRICOS LTDA</div>
                </div>

                <div class="sidebar-modules" id="sidebarModules">
                    <!-- Módulos serão inseridos aqui -->
                </div>
            </div>

            <!-- MAIN CONTENT -->
            <div class="main-content">
                <!-- TOP BAR -->
                <div class="top-bar">
                    <div class="top-bar-left">
                        <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
                        <div class="top-bar-company">I.R. COMÉRCIO E MATERIAIS ELÉTRICOS LTDA</div>
                    </div>
                    
                    <div class="top-bar-right">
                        <div class="status-indicator">
                            <div class="status-dot"></div>
                        </div>

                        <div class="user-menu">
                            <div class="user-avatar" id="userAvatar" onclick="toggleUserDropdown()">MA</div>
                            <div class="user-dropdown" id="userDropdown">
                                <div class="user-dropdown-header">
                                    <div class="user-dropdown-avatar" id="dropdownAvatar">MA</div>
                                    <div class="user-dropdown-info">
                                        <div class="user-dropdown-name" id="dropdownUserName"></div>
                                        <div class="user-dropdown-sector" id="dropdownUserSector"></div>
                                    </div>
                                </div>
                                <div class="user-dropdown-item" onclick="logout()">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    <span>Sair</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CONTENT AREA -->
                <div class="content-area">
                    <div id="welcomeScreen" class="welcome-screen">
                        <div class="welcome-greeting">
                            <span id="welcomeGreeting"></span>, <span class="welcome-user-name" id="welcomeUserName"></span>
                        </div>
                        <div class="welcome-instruction">Selecione um módulo para começar</div>
                    </div>

                    <div id="iframesContainer"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // ==========================================
        // ======== CONFIGURAÇÃO ====================
        // ==========================================
        const API_URL = window.location.origin + '/api';

        // Setores por usuário
        const USER_SECTORS = {
            'Roberto': 'Administrador',
            'Rosemeire': 'Administrador',
            'vendas': 'Vendas',
            'vendas2': 'Vendas',
            'financeiro1': 'Financeiro',
            'financeiro2': 'Financeiro',
            'almox': 'Almoxarifado'
        };

        // Permissões por usuário
        const USER_PERMISSIONS = {
            'Roberto': ['usuários', 'pregões', 'compra', 'tabela-precos', 'fornecedores', 'cotacoes-frete', 'controle-frete', 'transportadoras', 'vendas', 'faturamento', 'receber', 'pagamento', 'estoque', 'documentos'],
            'Rosemeire': ['usuários', 'pregões', 'compra', 'tabela-precos', 'fornecedores', 'cotacoes-frete', 'controle-frete', 'transportadoras', 'vendas', 'faturamento', 'receber', 'pagamento', 'estoque', 'documentos'],
            'vendas': ['pregões', 'compra', 'tabela-precos', 'fornecedores', 'cotacoes-frete', 'controle-frete', 'vendas', 'faturamento', 'estoque', 'documentos'],
            'vendas2': ['usuários', 'pregões', 'compra', 'tabela-precos', 'fornecedores', 'cotacoes-frete', 'controle-frete', 'transportadoras', 'vendas', 'faturamento', 'receber', 'pagamento', 'estoque', 'documentos'],
            'financeiro1': ['pregões', 'faturamento', 'receber', 'pagamento', 'documentos'],
            'financeiro2': ['pregões', 'faturamento', 'receber', 'pagamento', 'documentos'],
            'almox': ['cotacoes-frete', 'controle-frete', 'transportadoras', 'faturamento', 'estoque'],
        };

        // Ícones SVG para os módulos
        const MODULE_ICONS = {
            'compra': '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
            'tabela-precos': '<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
            'cotacoes-frete': '<svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
            'controle-frete': '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
            'receber': '<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
            'pagamento': '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
            'vendas': '<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
            'pregoes': '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
            'fornecedores': '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
            'transportadoras': '<svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
            'faturamento': '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
            'estoque': '<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
            'documentos': '<svg viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>',
            'usuarios': '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
        };

        // Módulos disponíveis
        const MODULES = [
            {
                id: 'compra',
                name: 'Ordens de Compra',
                url: 'https://ir-comercio.github.io/ordem-compra/public/',
                available: true
            },
            {
                id: 'tabela-precos',
                name: 'Tabela de Preços',
                url: 'https://tabela-precos-udyp.onrender.com',
                available: true
            },
            {
                id: 'cotacoes-frete',
                name: 'Cotações de Frete',
                url: 'https://cotacoes-frete-aikc.onrender.com',
                available: true
            },
            {
                id: 'controle-frete',
                name: 'Controle de Frete',
                url: 'https://controle-frete.onrender.com',
                available: true
            },
            {
                id: 'receber',
                name: 'Contas a Receber',
                url: 'https://contas-receber-kkf9.onrender.com',
                available: true
            },
            {
                id: 'pagamento',
                name: 'Contas a Pagar',
                url: 'https://ir-comercio.github.io/contas-a-pagar/',
                available: true
            }
        ];

        let deviceToken = null;
        let publicIP = null;
        let sessionCheckInterval = null;
        let currentSessionInfo = null;
        let activeModuleId = null;

        // ==========================================
        // ======== FUNÇÕES AUXILIARES ==============
        // ==========================================
        function getGreeting() {
            const brasiliaTime = new Date().toLocaleString('en-US', { 
                timeZone: 'America/Sao_Paulo',
                hour12: false 
            });
            const hour = new Date(brasiliaTime).getHours();
            
            if (hour >= 0 && hour < 12) return 'Bom dia';
            else if (hour >= 12 && hour < 18) return 'Boa tarde';
            else return 'Boa noite';
        }

        function getOrCreateDeviceToken() {
            let token = localStorage.getItem('irDeviceToken');
            if (!token) {
                token = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('irDeviceToken', token);
            }
            return token;
        }

        async function getPublicIP() {
            try {
                const response = await fetch(`${API_URL}/ip`);
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error('Erro ao obter IP:', error);
                return null;
            }
        }

        function showMessage(message, type = 'error') {
            const messageBox = document.getElementById('messageBox');
            messageBox.textContent = message;
            messageBox.className = `message ${type} show`;
            setTimeout(() => messageBox.classList.remove('show'), 5000);
        }

        function getInitials(name) {
            const parts = name.split(' ');
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
        }

        // ==========================================
        // ======== UI INTERACTIONS =================
        // ==========================================
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }

        function toggleUserDropdown() {
            document.getElementById('userDropdown').classList.toggle('show');
        }

        function togglePassword() {
            const input = document.getElementById('password');
            const btn = document.querySelector('.toggle-password');
            if (input.type === 'password') {
                input.type = 'text';
                btn.textContent = 'OCULTAR';
            } else {
                input.type = 'password';
                btn.textContent = 'MOSTRAR';
            }
        }

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            const userMenu = document.querySelector('.user-menu');
            const dropdown = document.getElementById('userDropdown');
            if (userMenu && !userMenu.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // ==========================================
        // ======== LOGIN ===========================
        // ==========================================
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.toLowerCase().trim();
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            
            loginBtn.disabled = true;
            loginBtn.textContent = 'Autenticando...';
            
            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, deviceToken })
                });

                const data = await response.json();

                if (!response.ok) {
                    showMessage(data.message || data.error || 'Erro ao fazer login', 'error');
                    return;
                }

                if (data.success && data.session) {
                    sessionStorage.setItem('irUserSession', JSON.stringify(data.session));
                    currentSessionInfo = data.session;
                    showDashboard(data.session);
                    startSessionCheck();
                    showMessage('Login realizado com sucesso!', 'success');
                }
                
            } catch (error) {
                console.error('Erro no login:', error);
                showMessage('Erro ao realizar login. Tente novamente.', 'error');
            } finally {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Entrar';
            }
        });

        // ==========================================
        // ======== DASHBOARD =======================
        // ==========================================
        function showDashboard(sessionInfo) {
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('dashboardScreen').style.display = 'block';
            
            const greeting = getGreeting();
            const initials = getInitials(sessionInfo.name);
            const sector = USER_SECTORS[sessionInfo.username] || 'Usuário';
            
            // Preencher informações do usuário
            document.getElementById('welcomeGreeting').textContent = greeting;
            document.getElementById('welcomeUserName').textContent = sessionInfo.name;
            document.getElementById('userAvatar').textContent = initials;
            document.getElementById('dropdownAvatar').textContent = initials;
            document.getElementById('dropdownUserName').textContent = sessionInfo.name;
            document.getElementById('dropdownUserSector').textContent = sector;
            
            // Carregar módulos no sidebar
            loadSidebarModules(sessionInfo);
        }

        function loadSidebarModules(sessionInfo) {
            const sidebarModules = document.getElementById('sidebarModules');
            sidebarModules.innerHTML = '';
            
            const userPermissions = USER_PERMISSIONS[sessionInfo.username] || [];
            
            MODULES.forEach(module => {
                if (!userPermissions.includes(module.id)) return;
                if (!module.available || !module.url) return;
                
                const moduleItem = document.createElement('div');
                moduleItem.className = 'module-item';
                moduleItem.id = `module-${module.id}`;
                moduleItem.setAttribute('data-tooltip', module.name);
                
                const iconSvg = MODULE_ICONS[module.id] || MODULE_ICONS['documentos'];
                
                moduleItem.innerHTML = `
                    <span class="module-icon">${iconSvg}</span>
                    <span>${module.name}</span>
                `;
                
                moduleItem.onclick = () => openModule(module);
                sidebarModules.appendChild(moduleItem);
            });
        }

        function openModule(module) {
            // Remover active de todos os módulos
            document.querySelectorAll('.module-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Adicionar active no módulo selecionado
            const moduleItem = document.getElementById(`module-${module.id}`);
            if (moduleItem) moduleItem.classList.add('active');
            
            // Esconder welcome screen
            document.getElementById('welcomeScreen').style.display = 'none';
            
            // Verificar se iframe já existe
            let iframeContainer = document.getElementById(`iframe-${module.id}`);
            
            if (!iframeContainer) {
                // Criar novo iframe
                const params = new URLSearchParams({
                    sessionToken: currentSessionInfo.sessionToken,
                    deviceToken: currentSessionInfo.deviceToken,
                    username: currentSessionInfo.username,
                    userId: currentSessionInfo.userId,
                    ip: currentSessionInfo.ip
                });
                
                iframeContainer = document.createElement('div');
                iframeContainer.className = 'iframe-container';
                iframeContainer.id = `iframe-${module.id}`;
                iframeContainer.innerHTML = `<iframe src="${module.url}?${params.toString()}" title="${module.name}"></iframe>`;
                
                document.getElementById('iframesContainer').appendChild(iframeContainer);
            }
            
            // Mostrar apenas o iframe ativo
            document.querySelectorAll('.iframe-container').forEach(container => {
                container.classList.remove('active');
            });
            iframeContainer.classList.add('active');
            
            activeModuleId = module.id;
        }

        // ==========================================
        // ======== SESSÃO ==========================
        // ==========================================
        function startSessionCheck() {
            if (sessionCheckInterval) clearInterval(sessionCheckInterval);

            sessionCheckInterval = setInterval(async () => {
                const sessionInfo = sessionStorage.getItem('irUserSession');
                if (!sessionInfo) {
                    stopSessionCheck();
                    return;
                }

                const session = JSON.parse(sessionInfo);
                const isValid = await verifySession(session.sessionToken);

                if (!isValid) {
                    stopSessionCheck();
                    forceLogout('Sua sessão expirou ou foi invalidada');
                }
            }, 30000);
        }

        function stopSessionCheck() {
            if (sessionCheckInterval) {
                clearInterval(sessionCheckInterval);
                sessionCheckInterval = null;
            }
        }

        async function verifySession(sessionToken) {
            try {
                const response = await fetch(`${API_URL}/verify-session`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionToken })
                });

                const data = await response.json();
                return data.valid === true;
            } catch (error) {
                console.error('Erro ao verificar sessão:', error);
                return false;
            }
        }

        // ==========================================
        // ======== LOGOUT ==========================
        // ==========================================
        async function logout() {
            if (!confirm('Deseja realmente sair?')) return;
            
            try {
                const sessionInfo = JSON.parse(sessionStorage.getItem('irUserSession'));
                if (sessionInfo) {
                    await fetch(`${API_URL}/logout`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            sessionToken: sessionInfo.sessionToken,
                            deviceToken: sessionInfo.deviceToken
                        })
                    });
                }
            } catch (error) {
                console.error('Erro no logout:', error);
            }
            
            performLogout();
        }

        function forceLogout(message) {
            showMessage(message || 'Sessão encerrada', 'warning');
            performLogout();
        }

        function performLogout() {
            stopSessionCheck();
            sessionStorage.removeItem('irUserSession');
            
            document.getElementById('dashboardScreen').style.display = 'none';
            document.getElementById('loginScreen').classList.remove('hidden');
            document.getElementById('password').value = '';
            document.getElementById('iframesContainer').innerHTML = '';
            document.getElementById('welcomeScreen').style.display = 'flex';
        }

        // ==========================================
        // ======== INICIALIZAÇÃO ===================
        // ==========================================
        async function init() {
            try {
                deviceToken = getOrCreateDeviceToken();
                publicIP = await getPublicIP();
                
                const sessionInfo = sessionStorage.getItem('irUserSession');
                if (sessionInfo) {
                    const session = JSON.parse(sessionInfo);
                    const isValid = await verifySession(session.sessionToken);
                    
                    if (isValid) {
                        currentSessionInfo = session;
                        showDashboard(session);
                        startSessionCheck();
                    } else {
                        sessionStorage.removeItem('irUserSession');
                    }
                }
            } catch (error) {
                console.error('Erro na inicialização:', error);
            }
        }

        window.addEventListener('DOMContentLoaded', init);

        document.addEventListener('visibilitychange', async () => {
            if (!document.hidden) {
                const sessionInfo = sessionStorage.getItem('irUserSession');
                if (sessionInfo) {
                    const session = JSON.parse(sessionInfo);
                    const isValid = await verifySession(session.sessionToken);
                    
                    if (!isValid) {
                        forceLogout('Sua sessão expirou');
                    }
                }
            }
        });
    </script>
</body>
</html>
