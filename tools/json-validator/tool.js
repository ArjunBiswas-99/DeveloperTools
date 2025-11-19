// JSON Validator & Beautifier Tool with Tabbed Interface
const Tool_json_validator = {
    // Tool metadata
    metadata: {
        id: 'json-validator',
        name: 'JSON Validator & Beautifier',
        icon: 'json'
    },
    
    // HTML template embedded to avoid CORS issues
    template: `<!-- JSON Tool Tabs -->
<div class="subtabs-container">
    <div class="subtabs-nav">
        <button class="subtab-btn active" data-tab="validator">JSON Validator</button>
        <button class="subtab-btn" data-tab="beautifier">JSON Beautifier</button>
        <button class="subtab-btn" data-tab="minifier">JSON Minifier</button>
    </div>
    
    <!-- JSON Validator Tab -->
    <div class="subtab-content active" id="validator-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Input JSON</h3>
                
                <div class="tool-controls">
                    <button id="validate-btn" class="primary">Validate JSON</button>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-file" accept=".json,.txt" />
                        <label for="upload-file" class="file-upload-label">
                            📁 Upload File
                        </label>
                    </div>
                </div>
                
                <textarea 
                    id="input-json" 
                    class="tool-textarea" 
                    placeholder="Paste your JSON here or upload a file..."
                    spellcheck="false"
                ></textarea>
                
                <div class="tool-status">
                    <span>Characters: <span id="input-chars">0</span></span>
                    <span>Lines: <span id="input-lines">0</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Validation Result</h3>
                
                <div class="tool-actions">
                    <button id="clear-btn">🗑️ Clear</button>
                </div>
                
                <div id="validation-result" class="validation-result">
                    <p class="placeholder">Click "Validate JSON" to check your JSON syntax</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- JSON Beautifier Tab -->
    <div class="subtab-content" id="beautifier-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Input JSON</h3>
                
                <div class="tool-controls">
                    <button id="beautify-btn" class="primary">Beautify JSON</button>
                    <select id="indent-select">
                        <option value="2">2 spaces</option>
                        <option value="4">4 spaces</option>
                        <option value="\\t">Tabs</option>
                    </select>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-file-beautifier" accept=".json,.txt" />
                        <label for="upload-file-beautifier" class="file-upload-label">
                            📁 Upload File
                        </label>
                    </div>
                </div>
                
                <textarea 
                    id="input-json-beautifier" 
                    class="tool-textarea" 
                    placeholder="Paste your JSON here to beautify..."
                    spellcheck="false"
                ></textarea>
                
                <div class="tool-status">
                    <span>Characters: <span id="input-chars-beautifier">0</span></span>
                    <span>Lines: <span id="input-lines-beautifier">0</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Beautified JSON</h3>
                
                <div class="tool-actions">
                    <button id="copy-btn-beautifier">📋 Copy</button>
                    <button id="download-btn-beautifier">💾 Download</button>
                    <button id="clear-btn-beautifier">🗑️ Clear</button>
                </div>
                
                <textarea 
                    id="output-json-beautifier" 
                    class="tool-textarea" 
                    placeholder="Beautified JSON will appear here..."
                    readonly
                    spellcheck="false"
                ></textarea>
                
                <div class="tool-status">
                    <span>Characters: <span id="output-chars-beautifier">0</span></span>
                    <span>Size: <span id="size-diff-beautifier">-</span></span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- JSON Minifier Tab -->
    <div class="subtab-content" id="minifier-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Input JSON</h3>
                
                <div class="tool-controls">
                    <button id="minify-btn" class="primary">Minify JSON</button>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-file-minifier" accept=".json,.txt" />
                        <label for="upload-file-minifier" class="file-upload-label">
                            📁 Upload File
                        </label>
                    </div>
                </div>
                
                <textarea 
                    id="input-json-minifier" 
                    class="tool-textarea" 
                    placeholder="Paste your JSON here to minify..."
                    spellcheck="false"
                ></textarea>
                
                <div class="tool-status">
                    <span>Characters: <span id="input-chars-minifier">0</span></span>
                    <span>Lines: <span id="input-lines-minifier">0</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Minified JSON</h3>
                
                <div class="tool-actions">
                    <button id="copy-btn-minifier">📋 Copy</button>
                    <button id="download-btn-minifier">💾 Download</button>
                    <button id="clear-btn-minifier">🗑️ Clear</button>
                </div>
                
                <textarea 
                    id="output-json-minifier" 
                    class="tool-textarea" 
                    placeholder="Minified JSON will appear here..."
                    readonly
                    spellcheck="false"
                ></textarea>
                
                <div class="tool-status">
                    <span>Characters: <span id="output-chars-minifier">0</span></span>
                    <span>Size: <span id="size-diff-minifier">-</span></span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Status and Error Display -->
<div id="status-display"></div>
<div id="error-display" class="error-display hidden"></div>`,
    
    // DOM elements for each tab
    elements: {
        subtabs: null,
        validator: {},
        beautifier: {},
        minifier: {},
        shared: {}
    },
    
    // Tool state
    state: {
        activeTab: 'validator',
        lastValidJson: {
            validator: null,
            beautifier: null,
            minifier: null
        }
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            console.log('Starting to mount JSON Validator tool...');
            
            // Use embedded HTML template instead of loading via fetch
            const htmlContent = Tool_json_validator.template;
            console.log('HTML template loaded from embedded source');
            
            // Set the HTML content directly to the container
            container.innerHTML = htmlContent;
            container.className = 'json-validator';
            
            // Load CSS
            await Tool_json_validator.loadCSS();
            console.log('CSS loaded successfully');
            
            console.log('HTML mounted to container');
            
            // Wait a moment for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Get DOM elements first
            Tool_json_validator.getElements(container);
            console.log('DOM elements retrieved');
            
            // Initialize subtabs with proper structure
            Tool_json_validator.initializeSubTabs(container);
            console.log('Subtabs initialized');
            
            // Bind events
            Tool_json_validator.bindEvents();
            console.log('Events bound successfully');
            
            // Load saved state
            Tool_json_validator.loadState();
            
            // Clear all inputs on mount to ensure clean state
            Tool_json_validator.clearAllInputs();
            
            // Initialize stats for all tabs
            Tool_json_validator.updateStats('validator');
            Tool_json_validator.updateStats('beautifier');
            Tool_json_validator.updateStats('minifier');
            
            console.log('JSON Validator tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount JSON Validator tool:', error);
            console.error('Error stack:', error.stack);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading JSON Validator</h3>
                    <p>${error.message}</p>
                    <pre style="margin-top: 1rem; font-size: 0.8rem; text-align: left;">${error.stack || 'No stack trace available'}</pre>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        // Save current state
        Tool_json_validator.saveState();
        
        // Clean up event listeners (they will be removed with DOM)
        Tool_json_validator.elements = {
            tabs: {},
            validator: {},
            beautifier: {},
            minifier: {},
            shared: {}
        };
        
        console.log('JSON Validator tool unmounted');
    },
    
    // Load CSS dynamically
    loadCSS: async () => {
        const cssId = 'json-validator-css';
        if (!DOM.qs(`#${cssId}`)) {
            const link = DOM.el('link', {
                id: cssId,
                rel: 'stylesheet',
                href: './tools/json-validator/tool.css'
            });
            document.head.appendChild(link);
            
            // Wait for CSS to load
            return new Promise((resolve) => {
                link.onload = () => resolve();
                link.onerror = () => resolve(); // Still resolve to continue
            });
        }
        return Promise.resolve();
    },
    
    // Initialize SubTabs functionality
    initializeSubTabs: (container) => {
        try {
            // Get subtab navigation buttons
            const tabNavButtons = Array.from(DOM.qsAll('.subtab-btn', container));
            
            // Structure expected by SubTabs utility
            const tabStructure = {
                tabs: {
                    nav: tabNavButtons,
                    contents: {
                        validator: DOM.qs('#validator-tab', container),
                        beautifier: DOM.qs('#beautifier-tab', container),
                        minifier: DOM.qs('#minifier-tab', container)
                    }
                }
            };
            
            // Validate structure
            if (!SubTabs.validateTabStructure(tabStructure)) {
                console.error('Invalid tab structure for SubTabs');
                return false;
            }
            
            // Create switch callback function that calls SubTabs.switchTab
            const switchTabCallback = (tabName) => {
                // Use SubTabs.switchTab to handle the UI switching
                SubTabs.switchTab(container, tabName, tabStructure);
                
                // Update our internal state
                Tool_json_validator.state.activeTab = tabName;
                Tool_json_validator.updateStats(tabName);
                if (tabName !== 'validator') {
                    Tool_json_validator.updateOutputStats(tabName);
                }
                console.log(`Switched to ${tabName} tab`);
            };
            
            // Bind tab events
            SubTabs.bindTabEvents(container, tabStructure, switchTabCallback);
            
            // Set initial active tab
            SubTabs.setInitialTab(container, 'validator', tabStructure, switchTabCallback);
            
            // Store the tab structure for later use
            Tool_json_validator.elements.tabs = tabStructure.tabs;
            
            console.log('SubTabs initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing SubTabs:', error);
            return false;
        }
    },
    
    // Get DOM elements for all tabs
    getElements: (container) => {
        if (!container) {
            console.error('Container is null in getElements');
            return;
        }
        
        try {
            // Get subtab contents
            Tool_json_validator.elements.tabs = {
                contents: {
                    validator: DOM.qs('#validator-tab', container),
                    beautifier: DOM.qs('#beautifier-tab', container),
                    minifier: DOM.qs('#minifier-tab', container)
                }
            };
            
            // Validator tab elements
            Tool_json_validator.elements.validator = {
                inputJson: DOM.qs('#input-json', container),
                validateBtn: DOM.qs('#validate-btn', container),
                uploadFile: DOM.qs('#upload-file', container),
                clearBtn: DOM.qs('#clear-btn', container),
                validationResult: DOM.qs('#validation-result', container),
                inputChars: DOM.qs('#input-chars', container),
                inputLines: DOM.qs('#input-lines', container)
            };
            
            // Beautifier tab elements
            Tool_json_validator.elements.beautifier = {
                inputJson: DOM.qs('#input-json-beautifier', container),
                outputJson: DOM.qs('#output-json-beautifier', container),
                beautifyBtn: DOM.qs('#beautify-btn', container),
                indentSelect: DOM.qs('#indent-select', container),
                uploadFile: DOM.qs('#upload-file-beautifier', container),
                copyBtn: DOM.qs('#copy-btn-beautifier', container),
                downloadBtn: DOM.qs('#download-btn-beautifier', container),
                clearBtn: DOM.qs('#clear-btn-beautifier', container),
                inputChars: DOM.qs('#input-chars-beautifier', container),
                inputLines: DOM.qs('#input-lines-beautifier', container),
                outputChars: DOM.qs('#output-chars-beautifier', container),
                sizeDiff: DOM.qs('#size-diff-beautifier', container)
            };
            
            // Minifier tab elements
            Tool_json_validator.elements.minifier = {
                inputJson: DOM.qs('#input-json-minifier', container),
                outputJson: DOM.qs('#output-json-minifier', container),
                minifyBtn: DOM.qs('#minify-btn', container),
                uploadFile: DOM.qs('#upload-file-minifier', container),
                copyBtn: DOM.qs('#copy-btn-minifier', container),
                downloadBtn: DOM.qs('#download-btn-minifier', container),
                clearBtn: DOM.qs('#clear-btn-minifier', container),
                inputChars: DOM.qs('#input-chars-minifier', container),
                inputLines: DOM.qs('#input-lines-minifier', container),
                outputChars: DOM.qs('#output-chars-minifier', container),
                sizeDiff: DOM.qs('#size-diff-minifier', container)
            };
            
            // Shared elements
            Tool_json_validator.elements.shared = {
                statusDisplay: DOM.qs('#status-display', container),
                errorDisplay: DOM.qs('#error-display', container)
            };
            
            // Verify critical elements exist
            const criticalElements = [
                Tool_json_validator.elements.validator.inputJson,
                Tool_json_validator.elements.validator.validateBtn,
                Tool_json_validator.elements.beautifier.inputJson,
                Tool_json_validator.elements.minifier.inputJson
            ];
            
            const missingElements = criticalElements.filter(el => !el);
            if (missingElements.length > 0) {
                console.error('Critical DOM elements not found:', missingElements.length);
                console.log('Container HTML:', container.innerHTML.substring(0, 500));
            }
        } catch (error) {
            console.error('Error in getElements:', error);
            console.log('Container:', container);
        }
    },
    
    // Bind event listeners for all tabs
    bindEvents: () => {
        try {
            // Tab navigation is handled by SubTabs utility
            
            // Validator tab events
            const validator = Tool_json_validator.elements.validator;
            if (validator.inputJson) {
                DOM.on(validator.inputJson, 'input', () => Tool_json_validator.handleInput('validator'));
                DOM.on(validator.inputJson, 'paste', () => {
                    setTimeout(() => Tool_json_validator.handleInput('validator'), 10);
                });
            }
            if (validator.validateBtn) DOM.on(validator.validateBtn, 'click', Tool_json_validator.validate);
            if (validator.uploadFile) DOM.on(validator.uploadFile, 'change', (e) => Tool_json_validator.handleFileUpload(e, 'validator'));
            if (validator.clearBtn) DOM.on(validator.clearBtn, 'click', () => Tool_json_validator.clear('validator'));
            
            // Beautifier tab events
            const beautifier = Tool_json_validator.elements.beautifier;
            if (beautifier.inputJson) {
                DOM.on(beautifier.inputJson, 'input', () => Tool_json_validator.handleInput('beautifier'));
                DOM.on(beautifier.inputJson, 'paste', () => {
                    setTimeout(() => Tool_json_validator.handleInput('beautifier'), 10);
                });
            }
            if (beautifier.beautifyBtn) DOM.on(beautifier.beautifyBtn, 'click', Tool_json_validator.beautify);
            if (beautifier.uploadFile) DOM.on(beautifier.uploadFile, 'change', (e) => Tool_json_validator.handleFileUpload(e, 'beautifier'));
            if (beautifier.copyBtn) DOM.on(beautifier.copyBtn, 'click', () => Tool_json_validator.copyOutput('beautifier'));
            if (beautifier.downloadBtn) DOM.on(beautifier.downloadBtn, 'click', () => Tool_json_validator.downloadOutput('beautifier'));
            if (beautifier.clearBtn) DOM.on(beautifier.clearBtn, 'click', () => Tool_json_validator.clear('beautifier'));
            
            // Minifier tab events
            const minifier = Tool_json_validator.elements.minifier;
            if (minifier.inputJson) {
                DOM.on(minifier.inputJson, 'input', () => Tool_json_validator.handleInput('minifier'));
                DOM.on(minifier.inputJson, 'paste', () => {
                    setTimeout(() => Tool_json_validator.handleInput('minifier'), 10);
                });
            }
            if (minifier.minifyBtn) DOM.on(minifier.minifyBtn, 'click', Tool_json_validator.minify);
            if (minifier.uploadFile) DOM.on(minifier.uploadFile, 'change', (e) => Tool_json_validator.handleFileUpload(e, 'minifier'));
            if (minifier.copyBtn) DOM.on(minifier.copyBtn, 'click', () => Tool_json_validator.copyOutput('minifier'));
            if (minifier.downloadBtn) DOM.on(minifier.downloadBtn, 'click', () => Tool_json_validator.downloadOutput('minifier'));
            if (minifier.clearBtn) DOM.on(minifier.clearBtn, 'click', () => Tool_json_validator.clear('minifier'));
            
            // Keyboard shortcuts for all textareas
            const textareas = [validator.inputJson, beautifier.inputJson, minifier.inputJson].filter(el => el);
            textareas.forEach(textarea => {
                DOM.on(textarea, 'keydown', (e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        const activeTab = Tool_json_validator.state.activeTab;
                        if (activeTab === 'validator') Tool_json_validator.validate();
                        else if (activeTab === 'beautifier') Tool_json_validator.beautify();
                        else if (activeTab === 'minifier') Tool_json_validator.minify();
                    }
                });
            });
            
            console.log('Event listeners bound successfully');
        } catch (error) {
            console.error('Error binding events:', error);
        }
    },
    
    // Clear all inputs for the current tab
    clearAllInputs: () => {
        const currentTab = Tool_json_validator.state.activeTab;
        const elements = Tool_json_validator.elements[currentTab];
        
        if (elements) {
            // Clear input text area
            if (elements.inputJson) {
                elements.inputJson.value = '';
                elements.inputJson.classList.remove('valid', 'invalid');
            }
            
            // Clear output text area
            if (elements.outputJson) {
                elements.outputJson.value = '';
            }
            
            // Reset validation result for validator tab
            if (currentTab === 'validator' && elements.validationResult) {
                elements.validationResult.innerHTML = '<p class="placeholder">Click "Validate JSON" to check your JSON syntax</p>';
                elements.validationResult.className = 'validation-result';
            }
            
            // Update stats
            Tool_json_validator.updateStats(currentTab);
            if (currentTab !== 'validator') {
                Tool_json_validator.updateOutputStats(currentTab);
            }
            
            // Hide status messages
            Tool_json_validator.hideStatus();
            Tool_json_validator.hideError();
        }
    },

    // Switch between tabs (now handled by SubTabs utility)
    switchTab: (tabName) => {
        if (Tool_json_validator.elements.subtabs) {
            Tool_json_validator.elements.subtabs.switchTo(tabName);
        }
    },
    
    // Handle input changes for specific tab
    handleInput: (tabName) => {
        Tool_json_validator.updateStats(tabName);
        Tool_json_validator.hideStatus();
        Tool_json_validator.hideError();
        
        // Auto-validation/beautification if preference is set
        const preferences = Storage?.getPreferences?.() || {};
        if (preferences.autoProcess) {
            clearTimeout(Tool_json_validator.autoProcessTimeout);
            Tool_json_validator.autoProcessTimeout = setTimeout(() => {
                if (tabName === 'validator') {
                    Tool_json_validator.validate(true);
                } else if (tabName === 'beautifier') {
                    Tool_json_validator.beautify(true);
                } else if (tabName === 'minifier') {
                    Tool_json_validator.minify(true);
                }
            }, 500);
        }
    },
    
    // Validate JSON
    validate: (silent = false) => {
        const input = Tool_json_validator.elements.validator.inputJson.value.trim();
        const resultEl = Tool_json_validator.elements.validator.validationResult;
        
        if (!input) {
            if (!silent) Tool_json_validator.showStatus('Please enter JSON to validate', 'info');
            return;
        }
        
        try {
            JSON.parse(input);
            resultEl.innerHTML = '<div class="success"><strong>✓ Valid JSON</strong><p>Your JSON syntax is correct!</p></div>';
            resultEl.className = 'validation-result success';
            
            if (!silent) {
                Tool_json_validator.showStatus('✓ JSON is valid', 'success');
                if (window.Toasts) {
                    Toasts.success('JSON is valid');
                }
            }
        } catch (error) {
            resultEl.innerHTML = `<div class="error"><strong>✗ Invalid JSON</strong><p>${error.message}</p></div>`;
            resultEl.className = 'validation-result error';
            
            if (!silent) {
                Tool_json_validator.showStatus('JSON validation failed', 'error');
                if (window.Toasts) {
                    Toasts.error('Invalid JSON');
                }
            }
        }
    },
    
    // Beautify JSON
    beautify: (silent = false) => {
        const input = Tool_json_validator.elements.beautifier.inputJson.value.trim();
        const indentValue = Tool_json_validator.elements.beautifier.indentSelect.value;
        
        if (!input) {
            if (!silent) Tool_json_validator.showStatus('Please enter JSON to beautify', 'info');
            return;
        }
        
        try {
            const parsed = JSON.parse(input);
            const indent = indentValue === '\\t' ? '\t' : parseInt(indentValue);
            const beautified = JSON.stringify(parsed, null, indent);
            
            Tool_json_validator.elements.beautifier.outputJson.value = beautified;
            Tool_json_validator.updateOutputStats('beautifier');
            
            if (!silent) {
                Tool_json_validator.showStatus('✓ JSON beautified successfully', 'success');
                if (window.Toasts) {
                    Toasts.success('JSON beautified');
                }
            }
        } catch (error) {
            Tool_json_validator.showError('Invalid JSON: ' + error.message);
            if (!silent && window.Toasts) {
                Toasts.error('Invalid JSON');
            }
        }
    },
    
    // Minify JSON
    minify: (silent = false) => {
        const input = Tool_json_validator.elements.minifier.inputJson.value.trim();
        
        if (!input) {
            if (!silent) Tool_json_validator.showStatus('Please enter JSON to minify', 'info');
            return;
        }
        
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            
            Tool_json_validator.elements.minifier.outputJson.value = minified;
            Tool_json_validator.updateOutputStats('minifier');
            
            if (!silent) {
                Tool_json_validator.showStatus('✓ JSON minified successfully', 'success');
                if (window.Toasts) {
                    Toasts.success('JSON minified');
                }
            }
        } catch (error) {
            Tool_json_validator.showError('Invalid JSON: ' + error.message);
            if (!silent && window.Toasts) {
                Toasts.error('Invalid JSON');
            }
        }
    },
    
    // Handle file upload
    handleFileUpload: (e, tabName) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const elements = Tool_json_validator.elements[tabName];
            elements.inputJson.value = event.target.result;
            Tool_json_validator.handleInput(tabName);
            
            if (window.Toasts) {
                Toasts.success(`File "${file.name}" loaded`);
            }
        };
        reader.readAsText(file);
        
        // Clear the file input
        e.target.value = '';
    },
    
    // Copy output to clipboard
    copyOutput: async (tabName) => {
        const elements = Tool_json_validator.elements[tabName];
        const output = elements.outputJson.value;
        
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
    downloadOutput: (tabName) => {
        const elements = Tool_json_validator.elements[tabName];
        const output = elements.outputJson.value;
        
        if (!output) {
            if (window.Toasts) {
                Toasts.warning('No output to download');
            }
            return;
        }
        
        const filename = tabName === 'beautifier' ? 'beautified.json' : 'minified.json';
        
        if (window.Download) {
            Download.downloadWithToast(filename, output, 'application/json');
        }
    },
    
    // Clear content for specific tab
    clear: (tabName) => {
        const elements = Tool_json_validator.elements[tabName];
        
        if (tabName === 'validator') {
            elements.inputJson.value = '';
            elements.validationResult.innerHTML = '<p class="placeholder">Click "Validate JSON" to check your JSON syntax</p>';
            elements.validationResult.className = 'validation-result';
        } else {
            elements.inputJson.value = '';
            elements.outputJson.value = '';
        }
        
        Tool_json_validator.hideStatus();
        Tool_json_validator.hideError();
        Tool_json_validator.updateStats(tabName);
        
        if (tabName !== 'validator') {
            Tool_json_validator.updateOutputStats(tabName);
        }
        
        if (window.Toasts) {
            Toasts.info('Content cleared');
        }
    },
    
    // Update input statistics
    updateStats: (tabName) => {
        const elements = Tool_json_validator.elements[tabName];
        const input = elements.inputJson.value;
        const chars = input.length;
        const lines = input ? input.split('\n').length : 0;
        
        elements.inputChars.textContent = chars.toLocaleString();
        elements.inputLines.textContent = lines.toLocaleString();
    },
    
    // Update output statistics
    updateOutputStats: (tabName) => {
        const elements = Tool_json_validator.elements[tabName];
        const input = elements.inputJson.value;
        const output = elements.outputJson.value;
        const outputChars = output.length;
        
        elements.outputChars.textContent = outputChars.toLocaleString();
        
        // Calculate size change
        const inputSize = new Blob([input]).size;
        const outputSize = new Blob([output]).size;
        const changePercent = inputSize > 0 ? (((outputSize - inputSize) / inputSize) * 100).toFixed(1) : 0;
        
        if (tabName === 'beautifier') {
            elements.sizeDiff.textContent = outputSize > inputSize ? `+${changePercent}%` : `${changePercent}%`;
        } else if (tabName === 'minifier') {
            elements.sizeDiff.textContent = outputSize < inputSize ? `-${Math.abs(changePercent)}%` : `+${changePercent}%`;
        }
    },
    
    // Show status message
    showStatus: (message, type = 'info') => {
        const statusEl = Tool_json_validator.elements.shared.statusDisplay;
        statusEl.textContent = message;
        statusEl.className = type;
        statusEl.style.display = 'block';
    },
    
    // Hide status message
    hideStatus: () => {
        const statusEl = Tool_json_validator.elements.shared.statusDisplay;
        statusEl.style.display = 'none';
        statusEl.className = '';
    },
    
    // Show error message
    showError: (message) => {
        const errorEl = Tool_json_validator.elements.shared.errorDisplay;
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    },
    
    // Hide error message
    hideError: () => {
        const errorEl = Tool_json_validator.elements.shared.errorDisplay;
        errorEl.classList.add('hidden');
    },
    
    // Load saved state
    loadState: () => {
        if (!Storage) return;
        
        const state = Storage.getToolState('json-validator');
        
        // Load content for each tab
        if (state.validator_input) {
            Tool_json_validator.elements.validator.inputJson.value = state.validator_input;
            Tool_json_validator.updateStats('validator');
        }
        
        if (state.beautifier_input) {
            Tool_json_validator.elements.beautifier.inputJson.value = state.beautifier_input;
            Tool_json_validator.updateStats('beautifier');
        }
        
        if (state.minifier_input) {
            Tool_json_validator.elements.minifier.inputJson.value = state.minifier_input;
            Tool_json_validator.updateStats('minifier');
        }
        
        // Load active tab
        if (state.activeTab && Tool_json_validator.elements.subtabs) {
            Tool_json_validator.elements.subtabs.switchTo(state.activeTab);
        }
    },
    
    // Save current state
    saveState: () => {
        if (!Storage) return;
        
        const state = {
            activeTab: Tool_json_validator.state.activeTab,
            validator_input: Tool_json_validator.elements.validator?.inputJson?.value || '',
            beautifier_input: Tool_json_validator.elements.beautifier?.inputJson?.value || '',
            minifier_input: Tool_json_validator.elements.minifier?.inputJson?.value || ''
        };
        
        Storage.setToolState('json-validator', state);
    }
};

// Make tool available globally
window.Tool_json_validator = Tool_json_validator;
