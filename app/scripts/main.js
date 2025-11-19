// Main application bootstrap
const App = {
    initialized: false,
    
    // Initialize the application
    init: async () => {
        try {
            console.log('Initializing DeveloperTools...');
            
            // Check if already initialized
            if (App.initialized) {
                console.warn('App already initialized');
                return;
            }
            
            // Initialize app settings
            App.initSettings();
            
            // Initialize UI components
            App.initUI();
            
            // Initialize router
            Router.init();
            
            // Mark as initialized
            App.initialized = true;
            
            console.log('DeveloperTools initialized successfully');
            
            // Show success toast
            if (window.Toasts) {
                Toasts.success('DeveloperTools loaded successfully');
            }
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            App.showFatalError(error);
        }
    },
    
    // Initialize app settings and preferences
    initSettings: () => {
        // Check if localStorage is available
        if (!Storage.isAvailable()) {
            console.warn('localStorage not available, some features may not work');
        }
        
        // Initialize app settings
        const appSettings = Storage.getAppSettings();
        console.log('App settings:', appSettings);
        
        // Handle first run
        if (appSettings.firstRun) {
            console.log('First run detected');
            appSettings.firstRun = false;
            Storage.setAppSettings(appSettings);
            
            // Show welcome toast
            if (window.Toasts) {
                setTimeout(() => {
                    Toasts.info('Welcome to DeveloperTools! Select a tool from the tabs above to get started.', {
                        duration: 8000
                    });
                }, 1000);
            }
        }
        
        // Apply user preferences
        const preferences = Storage.getPreferences();
        App.applyPreferences(preferences);
    },
    
    // Initialize UI components
    initUI: () => {
        // Get enabled tools
        const enabledTools = ToolsRegistry.getEnabled();
        console.log(`Loading ${enabledTools.length} enabled tools`);
        
        // Initialize tabs with enabled tools
        if (window.Tabs) {
            Tabs.init(enabledTools);
        }
        
        // Setup global keyboard shortcuts
        App.setupKeyboardShortcuts();
        
        // Setup error handling
        App.setupErrorHandling();
        
        // Apply theme
        App.applyTheme();
    },
    
    // Apply user preferences
    applyPreferences: (preferences) => {
        // Apply theme
        if (preferences.theme && preferences.theme !== 'auto') {
            document.documentElement.setAttribute('data-theme', preferences.theme);
        }
        
        // Other preferences can be applied here
    },
    
    // Apply theme based on preference or system
    applyTheme: () => {
        const preferences = Storage.getPreferences();
        const theme = preferences.theme || 'auto';
        
        if (theme === 'auto') {
            // Use system preference
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    },
    
    // Setup global keyboard shortcuts
    setupKeyboardShortcuts: () => {
        DOM.on(document, 'keydown', (e) => {
            // Ctrl+/ or Cmd+/ to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const searchInput = DOM.qs('#tool-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear search or go back
            if (e.key === 'Escape') {
                const searchInput = DOM.qs('#tool-search');
                if (searchInput && searchInput === document.activeElement) {
                    searchInput.blur();
                    if (window.Tabs) {
                        Tabs.clearSearch();
                    }
                }
            }
            
            // Ctrl+R or Cmd+R to reload current tool
            if ((e.ctrlKey || e.metaKey) && e.key === 'r' && !e.shiftKey) {
                if (Router.currentTool) {
                    e.preventDefault();
                    Router.reload();
                    if (window.Toasts) {
                        Toasts.info('Tool reloaded');
                    }
                }
            }
        });
    },
    
    // Setup global error handling
    setupErrorHandling: () => {
        // Handle unhandled errors
        window.addEventListener('error', (e) => {
            console.error('Unhandled error:', e.error);
            if (window.Toasts) {
                Toasts.error(`Unexpected error: ${e.error?.message || 'Unknown error'}`);
            }
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            if (window.Toasts) {
                Toasts.error(`Promise error: ${e.reason?.message || 'Unknown error'}`);
            }
        });
    },
    
    // Show fatal error
    showFatalError: (error) => {
        const container = DOM.qs('#app') || document.body;
        
        const errorDiv = DOM.el('div', {
            style: `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #1a1a1a;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            `
        });
        
        const content = DOM.el('div', {
            style: 'text-align: center; max-width: 500px; padding: 2rem;'
        });
        
        const title = DOM.el('h1', {
            textContent: 'Fatal Error',
            style: 'color: #ff6b6b; margin-bottom: 1rem;'
        });
        
        const message = DOM.el('p', {
            textContent: `Failed to initialize DeveloperTools: ${error.message}`,
            style: 'margin-bottom: 2rem; color: #ccc;'
        });
        
        const details = DOM.el('details', {
            style: 'text-align: left; margin-bottom: 2rem;'
        });
        
        const summary = DOM.el('summary', {
            textContent: 'Error Details',
            style: 'cursor: pointer; margin-bottom: 1rem;'
        });
        
        const stack = DOM.el('pre', {
            textContent: error.stack || 'No stack trace available',
            style: `
                background: #2d2d2d;
                padding: 1rem;
                border-radius: 4px;
                font-size: 0.875rem;
                overflow: auto;
                max-height: 200px;
            `
        });
        
        const reloadBtn = DOM.el('button', {
            textContent: 'Reload Page',
            style: `
                background: #4dabf7;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
            `
        });
        
        DOM.on(reloadBtn, 'click', () => {
            window.location.reload();
        });
        
        details.appendChild(summary);
        details.appendChild(stack);
        
        content.appendChild(title);
        content.appendChild(message);
        content.appendChild(details);
        content.appendChild(reloadBtn);
        
        errorDiv.appendChild(content);
        container.appendChild(errorDiv);
    },
    
    // Get app info
    getInfo: () => {
        const stats = ToolsRegistry.getStats();
        return {
            version: '1.0.0',
            initialized: App.initialized,
            tools: stats,
            currentTool: Router.currentTool,
            storageAvailable: Storage.isAvailable(),
            storageSize: Storage.getSize()
        };
    },
    
    // Toggle theme
    toggleTheme: () => {
        const preferences = Storage.getPreferences();
        const currentTheme = preferences.theme || 'auto';
        
        let newTheme;
        switch (currentTheme) {
            case 'light':
                newTheme = 'dark';
                break;
            case 'dark':
                newTheme = 'auto';
                break;
            default:
                newTheme = 'light';
                break;
        }
        
        Storage.setPreference('theme', newTheme);
        App.applyTheme();
        
        if (window.Toasts) {
            Toasts.info(`Theme changed to ${newTheme}`);
        }
    },
    
    // Reset app data
    reset: () => {
        if (confirm('Are you sure you want to reset all app data? This cannot be undone.')) {
            Storage.clear();
            if (window.Toasts) {
                Toasts.success('App data cleared');
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
};

// Initialize app when DOM is ready
DOM.ready(() => {
    App.init();
});

// Make App available globally for debugging
window.App = App;
