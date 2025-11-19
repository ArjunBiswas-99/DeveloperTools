// URL Encoder/Decoder Tool with Tabbed Interface
const Tool_url_encoder_decoder = {
    // Tool metadata
    metadata: {
        id: 'url-encoder-decoder',
        name: 'URL Encoder/Decoder',
        icon: '🔗'
    },
    
    // HTML template embedded to avoid CORS issues
    template: `<!-- URL Encoder/Decoder Tool Tabs -->
<div class="url-encoder-tabs">
    <div class="tab-nav">
        <button class="tab-btn active" data-tab="encoder">URL Encoder</button>
        <button class="tab-btn" data-tab="decoder">URL Decoder</button>
    </div>
    
    <!-- URL Encoder Tab -->
    <div class="tab-content active" id="encoder-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Input Text/URL</h3>
                
                <div class="tool-controls">
                    <button id="encode-btn" class="primary">Encode URL</button>
                    
                    <div class="encoding-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="encode-component"> Encode as Component
                            <span class="option-hint">Use encodeURIComponent() for query parameters</span>
                        </label>
                    </div>
                </div>
                
                <div class="input-area">
                    <textarea 
                        id="input-text-encoder" 
                        class="tool-textarea" 
                        placeholder="Enter text or URL to encode...&#10;&#10;Example:&#10;https://example.com/search?q=hello world&category=web development"
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-status">
                    <span>Input: <span id="input-length-encoder">0 characters</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>URL Encoded Output</h3>
                
                <div class="tool-actions">
                    <button id="copy-btn-encoder">📋 Copy</button>
                    <button id="clear-btn-encoder">🗑️ Clear</button>
                </div>
                
                <textarea 
                    id="output-text-encoder" 
                    class="tool-textarea" 
                    placeholder="URL encoded output will appear here...&#10;&#10;Example:&#10;https://example.com/search?q=hello%20world&category=web%20development"
                    readonly
                    spellcheck="false"
                ></textarea>
                
                <div class="tool-status">
                    <span>Output: <span id="output-length-encoder">0 characters</span></span>
                    <span>Changes: <span id="changes-encoder">No encoding needed</span></span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- URL Decoder Tab -->
    <div class="tab-content" id="decoder-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>URL Encoded Input</h3>
                
                <div class="tool-controls">
                    <button id="decode-btn" class="primary">Decode URL</button>
                    
                    <div class="decoding-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="decode-component"> Decode as Component
                            <span class="option-hint">Use decodeURIComponent() for query parameters</span>
                        </label>
                    </div>
                </div>
                
                <div class="input-area">
                    <textarea 
                        id="input-text-decoder" 
                        class="tool-textarea" 
                        placeholder="Enter URL encoded text to decode...&#10;&#10;Example:&#10;https://example.com/search?q=hello%20world&category=web%20development"
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-status">
                    <span>Input: <span id="input-length-decoder">0 characters</span></span>
                    <span>Valid: <span id="validation-status-decoder">Unknown</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Decoded Output</h3>
                
                <div class="tool-actions">
                    <button id="copy-btn-decoder">📋 Copy</button>
                    <button id="clear-btn-decoder">🗑️ Clear</button>
                </div>
                
                <textarea 
                    id="output-text-decoder" 
                    class="tool-textarea" 
                    placeholder="Decoded text output will appear here...&#10;&#10;Example:&#10;https://example.com/search?q=hello world&category=web development"
                    readonly
                    spellcheck="false"
                ></textarea>
                
                <div class="tool-status">
                    <span>Output: <span id="output-length-decoder">0 characters</span></span>
                    <span>Changes: <span id="changes-decoder">No decoding needed</span></span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Examples Section -->
<div class="examples-section">
    <h3>📚 Common Use Cases</h3>
    <div class="examples-grid">
        <div class="example-item">
            <h4>Query Parameters</h4>
            <p><strong>Original:</strong> <code>search?q=hello world</code></p>
            <p><strong>Encoded:</strong> <code>search?q=hello%20world</code></p>
        </div>
        <div class="example-item">
            <h4>Special Characters</h4>
            <p><strong>Original:</strong> <code>path/file name & symbols.txt</code></p>
            <p><strong>Encoded:</strong> <code>path/file%20name%20%26%20symbols.txt</code></p>
        </div>
        <div class="example-item">
            <h4>Form Data</h4>
            <p><strong>Original:</strong> <code>user@email.com</code></p>
            <p><strong>Encoded:</strong> <code>user%40email.com</code></p>
        </div>
        <div class="example-item">
            <h4>Unicode Characters</h4>
            <p><strong>Original:</strong> <code>café & 日本語</code></p>
            <p><strong>Encoded:</strong> <code>caf%C3%A9%20%26%20%E6%97%A5%E6%9C%AC%E8%AA%9E</code></p>
        </div>
    </div>
</div>

<!-- Status and Error Display -->
<div id="status-display"></div>
<div id="error-display" class="error-display hidden"></div>`,
    
    // DOM elements for each tab
    elements: {
        tabs: {},
        encoder: {},
        decoder: {},
        shared: {}
    },
    
    // Tool state
    state: {
        activeTab: 'encoder',
        autoProcessTimeout: null
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            console.log('Starting to mount URL Encoder/Decoder tool...');
            
            // Use embedded HTML template
            const htmlContent = Tool_url_encoder_decoder.template;
            console.log('HTML template loaded from embedded source');
            
            // Set the HTML content directly to the container
            container.innerHTML = htmlContent;
            container.className = 'url-encoder-decoder';
            
            // Load CSS
            await Tool_url_encoder_decoder.loadCSS();
            console.log('CSS loaded successfully');
            
            console.log('HTML mounted to container');
            
            // Wait a moment for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Get DOM elements
            Tool_url_encoder_decoder.getElements(container);
            console.log('DOM elements retrieved');
            
            // Bind events
            Tool_url_encoder_decoder.bindEvents();
            console.log('Events bound successfully');
            
            // Clear inputs on mount (fresh start)
            Tool_url_encoder_decoder.clearAllInputs();
            
            // Initialize stats for all tabs
            Tool_url_encoder_decoder.updateStats('encoder');
            Tool_url_encoder_decoder.updateStats('decoder');
            
            console.log('URL Encoder/Decoder tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount URL Encoder/Decoder tool:', error);
            console.error('Error stack:', error.stack);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading URL Encoder/Decoder Tool</h3>
                    <p>${error.message}</p>
                    <pre style="margin-top: 1rem; font-size: 0.8rem; text-align: left;">${error.stack || 'No stack trace available'}</pre>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        // Save current state
        Tool_url_encoder_decoder.saveState();
        
        // Clean up event listeners and timeouts
        if (Tool_url_encoder_decoder.state.autoProcessTimeout) {
            clearTimeout(Tool_url_encoder_decoder.state.autoProcessTimeout);
        }
        
        Tool_url_encoder_decoder.elements = {
            tabs: {},
            encoder: {},
            decoder: {},
            shared: {}
        };
        
        console.log('URL Encoder/Decoder tool unmounted');
    },
    
    // Load HTML content
    loadHTML: async () => {
        try {
            const response = await fetch('./tools/url-encoder-decoder/tool.html');
            if (!response.ok) {
                throw new Error(`Failed to load HTML: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading HTML:', error);
            throw error;
        }
    },
    
    // Load CSS dynamically
    loadCSS: async () => {
        const cssId = 'url-encoder-decoder-css';
        if (!DOM.qs(`#${cssId}`)) {
            const link = DOM.el('link', {
                id: cssId,
                rel: 'stylesheet',
                href: './tools/url-encoder-decoder/tool.css'
            });
            document.head.appendChild(link);
            
            return new Promise((resolve) => {
                link.onload = () => resolve();
                link.onerror = () => resolve(); // Still resolve to continue
            });
        }
        return Promise.resolve();
    },
    
    // Get DOM elements for all tabs  
    getElements: (container) => {
        if (!container) {
            console.error('Container is null in getElements');
            return;
        }
        
        try {
            // Tab navigation
            Tool_url_encoder_decoder.elements.tabs = {
                nav: DOM.qsa('.tab-btn', container) || [],
                contents: {
                    encoder: DOM.qs('#encoder-tab', container),
                    decoder: DOM.qs('#decoder-tab', container)
                }
            };
            
            // Encoder tab elements
            Tool_url_encoder_decoder.elements.encoder = {
                inputText: DOM.qs('#input-text-encoder', container),
                outputText: DOM.qs('#output-text-encoder', container),
                encodeBtn: DOM.qs('#encode-btn', container),
                encodeComponent: DOM.qs('#encode-component', container),
                copyBtn: DOM.qs('#copy-btn-encoder', container),
                clearBtn: DOM.qs('#clear-btn-encoder', container),
                inputLength: DOM.qs('#input-length-encoder', container),
                outputLength: DOM.qs('#output-length-encoder', container),
                changes: DOM.qs('#changes-encoder', container)
            };
            
            // Decoder tab elements
            Tool_url_encoder_decoder.elements.decoder = {
                inputText: DOM.qs('#input-text-decoder', container),
                outputText: DOM.qs('#output-text-decoder', container),
                decodeBtn: DOM.qs('#decode-btn', container),
                decodeComponent: DOM.qs('#decode-component', container),
                copyBtn: DOM.qs('#copy-btn-decoder', container),
                clearBtn: DOM.qs('#clear-btn-decoder', container),
                inputLength: DOM.qs('#input-length-decoder', container),
                outputLength: DOM.qs('#output-length-decoder', container),
                changes: DOM.qs('#changes-decoder', container),
                validationStatus: DOM.qs('#validation-status-decoder', container)
            };
            
            // Shared elements
            Tool_url_encoder_decoder.elements.shared = {
                statusDisplay: DOM.qs('#status-display', container),
                errorDisplay: DOM.qs('#error-display', container)
            };
            
        } catch (error) {
            console.error('Error in getElements:', error);
            console.log('Container:', container);
        }
    },
    
    // Bind event listeners for all tabs
    bindEvents: () => {
        try {
            // Tab navigation using SubTabs utility
            if (window.SubTabs && Tool_url_encoder_decoder.elements.tabs) {
                const container = document.querySelector('.url-encoder-decoder');
                SubTabs.bindTabEvents(
                    container,
                    Tool_url_encoder_decoder.elements,
                    Tool_url_encoder_decoder.switchTab
                );
                
                // Set initial default tab (encoder)
                SubTabs.setInitialTab(
                    container,
                    'encoder',
                    Tool_url_encoder_decoder.elements,
                    Tool_url_encoder_decoder.switchTab
                );
            }
            
            // Encoder tab events
            const encoder = Tool_url_encoder_decoder.elements.encoder;
            if (encoder.inputText) {
                DOM.on(encoder.inputText, 'input', () => Tool_url_encoder_decoder.handleInput('encoder'));
                DOM.on(encoder.inputText, 'paste', () => {
                    setTimeout(() => Tool_url_encoder_decoder.handleInput('encoder'), 10);
                });
            }
            if (encoder.encodeBtn) DOM.on(encoder.encodeBtn, 'click', Tool_url_encoder_decoder.encodeURL);
            if (encoder.copyBtn) DOM.on(encoder.copyBtn, 'click', () => Tool_url_encoder_decoder.copyOutput('encoder'));
            if (encoder.clearBtn) DOM.on(encoder.clearBtn, 'click', () => Tool_url_encoder_decoder.clear('encoder'));
            
            // Decoder tab events
            const decoder = Tool_url_encoder_decoder.elements.decoder;
            if (decoder.inputText) {
                DOM.on(decoder.inputText, 'input', () => Tool_url_encoder_decoder.handleInput('decoder'));
                DOM.on(decoder.inputText, 'paste', () => {
                    setTimeout(() => Tool_url_encoder_decoder.handleInput('decoder'), 10);
                });
            }
            if (decoder.decodeBtn) DOM.on(decoder.decodeBtn, 'click', Tool_url_encoder_decoder.decodeURL);
            if (decoder.copyBtn) DOM.on(decoder.copyBtn, 'click', () => Tool_url_encoder_decoder.copyOutput('decoder'));
            if (decoder.clearBtn) DOM.on(decoder.clearBtn, 'click', () => Tool_url_encoder_decoder.clear('decoder'));
            
            console.log('Event listeners bound successfully');
        } catch (error) {
            console.error('Error binding events:', error);
        }
    },
    
    // Switch between tabs using SubTabs utility
    switchTab: (tabName) => {
        // Clear inputs when switching between subtabs
        if (Tool_url_encoder_decoder.state.activeTab !== tabName) {
            Tool_url_encoder_decoder.clearAllInputs();
        }
        
        // Use SubTabs utility for proper tab switching
        if (window.SubTabs) {
            const container = document.querySelector('.url-encoder-decoder');
            const success = SubTabs.switchTab(container, tabName, Tool_url_encoder_decoder.elements);
            
            if (success) {
                // Update state
                Tool_url_encoder_decoder.state.activeTab = tabName;
                
                // Update stats for the active tab
                Tool_url_encoder_decoder.updateStats(tabName);
            } else {
                console.warn('SubTabs.switchTab failed, falling back to manual method');
                // Fallback to manual method
                Tool_url_encoder_decoder.elements.tabs.nav.forEach(btn => {
                    btn.classList.remove('active');
                });
                const activeBtn = Tool_url_encoder_decoder.elements.tabs.nav.find(btn => 
                    btn.getAttribute('data-tab') === tabName
                );
                if (activeBtn) activeBtn.classList.add('active');
                
                Object.entries(Tool_url_encoder_decoder.elements.tabs.contents).forEach(([tab, content]) => {
                    content.classList.toggle('active', tab === tabName);
                });
                
                Tool_url_encoder_decoder.state.activeTab = tabName;
                Tool_url_encoder_decoder.updateStats(tabName);
            }
        } else {
            console.warn('SubTabs utility not available, using fallback method');
            // Fallback method (original logic but improved)
            Tool_url_encoder_decoder.elements.tabs.nav.forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = Tool_url_encoder_decoder.elements.tabs.nav.find(btn => 
                btn.getAttribute('data-tab') === tabName
            );
            if (activeBtn) activeBtn.classList.add('active');
            
            Object.entries(Tool_url_encoder_decoder.elements.tabs.contents).forEach(([tab, content]) => {
                content.classList.toggle('active', tab === tabName);
            });
            
            Tool_url_encoder_decoder.state.activeTab = tabName;
            Tool_url_encoder_decoder.updateStats(tabName);
        }
    },
    
    // Handle input changes for specific tab
    handleInput: (tabName) => {
        Tool_url_encoder_decoder.updateStats(tabName);
        Tool_url_encoder_decoder.hideStatus();
        
        // Validate URL encoding input on decoder tab
        if (tabName === 'decoder') {
            Tool_url_encoder_decoder.validateURLInput();
        }
        
        // Auto-encode/decode if preference is set
        const preferences = Storage?.getPreferences?.() || {};
        if (preferences.autoProcess) {
            clearTimeout(Tool_url_encoder_decoder.state.autoProcessTimeout);
            Tool_url_encoder_decoder.state.autoProcessTimeout = setTimeout(() => {
                if (tabName === 'encoder') {
                    Tool_url_encoder_decoder.encodeURL(true);
                } else if (tabName === 'decoder') {
                    Tool_url_encoder_decoder.decodeURL(true);
                }
            }, 500);
        }
    },
    
    // Encode text to URL encoding
    encodeURL: (silent = false) => {
        const input = Tool_url_encoder_decoder.elements.encoder.inputText.value;
        const useComponent = Tool_url_encoder_decoder.elements.encoder.encodeComponent.checked;
        
        if (!input) {
            if (!silent) Tool_url_encoder_decoder.showStatus('Please enter text to encode', 'info');
            return;
        }
        
        try {
            let encoded;
            if (useComponent) {
                encoded = encodeURIComponent(input);
            } else {
                encoded = encodeURI(input);
            }
            
            Tool_url_encoder_decoder.elements.encoder.outputText.value = encoded;
            Tool_url_encoder_decoder.updateOutputStats('encoder');
            
            if (!silent) {
                Tool_url_encoder_decoder.showStatus('✓ Text encoded to URL format', 'success');
                if (window.Toasts) {
                    Toasts.success('Text encoded successfully');
                }
            }
        } catch (error) {
            Tool_url_encoder_decoder.showStatus('Error: ' + error.message, 'error');
            if (!silent && window.Toasts) {
                Toasts.error('Encoding failed');
            }
        }
    },
    
    // Decode URL encoded text
    decodeURL: (silent = false) => {
        const input = Tool_url_encoder_decoder.elements.decoder.inputText.value.trim();
        const useComponent = Tool_url_encoder_decoder.elements.decoder.decodeComponent.checked;
        
        if (!input) {
            if (!silent) Tool_url_encoder_decoder.showStatus('Please enter URL encoded text to decode', 'info');
            return;
        }
        
        try {
            let decoded;
            if (useComponent) {
                decoded = decodeURIComponent(input);
            } else {
                decoded = decodeURI(input);
            }
            
            Tool_url_encoder_decoder.elements.decoder.outputText.value = decoded;
            Tool_url_encoder_decoder.updateOutputStats('decoder');
            
            if (!silent) {
                Tool_url_encoder_decoder.showStatus('✓ URL encoded text decoded', 'success');
                if (window.Toasts) {
                    Toasts.success('Text decoded successfully');
                }
            }
        } catch (error) {
            Tool_url_encoder_decoder.showStatus('Error: Invalid URL encoding - ' + error.message, 'error');
            if (!silent && window.Toasts) {
                Toasts.error('Invalid URL encoded input');
            }
        }
    },
    
    // Validate URL encoded input
    validateURLInput: () => {
        const input = Tool_url_encoder_decoder.elements.decoder.inputText.value.trim();
        const validElement = Tool_url_encoder_decoder.elements.decoder.validationStatus;
        
        if (!input) {
            validElement.textContent = 'Unknown';
            validElement.className = '';
            return;
        }
        
        try {
            // Test decode with both methods
            decodeURI(input);
            decodeURIComponent(input);
            validElement.textContent = 'Valid';
            validElement.className = 'valid';
        } catch (error) {
            validElement.textContent = 'Invalid';
            validElement.className = 'invalid';
        }
    },
    
    // Copy output to clipboard
    copyOutput: async (tabName) => {
        let output = '';
        
        if (tabName === 'encoder') {
            output = Tool_url_encoder_decoder.elements.encoder.outputText.value;
        } else if (tabName === 'decoder') {
            output = Tool_url_encoder_decoder.elements.decoder.outputText.value;
        }
        
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
    
    // Clear content for specific tab
    clear: (tabName) => {
        if (tabName === 'encoder') {
            const elements = Tool_url_encoder_decoder.elements.encoder;
            elements.inputText.value = '';
            elements.outputText.value = '';
        } else if (tabName === 'decoder') {
            const elements = Tool_url_encoder_decoder.elements.decoder;
            elements.inputText.value = '';
            elements.outputText.value = '';
            elements.validationStatus.textContent = 'Unknown';
            elements.validationStatus.className = '';
        }
        
        Tool_url_encoder_decoder.hideStatus();
        Tool_url_encoder_decoder.updateStats(tabName);
        
        if (window.Toasts) {
            Toasts.info('Content cleared');
        }
    },
    
    // Clear all inputs across tabs
    clearAllInputs: () => {
        try {
            // Clear encoder tab
            if (Tool_url_encoder_decoder.elements.encoder?.inputText) {
                Tool_url_encoder_decoder.elements.encoder.inputText.value = '';
                Tool_url_encoder_decoder.elements.encoder.outputText.value = '';
            }
            
            // Clear decoder tab
            if (Tool_url_encoder_decoder.elements.decoder?.inputText) {
                Tool_url_encoder_decoder.elements.decoder.inputText.value = '';
                Tool_url_encoder_decoder.elements.decoder.outputText.value = '';
                if (Tool_url_encoder_decoder.elements.decoder.validationStatus) {
                    Tool_url_encoder_decoder.elements.decoder.validationStatus.textContent = 'Unknown';
                    Tool_url_encoder_decoder.elements.decoder.validationStatus.className = '';
                }
            }
            
            Tool_url_encoder_decoder.hideStatus();
            Tool_url_encoder_decoder.updateStats('encoder');
            Tool_url_encoder_decoder.updateStats('decoder');
        } catch (error) {
            console.warn('Error clearing inputs:', error);
        }
    },
    
    // Update input/output statistics
    updateStats: (tabName) => {
        if (tabName === 'encoder') {
            const elements = Tool_url_encoder_decoder.elements.encoder;
            const input = elements.inputText.value;
            const inputLength = input.length;
            
            elements.inputLength.textContent = inputLength.toLocaleString() + ' characters';
        } else if (tabName === 'decoder') {
            const elements = Tool_url_encoder_decoder.elements.decoder;
            const input = elements.inputText.value;
            const inputLength = input.length;
            
            elements.inputLength.textContent = inputLength.toLocaleString() + ' characters';
        }
        
        Tool_url_encoder_decoder.updateOutputStats(tabName);
    },
    
    // Update output statistics
    updateOutputStats: (tabName) => {
        if (tabName === 'encoder') {
            const elements = Tool_url_encoder_decoder.elements.encoder;
            const input = elements.inputText.value;
            const output = elements.outputText.value;
            const outputLength = output.length;
            
            elements.outputLength.textContent = outputLength.toLocaleString() + ' characters';
            
            // Calculate changes
            const inputLength = input.length;
            if (inputLength === 0) {
                elements.changes.textContent = 'No encoding needed';
            } else if (outputLength === inputLength) {
                elements.changes.textContent = 'No encoding needed';
            } else {
                const changePercent = (((outputLength - inputLength) / inputLength) * 100).toFixed(1);
                elements.changes.textContent = outputLength > inputLength ? 
                    `+${changePercent}% longer` : `${changePercent}% shorter`;
            }
                
        } else if (tabName === 'decoder') {
            const elements = Tool_url_encoder_decoder.elements.decoder;
            const input = elements.inputText.value;
            const output = elements.outputText.value;
            const outputLength = output.length;
            
            elements.outputLength.textContent = outputLength.toLocaleString() + ' characters';
            
            // Calculate changes
            const inputLength = input.length;
            if (inputLength === 0) {
                elements.changes.textContent = 'No decoding needed';
            } else if (outputLength === inputLength) {
                elements.changes.textContent = 'No decoding needed';
            } else {
                const changePercent = (((outputLength - inputLength) / inputLength) * 100).toFixed(1);
                elements.changes.textContent = outputLength > inputLength ? 
                    `+${changePercent}% longer` : `${changePercent}% shorter`;
            }
        }
    },
    
    // Show status message
    showStatus: (message, type = 'info') => {
        const statusEl = Tool_url_encoder_decoder.elements.shared.statusDisplay;
        statusEl.textContent = message;
        statusEl.className = type;
        statusEl.style.display = 'block';
    },
    
    // Hide status message
    hideStatus: () => {
        const statusEl = Tool_url_encoder_decoder.elements.shared.statusDisplay;
        statusEl.style.display = 'none';
        statusEl.className = '';
    },
    
    // Load saved state
    loadState: () => {
        if (!Storage) return;
        
        const state = Storage.getToolState('url-encoder-decoder');
        
        // Load content for each tab
        if (state.encoder_input) {
            Tool_url_encoder_decoder.elements.encoder.inputText.value = state.encoder_input;
            Tool_url_encoder_decoder.updateStats('encoder');
        }
        
        if (state.decoder_input) {
            Tool_url_encoder_decoder.elements.decoder.inputText.value = state.decoder_input;
            Tool_url_encoder_decoder.updateStats('decoder');
        }
        
        // Load active tab
        if (state.activeTab) {
            Tool_url_encoder_decoder.switchTab(state.activeTab);
        }
        
        // Load checkbox states
        if (state.encoder_component !== undefined) {
            Tool_url_encoder_decoder.elements.encoder.encodeComponent.checked = state.encoder_component;
        }
        
        if (state.decoder_component !== undefined) {
            Tool_url_encoder_decoder.elements.decoder.decodeComponent.checked = state.decoder_component;
        }
    },
    
    // Save current state
    saveState: () => {
        if (!Storage) return;
        
        const state = {
            activeTab: Tool_url_encoder_decoder.state.activeTab,
            encoder_input: Tool_url_encoder_decoder.elements.encoder?.inputText?.value || '',
            decoder_input: Tool_url_encoder_decoder.elements.decoder?.inputText?.value || '',
            encoder_component: Tool_url_encoder_decoder.elements.encoder?.encodeComponent?.checked || false,
            decoder_component: Tool_url_encoder_decoder.elements.decoder?.decodeComponent?.checked || false
        };
        
        Storage.setToolState('url-encoder-decoder', state);
    }
};

// Make tool available globally
window.Tool_url_encoder_decoder = Tool_url_encoder_decoder;
