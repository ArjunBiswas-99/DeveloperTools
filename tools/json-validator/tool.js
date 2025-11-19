// JSON Validator & Beautifier Tool
const Tool_json_validator = {
    // Tool metadata
    metadata: {
        id: 'json-validator',
        name: 'JSON Validator & Beautifier',
        icon: 'json'
    },
    
    // DOM elements
    elements: {},
    
    // Tool state
    state: {
        lastValidJson: null,
        isValid: false
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            // Load HTML template
            const htmlContent = await DOM.loadHTML('../tools/json-validator/tool.html');
            if (!htmlContent) {
                throw new Error('Failed to load tool template');
            }
            
            // Create wrapper with CSS class
            const wrapper = DOM.el('div', {
                className: 'json-validator'
            });
            wrapper.innerHTML = htmlContent;
            
            // Load CSS
            Tool_json_validator.loadCSS();
            
            // Mount to container
            container.appendChild(wrapper);
            
            // Get DOM elements
            Tool_json_validator.getElements(wrapper);
            
            // Bind events
            Tool_json_validator.bindEvents();
            
            // Load saved state
            Tool_json_validator.loadState();
            
            // Update stats initially
            Tool_json_validator.updateStats();
            
            console.log('JSON Validator tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount JSON Validator tool:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading JSON Validator</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        // Save current state
        Tool_json_validator.saveState();
        
        // Clean up event listeners (they will be removed with DOM)
        Tool_json_validator.elements = {};
        
        console.log('JSON Validator tool unmounted');
    },
    
    // Load CSS dynamically
    loadCSS: () => {
        const cssId = 'json-validator-css';
        if (!DOM.qs(`#${cssId}`)) {
            const link = DOM.el('link', {
                id: cssId,
                rel: 'stylesheet',
                href: '../tools/json-validator/tool.css'
            });
            document.head.appendChild(link);
        }
    },
    
    // Get DOM elements
    getElements: (container) => {
        Tool_json_validator.elements = {
            container,
            inputJson: DOM.qs('#input-json', container),
            outputJson: DOM.qs('#output-json', container),
            validateBtn: DOM.qs('#validate-btn', container),
            beautifyBtn: DOM.qs('#beautify-btn', container),
            minifyBtn: DOM.qs('#minify-btn', container),
            indentSelect: DOM.qs('#indent-select', container),
            uploadFile: DOM.qs('#upload-file', container),
            copyBtn: DOM.qs('#copy-btn', container),
            downloadBtn: DOM.qs('#download-btn', container),
            clearBtn: DOM.qs('#clear-btn', container),
            statusDisplay: DOM.qs('#status-display', container),
            errorDisplay: DOM.qs('#error-display', container),
            inputChars: DOM.qs('#input-chars', container),
            inputLines: DOM.qs('#input-lines', container),
            outputChars: DOM.qs('#output-chars', container),
            sizeDiff: DOM.qs('#size-diff', container)
        };
    },
    
    // Bind event listeners
    bindEvents: () => {
        const { elements } = Tool_json_validator;
        
        // Input events
        DOM.on(elements.inputJson, 'input', Tool_json_validator.handleInput);
        DOM.on(elements.inputJson, 'paste', () => {
            setTimeout(Tool_json_validator.handleInput, 10);
        });
        
        // Button events
        DOM.on(elements.validateBtn, 'click', Tool_json_validator.validate);
        DOM.on(elements.beautifyBtn, 'click', Tool_json_validator.beautify);
        DOM.on(elements.minifyBtn, 'click', Tool_json_validator.minify);
        DOM.on(elements.copyBtn, 'click', Tool_json_validator.copyOutput);
        DOM.on(elements.downloadBtn, 'click', Tool_json_validator.downloadOutput);
        DOM.on(elements.clearBtn, 'click', Tool_json_validator.clear);
        
        // File upload
        DOM.on(elements.uploadFile, 'change', Tool_json_validator.handleFileUpload);
        
        // Keyboard shortcuts
        DOM.on(elements.inputJson, 'keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                Tool_json_validator.validate();
            }
        });
    },
    
    // Handle input changes
    handleInput: () => {
        Tool_json_validator.updateStats();
        Tool_json_validator.hideStatus();
        
        // Auto-validate if preference is set
        const preferences = Storage.getPreferences();
        if (preferences.autoValidate) {
            clearTimeout(Tool_json_validator.autoValidateTimeout);
            Tool_json_validator.autoValidateTimeout = setTimeout(() => {
                Tool_json_validator.validate(true); // Silent validation
            }, 500);
        }
    },
    
    // Validate JSON
    validate: (silent = false) => {
        const input = Tool_json_validator.elements.inputJson.value.trim();
        
        if (!input) {
            Tool_json_validator.showStatus('Please enter JSON to validate', 'info');
            return false;
        }
        
        try {
            const parsed = JSON.parse(input);
            Tool_json_validator.state.lastValidJson = parsed;
            Tool_json_validator.state.isValid = true;
            
            // Update UI
            Tool_json_validator.elements.inputJson.classList.remove('invalid');
            Tool_json_validator.elements.inputJson.classList.add('valid');
            Tool_json_validator.hideError();
            
            if (!silent) {
                Tool_json_validator.showStatus('✓ Valid JSON', 'success');
                if (window.Toasts) {
                    Toasts.success('JSON is valid');
                }
            }
            
            return true;
        } catch (error) {
            Tool_json_validator.state.isValid = false;
            
            // Update UI
            Tool_json_validator.elements.inputJson.classList.remove('valid');
            Tool_json_validator.elements.inputJson.classList.add('invalid');
            
            if (!silent) {
                Tool_json_validator.showStatus('✗ Invalid JSON', 'error');
                Tool_json_validator.showError(error, input);
                
                if (window.Toasts) {
                    Toasts.error('Invalid JSON');
                }
            }
            
            return false;
        }
    },
    
    // Beautify JSON
    beautify: () => {
        if (!Tool_json_validator.validate()) {
            return;
        }
        
        try {
            const indent = Tool_json_validator.elements.indentSelect.value;
            const indentValue = indent === '\t' ? '\t' : parseInt(indent);
            
            const beautified = JSON.stringify(Tool_json_validator.state.lastValidJson, null, indentValue);
            Tool_json_validator.elements.outputJson.value = beautified;
            
            Tool_json_validator.updateOutputStats();
            Tool_json_validator.showStatus('✓ JSON beautified', 'success');
            
            if (window.Toasts) {
                Toasts.success('JSON beautified');
            }
        } catch (error) {
            Tool_json_validator.showStatus('Error beautifying JSON', 'error');
            console.error('Beautify error:', error);
        }
    },
    
    // Minify JSON
    minify: () => {
        if (!Tool_json_validator.validate()) {
            return;
        }
        
        try {
            const minified = JSON.stringify(Tool_json_validator.state.lastValidJson);
            Tool_json_validator.elements.outputJson.value = minified;
            
            Tool_json_validator.updateOutputStats();
            Tool_json_validator.showStatus('✓ JSON minified', 'success');
            
            if (window.Toasts) {
                Toasts.success('JSON minified');
            }
        } catch (error) {
            Tool_json_validator.showStatus('Error minifying JSON', 'error');
            console.error('Minify error:', error);
        }
    },
    
    // Copy output to clipboard
    copyOutput: async () => {
        const output = Tool_json_validator.elements.outputJson.value;
        if (!output) {
            if (window.Toasts) {
                Toasts.warning('No output to copy');
            }
            return;
        }
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(output, 'Output copied to clipboard');
        }
    },
    
    // Download output as file
    downloadOutput: () => {
        const output = Tool_json_validator.elements.outputJson.value;
        if (!output) {
            if (window.Toasts) {
                Toasts.warning('No output to download');
            }
            return;
        }
        
        if (window.Download) {
            const filename = Download.generateFilename('output', '.json');
            Download.downloadWithToast(filename, output, 'application/json');
        }
    },
    
    // Clear all content
    clear: () => {
        Tool_json_validator.elements.inputJson.value = '';
        Tool_json_validator.elements.outputJson.value = '';
        Tool_json_validator.elements.inputJson.classList.remove('valid', 'invalid');
        Tool_json_validator.hideStatus();
        Tool_json_validator.hideError();
        Tool_json_validator.updateStats();
        Tool_json_validator.updateOutputStats();
        
        if (window.Toasts) {
            Toasts.info('Content cleared');
        }
    },
    
    // Handle file upload
    handleFileUpload: (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            Tool_json_validator.elements.inputJson.value = event.target.result;
            Tool_json_validator.handleInput();
            
            if (window.Toasts) {
                Toasts.success(`File "${file.name}" loaded`);
            }
        };
        
        reader.onerror = () => {
            if (window.Toasts) {
                Toasts.error('Failed to read file');
            }
        };
        
        reader.readAsText(file);
        
        // Clear the file input
        e.target.value = '';
    },
    
    // Update input statistics
    updateStats: () => {
        const input = Tool_json_validator.elements.inputJson.value;
        const chars = input.length;
        const lines = input ? input.split('\n').length : 0;
        
        Tool_json_validator.elements.inputChars.textContent = chars.toLocaleString();
        Tool_json_validator.elements.inputLines.textContent = lines.toLocaleString();
    },
    
    // Update output statistics
    updateOutputStats: () => {
        const input = Tool_json_validator.elements.inputJson.value;
        const output = Tool_json_validator.elements.outputJson.value;
        const outputChars = output.length;
        
        Tool_json_validator.elements.outputChars.textContent = outputChars.toLocaleString();
        
        // Calculate size difference
        const inputSize = input.length;
        const outputSize = outputChars;
        const diff = outputSize - inputSize;
        const diffPercent = inputSize > 0 ? ((diff / inputSize) * 100).toFixed(1) : 0;
        
        let diffText, diffClass;
        if (diff > 0) {
            diffText = `+${diff} (+${diffPercent}%)`;
            diffClass = 'larger';
        } else if (diff < 0) {
            diffText = `${diff} (${diffPercent}%)`;
            diffClass = 'smaller';
        } else {
            diffText = 'No change';
            diffClass = 'same';
        }
        
        Tool_json_validator.elements.sizeDiff.textContent = diffText;
        Tool_json_validator.elements.sizeDiff.className = diffClass;
    },
    
    // Show status message
    showStatus: (message, type = 'info') => {
        const statusEl = Tool_json_validator.elements.statusDisplay;
        statusEl.textContent = message;
        statusEl.className = type;
    },
    
    // Hide status message
    hideStatus: () => {
        const statusEl = Tool_json_validator.elements.statusDisplay;
        statusEl.style.display = 'none';
        statusEl.className = '';
    },
    
    // Show error details
    showError: (error, input) => {
        const errorEl = Tool_json_validator.elements.errorDisplay;
        
        // Try to get line/column info
        let errorMessage = error.message;
        let lineInfo = '';
        
        // Parse error position if available
        const positionMatch = error.message.match(/position (\d+)/i);
        if (positionMatch) {
            const position = parseInt(positionMatch[1]);
            const beforeError = input.substring(0, position);
            const lines = beforeError.split('\n');
            const line = lines.length;
            const column = lines[lines.length - 1].length + 1;
            lineInfo = `Line ${line}, Column ${column}`;
        }
        
        const fullError = lineInfo ? `${errorMessage}\n${lineInfo}` : errorMessage;
        
        errorEl.textContent = fullError;
        errorEl.classList.remove('hidden');
    },
    
    // Hide error display
    hideError: () => {
        Tool_json_validator.elements.errorDisplay.classList.add('hidden');
    },
    
    // Load saved state
    loadState: () => {
        if (!Storage) return;
        
        const state = Storage.getToolState('json-validator');
        if (state.input) {
            Tool_json_validator.elements.inputJson.value = state.input;
            Tool_json_validator.updateStats();
        }
        
        if (state.indent) {
            Tool_json_validator.elements.indentSelect.value = state.indent;
        }
    },
    
    // Save current state
    saveState: () => {
        if (!Storage) return;
        
        const state = {
            input: Tool_json_validator.elements.inputJson?.value || '',
            indent: Tool_json_validator.elements.indentSelect?.value || '2'
        };
        
        Storage.setToolState('json-validator', state);
    }
};

// Make tool available globally
window.Tool_json_validator = Tool_json_validator;
