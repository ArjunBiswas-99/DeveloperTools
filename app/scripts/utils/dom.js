// DOM utility functions
const DOM = {
    // Query selectors
    qs: (selector, parent = document) => parent.querySelector(selector),
    qsa: (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),
    
    // Element creation
    el: (tag, attributes = {}, children = []) => {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Add children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    // Mount/unmount helpers
    mount: (element, container) => {
        if (container && element) {
            container.appendChild(element);
        }
    },
    
    unmount: (container) => {
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    },
    
    // Clear container but keep it
    clear: (container) => {
        if (container) {
            container.innerHTML = '';
        }
    },
    
    // Add/remove classes
    addClass: (element, className) => {
        if (element && className) {
            element.classList.add(className);
        }
    },
    
    removeClass: (element, className) => {
        if (element && className) {
            element.classList.remove(className);
        }
    },
    
    toggleClass: (element, className) => {
        if (element && className) {
            element.classList.toggle(className);
        }
    },
    
    hasClass: (element, className) => {
        return element && className ? element.classList.contains(className) : false;
    },
    
    // Show/hide elements
    show: (element) => {
        if (element) {
            element.style.display = '';
            element.classList.remove('hidden');
        }
    },
    
    hide: (element) => {
        if (element) {
            element.classList.add('hidden');
        }
    },
    
    // Get/set data attributes
    getData: (element, key) => {
        return element ? element.getAttribute(`data-${key}`) : null;
    },
    
    setData: (element, key, value) => {
        if (element) {
            element.setAttribute(`data-${key}`, value);
        }
    },
    
    // Event helpers
    on: (element, event, handler, options = {}) => {
        if (element && event && handler) {
            element.addEventListener(event, handler, options);
        }
    },
    
    off: (element, event, handler) => {
        if (element && event && handler) {
            element.removeEventListener(event, handler);
        }
    },
    
    // Delegate event handling
    delegate: (container, selector, event, handler) => {
        if (container && selector && event && handler) {
            container.addEventListener(event, (e) => {
                const target = e.target.closest(selector);
                if (target) {
                    handler.call(target, e);
                }
            });
        }
    },
    
    // Wait for DOM ready
    ready: (callback) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    },
    
    // Load external content
    loadHTML: async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Failed to load HTML:', error);
            return null;
        }
    },
    
    // Create fragment from HTML string
    createFragment: (htmlString) => {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        return template.content;
    },
    
    // Escape HTML
    escapeHTML: (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    // Get element dimensions
    getRect: (element) => {
        return element ? element.getBoundingClientRect() : null;
    },
    
    // Scroll to element
    scrollTo: (element, options = { behavior: 'smooth' }) => {
        if (element) {
            element.scrollIntoView(options);
        }
    }
};

// Make it available globally
window.DOM = DOM;
