// Toast notification system
const Toasts = {
    container: null,
    toasts: new Map(),
    autoRemoveDelay: 5000,
    
    // Initialize toast system
    init: () => {
        Toasts.container = DOM.qs('#toast-container');
        if (!Toasts.container) {
            console.warn('Toast container not found');
        }
    },
    
    // Show toast notification
    show: (type = 'info', message, options = {}) => {
        if (!Toasts.container) {
            console.warn('Toast system not initialized');
            return null;
        }
        
        const {
            duration = Toasts.autoRemoveDelay,
            persistent = false,
            allowDuplicates = false,
            action = null
        } = options;
        
        // Check for duplicates
        if (!allowDuplicates) {
            const existing = Array.from(Toasts.toasts.values()).find(toast => 
                toast.message === message && toast.type === type
            );
            if (existing) {
                // Refresh existing toast
                Toasts.refresh(existing.id);
                return existing.id;
            }
        }
        
        // Create toast element
        const toastId = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const toast = DOM.el('div', {
            className: `toast ${type}`,
            'data-toast-id': toastId
        });
        
        // Create message content
        const messageEl = DOM.el('div', {
            className: 'toast-message',
            textContent: message
        });
        toast.appendChild(messageEl);
        
        // Add action button if provided
        if (action) {
            const actionBtn = DOM.el('button', {
                className: 'toast-action',
                textContent: action.text || 'Action',
                type: 'button'
            });
            
            DOM.on(actionBtn, 'click', (e) => {
                e.stopPropagation();
                if (action.handler) {
                    action.handler();
                }
                Toasts.remove(toastId);
            });
            
            toast.appendChild(actionBtn);
        }
        
        // Add close button
        const closeBtn = DOM.el('button', {
            className: 'toast-close',
            innerHTML: '&times;',
            type: 'button',
            title: 'Close'
        });
        
        DOM.on(closeBtn, 'click', (e) => {
            e.stopPropagation();
            Toasts.remove(toastId);
        });
        
        toast.appendChild(closeBtn);
        
        // Store toast data
        const toastData = {
            id: toastId,
            element: toast,
            type,
            message,
            timestamp: Date.now(),
            persistent,
            duration,
            timeoutId: null
        };
        
        Toasts.toasts.set(toastId, toastData);
        
        // Add to container
        Toasts.container.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Auto-remove if not persistent
        if (!persistent && duration > 0) {
            toastData.timeoutId = setTimeout(() => {
                Toasts.remove(toastId);
            }, duration);
        }
        
        // Make toast clickable to dismiss
        DOM.on(toast, 'click', () => {
            Toasts.remove(toastId);
        });
        
        return toastId;
    },
    
    // Remove toast
    remove: (toastId) => {
        const toastData = Toasts.toasts.get(toastId);
        if (!toastData) return false;
        
        const { element, timeoutId } = toastData;
        
        // Clear timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Animate out
        element.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            Toasts.toasts.delete(toastId);
        }, 300);
        
        return true;
    },
    
    // Remove all toasts
    clear: () => {
        Array.from(Toasts.toasts.keys()).forEach(id => {
            Toasts.remove(id);
        });
    },
    
    // Refresh toast (reset timer)
    refresh: (toastId) => {
        const toastData = Toasts.toasts.get(toastId);
        if (!toastData || toastData.persistent) return false;
        
        // Clear existing timeout
        if (toastData.timeoutId) {
            clearTimeout(toastData.timeoutId);
        }
        
        // Set new timeout
        toastData.timeoutId = setTimeout(() => {
            Toasts.remove(toastId);
        }, toastData.duration);
        
        // Add visual refresh indicator
        const element = toastData.element;
        element.style.animation = 'none';
        requestAnimationFrame(() => {
            element.style.animation = '';
        });
        
        return true;
    },
    
    // Convenience methods for different types
    success: (message, options = {}) => {
        return Toasts.show('success', message, options);
    },
    
    error: (message, options = {}) => {
        return Toasts.show('error', message, { 
            duration: 8000, // Longer for errors
            ...options 
        });
    },
    
    warning: (message, options = {}) => {
        return Toasts.show('warning', message, options);
    },
    
    info: (message, options = {}) => {
        return Toasts.show('info', message, options);
    },
    
    // Show loading toast
    loading: (message = 'Loading...', options = {}) => {
        return Toasts.show('info', message, {
            persistent: true,
            ...options
        });
    },
    
    // Update existing toast
    update: (toastId, message, type = null) => {
        const toastData = Toasts.toasts.get(toastId);
        if (!toastData) return false;
        
        const messageEl = toastData.element.querySelector('.toast-message');
        if (messageEl) {
            messageEl.textContent = message;
            toastData.message = message;
        }
        
        if (type && type !== toastData.type) {
            toastData.element.classList.remove(toastData.type);
            toastData.element.classList.add(type);
            toastData.type = type;
        }
        
        return true;
    },
    
    // Get active toasts count
    getCount: () => Toasts.toasts.size,
    
    // Get toasts by type
    getByType: (type) => {
        return Array.from(Toasts.toasts.values()).filter(toast => toast.type === type);
    },
    
    // Set default duration
    setDefaultDuration: (duration) => {
        Toasts.autoRemoveDelay = duration;
    },
    
    // Show confirmation toast with action
    confirm: (message, onConfirm, onCancel = null) => {
        return Toasts.show('warning', message, {
            persistent: true,
            action: {
                text: 'Confirm',
                handler: () => {
                    if (onConfirm) onConfirm();
                }
            }
        });
    }
};

// Initialize when DOM is ready
DOM.ready(() => {
    Toasts.init();
});

// Make it available globally
window.Toasts = Toasts;
