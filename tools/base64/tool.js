// Base64 Encoder/Decoder Tool with Tabbed Interface
const Tool_base64 = {
    // Tool metadata
    metadata: {
        id: 'base64',
        name: 'Base64 Encode/Decode',
        icon: '🔐'
    },
    
    // HTML template embedded to avoid CORS issues
    template: `<!-- Base64 Tool Tabs -->
<div class="base64-tabs">
    <div class="tab-nav">
        <button class="tab-btn active" data-tab="encoder">Text Encoder</button>
        <button class="tab-btn" data-tab="decoder">Text Decoder</button>
        <button class="tab-btn" data-tab="file-encoder">File Encoder</button>
    </div>
    
    <!-- Text Encoder Tab -->
    <div class="tab-content active" id="encoder-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Input Text</h3>
                
                <div class="tool-controls">
                    <button id="encode-btn" class="primary">Encode to Base64</button>
                    
                    <div class="encoding-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="url-safe-encode" />
                            URL Safe
                        </label>
                    </div>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-text-file" accept=".txt" />
                        <label for="upload-text-file" class="file-upload-label">
                            📁 Upload Text File
                        </label>
                    </div>
                </div>
                
                <div class="input-area">
                    <textarea 
                        id="input-text" 
                        class="tool-textarea" 
                        placeholder="Enter text to encode to Base64..."
                        spellcheck="false"
                    ></textarea>
                    
                    <div class="drop-zone" id="text-drop-zone">
                        <div class="drop-zone-content">
                            <span class="drop-icon">📄</span>
                            <p>Drop text file here</p>
                            <span class="drop-hint">Supports .txt files</span>
                        </div>
                    </div>
                </div>
                
                <div class="tool-status">
                    <span>Characters: <span id="input-text-chars">0</span></span>
                    <span>Lines: <span id="input-text-lines">0</span></span>
                    <span>Bytes: <span id="input-text-bytes">0</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Base64 Output</h3>
                
                <div class="tool-actions">
                    <button id="copy-btn-encode">📋 Copy</button>
                    <button id="download-btn-encode">💾 Download</button>
                    <button id="clear-btn-encode">🗑️ Clear</button>
                </div>
                
                <div class="output-area">
                    <textarea 
                        id="output-base64" 
                        class="tool-textarea" 
                        placeholder="Base64 encoded text will appear here..."
                        readonly
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-status">
                    <span>Characters: <span id="output-base64-chars">0</span></span>
                    <span>Size: <span id="base64-size-change">-</span></span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Text Decoder Tab -->
    <div class="tab-content" id="decoder-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Base64 Input</h3>
                
                <div class="tool-controls">
                    <button id="decode-btn" class="primary">Decode from Base64</button>
                    
                    <div class="decoding-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="url-safe-decode" />
                            URL Safe
                        </label>
                    </div>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-base64-file" accept=".txt,.b64" />
                        <label for="upload-base64-file" class="file-upload-label">
                            📁 Upload Base64 File
                        </label>
                    </div>
                </div>
                
                <div class="input-area">
                    <textarea 
                        id="input-base64" 
                        class="tool-textarea" 
                        placeholder="Paste Base64 encoded text here to decode..."
                        spellcheck="false"
                    ></textarea>
                    
                    <div class="drop-zone" id="base64-drop-zone">
                        <div class="drop-zone-content">
                            <span class="drop-icon">🔐</span>
                            <p>Drop Base64 file here</p>
                            <span class="drop-hint">Supports .txt, .b64 files</span>
                        </div>
                    </div>
                </div>
                
                <div class="tool-status">
                    <span>Characters: <span id="input-base64-chars">0</span></span>
                    <span>Valid: <span id="base64-valid">Unknown</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Decoded Text</h3>
                
                <div class="tool-actions">
                    <button id="copy-btn-decode">📋 Copy</button>
                    <button id="download-btn-decode">💾 Download</button>
                    <button id="clear-btn-decode">🗑️ Clear</button>
                </div>
                
                <div class="output-area">
                    <textarea 
                        id="output-text" 
                        class="tool-textarea" 
                        placeholder="Decoded text will appear here..."
                        readonly
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-status">
                    <span>Characters: <span id="output-text-chars">0</span></span>
                    <span>Lines: <span id="output-text-lines">0</span></span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- File Encoder Tab -->
    <div class="tab-content" id="file-encoder-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>File Input</h3>
                
                <div class="tool-controls">
                    <button id="encode-file-btn" class="primary">Encode File to Base64</button>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-binary-file" />
                        <label for="upload-binary-file" class="file-upload-label">
                            📁 Select File
                        </label>
                    </div>
                </div>
                
                <div class="input-area">
                    <div class="binary-output" id="file-info-display">
                        <div class="binary-info">
                            <span class="binary-icon">📄</span>
                            <div class="binary-details">
                                <p><strong>No file selected</strong></p>
                                <p>Choose a file to encode to Base64</p>
                                <p class="drop-hint">Drag and drop files here or click "Select File"</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="drop-zone" id="file-drop-zone">
                        <div class="drop-zone-content">
                            <span class="drop-icon">📁</span>
                            <p>Drop file here</p>
                            <span class="drop-hint">Any file type supported</span>
                        </div>
                    </div>
                </div>
                
                <div class="tool-status">
                    <span>File: <span id="file-name">None</span></span>
                    <span>Size: <span id="file-size">0 bytes</span></span>
                    <span>Type: <span id="file-type">-</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Base64 File Output</h3>
                
                <div class="tool-actions">
                    <button id="copy-btn-file">📋 Copy</button>
                    <button id="download-btn-file">💾 Download</button>
                    <button id="clear-btn-file">🗑️ Clear</button>
                </div>
                
                <div class="output-area">
                    <textarea 
                        id="output-file-base64" 
                        class="tool-textarea" 
                        placeholder="Base64 encoded file will appear here..."
                        readonly
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-status">
                    <span>Characters: <span id="output-file-chars">0</span></span>
                    <span>Size Change: <span id="file-size-change">-</span></span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Progress Indicator -->
<div id="progress-indicator" class="progress-indicator hidden">
    <div class="progress-bar">
        <div class="progress-fill" id="progress-fill"></div>
    </div>
    <div class="progress-text" id="progress-text">Processing...</div>
</div>

<!-- Status and Error Display -->
<div id="status-display"></div>
<div id="error-display" class="error-display hidden"></div>`,
    
    // DOM elements for each tab
    elements: {
        tabs: {},
        encoder: {},
        decoder: {},
        fileEncoder: {},
        shared: {}
    },
    
    // Tool state
    state: {
        activeTab: 'encoder',
        selectedFile: null,
        isProcessing: false
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            console.log('Starting to mount Base64 tool...');
            
            // Use embedded HTML template
            const htmlContent = Tool_base64.template;
            console.log('HTML template loaded from embedded source');
            
            // Set the HTML content directly to the container
            container.innerHTML = htmlContent;
            container.className = 'base64-encoder-decoder';
            
            // Load CSS
            await Tool_base64.loadCSS();
            console.log('CSS loaded successfully');
            
            console.log('HTML mounted to container');
            
            // Wait a moment for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Get DOM elements
            Tool_base64.getElements(container);
            console.log('DOM elements retrieved');
            
            // Bind events
            Tool_base64.bindEvents();
            console.log('Events bound successfully');
            
            // Load saved state
            Tool_base64.loadState();
            
            // Initialize stats for all tabs
            Tool_base64.updateStats('encoder');
            Tool_base64.updateStats('decoder');
            Tool_base64.updateStats('fileEncoder');
            
            console.log('Base64 tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount Base64 tool:', error);
            console.error('Error stack:', error.stack);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading Base64 Tool</h3>
                    <p>${error.message}</p>
                    <pre style="margin-top: 1rem; font-size: 0.8rem; text-align: left;">${error.stack || 'No stack trace available'}</pre>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        // Save current state
        Tool_base64.saveState();
        
        // Clean up event listeners
        Tool_base64.elements = {
            tabs: {},
            encoder: {},
            decoder: {},
            fileEncoder: {},
            shared: {}
        };
        
        console.log('Base64 tool unmounted');
    },
    
    // Load CSS dynamically
    loadCSS: async () => {
        const cssId = 'base64-css';
        if (!DOM.qs(`#${cssId}`)) {
            const link = DOM.el('link', {
                id: cssId,
                rel: 'stylesheet',
                href: './tools/base64/tool.css'
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
            Tool_base64.elements.tabs = {
                nav: DOM.qsa('.tab-btn', container) || [],
                contents: {
                    encoder: DOM.qs('#encoder-tab', container),
                    decoder: DOM.qs('#decoder-tab', container),
                    fileEncoder: DOM.qs('#file-encoder-tab', container)
                }
            };
            
            // Encoder tab elements
            Tool_base64.elements.encoder = {
                inputText: DOM.qs('#input-text', container),
                outputBase64: DOM.qs('#output-base64', container),
                encodeBtn: DOM.qs('#encode-btn', container),
                urlSafeEncode: DOM.qs('#url-safe-encode', container),
                uploadTextFile: DOM.qs('#upload-text-file', container),
                copyBtnEncode: DOM.qs('#copy-btn-encode', container),
                downloadBtnEncode: DOM.qs('#download-btn-encode', container),
                clearBtnEncode: DOM.qs('#clear-btn-encode', container),
                inputTextChars: DOM.qs('#input-text-chars', container),
                inputTextLines: DOM.qs('#input-text-lines', container),
                inputTextBytes: DOM.qs('#input-text-bytes', container),
                outputBase64Chars: DOM.qs('#output-base64-chars', container),
                base64SizeChange: DOM.qs('#base64-size-change', container),
                textDropZone: DOM.qs('#text-drop-zone', container)
            };
            
            // Decoder tab elements
            Tool_base64.elements.decoder = {
                inputBase64: DOM.qs('#input-base64', container),
                outputText: DOM.qs('#output-text', container),
                decodeBtn: DOM.qs('#decode-btn', container),
                urlSafeDecode: DOM.qs('#url-safe-decode', container),
                uploadBase64File: DOM.qs('#upload-base64-file', container),
                copyBtnDecode: DOM.qs('#copy-btn-decode', container),
                downloadBtnDecode: DOM.qs('#download-btn-decode', container),
                clearBtnDecode: DOM.qs('#clear-btn-decode', container),
                inputBase64Chars: DOM.qs('#input-base64-chars', container),
                base64Valid: DOM.qs('#base64-valid', container),
                outputTextChars: DOM.qs('#output-text-chars', container),
                outputTextLines: DOM.qs('#output-text-lines', container),
                base64DropZone: DOM.qs('#base64-drop-zone', container)
            };
            
            // File encoder tab elements
            Tool_base64.elements.fileEncoder = {
                uploadBinaryFile: DOM.qs('#upload-binary-file', container),
                outputFileBase64: DOM.qs('#output-file-base64', container),
                encodeFileBtn: DOM.qs('#encode-file-btn', container),
                copyBtnFile: DOM.qs('#copy-btn-file', container),
                downloadBtnFile: DOM.qs('#download-btn-file', container),
                clearBtnFile: DOM.qs('#clear-btn-file', container),
                fileInfoDisplay: DOM.qs('#file-info-display', container),
                fileName: DOM.qs('#file-name', container),
                fileSize: DOM.qs('#file-size', container),
                fileType: DOM.qs('#file-type', container),
                outputFileChars: DOM.qs('#output-file-chars', container),
                fileSizeChange: DOM.qs('#file-size-change', container),
                fileDropZone: DOM.qs('#file-drop-zone', container)
            };
            
            // Shared elements
            Tool_base64.elements.shared = {
                statusDisplay: DOM.qs('#status-display', container),
                errorDisplay: DOM.qs('#error-display', container),
                progressIndicator: DOM.qs('#progress-indicator', container),
                progressFill: DOM.qs('#progress-fill', container),
                progressText: DOM.qs('#progress-text', container)
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
            if (window.SubTabs && Tool_base64.elements.tabs && Tool_base64.elements.tabs.nav) {
                // First validate the tab structure
                if (SubTabs.validateTabStructure(Tool_base64.elements)) {
                    // Bind tab events with correct container
                    const container = document.querySelector('.base64-encoder-decoder');
                    if (container) {
                        SubTabs.bindTabEvents(
                            container,
                            Tool_base64.elements,
                            Tool_base64.switchTab
                        );
                        
                        // Set initial tab
                        SubTabs.setInitialTab(
                            container,
                            'encoder',
                            Tool_base64.elements,
                            Tool_base64.switchTab
                        );
                    } else {
                        console.warn('Base64 container not found, using fallback tab switching');
                        Tool_base64.bindTabEventsFallback();
                    }
                } else {
                    console.warn('Base64 tab structure invalid, using fallback');
                    Tool_base64.bindTabEventsFallback();
                }
            } else {
                Tool_base64.bindTabEventsFallback();
            }
            
            // Encoder tab events
            const encoder = Tool_base64.elements.encoder;
            if (encoder.inputText) {
                DOM.on(encoder.inputText, 'input', () => Tool_base64.handleInput('encoder'));
                DOM.on(encoder.inputText, 'paste', () => {
                    setTimeout(() => Tool_base64.handleInput('encoder'), 10);
                });
            }
            if (encoder.encodeBtn) DOM.on(encoder.encodeBtn, 'click', Tool_base64.encodeText);
            if (encoder.uploadTextFile) DOM.on(encoder.uploadTextFile, 'change', (e) => Tool_base64.handleFileUpload(e, 'text'));
            if (encoder.copyBtnEncode) DOM.on(encoder.copyBtnEncode, 'click', () => Tool_base64.copyOutput('encoder'));
            if (encoder.downloadBtnEncode) DOM.on(encoder.downloadBtnEncode, 'click', () => Tool_base64.downloadOutput('encoder'));
            if (encoder.clearBtnEncode) DOM.on(encoder.clearBtnEncode, 'click', () => Tool_base64.clear('encoder'));
            
            // Decoder tab events
            const decoder = Tool_base64.elements.decoder;
            if (decoder.inputBase64) {
                DOM.on(decoder.inputBase64, 'input', () => Tool_base64.handleInput('decoder'));
                DOM.on(decoder.inputBase64, 'paste', () => {
                    setTimeout(() => Tool_base64.handleInput('decoder'), 10);
                });
            }
            if (decoder.decodeBtn) DOM.on(decoder.decodeBtn, 'click', Tool_base64.decodeText);
            if (decoder.uploadBase64File) DOM.on(decoder.uploadBase64File, 'change', (e) => Tool_base64.handleFileUpload(e, 'base64'));
            if (decoder.copyBtnDecode) DOM.on(decoder.copyBtnDecode, 'click', () => Tool_base64.copyOutput('decoder'));
            if (decoder.downloadBtnDecode) DOM.on(decoder.downloadBtnDecode, 'click', () => Tool_base64.downloadOutput('decoder'));
            if (decoder.clearBtnDecode) DOM.on(decoder.clearBtnDecode, 'click', () => Tool_base64.clear('decoder'));
            
            // File encoder tab events
            const fileEncoder = Tool_base64.elements.fileEncoder;
            if (fileEncoder.uploadBinaryFile) DOM.on(fileEncoder.uploadBinaryFile, 'change', (e) => Tool_base64.handleFileUpload(e, 'file'));
            if (fileEncoder.encodeFileBtn) DOM.on(fileEncoder.encodeFileBtn, 'click', Tool_base64.encodeFile);
            if (fileEncoder.copyBtnFile) DOM.on(fileEncoder.copyBtnFile, 'click', () => Tool_base64.copyOutput('fileEncoder'));
            if (fileEncoder.downloadBtnFile) DOM.on(fileEncoder.downloadBtnFile, 'click', () => Tool_base64.downloadOutput('fileEncoder'));
            if (fileEncoder.clearBtnFile) DOM.on(fileEncoder.clearBtnFile, 'click', () => Tool_base64.clear('fileEncoder'));
            
            // Drag and drop for text files
            Tool_base64.setupDragAndDrop(encoder.textDropZone, 'text');
            Tool_base64.setupDragAndDrop(decoder.base64DropZone, 'base64');
            Tool_base64.setupDragAndDrop(fileEncoder.fileDropZone, 'file');
            
            console.log('Event listeners bound successfully');
        } catch (error) {
            console.error('Error binding events:', error);
            // Try fallback method
            Tool_base64.bindTabEventsFallback();
        }
    },

    // Fallback method for binding tab events
    bindTabEventsFallback: () => {
        try {
            console.log('Using fallback tab event binding for Base64 tool');
            
            // Manual tab event binding
            Tool_base64.elements.tabs.nav.forEach(btn => {
                if (btn) {
                    DOM.on(btn, 'click', (e) => {
                        e.preventDefault();
                        const tabName = e.target.getAttribute('data-tab');
                        if (tabName) {
                            Tool_base64.switchTab(tabName);
                        }
                    });
                }
            });
            
            // Set initial active tab
            Tool_base64.switchTab('encoder');
            
            console.log('Fallback tab events bound successfully');
        } catch (error) {
            console.error('Error in fallback tab binding:', error);
        }
    },
    
    // Clear all inputs for the current tab
    clearAllInputs: () => {
        const currentTab = Tool_base64.state.activeTab;
        let elements = null;
        
        // Get the elements for the current tab
        if (currentTab === 'encoder') {
            elements = Tool_base64.elements.encoder;
        } else if (currentTab === 'decoder') {
            elements = Tool_base64.elements.decoder;
        } else if (currentTab === 'fileEncoder') {
            elements = Tool_base64.elements.fileEncoder;
        }
        
        if (elements) {
            // Clear input areas
            if (currentTab === 'encoder') {
                if (elements.inputText) {
                    elements.inputText.value = '';
                }
                if (elements.outputBase64) {
                    elements.outputBase64.value = '';
                }
            } else if (currentTab === 'decoder') {
                if (elements.inputBase64) {
                    elements.inputBase64.value = '';
                }
                if (elements.outputText) {
                    elements.outputText.value = '';
                }
                // Reset validation indicator
                if (elements.base64Valid) {
                    elements.base64Valid.textContent = 'Unknown';
                    elements.base64Valid.className = '';
                }
            } else if (currentTab === 'fileEncoder') {
                if (elements.outputFileBase64) {
                    elements.outputFileBase64.value = '';
                }
                // Clear selected file
                Tool_base64.state.selectedFile = null;
                Tool_base64.updateFileInfo();
            }
            
            // Update stats for the current tab
            Tool_base64.updateStats(currentTab);
            if (currentTab !== 'fileEncoder') {
                Tool_base64.updateOutputStats(currentTab);
            }
            
            // Hide status messages
            Tool_base64.hideStatus();
        }
    },

    // Switch between tabs using SubTabs utility
    switchTab: (tabName) => {
        console.log(`Base64: Switching to tab '${tabName}'`);
        
        // Clear inputs from the current tab before switching
        Tool_base64.clearAllInputs();
        
        // Map the data-tab attribute values to internal tab names
        let internalTabName = tabName;
        if (tabName === 'file-encoder') {
            internalTabName = 'fileEncoder';
        }
        
        try {
            // Manual tab switching method (more reliable)
            Tool_base64.elements.tabs.nav.forEach(btn => {
                if (btn && btn.classList) {
                    btn.classList.remove('active');
                }
            });
            
            // Find and activate the correct tab button
            const activeBtn = Tool_base64.elements.tabs.nav.find(btn => 
                btn && btn.getAttribute('data-tab') === tabName
            );
            if (activeBtn) {
                activeBtn.classList.add('active');
                console.log(`Base64: Activated tab button for '${tabName}'`);
            } else {
                console.warn(`Base64: Could not find tab button for '${tabName}'`);
            }
            
            // Update tab contents
            Object.entries(Tool_base64.elements.tabs.contents).forEach(([tab, content]) => {
                if (content && content.classList) {
                    const isActive = tab === internalTabName;
                    content.classList.toggle('active', isActive);
                    console.log(`Base64: Tab content '${tab}' active: ${isActive}`);
                }
            });
            
            // Update state
            Tool_base64.state.activeTab = internalTabName;
            
            // Clear inputs in the new tab as well
            Tool_base64.clearAllInputs();
            
            // Update stats for the active tab
            Tool_base64.updateStats(internalTabName);
            
            console.log(`Base64: Successfully switched to tab '${tabName}' (internal: '${internalTabName}')`);
            
        } catch (error) {
            console.error('Base64: Error in switchTab:', error);
        }
    },
    
    // Handle input changes for specific tab
    handleInput: (tabName) => {
        Tool_base64.updateStats(tabName);
        Tool_base64.hideStatus();
        
        // Validate Base64 input on decoder tab
        if (tabName === 'decoder') {
            Tool_base64.validateBase64Input();
        }
        
        // Auto-encode/decode if preference is set
        const preferences = Storage?.getPreferences?.() || {};
        if (preferences.autoProcess) {
            clearTimeout(Tool_base64.autoProcessTimeout);
            Tool_base64.autoProcessTimeout = setTimeout(() => {
                if (tabName === 'encoder') {
                    Tool_base64.encodeText(true);
                } else if (tabName === 'decoder') {
                    Tool_base64.decodeText(true);
                }
            }, 500);
        }
    },
    
    // Encode text to Base64
    encodeText: (silent = false) => {
        const input = Tool_base64.elements.encoder.inputText.value;
        const urlSafe = Tool_base64.elements.encoder.urlSafeEncode.checked;
        
        if (!input) {
            if (!silent) Tool_base64.showStatus('Please enter text to encode', 'info');
            return;
        }
        
        try {
            let encoded = btoa(unescape(encodeURIComponent(input)));
            
            // Apply URL-safe encoding if requested
            if (urlSafe) {
                encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
            }
            
            Tool_base64.elements.encoder.outputBase64.value = encoded;
            Tool_base64.updateOutputStats('encoder');
            
            if (!silent) {
                Tool_base64.showStatus('✓ Text encoded to Base64', 'success');
                if (window.Toasts) {
                    Toasts.success('Text encoded successfully');
                }
            }
        } catch (error) {
            Tool_base64.showStatus('Error: ' + error.message, 'error');
            if (!silent && window.Toasts) {
                Toasts.error('Encoding failed');
            }
        }
    },
    
    // Decode Base64 to text
    decodeText: (silent = false) => {
        const input = Tool_base64.elements.decoder.inputBase64.value.trim();
        const urlSafe = Tool_base64.elements.decoder.urlSafeDecode.checked;
        
        if (!input) {
            if (!silent) Tool_base64.showStatus('Please enter Base64 text to decode', 'info');
            return;
        }
        
        try {
            let toDecode = input;
            
            // Handle URL-safe encoding
            if (urlSafe) {
                toDecode = toDecode.replace(/-/g, '+').replace(/_/g, '/');
                // Add padding if needed
                while (toDecode.length % 4) {
                    toDecode += '=';
                }
            }
            
            const decoded = decodeURIComponent(escape(atob(toDecode)));
            Tool_base64.elements.decoder.outputText.value = decoded;
            Tool_base64.updateOutputStats('decoder');
            
            if (!silent) {
                Tool_base64.showStatus('✓ Base64 decoded to text', 'success');
                if (window.Toasts) {
                    Toasts.success('Text decoded successfully');
                }
            }
        } catch (error) {
            Tool_base64.showStatus('Error: Invalid Base64 - ' + error.message, 'error');
            if (!silent && window.Toasts) {
                Toasts.error('Invalid Base64 input');
            }
        }
    },
    
    // Encode file to Base64
    encodeFile: () => {
        if (!Tool_base64.state.selectedFile) {
            Tool_base64.showStatus('Please select a file to encode', 'info');
            return;
        }
        
        const file = Tool_base64.state.selectedFile;
        const reader = new FileReader();
        
        Tool_base64.showProgress('Encoding file...', 0);
        
        reader.onload = (e) => {
            try {
                const base64 = btoa(String.fromCharCode(...new Uint8Array(e.target.result)));
                Tool_base64.elements.fileEncoder.outputFileBase64.value = base64;
                Tool_base64.updateOutputStats('fileEncoder');
                
                Tool_base64.hideProgress();
                Tool_base64.showStatus('✓ File encoded to Base64', 'success');
                
                if (window.Toasts) {
                    Toasts.success('File encoded successfully');
                }
            } catch (error) {
                Tool_base64.hideProgress();
                Tool_base64.showStatus('Error: ' + error.message, 'error');
                if (window.Toasts) {
                    Toasts.error('File encoding failed');
                }
            }
        };
        
        reader.onerror = () => {
            Tool_base64.hideProgress();
            Tool_base64.showStatus('Error: Failed to read file', 'error');
            if (window.Toasts) {
                Toasts.error('Failed to read file');
            }
        };
        
        reader.readAsArrayBuffer(file);
    },
    
    // Validate Base64 input
    validateBase64Input: () => {
        const input = Tool_base64.elements.decoder.inputBase64.value.trim();
        const validElement = Tool_base64.elements.decoder.base64Valid;
        
        if (!input) {
            validElement.textContent = 'Unknown';
            validElement.className = '';
            return;
        }
        
        try {
            // Test decode
            let testInput = input;
            // Handle URL-safe
            testInput = testInput.replace(/-/g, '+').replace(/_/g, '/');
            while (testInput.length % 4) {
                testInput += '=';
            }
            
            atob(testInput);
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
            output = Tool_base64.elements.encoder.outputBase64.value;
        } else if (tabName === 'decoder') {
            output = Tool_base64.elements.decoder.outputText.value;
        } else if (tabName === 'fileEncoder') {
            output = Tool_base64.elements.fileEncoder.outputFileBase64.value;
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
    
    // Download output as file
    downloadOutput: (tabName) => {
        let output = '';
        let filename = '';
        let mimeType = 'text/plain';
        
        if (tabName === 'encoder') {
            output = Tool_base64.elements.encoder.outputBase64.value;
            filename = 'encoded.b64';
        } else if (tabName === 'decoder') {
            output = Tool_base64.elements.decoder.outputText.value;
            filename = 'decoded.txt';
        } else if (tabName === 'fileEncoder') {
            output = Tool_base64.elements.fileEncoder.outputFileBase64.value;
            filename = (Tool_base64.state.selectedFile?.name || 'file') + '.b64';
        }
        
        if (!output) {
            if (window.Toasts) {
                Toasts.warning('No output to download');
            }
            return;
        }
        
        if (window.Download) {
            Download.downloadWithToast(filename, output, mimeType);
        }
    },
    
    // Clear content for specific tab
    clear: (tabName) => {
        if (tabName === 'encoder') {
            const elements = Tool_base64.elements.encoder;
            elements.inputText.value = '';
            elements.outputBase64.value = '';
        } else if (tabName === 'decoder') {
            const elements = Tool_base64.elements.decoder;
            elements.inputBase64.value = '';
            elements.outputText.value = '';
            elements.base64Valid.textContent = 'Unknown';
            elements.base64Valid.className = '';
        } else if (tabName === 'fileEncoder') {
            const elements = Tool_base64.elements.fileEncoder;
            elements.outputFileBase64.value = '';
            Tool_base64.state.selectedFile = null;
            Tool_base64.updateFileInfo();
        }
        
        Tool_base64.hideStatus();
        Tool_base64.updateStats(tabName);
        
        if (window.Toasts) {
            Toasts.info('Content cleared');
        }
    },
    
    // Handle file upload
    handleFileUpload: (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (type === 'text') {
            const reader = new FileReader();
            reader.onload = (event) => {
                Tool_base64.elements.encoder.inputText.value = event.target.result;
                Tool_base64.handleInput('encoder');
                if (window.Toasts) {
                    Toasts.success(`File "${file.name}" loaded`);
                }
            };
            reader.readAsText(file);
        } else if (type === 'base64') {
            const reader = new FileReader();
            reader.onload = (event) => {
                Tool_base64.elements.decoder.inputBase64.value = event.target.result;
                Tool_base64.handleInput('decoder');
                if (window.Toasts) {
                    Toasts.success(`File "${file.name}" loaded`);
                }
            };
            reader.readAsText(file);
        } else if (type === 'file') {
            Tool_base64.state.selectedFile = file;
            Tool_base64.updateFileInfo();
            if (window.Toasts) {
                Toasts.success(`File "${file.name}" selected`);
            }
        }
        
        // Clear the file input
        e.target.value = '';
    },
    
    // Update file info display
    updateFileInfo: () => {
        const elements = Tool_base64.elements.fileEncoder;
        const file = Tool_base64.state.selectedFile;
        
        if (file) {
            elements.fileName.textContent = file.name;
            elements.fileSize.textContent = Tool_base64.formatFileSize(file.size);
            elements.fileType.textContent = file.type || 'Unknown';
            
            elements.fileInfoDisplay.innerHTML = `
                <div class="binary-info">
                    <span class="binary-icon">📄</span>
                    <div class="binary-details">
                        <p><strong>${file.name}</strong></p>
                        <p>Size: ${Tool_base64.formatFileSize(file.size)}</p>
                        <p>Type: ${file.type || 'Unknown'}</p>
                    </div>
                </div>
            `;
        } else {
            elements.fileName.textContent = 'None';
            elements.fileSize.textContent = '0 bytes';
            elements.fileType.textContent = '-';
            
            elements.fileInfoDisplay.innerHTML = `
                <div class="binary-info">
                    <span class="binary-icon">📄</span>
                    <div class="binary-details">
                        <p><strong>No file selected</strong></p>
                        <p>Choose a file to encode to Base64</p>
                        <p class="drop-hint">Drag and drop files here or click "Select File"</p>
                    </div>
                </div>
            `;
        }
    },
    
    // Format file size
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 bytes';
        const k = 1024;
        const sizes = ['bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Update input/output statistics
    updateStats: (tabName) => {
        if (tabName === 'encoder') {
            const elements = Tool_base64.elements.encoder;
            const input = elements.inputText.value;
            const chars = input.length;
            const lines = input ? input.split('\n').length : 0;
            const bytes = new Blob([input]).size;
            
            elements.inputTextChars.textContent = chars.toLocaleString();
            elements.inputTextLines.textContent = lines.toLocaleString();
            elements.inputTextBytes.textContent = bytes.toLocaleString();
        } else if (tabName === 'decoder') {
            const elements = Tool_base64.elements.decoder;
            const input = elements.inputBase64.value;
            const chars = input.length;
            
            elements.inputBase64Chars.textContent = chars.toLocaleString();
        }
        
        Tool_base64.updateOutputStats(tabName);
    },
    
    // Update output statistics
    updateOutputStats: (tabName) => {
        if (tabName === 'encoder') {
            const elements = Tool_base64.elements.encoder;
            const input = elements.inputText.value;
            const output = elements.outputBase64.value;
            const outputChars = output.length;
            
            elements.outputBase64Chars.textContent = outputChars.toLocaleString();
            
            // Calculate size change
            const inputSize = new Blob([input]).size;
            const outputSize = new Blob([output]).size;
            const changePercent = inputSize > 0 ? (((outputSize - inputSize) / inputSize) * 100).toFixed(1) : 0;
            
            elements.base64SizeChange.textContent = outputSize > inputSize ? 
                `+${changePercent}%` : `${changePercent}%`;
                
        } else if (tabName === 'decoder') {
            const elements = Tool_base64.elements.decoder;
            const output = elements.outputText.value;
            const chars = output.length;
            const lines = output ? output.split('\n').length : 0;
            
            elements.outputTextChars.textContent = chars.toLocaleString();
            elements.outputTextLines.textContent = lines.toLocaleString();
            
        } else if (tabName === 'fileEncoder') {
            const elements = Tool_base64.elements.fileEncoder;
            const output = elements.outputFileBase64.value;
            const outputChars = output.length;
            
            elements.outputFileChars.textContent = outputChars.toLocaleString();
            
            if (Tool_base64.state.selectedFile) {
                const inputSize = Tool_base64.state.selectedFile.size;
                const outputSize = new Blob([output]).size;
                const changePercent = inputSize > 0 ? (((outputSize - inputSize) / inputSize) * 100).toFixed(1) : 0;
                
                elements.fileSizeChange.textContent = `+${changePercent}%`;
            }
        }
    },
    
    // Setup drag and drop
    setupDragAndDrop: (dropZone, type) => {
        if (!dropZone) return;
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            DOM.on(dropZone.parentElement, eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            DOM.on(dropZone.parentElement, eventName, () => {
                dropZone.classList.add('drag-over');
                dropZone.style.display = 'flex';
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            DOM.on(dropZone.parentElement, eventName, () => {
                dropZone.classList.remove('drag-over');
                dropZone.style.display = 'none';
            });
        });
        
        DOM.on(dropZone.parentElement, 'drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                Tool_base64.handleDroppedFile(files[0], type);
            }
        });
    },
    
    // Handle dropped file
    handleDroppedFile: (file, type) => {
        if (type === 'text') {
            if (file.type.startsWith('text/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    Tool_base64.elements.encoder.inputText.value = e.target.result;
                    Tool_base64.handleInput('encoder');
                    if (window.Toasts) {
                        Toasts.success(`File "${file.name}" loaded`);
                    }
                };
                reader.readAsText(file);
            } else {
                if (window.Toasts) {
                    Toasts.error('Please drop a text file');
                }
            }
        } else if (type === 'base64') {
            const reader = new FileReader();
            reader.onload = (e) => {
                Tool_base64.elements.decoder.inputBase64.value = e.target.result;
                Tool_base64.handleInput('decoder');
                if (window.Toasts) {
                    Toasts.success(`File "${file.name}" loaded`);
                }
            };
            reader.readAsText(file);
        } else if (type === 'file') {
            Tool_base64.state.selectedFile = file;
            Tool_base64.updateFileInfo();
            if (window.Toasts) {
                Toasts.success(`File "${file.name}" selected`);
            }
        }
    },
    
    // Show progress indicator
    showProgress: (text, percent) => {
        const elements = Tool_base64.elements.shared;
        elements.progressIndicator.classList.remove('hidden');
        elements.progressText.textContent = text;
        elements.progressFill.style.width = percent + '%';
    },
    
    // Hide progress indicator
    hideProgress: () => {
        Tool_base64.elements.shared.progressIndicator.classList.add('hidden');
    },
    
    // Show status message
    showStatus: (message, type = 'info') => {
        const statusEl = Tool_base64.elements.shared.statusDisplay;
        statusEl.textContent = message;
        statusEl.className = type;
        statusEl.style.display = 'block';
    },
    
    // Hide status message
    hideStatus: () => {
        const statusEl = Tool_base64.elements.shared.statusDisplay;
        statusEl.style.display = 'none';
        statusEl.className = '';
    },
    
    // Load saved state
    loadState: () => {
        if (!Storage) return;
        
        const state = Storage.getToolState('base64');
        
        // Load content for each tab
        if (state.encoder_input) {
            Tool_base64.elements.encoder.inputText.value = state.encoder_input;
            Tool_base64.updateStats('encoder');
        }
        
        if (state.decoder_input) {
            Tool_base64.elements.decoder.inputBase64.value = state.decoder_input;
            Tool_base64.updateStats('decoder');
        }
        
        // Load active tab
        if (state.activeTab) {
            Tool_base64.switchTab(state.activeTab);
        }
    },
    
    // Save current state
    saveState: () => {
        if (!Storage) return;
        
        const state = {
            activeTab: Tool_base64.state.activeTab,
            encoder_input: Tool_base64.elements.encoder?.inputText?.value || '',
            decoder_input: Tool_base64.elements.decoder?.inputBase64?.value || ''
        };
        
        Storage.setToolState('base64', state);
    }
};

// Make tool available globally
window.Tool_base64 = Tool_base64;
