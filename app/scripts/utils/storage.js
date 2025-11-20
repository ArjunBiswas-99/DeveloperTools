// Storage utility functions for localStorage and Chrome Extension Storage
// Automatically detects environment and uses appropriate storage API
const Storage = {
    // Key prefix to avoid conflicts
    PREFIX: 'devtools_',
    
    // Detect if running as Chrome extension
    _isExtension: typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id,
    
    // Get prefixed key
    getKey: (key) => `${Storage.PREFIX}${key}`,
    
    // Set item in storage (works for both localStorage and Chrome storage)
    set: async (key, value) => {
        try {
            const prefixedKey = Storage.getKey(key);
            
            if (Storage._isExtension) {
                // Chrome extension storage
                return new Promise((resolve) => {
                    chrome.storage.local.set({ [prefixedKey]: value }, () => {
                        if (chrome.runtime.lastError) {
                            console.warn('Failed to set Chrome storage item:', chrome.runtime.lastError);
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                });
            } else {
                // Regular localStorage
                const serializedValue = JSON.stringify(value);
                localStorage.setItem(prefixedKey, serializedValue);
                return Promise.resolve(true);
            }
        } catch (error) {
            console.warn('Failed to set storage item:', error);
            return Promise.resolve(false);
        }
    },
    
    // Get item from storage (works for both localStorage and Chrome storage)
    get: async (key, defaultValue = null) => {
        try {
            const prefixedKey = Storage.getKey(key);
            
            if (Storage._isExtension) {
                // Chrome extension storage
                return new Promise((resolve) => {
                    chrome.storage.local.get([prefixedKey], (result) => {
                        if (chrome.runtime.lastError) {
                            console.warn('Failed to get Chrome storage item:', chrome.runtime.lastError);
                            resolve(defaultValue);
                        } else {
                            resolve(result[prefixedKey] !== undefined ? result[prefixedKey] : defaultValue);
                        }
                    });
                });
            } else {
                // Regular localStorage
                const item = localStorage.getItem(prefixedKey);
                return Promise.resolve(item ? JSON.parse(item) : defaultValue);
            }
        } catch (error) {
            console.warn('Failed to get storage item:', error);
            return Promise.resolve(defaultValue);
        }
    },
    
    // Remove item from storage (works for both localStorage and Chrome storage)
    remove: async (key) => {
        try {
            const prefixedKey = Storage.getKey(key);
            
            if (Storage._isExtension) {
                // Chrome extension storage
                return new Promise((resolve) => {
                    chrome.storage.local.remove([prefixedKey], () => {
                        if (chrome.runtime.lastError) {
                            console.warn('Failed to remove Chrome storage item:', chrome.runtime.lastError);
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                });
            } else {
                // Regular localStorage
                localStorage.removeItem(prefixedKey);
                return Promise.resolve(true);
            }
        } catch (error) {
            console.warn('Failed to remove storage item:', error);
            return Promise.resolve(false);
        }
    },
    
    // Clear all app-related items (works for both localStorage and Chrome storage)
    clear: async () => {
        try {
            if (Storage._isExtension) {
                // Chrome extension storage
                return new Promise((resolve) => {
                    chrome.storage.local.get(null, (items) => {
                        const keysToRemove = Object.keys(items).filter(key => 
                            key.startsWith(Storage.PREFIX)
                        );
                        if (keysToRemove.length > 0) {
                            chrome.storage.local.remove(keysToRemove, () => {
                                resolve(!chrome.runtime.lastError);
                            });
                        } else {
                            resolve(true);
                        }
                    });
                });
            } else {
                // Regular localStorage
                const keys = Object.keys(localStorage).filter(key => 
                    key.startsWith(Storage.PREFIX)
                );
                keys.forEach(key => localStorage.removeItem(key));
                return Promise.resolve(true);
            }
        } catch (error) {
            console.warn('Failed to clear storage:', error);
            return Promise.resolve(false);
        }
    },
    
    // Check if localStorage is available
    isAvailable: () => {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    },
    
    // Get storage size (approximate)
    getSize: () => {
        try {
            let total = 0;
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(Storage.PREFIX)) {
                    total += localStorage.getItem(key).length;
                }
            });
            return total;
        } catch (error) {
            return 0;
        }
    },
    
    // Get all app keys
    getKeys: () => {
        try {
            return Object.keys(localStorage)
                .filter(key => key.startsWith(Storage.PREFIX))
                .map(key => key.slice(Storage.PREFIX.length));
        } catch (error) {
            return [];
        }
    },
    
    // Tool-specific methods
    
    // Get/set last selected tool
    getLastTool: () => Storage.get('last_tool', null),
    setLastTool: (toolId) => Storage.set('last_tool', toolId),
    
    // Get/set tool settings
    getToolSettings: (toolId) => Storage.get(`tool_${toolId}`, {}),
    setToolSettings: (toolId, settings) => Storage.set(`tool_${toolId}`, settings),
    
    // Get/set tool state (for preserving input/output)
    getToolState: (toolId) => Storage.get(`state_${toolId}`, {}),
    setToolState: (toolId, state) => Storage.set(`state_${toolId}`, state),
    
    // Get/set user preferences
    getPreferences: () => Storage.get('preferences', {
        theme: 'auto', // 'light', 'dark', 'auto'
        rememberToolState: true,
        showWelcomeMessage: true,
        autoSave: true
    }),
    setPreferences: (preferences) => Storage.set('preferences', preferences),
    
    // Update single preference
    setPreference: (key, value) => {
        const prefs = Storage.getPreferences();
        prefs[key] = value;
        Storage.setPreferences(prefs);
    },
    
    // Get/set recent files/content
    getRecentItems: (toolId, maxItems = 10) => {
        const key = `recent_${toolId}`;
        return Storage.get(key, []).slice(0, maxItems);
    },
    
    addRecentItem: (toolId, item, maxItems = 10) => {
        const key = `recent_${toolId}`;
        let items = Storage.get(key, []);
        
        // Remove if already exists
        items = items.filter(existing => 
            JSON.stringify(existing) !== JSON.stringify(item)
        );
        
        // Add to beginning
        items.unshift(item);
        
        // Limit items
        items = items.slice(0, maxItems);
        
        Storage.set(key, items);
    },
    
    // Get/set app-wide settings
    getAppSettings: () => Storage.get('app_settings', {
        version: '1.0.0',
        firstRun: true,
        installDate: new Date().toISOString()
    }),
    setAppSettings: (settings) => Storage.set('app_settings', settings),
    
    // Migration helper
    migrate: (fromVersion, toVersion) => {
        try {
            const appSettings = Storage.getAppSettings();
            if (appSettings.version === fromVersion) {
                // Perform migration logic here
                console.log(`Migrating from ${fromVersion} to ${toVersion}`);
                
                appSettings.version = toVersion;
                Storage.setAppSettings(appSettings);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Migration failed:', error);
            return false;
        }
    },
    
    // Export all data
    exportData: () => {
        try {
            const data = {};
            Storage.getKeys().forEach(key => {
                data[key] = Storage.get(key);
            });
            return data;
        } catch (error) {
            console.error('Failed to export data:', error);
            return null;
        }
    },
    
    // Import data
    importData: (data) => {
        try {
            let imported = 0;
            Object.entries(data).forEach(([key, value]) => {
                if (Storage.set(key, value)) {
                    imported++;
                }
            });
            return imported;
        } catch (error) {
            console.error('Failed to import data:', error);
            return 0;
        }
    },
    
    // Listen for storage changes
    onChange: (callback) => {
        const handler = (e) => {
            if (e.key && e.key.startsWith(Storage.PREFIX)) {
                const key = e.key.slice(Storage.PREFIX.length);
                callback(key, e.newValue ? JSON.parse(e.newValue) : null, 
                        e.oldValue ? JSON.parse(e.oldValue) : null);
            }
        };
        
        window.addEventListener('storage', handler);
        
        // Return cleanup function
        return () => window.removeEventListener('storage', handler);
    }
};

// Make it available globally
window.Storage = Storage;
