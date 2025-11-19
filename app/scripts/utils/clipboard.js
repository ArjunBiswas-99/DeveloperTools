// Clipboard utility functions
const Clipboard = {
    // Copy text to clipboard
    copy: async (text) => {
        try {
            // First try the modern Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers or non-secure contexts
                return Clipboard.fallbackCopy(text);
            }
        } catch (error) {
            console.warn('Clipboard API failed, trying fallback:', error);
            return Clipboard.fallbackCopy(text);
        }
    },
    
    // Fallback copy method using execCommand
    fallbackCopy: (text) => {
        try {
            // Create a temporary textarea element
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-999999px';
            textarea.style.top = '-999999px';
            textarea.setAttribute('readonly', '');
            textarea.setAttribute('aria-hidden', 'true');
            
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, text.length);
            
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            
            return success;
        } catch (error) {
            console.error('Fallback copy failed:', error);
            return false;
        }
    },
    
    // Copy with automatic toast notification
    copyWithToast: async (text, successMessage = 'Copied to clipboard', errorMessage = 'Failed to copy') => {
        const success = await Clipboard.copy(text);
        
        if (window.Toasts) {
            if (success) {
                window.Toasts.show('success', successMessage);
            } else {
                window.Toasts.show('error', errorMessage);
            }
        }
        
        return success;
    },
    
    // Read from clipboard (if supported)
    read: async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                return await navigator.clipboard.readText();
            } else {
                throw new Error('Clipboard read not supported');
            }
        } catch (error) {
            console.warn('Failed to read from clipboard:', error);
            return null;
        }
    },
    
    // Check if clipboard operations are supported
    isSupported: () => {
        return !!(navigator.clipboard || document.execCommand);
    },
    
    // Check if clipboard read is supported
    isReadSupported: () => {
        return !!(navigator.clipboard && window.isSecureContext);
    },
    
    // Add copy button to element
    addCopyButton: (element, getText, options = {}) => {
        const {
            buttonText = 'Copy',
            buttonClass = 'copy-btn',
            position = 'after',
            successMessage = 'Copied!',
            errorMessage = 'Failed to copy'
        } = options;
        
        const button = DOM.el('button', {
            className: buttonClass,
            textContent: buttonText,
            type: 'button',
            title: 'Copy to clipboard'
        });
        
        DOM.on(button, 'click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const text = typeof getText === 'function' ? getText() : getText;
            if (text) {
                const success = await Clipboard.copy(text);
                
                // Update button text temporarily
                const originalText = button.textContent;
                button.textContent = success ? '✓' : '✗';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1000);
                
                // Show toast if available
                if (window.Toasts) {
                    window.Toasts.show(
                        success ? 'success' : 'error',
                        success ? successMessage : errorMessage
                    );
                }
            }
        });
        
        // Add button to DOM
        if (position === 'before') {
            element.parentNode.insertBefore(button, element);
        } else if (position === 'after') {
            element.parentNode.insertBefore(button, element.nextSibling);
        } else if (position === 'inside') {
            element.appendChild(button);
        }
        
        return button;
    },
    
    // Make any element copyable by clicking
    makeCopyable: (element, getText, options = {}) => {
        const {
            cursor = true,
            title = 'Click to copy',
            successMessage = 'Copied!',
            errorMessage = 'Failed to copy'
        } = options;
        
        if (cursor) {
            element.style.cursor = 'pointer';
        }
        
        if (title) {
            element.title = title;
        }
        
        DOM.on(element, 'click', async (e) => {
            e.preventDefault();
            
            const text = typeof getText === 'function' ? getText() : getText;
            if (text) {
                await Clipboard.copyWithToast(text, successMessage, errorMessage);
            }
        });
        
        return element;
    }
};

// Make it available globally
window.Clipboard = Clipboard;
