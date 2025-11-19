// Sub-tabs utility for tool-level tab switching
const SubTabs = {
    // Switch between sub-tabs with proper highlighting
    switchTab: (container, tabName, elements) => {
        if (!container || !tabName || !elements) {
            console.warn('SubTabs.switchTab: Missing required parameters');
            return false;
        }

        try {
            // First, remove active class from ALL tab buttons
            if (elements.tabs && elements.tabs.nav) {
                elements.tabs.nav.forEach(btn => {
                    if (btn && btn.classList) {
                        btn.classList.remove('active');
                    }
                });

                // Then add active class only to the selected tab
                const activeBtn = elements.tabs.nav.find(btn => 
                    btn && btn.getAttribute('data-tab') === tabName
                );
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
            }

            // Update tab contents
            if (elements.tabs && elements.tabs.contents) {
                Object.entries(elements.tabs.contents).forEach(([tab, content]) => {
                    if (content && content.classList) {
                        content.classList.toggle('active', tab === tabName);
                    }
                });
            }

            console.log(`SubTabs: Switched to tab '${tabName}'`);
            return true;
        } catch (error) {
            console.error('SubTabs.switchTab error:', error);
            return false;
        }
    },

    // Setup event listeners for sub-tabs
    bindTabEvents: (container, elements, switchTabCallback) => {
        if (!container || !elements || !elements.tabs || !elements.tabs.nav) {
            console.warn('SubTabs.bindTabEvents: Missing required parameters');
            return false;
        }

        try {
            // Create a new array to hold updated button references
            const updatedNavButtons = [];
            
            elements.tabs.nav.forEach((btn, index) => {
                if (btn) {
                    // Remove any existing listeners to avoid duplicates
                    const newBtn = btn.cloneNode(true);
                    btn.parentNode.replaceChild(newBtn, btn);
                    
                    // Add the click event listener
                    DOM.on(newBtn, 'click', (e) => {
                        e.preventDefault();
                        const tabName = e.target.getAttribute('data-tab');
                        if (tabName && switchTabCallback) {
                            switchTabCallback(tabName);
                        }
                    });
                    
                    // Add to the updated array
                    updatedNavButtons[index] = newBtn;
                } else {
                    updatedNavButtons[index] = btn;
                }
            });
            
            // Replace the nav array with updated references
            elements.tabs.nav = updatedNavButtons;

            console.log('SubTabs: Event listeners bound successfully');
            return true;
        } catch (error) {
            console.error('SubTabs.bindTabEvents error:', error);
            return false;
        }
    },

    // Validate tab structure
    validateTabStructure: (elements) => {
        if (!elements || !elements.tabs) {
            console.warn('SubTabs: No tab structure found');
            return false;
        }

        if (!elements.tabs.nav || !Array.isArray(elements.tabs.nav)) {
            console.warn('SubTabs: No tab navigation buttons found');
            return false;
        }

        if (!elements.tabs.contents || typeof elements.tabs.contents !== 'object') {
            console.warn('SubTabs: No tab contents found');
            return false;
        }

        return true;
    },

    // Get active tab name
    getActiveTab: (elements) => {
        if (!SubTabs.validateTabStructure(elements)) {
            return null;
        }

        try {
            const activeBtn = elements.tabs.nav.find(btn => 
                btn && btn.classList && btn.classList.contains('active')
            );
            return activeBtn ? activeBtn.getAttribute('data-tab') : null;
        } catch (error) {
            console.error('SubTabs.getActiveTab error:', error);
            return null;
        }
    },

    // Set initial active tab
    setInitialTab: (container, defaultTab, elements, switchTabCallback) => {
        if (!SubTabs.validateTabStructure(elements)) {
            return false;
        }

        try {
            // Find the first tab with active class, or use default
            let activeTab = SubTabs.getActiveTab(elements);
            
            if (!activeTab) {
                // No active tab found, use default or first available
                activeTab = defaultTab || elements.tabs.nav[0]?.getAttribute('data-tab');
            }

            if (activeTab && switchTabCallback) {
                switchTabCallback(activeTab);
                return true;
            }
        } catch (error) {
            console.error('SubTabs.setInitialTab error:', error);
        }

        return false;
    }
};

// Make it available globally
window.SubTabs = SubTabs;
