// Hash-based router for tool navigation
const Router = {
    currentTool: null,
    currentToolModule: null,
    toolContainer: null,
    routes: new Map(),
    
    // Initialize router
    init: () => {
        Router.toolContainer = DOM.qs('#tool-container');
        if (!Router.toolContainer) {
            console.error('Tool container not found');
            return;
        }
        
        // Listen for hash changes
        window.addEventListener('hashchange', Router.handleHashChange);
        window.addEventListener('load', Router.handleHashChange);
        
        // Handle initial route
        Router.handleHashChange();
    },
    
    // Parse hash into route parameters
    parseHash: (hash = window.location.hash) => {
        const params = new URLSearchParams(hash.substring(1));
        return Object.fromEntries(params.entries());
    },
    
    // Build hash from parameters
    buildHash: (params) => {
        const searchParams = new URLSearchParams(params);
        return `#${searchParams.toString()}`;
    },
    
    // Navigate to route
    navigate: (route, replace = false) => {
        const hash = route.startsWith('#') ? route : `#${route}`;
        
        if (replace) {
            history.replaceState(null, '', hash);
        } else {
            history.pushState(null, '', hash);
        }
        
        Router.handleHashChange();
    },
    
    // Handle hash changes
    handleHashChange: () => {
        const params = Router.parseHash();
        const toolId = params.tool;
        
        if (!toolId) {
            // No tool specified, try to load last used tool or show welcome
            const lastTool = Storage ? Storage.getLastTool() : null;
            if (lastTool && ToolsRegistry.getById(lastTool) && !ToolsRegistry.getById(lastTool).disabled) {
                Router.navigate(`tool=${lastTool}`, true);
                return;
            } else {
                Router.showWelcome();
                return;
            }
        }
        
        // Load the specified tool
        Router.loadTool(toolId);
    },
    
    // Load and mount a tool
    loadTool: async (toolId) => {
        try {
            // Check if tool exists and is enabled
            const toolConfig = ToolsRegistry.getById(toolId);
            if (!toolConfig) {
                Router.showError(`Tool '${toolId}' not found`);
                return;
            }
            
            if (toolConfig.disabled) {
                Router.showError(`Tool '${toolId}' is not yet available`);
                return;
            }
            
            // Update tabs to show active tool
            if (window.Tabs) {
                Tabs.selectTab(toolId);
            }
            
            // If same tool is already loaded, don't reload
            if (Router.currentTool === toolId && Router.currentToolModule) {
                return;
            }
            
            // Unmount current tool if any
            if (Router.currentToolModule && Router.currentToolModule.unmount) {
                try {
                    await Router.currentToolModule.unmount();
                } catch (error) {
                    console.warn('Error unmounting current tool:', error);
                }
            }
            
            // Show loading state
            Router.showLoading(`Loading ${toolConfig.name}...`);
            
            // Load tool module
            const toolModule = await ToolsRegistry.loadTool(toolId);
            
            if (!toolModule) {
                throw new Error('Tool module not found');
            }
            
            // Validate tool module
            if (!toolModule.mount || typeof toolModule.mount !== 'function') {
                throw new Error('Tool module missing mount function');
            }
            
            // Clear container
            DOM.clear(Router.toolContainer);
            
            // Mount the tool
            await toolModule.mount(Router.toolContainer);
            
            // Store current tool info
            Router.currentTool = toolId;
            Router.currentToolModule = toolModule;
            
            // Update page title
            document.title = `${toolConfig.name} - DeveloperTools`;
            
        } catch (error) {
            console.error('Failed to load tool:', error);
            Router.showError(`Failed to load tool '${toolId}': ${error.message}`);
        }
    },
    
    // Show welcome message
    showWelcome: () => {
        DOM.clear(Router.toolContainer);
        
        const welcome = DOM.el('div', {
            className: 'welcome-message'
        });
        
        const title = DOM.el('h2', {
            textContent: 'Welcome to DeveloperTools'
        });
        
        const description = DOM.el('p', {
            textContent: 'Select a tool from the tabs above to get started.'
        });
        
        const stats = ToolsRegistry.getStats();
        const statsText = DOM.el('p', {
            className: 'text-sm',
            textContent: `${stats.enabled} tools available`
        });
        
        welcome.appendChild(title);
        welcome.appendChild(description);
        welcome.appendChild(statsText);
        
        // Add quick links to available tools
        if (stats.enabled > 0) {
            const quickLinks = DOM.el('div', {
                className: 'quick-links'
            });
            
            const quickTitle = DOM.el('h3', {
                textContent: 'Quick Start:',
                className: 'mb-2'
            });
            quickLinks.appendChild(quickTitle);
            
            const enabledTools = ToolsRegistry.getEnabled().slice(0, 3); // Show first 3
            enabledTools.forEach(tool => {
                const link = DOM.el('button', {
                    className: 'primary',
                    textContent: tool.name,
                    style: 'margin-right: 0.5rem; margin-bottom: 0.5rem;'
                });
                
                DOM.on(link, 'click', () => {
                    Router.navigate(`tool=${tool.id}`);
                });
                
                quickLinks.appendChild(link);
            });
            
            welcome.appendChild(quickLinks);
        }
        
        Router.toolContainer.appendChild(welcome);
        
        // Reset current tool
        Router.currentTool = null;
        Router.currentToolModule = null;
        
        // Update page title
        document.title = 'DeveloperTools';
        
        // Clear active tab
        if (window.Tabs) {
            const allTabs = DOM.qsa('.tab');
            allTabs.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
        }
    },
    
    // Show loading state
    showLoading: (message = 'Loading...') => {
        DOM.clear(Router.toolContainer);
        
        const loading = DOM.el('div', {
            className: 'loading-message',
            style: 'text-align: center; padding: 2rem; color: var(--text-secondary);'
        });
        
        const spinner = DOM.el('div', {
            textContent: '⏳',
            style: 'font-size: 2rem; margin-bottom: 1rem;'
        });
        
        const text = DOM.el('p', {
            textContent: message
        });
        
        loading.appendChild(spinner);
        loading.appendChild(text);
        Router.toolContainer.appendChild(loading);
    },
    
    // Show error state
    showError: (message) => {
        DOM.clear(Router.toolContainer);
        
        const error = DOM.el('div', {
            className: 'error-message',
            style: 'text-align: center; padding: 2rem;'
        });
        
        const icon = DOM.el('div', {
            textContent: '⚠️',
            style: 'font-size: 2rem; margin-bottom: 1rem;'
        });
        
        const title = DOM.el('h3', {
            textContent: 'Error',
            style: 'color: var(--error-color); margin-bottom: 0.5rem;'
        });
        
        const text = DOM.el('p', {
            textContent: message,
            style: 'color: var(--text-secondary); margin-bottom: 1rem;'
        });
        
        const backButton = DOM.el('button', {
            textContent: 'Go Back',
            className: 'primary'
        });
        
        DOM.on(backButton, 'click', () => {
            Router.navigate('');
        });
        
        error.appendChild(icon);
        error.appendChild(title);
        error.appendChild(text);
        error.appendChild(backButton);
        Router.toolContainer.appendChild(error);
        
        // Show toast notification
        if (window.Toasts) {
            Toasts.error(message);
        }
    },
    
    // Get current route info
    getCurrentRoute: () => {
        return {
            params: Router.parseHash(),
            tool: Router.currentTool,
            module: Router.currentToolModule
        };
    },
    
    // Check if a tool is currently active
    isToolActive: (toolId) => {
        return Router.currentTool === toolId;
    },
    
    // Reload current tool
    reload: () => {
        if (Router.currentTool) {
            const currentTool = Router.currentTool;
            Router.currentTool = null;
            Router.currentToolModule = null;
            Router.loadTool(currentTool);
        }
    },
    
    // Add custom route handler
    addRoute: (pattern, handler) => {
        Router.routes.set(pattern, handler);
    },
    
    // Remove route handler
    removeRoute: (pattern) => {
        Router.routes.delete(pattern);
    }
};

// Make it available globally
window.Router = Router;
