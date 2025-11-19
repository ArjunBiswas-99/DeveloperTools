// Tabs UI management
const Tabs = {
    container: null,
    searchInput: null,
    activeTab: null,
    tools: [],
    filteredTools: [],
    
    // Initialize tabs system
    init: (tools = []) => {
        Tabs.container = DOM.qs('#tabs');
        Tabs.searchInput = DOM.qs('#tool-search');
        Tabs.tools = tools;
        Tabs.filteredTools = [...tools];
        
        if (!Tabs.container) {
            console.warn('Tabs container not found');
            return;
        }
        
        // Setup search functionality
        if (Tabs.searchInput) {
            DOM.on(Tabs.searchInput, 'input', Tabs.handleSearch);
            DOM.on(Tabs.searchInput, 'keydown', Tabs.handleSearchKeydown);
        }
        
        // Render initial tabs
        Tabs.render();
        
        // Setup keyboard navigation
        DOM.on(document, 'keydown', Tabs.handleKeyboard);
    },
    
    // Render tabs
    render: () => {
        if (!Tabs.container) return;
        
        DOM.clear(Tabs.container);
        
        if (Tabs.filteredTools.length === 0) {
            const noResults = DOM.el('div', {
                className: 'no-results',
                textContent: Tabs.tools.length === 0 ? 'No tools available' : 'No tools found'
            });
            Tabs.container.appendChild(noResults);
            return;
        }
        
        Tabs.filteredTools.forEach(tool => {
            const tab = Tabs.createTab(tool);
            Tabs.container.appendChild(tab);
        });
    },
    
    // Create individual tab element
    createTab: (tool) => {
        const tab = DOM.el('a', {
            className: 'tab',
            href: `#tool=${tool.id}`,
            'data-tool-id': tool.id,
            title: `Open ${tool.name}`,
            role: 'tab',
            'aria-selected': 'false'
        });
        
        // Add icon if available
        if (tool.icon) {
            const icon = DOM.el('span', {
                className: 'tab-icon',
                innerHTML: Tabs.getIconSVG(tool.icon)
            });
            tab.appendChild(icon);
        }
        
        // Add text
        const text = DOM.el('span', {
            className: 'tab-text',
            textContent: tool.name
        });
        tab.appendChild(text);
        
        // Add click handler
        DOM.on(tab, 'click', (e) => {
            e.preventDefault();
            Tabs.selectTab(tool.id);
            
            // Update URL hash
            if (window.Router) {
                window.Router.navigate(`tool=${tool.id}`);
            }
        });
        
        return tab;
    },
    
    // Get icon SVG (simple icons for now)
    getIconSVG: (iconName) => {
        const icons = {
            json: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.53 3.36,19.36 3,18.5C2.64,19.36 2.07,20.53 1,21H-1V19H1V14A2,2 0 0,1 3,12A2,2 0 0,1 1,10V5H-1V3H1C2.07,3.47 2.64,4.64 3,5.5C3.36,4.64 3.93,3.47 5,3M19,3H21V5H19V10A2,2 0 0,0 21,12A2,2 0 0,0 19,14V19H21V21H19C17.93,20.53 17.36,19.36 17,18.5C16.64,19.36 16.07,20.53 15,21H13V19H15V14A2,2 0 0,0 17,12A2,2 0 0,0 15,10V5H13V3H15C16.07,3.47 16.64,4.64 17,5.5C17.36,4.64 17.93,3.47 19,3Z"/>
            </svg>`,
            base64: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>`,
            url: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"/>
            </svg>`,
            uuid: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6,2A2,2 0 0,0 4,4V11H6V4H18V11H20V4A2,2 0 0,0 18,2H6M7,13A1,1 0 0,0 6,14V20A1,1 0 0,0 7,21H17A1,1 0 0,0 18,20V14A1,1 0 0,0 17,13H7M8,15H16V19H8V15Z"/>
            </svg>`,
            hash: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z"/>
            </svg>`,
            jwt: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.4C15.4,11.7 15.9,12.4 15.9,13.3V16.8C15.9,17.9 15.1,18.7 14,18.7H10C8.9,18.7 8.1,17.9 8.1,16.8V13.4C8.1,12.4 8.6,11.7 9.2,11.4V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.3H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
            </svg>`,
            color: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z"/>
            </svg>`,
            time: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
            </svg>`,
            csv: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>`,
            diff: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z"/>
            </svg>`,
            default: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>`
        };
        
        return icons[iconName] || icons.default;
    },
    
    // Select tab
    selectTab: (toolId) => {
        // Remove active class from all tabs
        const allTabs = DOM.qsa('.tab', Tabs.container);
        allTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        // Add active class to selected tab
        const selectedTab = DOM.qs(`[data-tool-id="${toolId}"]`, Tabs.container);
        if (selectedTab) {
            selectedTab.classList.add('active');
            selectedTab.setAttribute('aria-selected', 'true');
            Tabs.activeTab = toolId;
            
            // Store last selected tool
            if (window.Storage) {
                window.Storage.setLastTool(toolId);
            }
            
            // Scroll tab into view if needed
            selectedTab.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'center'
            });
        }
    },
    
    // Handle search input
    handleSearch: (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) {
            Tabs.filteredTools = [...Tabs.tools];
        } else {
            Tabs.filteredTools = Tabs.tools.filter(tool => 
                tool.name.toLowerCase().includes(query) ||
                tool.id.toLowerCase().includes(query) ||
                (tool.description && tool.description.toLowerCase().includes(query))
            );
        }
        
        Tabs.render();
        
        // Maintain active tab if still visible
        if (Tabs.activeTab && Tabs.filteredTools.find(t => t.id === Tabs.activeTab)) {
            Tabs.selectTab(Tabs.activeTab);
        }
    },
    
    // Handle search input keyboard navigation
    handleSearchKeydown: (e) => {
        if (e.key === 'Escape') {
            e.target.value = '';
            Tabs.handleSearch(e);
            e.target.blur();
        } else if (e.key === 'Enter') {
            // Select first filtered tool
            if (Tabs.filteredTools.length > 0) {
                const firstTool = Tabs.filteredTools[0];
                Tabs.selectTab(firstTool.id);
                if (window.Router) {
                    window.Router.navigate(`tool=${firstTool.id}`);
                }
                e.target.blur();
            }
        }
    },
    
    // Handle keyboard navigation
    handleKeyboard: (e) => {
        // Only handle when not typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        const currentIndex = Tabs.filteredTools.findIndex(t => t.id === Tabs.activeTab);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % Tabs.filteredTools.length;
            if (Tabs.filteredTools[nextIndex]) {
                const nextTool = Tabs.filteredTools[nextIndex];
                Tabs.selectTab(nextTool.id);
                if (window.Router) {
                    window.Router.navigate(`tool=${nextTool.id}`);
                }
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex <= 0 ? Tabs.filteredTools.length - 1 : currentIndex - 1;
            if (Tabs.filteredTools[prevIndex]) {
                const prevTool = Tabs.filteredTools[prevIndex];
                Tabs.selectTab(prevTool.id);
                if (window.Router) {
                    window.Router.navigate(`tool=${prevTool.id}`);
                }
            }
        } else if (e.key === '/' && e.ctrlKey) {
            // Ctrl+/ to focus search
            e.preventDefault();
            if (Tabs.searchInput) {
                Tabs.searchInput.focus();
            }
        }
    },
    
    // Get current active tool
    getActiveTool: () => {
        return Tabs.tools.find(t => t.id === Tabs.activeTab);
    },
    
    // Update tools list
    updateTools: (tools) => {
        Tabs.tools = tools;
        Tabs.filteredTools = [...tools];
        Tabs.render();
    },
    
    // Clear search
    clearSearch: () => {
        if (Tabs.searchInput) {
            Tabs.searchInput.value = '';
            Tabs.filteredTools = [...Tabs.tools];
            Tabs.render();
        }
    }
};

// Make it available globally
window.Tabs = Tabs;
