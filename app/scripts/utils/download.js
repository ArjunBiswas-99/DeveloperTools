// Download utility functions
const Download = {
    // Download text as file
    downloadText: (filename, text, mimeType = 'text/plain') => {
        try {
            const blob = new Blob([text], { type: mimeType });
            Download.downloadBlob(filename, blob);
            return true;
        } catch (error) {
            console.error('Failed to download text:', error);
            return false;
        }
    },
    
    // Download JSON data
    downloadJSON: (filename, data, pretty = true) => {
        try {
            const jsonString = pretty 
                ? JSON.stringify(data, null, 2)
                : JSON.stringify(data);
            
            return Download.downloadText(
                filename.endsWith('.json') ? filename : `${filename}.json`,
                jsonString,
                'application/json'
            );
        } catch (error) {
            console.error('Failed to download JSON:', error);
            return false;
        }
    },
    
    // Download CSV data
    downloadCSV: (filename, data) => {
        try {
            return Download.downloadText(
                filename.endsWith('.csv') ? filename : `${filename}.csv`,
                data,
                'text/csv'
            );
        } catch (error) {
            console.error('Failed to download CSV:', error);
            return false;
        }
    },
    
    // Download HTML content
    downloadHTML: (filename, html) => {
        try {
            return Download.downloadText(
                filename.endsWith('.html') ? filename : `${filename}.html`,
                html,
                'text/html'
            );
        } catch (error) {
            console.error('Failed to download HTML:', error);
            return false;
        }
    },
    
    // Download XML content
    downloadXML: (filename, xml) => {
        try {
            return Download.downloadText(
                filename.endsWith('.xml') ? filename : `${filename}.xml`,
                xml,
                'application/xml'
            );
        } catch (error) {
            console.error('Failed to download XML:', error);
            return false;
        }
    },
    
    // Download blob data
    downloadBlob: (filename, blob) => {
        try {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the URL object
            setTimeout(() => URL.revokeObjectURL(url), 100);
            
            return true;
        } catch (error) {
            console.error('Failed to download blob:', error);
            return false;
        }
    },
    
    // Download from URL (useful for generated content)
    downloadFromURL: (filename, url) => {
        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            return true;
        } catch (error) {
            console.error('Failed to download from URL:', error);
            return false;
        }
    },
    
    // Create download button
    createDownloadButton: (getText, filename, options = {}) => {
        const {
            buttonText = 'Download',
            buttonClass = 'download-btn',
            mimeType = 'text/plain',
            successMessage = 'Downloaded successfully',
            errorMessage = 'Failed to download'
        } = options;
        
        const button = DOM.el('button', {
            className: buttonClass,
            textContent: buttonText,
            type: 'button',
            title: `Download as ${filename}`
        });
        
        DOM.on(button, 'click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            try {
                const text = typeof getText === 'function' ? getText() : getText;
                if (!text) {
                    if (window.Toasts) {
                        window.Toasts.show('warning', 'No content to download');
                    }
                    return;
                }
                
                const success = Download.downloadText(filename, text, mimeType);
                
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
            } catch (error) {
                console.error('Download button error:', error);
                if (window.Toasts) {
                    window.Toasts.show('error', errorMessage);
                }
            }
        });
        
        return button;
    },
    
    // Download with toast notification
    downloadWithToast: (filename, text, mimeType = 'text/plain', successMessage, errorMessage) => {
        const success = Download.downloadText(filename, text, mimeType);
        
        if (window.Toasts) {
            if (success) {
                window.Toasts.show('success', successMessage || `Downloaded ${filename}`);
            } else {
                window.Toasts.show('error', errorMessage || 'Download failed');
            }
        }
        
        return success;
    },
    
    // Get file extension for mime type
    getExtensionForMimeType: (mimeType) => {
        const mimeToExt = {
            'text/plain': '.txt',
            'application/json': '.json',
            'text/csv': '.csv',
            'text/html': '.html',
            'application/xml': '.xml',
            'text/xml': '.xml',
            'application/javascript': '.js',
            'text/css': '.css',
            'image/svg+xml': '.svg',
            'application/pdf': '.pdf'
        };
        
        return mimeToExt[mimeType] || '.txt';
    },
    
    // Generate filename with timestamp
    generateFilename: (baseName, extension, includeTimestamp = true) => {
        if (includeTimestamp) {
            const now = new Date();
            const timestamp = now.toISOString()
                .replace(/[:.]/g, '-')
                .replace('T', '_')
                .slice(0, 19);
            return `${baseName}_${timestamp}${extension}`;
        }
        return `${baseName}${extension}`;
    },
    
    // Check if downloads are supported
    isSupported: () => {
        try {
            return !!(document.createElement('a').download !== undefined && 
                     window.URL && window.URL.createObjectURL && 
                     window.Blob);
        } catch (error) {
            return false;
        }
    }
};

// Make it available globally
window.Download = Download;
