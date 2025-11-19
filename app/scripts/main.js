// Main Application Bootstrap
(function() {
    'use strict';

    // Application state
    const AppState = {
        currentTool: null,
        currentTheme: 'auto',
        tools: new Map(),
        initialized: false
    };

    // Initialize the application
    async function initializeApp() {
        try {
            console.log('🚀 Initializing DeveloperTools...');
            
            // Load tools first
            await loadTools();
            
            // Initialize core modules
            await initializeTheme();
            await initializeNavigation();
            await initializeToolsGrid();
            await initializeCTAButtons();
            await initializeEventListeners();
            await initializeRouter();
            
            AppState.initialized = true;
            console.log('✅ DeveloperTools initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }

    // Initialize theme system
    async function initializeTheme() {
        const themeToggle = DOM.qs('#theme-toggle');
        const savedTheme = Storage.get('theme', 'auto');
        
        AppState.currentTheme = savedTheme;
        applyTheme(savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }

    // Apply theme to document
    function applyTheme(theme) {
        const root = document.documentElement;
        
        // Remove existing theme classes
        root.removeAttribute('data-theme');
        document.body.classList.remove('dark-theme', 'light-theme');
        
        switch (theme) {
            case 'dark':
                root.setAttribute('data-theme', 'dark');
                document.body.classList.add('dark-theme');
                break;
            case 'light':
                root.setAttribute('data-theme', 'light');
                document.body.classList.add('light-theme');
                break;
            case 'auto':
            default:
                // Let CSS handle auto theme via prefers-color-scheme
                break;
        }
        
        // Update theme toggle icon
        updateThemeToggleIcon(theme);
        
        // Save theme preference
        Storage.set('theme', theme);
    }

    // Update theme toggle icon
    function updateThemeToggleIcon(theme) {
        const themeIcon = DOM.qs('.theme-icon');
        if (themeIcon) {
            const icons = {
                'light': '☀️',
                'dark': '🌙',
                'auto': '🌓'
            };
            themeIcon.textContent = icons[theme] || icons.auto;
        }
    }

    // Toggle theme
    function toggleTheme() {
        const themes = ['auto', 'light', 'dark'];
        const currentIndex = themes.indexOf(AppState.currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        
        AppState.currentTheme = nextTheme;
        applyTheme(nextTheme);
        
    // Show toast notification
    if (typeof Toasts !== 'undefined' && Toasts.show) {
        Toasts.show(`Theme switched to ${nextTheme}`, 'info');
    }
    }

    // Initialize navigation system
    async function initializeNavigation() {
        const tabNav = DOM.qs('#tab-navigation');
        if (!tabNav) return;

        // Set up home tab click handler
        const homeTab = DOM.qs('#home-tab');
        if (homeTab) {
            homeTab.addEventListener('click', () => {
                showHomePage();
                setActiveTab('home');
            });
        }

        // Create tool tabs
        createToolTabs();
    }

    // Load available tools
    async function loadTools() {
        try {
            const toolsData = ToolsRegistry.getEnabled();
            
            for (const toolConfig of toolsData) {
                AppState.tools.set(toolConfig.id, {
                    ...toolConfig,
                    loaded: false,
                    instance: null
                });
            }
            
        } catch (error) {
            console.error('Failed to load tools:', error);
        }
    }

    // Create navigation tabs for tools
    function createToolTabs() {
        const tabNav = DOM.qs('#tab-navigation');
        if (!tabNav) return;

        AppState.tools.forEach((tool, toolId) => {
            const tabButton = DOM.el('button', {
                className: 'tab-button',
                id: `${toolId}-tab`,
                'role': 'tab',
                'aria-selected': 'false',
                'aria-controls': `${toolId}-panel`
            });

            const tabIcon = DOM.el('span', {
                className: 'tab-icon',
                textContent: tool.icon
            });

            const tabText = DOM.el('span', {
                className: 'tab-text',
                textContent: tool.name
            });

            tabButton.appendChild(tabIcon);
            tabButton.appendChild(tabText);

            // Add click handler
            tabButton.addEventListener('click', () => {
                loadTool(toolId);
                setActiveTab(toolId);
            });

            tabNav.appendChild(tabButton);
        });
    }

    // Set active tab
    function setActiveTab(activeTabId) {
        // Remove active class from all tabs
        const allTabs = DOM.qsa('.tab-button');
        allTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });

        // Add active class to selected tab
        const activeTab = DOM.qs(`#${activeTabId}-tab`);
        if (activeTab) {
            activeTab.classList.add('active');
            activeTab.setAttribute('aria-selected', 'true');
        }
    }

    // Show home page
    function showHomePage() {
        // Hide tool container
        const toolContainer = DOM.qs('#tool-container');
        if (toolContainer) {
            toolContainer.classList.remove('active');
        }

        // Show home panel
        const homePanel = DOM.qs('#home-panel');
        if (homePanel) {
            homePanel.classList.add('active');
        }

        // Update URL
        Router.navigate('');
        
        AppState.currentTool = null;
    }

    // Load and display a tool
    async function loadTool(toolId) {
        try {
            const tool = AppState.tools.get(toolId);
            if (!tool) {
                throw new Error(`Tool ${toolId} not found`);
            }

            // Show loading overlay
            showLoadingOverlay(`Loading ${tool.name}...`);

            // Hide home panel
            const homePanel = DOM.qs('#home-panel');
            if (homePanel) {
                homePanel.classList.remove('active');
            }

            // Show tool container
            const toolContainer = DOM.qs('#tool-container');
            if (toolContainer) {
                toolContainer.classList.add('active');
            }

            // Load tool if not already loaded
            if (!tool.loaded) {
                await ToolsRegistry.loadTool(toolId);
                tool.loaded = true;
            }

            // Mount tool
            await ToolsRegistry.mountTool(toolId, 'tool-container');
            
            AppState.currentTool = toolId;
            
            // Update URL
            Router.navigate(`tool=${toolId}`);
            
            // Hide loading overlay
            hideLoadingOverlay();
            
            console.log(`✅ Tool ${toolId} loaded successfully`);
            
        } catch (error) {
            console.error(`❌ Failed to load tool ${toolId}:`, error);
            hideLoadingOverlay();
            Toasts.show(`Failed to load ${toolId}. Please try again.`, 'error');
        }
    }

    // Initialize tools grid on homepage
    async function initializeToolsGrid() {
        const toolsGrid = DOM.qs('#tools-grid');
        if (!toolsGrid) return;

        AppState.tools.forEach((tool, toolId) => {
            const toolCard = createToolCard(tool, toolId);
            toolsGrid.appendChild(toolCard);
        });
    }

    // Create tool card for homepage
    function createToolCard(tool, toolId) {
        const card = DOM.el('div', {
            className: 'tool-card',
            'data-tool-id': toolId
        });

        const icon = DOM.el('span', {
            className: 'tool-icon',
            textContent: tool.icon
        });

        const name = DOM.el('h4', {
            className: 'tool-name',
            textContent: tool.name
        });

        const description = DOM.el('p', {
            className: 'tool-description',
            textContent: tool.description
        });

        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(description);

        // Add click handler
        card.addEventListener('click', () => {
            loadTool(toolId);
            setActiveTab(toolId);
        });

        return card;
    }

    // Initialize CTA buttons
    async function initializeCTAButtons() {
        const ctaButtons = DOM.qs('#cta-buttons');
        if (!ctaButtons) return;

        // Get first few popular tools
        const popularTools = Array.from(AppState.tools.entries()).slice(0, 3);
        
        popularTools.forEach(([toolId, tool]) => {
            const button = DOM.el('button', {
                className: 'cta-button',
                textContent: `Try ${tool.name}`
            });
            
            button.addEventListener('click', () => {
                loadTool(toolId);
                setActiveTab(toolId);
            });
            
            ctaButtons.appendChild(button);
        });
    }

    // Initialize event listeners
    async function initializeEventListeners() {
        // Search functionality
        const searchInput = DOM.qs('#tool-search');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }

        // Help button
        const helpButton = DOM.qs('#help-button');
        if (helpButton) {
            helpButton.addEventListener('click', showHelp);
        }

        // Footer links
        const aboutLink = DOM.qs('#about-link');
        const privacyLink = DOM.qs('#privacy-link');
        const feedbackLink = DOM.qs('#feedback-link');

        if (aboutLink) aboutLink.addEventListener('click', () => showDialog('About'));
        if (privacyLink) privacyLink.addEventListener('click', () => showDialog('Privacy'));
        if (feedbackLink) feedbackLink.addEventListener('click', () => showDialog('Feedback'));

        // Global keyboard shortcuts
        document.addEventListener('keydown', handleGlobalKeyboard);
    }

    // Handle search functionality
    function handleSearch(event) {
        const query = event.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            // Show all tools
            showAllTools();
            return;
        }

        // Filter tools based on query
        const toolCards = DOM.qsa('.tool-card');
        let visibleCount = 0;

        toolCards.forEach(card => {
            const toolId = card.dataset.toolId;
            const tool = AppState.tools.get(toolId);
            
            if (tool) {
                const matchesName = tool.name.toLowerCase().includes(query);
                const matchesDescription = tool.description.toLowerCase().includes(query);
                const matchesKeywords = tool.keywords?.some(keyword => 
                    keyword.toLowerCase().includes(query)
                );

                if (matchesName || matchesDescription || matchesKeywords) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            }
        });

        // Show feedback for search results
        const toolsSection = DOM.qs('.features-section');
        if (toolsSection) {
            let resultsText = toolsSection.querySelector('.search-results');
            if (!resultsText) {
                resultsText = DOM.el('p', { 
                    className: 'search-results' 
                });
                toolsSection.appendChild(resultsText);
            }
            
            if (visibleCount === 0) {
                resultsText.textContent = `No tools found for "${query}"`;
                resultsText.style.color = 'var(--text-secondary)';
            } else {
                resultsText.textContent = `Found ${visibleCount} tool${visibleCount === 1 ? '' : 's'} for "${query}"`;
                resultsText.style.color = 'var(--text-secondary)';
            }
        }
    }

    // Show all tools (clear search)
    function showAllTools() {
        const toolCards = DOM.qsa('.tool-card');
        toolCards.forEach(card => {
            card.style.display = 'block';
        });

        // Remove search results text
        const resultsText = DOM.qs('.search-results');
        if (resultsText) {
            resultsText.remove();
        }
    }

    // Handle global keyboard shortcuts
    function handleGlobalKeyboard(event) {
        // Escape key - clear search or go home
        if (event.key === 'Escape') {
            const searchInput = DOM.qs('#tool-search');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                showAllTools();
            } else if (AppState.currentTool) {
                showHomePage();
                setActiveTab('home');
            }
        }
        
        // Ctrl+K or Cmd+K - focus search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = DOM.qs('#tool-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }

    // Initialize router
    async function initializeRouter() {
        // Initialize the router system
        Router.init();
    }

    // Show help dialog
    function showHelp() {
        const helpContent = `
            <h3>DeveloperTools Help</h3>
            <h4>Keyboard Shortcuts:</h4>
            <ul>
                <li><kbd>Ctrl/Cmd + K</kbd> - Focus search</li>
                <li><kbd>Escape</kbd> - Clear search or go home</li>
            </ul>
            <h4>Features:</h4>
            <ul>
                <li>All processing happens locally - your data never leaves your browser</li>
                <li>Works offline once loaded</li>
                <li>Responsive design works on all devices</li>
                <li>Dark/light theme support</li>
            </ul>
        `;
        
        showDialog('Help', helpContent);
    }

    // Show dialog (placeholder implementation)
    function showDialog(title, content = '') {
        Toasts.show(`${title} dialog - Feature coming soon!`, 'info');
    }

    // Show loading overlay
    function showLoadingOverlay(message = 'Loading...') {
        const overlay = DOM.qs('#loading-overlay');
        const text = DOM.qs('.loading-text');
        
        if (overlay) {
            if (text) text.textContent = message;
            overlay.classList.remove('hidden');
        }
    }

    // Hide loading overlay
    function hideLoadingOverlay() {
        const overlay = DOM.qs('#loading-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    // Show error message
    function showErrorMessage(message) {
        Toasts.show(message, 'error');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

    // Export to global scope for debugging
    window.App = {
        state: AppState,
        loadTool,
        showHomePage,
        toggleTheme,
        reload: initializeApp
    };

})();
