// Diff Viewer Tool - Main Module
// Text and JSON diff comparison with side-by-side visualization

const Tool_diff_viewer = {
    // Tool metadata
    metadata: {
        id: 'diff-viewer',
        name: 'Diff Viewer',
        icon: '🔍'
    },
    
    // Embedded HTML template to avoid CORS issues
    template: `<!-- Diff Viewer Tool Tabs -->
<div class="diff-viewer-tabs">
    <div class="tab-nav">
        <button class="tab-btn active" data-tab="text">Text Diff</button>
        <button class="tab-btn" data-tab="json">JSON Diff</button>
        <button class="tab-btn" data-tab="file">File Diff</button>
    </div>
    
    <!-- Text Diff Tab -->
    <div class="tab-content active" id="text-tab">
        <!-- Controls Panel -->
        <div class="controls-panel">
            <div class="control-buttons">
                <button id="compare-text-btn" class="primary">🔍 Compare</button>
                <button id="swap-text-btn">🔄 Swap</button>
                <button id="clear-text-btn">🗑️ Clear</button>
            </div>
            
            <div class="control-options">
                <label class="checkbox-label">
                    <input type="checkbox" id="ignore-whitespace" />
                    Ignore Whitespace
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="ignore-case" />
                    Ignore Case
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="show-line-numbers" checked />
                    Line Numbers
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="word-diff" />
                    Word Diff
                </label>
            </div>
        </div>
        
        <!-- Statistics Panel -->
        <div class="statistics-panel" id="text-stats">
            <div class="stat-item">
                <span class="stat-label">Added:</span>
                <span class="stat-value added" id="text-added">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Removed:</span>
                <span class="stat-value removed" id="text-removed">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Modified:</span>
                <span class="stat-value modified" id="text-modified">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Similarity:</span>
                <span class="stat-value" id="text-similarity">0%</span>
            </div>
        </div>
        
        <!-- Input Panels -->
        <div class="input-panels">
            <div class="input-panel">
                <div class="panel-header">
                    <h3>Original Text</h3>
                    <div class="panel-actions">
                        <button id="paste-original-btn" class="small-btn" title="Paste from clipboard">📋</button>
                        <button id="upload-original-btn" class="small-btn" title="Upload file">📁</button>
                    </div>
                </div>
                <textarea 
                    id="original-text" 
                    class="diff-textarea" 
                    placeholder="Enter original text here..."
                    spellcheck="false"
                ></textarea>
                <div class="input-stats">
                    <span>Lines: <span id="original-lines">0</span></span>
                    <span>Chars: <span id="original-chars">0</span></span>
                </div>
            </div>
            
            <div class="input-panel">
                <div class="panel-header">
                    <h3>Modified Text</h3>
                    <div class="panel-actions">
                        <button id="paste-modified-btn" class="small-btn" title="Paste from clipboard">📋</button>
                        <button id="upload-modified-btn" class="small-btn" title="Upload file">📁</button>
                    </div>
                </div>
                <textarea 
                    id="modified-text" 
                    class="diff-textarea" 
                    placeholder="Enter modified text here..."
                    spellcheck="false"
                ></textarea>
                <div class="input-stats">
                    <span>Lines: <span id="modified-lines">0</span></span>
                    <span>Chars: <span id="modified-chars">0</span></span>
                </div>
            </div>
        </div>
        
        <!-- Diff Output -->
        <div class="diff-output-section" id="text-diff-output" style="display: none;">
            <div class="output-header">
                <h3>Diff Result</h3>
                <div class="output-actions">
                    <button id="copy-diff-btn">📋 Copy</button>
                    <button id="download-diff-btn">💾 Download</button>
                    <button id="color-settings-btn">🎨 Colors</button>
                </div>
            </div>
            
            <div class="diff-output-container">
                <div class="diff-pane">
                    <div class="pane-header">Original</div>
                    <div class="diff-content" id="diff-left"></div>
                </div>
                
                <div class="diff-pane">
                    <div class="pane-header">Modified</div>
                    <div class="diff-content" id="diff-right"></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- JSON Diff Tab -->
    <div class="tab-content" id="json-tab">
        <!-- Controls Panel -->
        <div class="controls-panel">
            <div class="control-buttons">
                <button id="compare-json-btn" class="primary">🔍 Compare JSON</button>
                <button id="beautify-json-btn">✨ Beautify</button>
                <button id="clear-json-btn">🗑️ Clear</button>
            </div>
            
            <div class="control-options">
                <label class="checkbox-label">
                    <input type="checkbox" id="show-unchanged" />
                    Show Unchanged
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="collapse-unchanged" checked />
                    Collapse Unchanged
                </label>
            </div>
        </div>
        
        <!-- Statistics Panel -->
        <div class="statistics-panel" id="json-stats">
            <div class="stat-item">
                <span class="stat-label">Added:</span>
                <span class="stat-value added" id="json-added">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Removed:</span>
                <span class="stat-value removed" id="json-removed">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Modified:</span>
                <span class="stat-value modified" id="json-modified">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Unchanged:</span>
                <span class="stat-value" id="json-unchanged">0</span>
            </div>
        </div>
        
        <!-- JSON Input Panels -->
        <div class="input-panels">
            <div class="input-panel">
                <div class="panel-header">
                    <h3>Original JSON</h3>
                    <div class="panel-actions">
                        <button id="paste-original-json-btn" class="small-btn">📋</button>
                        <button id="upload-original-json-btn" class="small-btn">📁</button>
                    </div>
                </div>
                <textarea 
                    id="original-json" 
                    class="diff-textarea json-textarea" 
                    placeholder='Enter original JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 25\n}'
                    spellcheck="false"
                ></textarea>
                <div class="input-stats">
                    <span id="original-json-status">Ready</span>
                </div>
            </div>
            
            <div class="input-panel">
                <div class="panel-header">
                    <h3>Modified JSON</h3>
                    <div class="panel-actions">
                        <button id="paste-modified-json-btn" class="small-btn">📋</button>
                        <button id="upload-modified-json-btn" class="small-btn">📁</button>
                    </div>
                </div>
                <textarea 
                    id="modified-json" 
                    class="diff-textarea json-textarea" 
                    placeholder='Enter modified JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 26\n}'
                    spellcheck="false"
                ></textarea>
                <div class="input-stats">
                    <span id="modified-json-status">Ready</span>
                </div>
            </div>
        </div>
        
        <!-- JSON Diff Output -->
        <div class="json-diff-output" id="json-diff-output" style="display: none;">
            <div class="output-header">
                <h3>Structured Diff</h3>
                <div class="output-actions">
                    <button id="copy-json-diff-btn">📋 Copy</button>
                    <button id="download-json-diff-btn">💾 Download</button>
                    <button id="expand-all-btn">📂 Expand All</button>
                    <button id="collapse-all-btn">📁 Collapse All</button>
                </div>
            </div>
            
            <div class="json-diff-tree" id="json-diff-tree"></div>
        </div>
    </div>
    
    <!-- File Diff Tab -->
    <div class="tab-content" id="file-tab">
        <!-- Controls Panel -->
        <div class="controls-panel">
            <div class="control-buttons">
                <button id="compare-files-btn" class="primary">🔍 Compare Files</button>
                <button id="swap-files-btn">🔄 Swap Files</button>
                <button id="clear-files-btn">🗑️ Clear</button>
            </div>
        </div>
        
        <!-- File Upload Areas -->
        <div class="file-upload-section">
            <div class="file-drop-zone" id="original-file-drop">
                <div class="drop-zone-content">
                    <span class="drop-icon">📄</span>
                    <h4>Original File</h4>
                    <p>Drop file here or click to browse</p>
                    <input type="file" id="original-file-input" class="file-input" accept=".txt,.json,.csv,.md,.xml,.html,.css,.js,.log" />
                    <button class="browse-btn">Browse Files</button>
                    <p class="file-info" id="original-file-info">No file selected</p>
                </div>
            </div>
            
            <div class="file-drop-zone" id="modified-file-drop">
                <div class="drop-zone-content">
                    <span class="drop-icon">📄</span>
                    <h4>Modified File</h4>
                    <p>Drop file here or click to browse</p>
                    <input type="file" id="modified-file-input" class="file-input" accept=".txt,.json,.csv,.md,.xml,.html,.css,.js,.log" />
                    <button class="browse-btn">Browse Files</button>
                    <p class="file-info" id="modified-file-info">No file selected</p>
                </div>
            </div>
        </div>
        
        <!-- File Diff Output -->
        <div class="diff-output-section" id="file-diff-output" style="display: none;">
            <div class="output-header">
                <h3>File Diff Result</h3>
                <div class="output-actions">
                    <button id="copy-file-diff-btn">📋 Copy</button>
                    <button id="download-file-diff-btn">💾 Download</button>
                </div>
            </div>
            
            <div class="statistics-panel">
                <div class="stat-item">
                    <span class="stat-label">Added:</span>
                    <span class="stat-value added" id="file-added">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Removed:</span>
                    <span class="stat-value removed" id="file-removed">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Similarity:</span>
                    <span class="stat-value" id="file-similarity">0%</span>
                </div>
            </div>
            
            <div class="diff-output-container">
                <div class="diff-pane">
                    <div class="pane-header">Original File</div>
                    <div class="diff-content" id="file-diff-left"></div>
                </div>
                
                <div class="diff-pane">
                    <div class="pane-header">Modified File</div>
                    <div class="diff-content" id="file-diff-right"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Color Settings Modal -->
<div id="color-modal" class="modal" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3>🎨 Diff Color Settings</h3>
            <button id="close-color-modal" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
            <div class="color-setting">
                <label>Added Lines:</label>
                <input type="color" id="color-added" value="#d4edda" />
                <span class="color-preview" id="preview-added"></span>
            </div>
            
            <div class="color-setting">
                <label>Removed Lines:</label>
                <input type="color" id="color-removed" value="#f8d7da" />
                <span class="color-preview" id="preview-removed"></span>
            </div>
            
            <div class="color-setting">
                <label>Modified Lines:</label>
                <input type="color" id="color-modified" value="#fff3cd" />
                <span class="color-preview" id="preview-modified"></span>
            </div>
            
            <div class="color-setting">
                <label>Unchanged Lines:</label>
                <input type="color" id="color-unchanged" value="#ffffff" />
                <span class="color-preview" id="preview-unchanged"></span>
            </div>
        </div>
        
        <div class="modal-footer">
            <button id="reset-colors-btn" class="secondary">Reset to Default</button>
            <button id="apply-colors-btn" class="primary">Apply Colors</button>
        </div>
    </div>
</div>

<!-- Status Display -->
<div id="status-display"></div>
<div id="error-display" class="error-display hidden"></div>`,
    
    // DOM elements
    elements: {
        tabs: {},
        textDiff: {},
        jsonDiff: {},
        fileDiff: {},
        shared: {}
    },
    
    // Tool state
    state: {
        activeTab: 'text',
        diffService: null,
        currentDiff: null,
        colors: {
            added: '#d4edda',
            removed: '#f8d7da',
            modified: '#fff3cd',
            unchanged: '#ffffff'
        },
        files: {
            original: null,
            modified: null
        }
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            console.log('Starting to mount Diff Viewer tool...');
            
            // Load diff engine library first
            await Tool_diff_viewer.loadDiffEngine();
            
            // Set HTML content
            container.innerHTML = Tool_diff_viewer.template;
            container.className = 'diff-viewer-tool';
            
            // Load CSS
            await Tool_diff_viewer.loadCSS();
            
            // Wait for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Initialize diff service
            Tool_diff_viewer.state.diffService = new window.DiffEngine.DiffViewerService();
            
            // Get DOM elements
            Tool_diff_viewer.getElements(container);
            
            // Bind events
            Tool_diff_viewer.bindEvents();
            
            // Load saved colors
            Tool_diff_viewer.loadColors();
            
            // Initialize tool
            Tool_diff_viewer.initializeTool();
            
            console.log('Diff Viewer tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount Diff Viewer tool:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading Diff Viewer Tool</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        Tool_diff_viewer.elements = {
            tabs: {},
            textDiff: {},
            jsonDiff: {},
            fileDiff: {},
            shared: {}
        };
        
        console.log('Diff Viewer tool unmounted');
    },
    
    // Load diff engine library
    loadDiffEngine: async () => {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.DiffEngine) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = '../tools/diff-viewer/lib/diff-engine.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load diff engine'));
            document.head.appendChild(script);
        });
    },
    
    // Load CSS dynamically
    loadCSS: async () => {
        const cssId = 'diff-viewer-css';
        if (!document.querySelector(`#${cssId}`)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = '../tools/diff-viewer/tool.css';
            document.head.appendChild(link);
            
            return new Promise((resolve) => {
                link.onload = () => resolve();
                link.onerror = () => resolve();
            });
        }
        return Promise.resolve();
    },
    
    // Get DOM elements
    getElements: (container) => {
        // Tab navigation
        Tool_diff_viewer.elements.tabs = {
            nav: Array.from(DOM.qsa('.tab-btn', container) || []),
            contents: {
                text: DOM.qs('#text-tab', container),
                json: DOM.qs('#json-tab', container),
                file: DOM.qs('#file-tab', container)
            }
        };
        
        // Text diff elements
        Tool_diff_viewer.elements.textDiff = {
            compareBtn: DOM.qs('#compare-text-btn', container),
            swapBtn: DOM.qs('#swap-text-btn', container),
            clearBtn: DOM.qs('#clear-text-btn', container),
            ignoreWhitespace: DOM.qs('#ignore-whitespace', container),
            ignoreCase: DOM.qs('#ignore-case', container),
            showLineNumbers: DOM.qs('#show-line-numbers', container),
            wordDiff: DOM.qs('#word-diff', container),
            originalText: DOM.qs('#original-text', container),
            modifiedText: DOM.qs('#modified-text', container),
            pasteOriginalBtn: DOM.qs('#paste-original-btn', container),
            pasteModifiedBtn: DOM.qs('#paste-modified-btn', container),
            uploadOriginalBtn: DOM.qs('#upload-original-btn', container),
            uploadModifiedBtn: DOM.qs('#upload-modified-btn', container),
            originalLines: DOM.qs('#original-lines', container),
            originalChars: DOM.qs('#original-chars', container),
            modifiedLines: DOM.qs('#modified-lines', container),
            modifiedChars: DOM.qs('#modified-chars', container),
            textAdded: DOM.qs('#text-added', container),
            textRemoved: DOM.qs('#text-removed', container),
            textModified: DOM.qs('#text-modified', container),
            textSimilarity: DOM.qs('#text-similarity', container),
            diffOutput: DOM.qs('#text-diff-output', container),
            diffLeft: DOM.qs('#diff-left', container),
            diffRight: DOM.qs('#diff-right', container),
            copyDiffBtn: DOM.qs('#copy-diff-btn', container),
            downloadDiffBtn: DOM.qs('#download-diff-btn', container),
            colorSettingsBtn: DOM.qs('#color-settings-btn', container)
        };
        
        // JSON diff elements
        Tool_diff_viewer.elements.jsonDiff = {
            compareBtn: DOM.qs('#compare-json-btn', container),
            beautifyBtn: DOM.qs('#beautify-json-btn', container),
            clearBtn: DOM.qs('#clear-json-btn', container),
            showUnchanged: DOM.qs('#show-unchanged', container),
            collapseUnchanged: DOM.qs('#collapse-unchanged', container),
            originalJson: DOM.qs('#original-json', container),
            modifiedJson: DOM.qs('#modified-json', container),
            pasteOriginalBtn: DOM.qs('#paste-original-json-btn', container),
            pasteModifiedBtn: DOM.qs('#paste-modified-json-btn', container),
            uploadOriginalBtn: DOM.qs('#upload-original-json-btn', container),
            uploadModifiedBtn: DOM.qs('#upload-modified-json-btn', container),
            originalStatus: DOM.qs('#original-json-status', container),
            modifiedStatus: DOM.qs('#modified-json-status', container),
            jsonAdded: DOM.qs('#json-added', container),
            jsonRemoved: DOM.qs('#json-removed', container),
            jsonModified: DOM.qs('#json-modified', container),
            jsonUnchanged: DOM.qs('#json-unchanged', container),
            diffOutput: DOM.qs('#json-diff-output', container),
            diffTree: DOM.qs('#json-diff-tree', container),
            copyBtn: DOM.qs('#copy-json-diff-btn', container),
            downloadBtn: DOM.qs('#download-json-diff-btn', container),
            expandAllBtn: DOM.qs('#expand-all-btn', container),
            collapseAllBtn: DOM.qs('#collapse-all-btn', container)
        };
        
        // File diff elements
        Tool_diff_viewer.elements.fileDiff = {
            compareBtn: DOM.qs('#compare-files-btn', container),
            swapBtn: DOM.qs('#swap-files-btn', container),
            clearBtn: DOM.qs('#clear-files-btn', container),
            originalDropZone: DOM.qs('#original-file-drop', container),
            modifiedDropZone: DOM.qs('#modified-file-drop', container),
            originalFileInput: DOM.qs('#original-file-input', container),
            modifiedFileInput: DOM.qs('#modified-file-input', container),
            originalFileInfo: DOM.qs('#original-file-info', container),
            modifiedFileInfo: DOM.qs('#modified-file-info', container),
            fileAdded: DOM.qs('#file-added', container),
            fileRemoved: DOM.qs('#file-removed', container),
            fileSimilarity: DOM.qs('#file-similarity', container),
            diffOutput: DOM.qs('#file-diff-output', container),
            diffLeft: DOM.qs('#file-diff-left', container),
            diffRight: DOM.qs('#file-diff-right', container),
            copyBtn: DOM.qs('#copy-file-diff-btn', container),
            downloadBtn: DOM.qs('#download-file-diff-btn', container)
        };
        
        // Shared elements
        Tool_diff_viewer.elements.shared = {
            colorModal: DOM.qs('#color-modal', container),
            closeColorModal: DOM.qs('#close-color-modal', container),
            colorAdded: DOM.qs('#color-added', container),
            colorRemoved: DOM.qs('#color-removed', container),
            colorModified: DOM.qs('#color-modified', container),
            colorUnchanged: DOM.qs('#color-unchanged', container),
            resetColorsBtn: DOM.qs('#reset-colors-btn', container),
            applyColorsBtn: DOM.qs('#apply-colors-btn', container),
            statusDisplay: DOM.qs('#status-display', container),
            errorDisplay: DOM.qs('#error-display', container)
        };
    },
    
    // Bind event listeners
    bindEvents: () => {
        Tool_diff_viewer.bindTabEvents();
        Tool_diff_viewer.bindTextDiffEvents();
        Tool_diff_viewer.bindJsonDiffEvents();
        Tool_diff_viewer.bindFileDiffEvents();
        Tool_diff_viewer.bindColorModalEvents();
    },
    
    // Bind tab events
    bindTabEvents: () => {
        Tool_diff_viewer.elements.tabs.nav.forEach(btn => {
            if (btn) {
                DOM.on(btn, 'click', (e) => {
                    const tabName = e.target.getAttribute('data-tab');
                    if (tabName) {
                        Tool_diff_viewer.switchTab(tabName);
                    }
                });
            }
        });
    },
    
    // Switch tabs
    switchTab: (tabName) => {
        // Update buttons
        Tool_diff_viewer.elements.tabs.nav.forEach(btn => {
            btn?.classList.remove('active');
        });
        
        const activeBtn = Tool_diff_viewer.elements.tabs.nav.find(btn => 
            btn?.getAttribute('data-tab') === tabName
        );
        activeBtn?.classList.add('active');
        
        // Update content
        Object.entries(Tool_diff_viewer.elements.tabs.contents).forEach(([tab, content]) => {
            content?.classList.toggle('active', tab === tabName);
        });
        
        Tool_diff_viewer.state.activeTab = tabName;
    },
    
    // Bind text diff events
    bindTextDiffEvents: () => {
        const textDiff = Tool_diff_viewer.elements.textDiff;
        
        if (textDiff.compareBtn) DOM.on(textDiff.compareBtn, 'click', Tool_diff_viewer.compareText);
        if (textDiff.swapBtn) DOM.on(textDiff.swapBtn, 'click', Tool_diff_viewer.swapText);
        if (textDiff.clearBtn) DOM.on(textDiff.clearBtn, 'click', Tool_diff_viewer.clearText);
        
        if (textDiff.originalText) DOM.on(textDiff.originalText, 'input', Tool_diff_viewer.updateTextStats);
        if (textDiff.modifiedText) DOM.on(textDiff.modifiedText, 'input', Tool_diff_viewer.updateTextStats);
        
        if (textDiff.pasteOriginalBtn) DOM.on(textDiff.pasteOriginalBtn, 'click', () => Tool_diff_viewer.pasteFromClipboard('original'));
        if (textDiff.pasteModifiedBtn) DOM.on(textDiff.pasteModifiedBtn, 'click', () => Tool_diff_viewer.pasteFromClipboard('modified'));
        
        if (textDiff.uploadOriginalBtn) DOM.on(textDiff.uploadOriginalBtn, 'click', () => Tool_diff_viewer.uploadTextFile('original'));
        if (textDiff.uploadModifiedBtn) DOM.on(textDiff.uploadModifiedBtn, 'click', () => Tool_diff_viewer.uploadTextFile('modified'));
        
        if (textDiff.copyDiffBtn) DOM.on(textDiff.copyDiffBtn, 'click', Tool_diff_viewer.copyTextDiff);
        if (textDiff.downloadDiffBtn) DOM.on(textDiff.downloadDiffBtn, 'click', Tool_diff_viewer.downloadTextDiff);
        if (textDiff.colorSettingsBtn) DOM.on(textDiff.colorSettingsBtn, 'click', Tool_diff_viewer.openColorModal);
    },
    
    // Bind JSON diff events
    bindJsonDiffEvents: () => {
        const jsonDiff = Tool_diff_viewer.elements.jsonDiff;
        
        if (jsonDiff.compareBtn) DOM.on(jsonDiff.compareBtn, 'click', Tool_diff_viewer.compareJson);
        if (jsonDiff.beautifyBtn) DOM.on(jsonDiff.beautifyBtn, 'click', Tool_diff_viewer.beautifyJson);
        if (jsonDiff.clearBtn) DOM.on(jsonDiff.clearBtn, 'click', Tool_diff_viewer.clearJson);
        
        if (jsonDiff.originalJson) DOM.on(jsonDiff.originalJson, 'input', () => Tool_diff_viewer.validateJson('original'));
        if (jsonDiff.modifiedJson) DOM.on(jsonDiff.modifiedJson, 'input', () => Tool_diff_viewer.validateJson('modified'));
        
        if (jsonDiff.pasteOriginalBtn) DOM.on(jsonDiff.pasteOriginalBtn, 'click', () => Tool_diff_viewer.pasteJsonFromClipboard('original'));
        if (jsonDiff.pasteModifiedBtn) DOM.on(jsonDiff.pasteModifiedBtn, 'click', () => Tool_diff_viewer.pasteJsonFromClipboard('modified'));
        
        if (jsonDiff.copyBtn) DOM.on(jsonDiff.copyBtn, 'click', Tool_diff_viewer.copyJsonDiff);
        if (jsonDiff.downloadBtn) DOM.on(jsonDiff.downloadBtn, 'click', Tool_diff_viewer.downloadJsonDiff);
        if (jsonDiff.expandAllBtn) DOM.on(jsonDiff.expandAllBtn, 'click', Tool_diff_viewer.expandAllJson);
        if (jsonDiff.collapseAllBtn) DOM.on(jsonDiff.collapseAllBtn, 'click', Tool_diff_viewer.collapseAllJson);
    },
    
    // Bind file diff events
    bindFileDiffEvents: () => {
        const fileDiff = Tool_diff_viewer.elements.fileDiff;
        
        if (fileDiff.compareBtn) DOM.on(fileDiff.compareBtn, 'click', Tool_diff_viewer.compareFiles);
        if (fileDiff.swapBtn) DOM.on(fileDiff.swapBtn, 'click', Tool_diff_viewer.swapFiles);
        if (fileDiff.clearBtn) DOM.on(fileDiff.clearBtn, 'click', Tool_diff_viewer.clearFiles);
        
        if (fileDiff.originalFileInput) DOM.on(fileDiff.originalFileInput, 'change', (e) => Tool_diff_viewer.handleFileSelect(e, 'original'));
        if (fileDiff.modifiedFileInput) DOM.on(fileDiff.modifiedFileInput, 'change', (e) => Tool_diff_viewer.handleFileSelect(e, 'modified'));
        
        // Setup drag and drop
        Tool_diff_viewer.setupFileDragDrop();
        
        // Browse button handlers
        const originalBrowseBtn = fileDiff.originalDropZone?.querySelector('.browse-btn');
        const modifiedBrowseBtn = fileDiff.modifiedDropZone?.querySelector('.browse-btn');
        
        if (originalBrowseBtn) DOM.on(originalBrowseBtn, 'click', () => fileDiff.originalFileInput?.click());
        if (modifiedBrowseBtn) DOM.on(modifiedBrowseBtn, 'click', () => fileDiff.modifiedFileInput?.click());
        
        if (fileDiff.copyBtn) DOM.on(fileDiff.copyBtn, 'click', Tool_diff_viewer.copyFileDiff);
        if (fileDiff.downloadBtn) DOM.on(fileDiff.downloadBtn, 'click', Tool_diff_viewer.downloadFileDiff);
    },
    
    // Bind color modal events
    bindColorModalEvents: () => {
        const shared = Tool_diff_viewer.elements.shared;
        
        if (shared.closeColorModal) DOM.on(shared.closeColorModal, 'click', Tool_diff_viewer.closeColorModal);
        if (shared.resetColorsBtn) DOM.on(shared.resetColorsBtn, 'click', Tool_diff_viewer.resetColors);
        if (shared.applyColorsBtn) DOM.on(shared.applyColorsBtn, 'click', Tool_diff_viewer.applyColors);
        
        // Close modal when clicking outside
        if (shared.colorModal) {
            DOM.on(shared.colorModal, 'click', (e) => {
                if (e.target === shared.colorModal) {
                    Tool_diff_viewer.closeColorModal();
                }
            });
        }
    },
    
    // Initialize tool
    initializeTool: () => {
        Tool_diff_viewer.updateTextStats();
        Tool_diff_viewer.switchTab('text');
    },
    
    // Update text stats
    updateTextStats: () => {
        const textDiff = Tool_diff_viewer.elements.textDiff;
        
        const originalText = textDiff.originalText?.value || '';
        const modifiedText = textDiff.modifiedText?.value || '';
        
        const originalLines = originalText.split('\n').length;
        const modifiedLines = modifiedText.split('\n').length;
        
        if (textDiff.originalLines) textDiff.originalLines.textContent = originalLines;
        if (textDiff.originalChars) textDiff.originalChars.textContent = originalText.length;
        if (textDiff.modifiedLines) textDiff.modifiedLines.textContent = modifiedLines;
        if (textDiff.modifiedChars) textDiff.modifiedChars.textContent = modifiedText.length;
    },
    
    // Compare text
    compareText: () => {
        const textDiff = Tool_diff_viewer.elements.textDiff;
        
        const originalText = textDiff.originalText?.value || '';
        const modifiedText = textDiff.modifiedText?.value || '';
        
        if (!originalText && !modifiedText) {
            Tool_diff_viewer.showError('Please enter text to compare');
            return;
        }
        
        try {
            const options = {
                ignoreWhitespace: textDiff.ignoreWhitespace?.checked || false,
                ignoreCase: textDiff.ignoreCase?.checked || false,
                wordDiff: textDiff.wordDiff?.checked || false,
                showLineNumbers: textDiff.showLineNumbers?.checked || false
            };
            
            const result = Tool_diff_viewer.state.diffService.compareText(originalText, modifiedText, options);
            Tool_diff_viewer.state.currentDiff = result;
            
            // Update statistics
            Tool_diff_viewer.updateTextStatistics(result.statistics);
            
            // Render diff
            Tool_diff_viewer.renderTextDiff(result.formatted, options);
            
            // Show output
            textDiff.diffOutput.style.display = 'block';
            
            if (window.Toasts) {
                Toasts.success('Diff comparison completed');
            }
            
        } catch (error) {
            Tool_diff_viewer.showError('Error comparing text: ' + error.message);
        }
    },
    
    // Update text statistics
    updateTextStatistics: (stats) => {
        const textDiff = Tool_diff_viewer.elements.textDiff;
        
        if (textDiff.textAdded) textDiff.textAdded.textContent = stats.linesAdded;
        if (textDiff.textRemoved) textDiff.textRemoved.textContent = stats.linesRemoved;
        if (textDiff.textModified) textDiff.textModified.textContent = stats.linesModified;
        if (textDiff.textSimilarity) textDiff.textSimilarity.textContent = stats.similarity + '%';
    },
    
    // Render text diff (side-by-side)
    renderTextDiff: (formatted, options) => {
        const textDiff = Tool_diff_viewer.elements.textDiff;
        const { leftLines, rightLines } = formatted;
        
        // Clear previous content
        textDiff.diffLeft.innerHTML = '';
        textDiff.diffRight.innerHTML = '';
        
        const showLineNumbers = options.showLineNumbers;
        
        // Render left (original) pane
        leftLines.forEach(line => {
            const lineDiv = Tool_diff_viewer.createDiffLine(line, showLineNumbers, 'left');
            textDiff.diffLeft.appendChild(lineDiv);
        });
        
        // Render right (modified) pane
        rightLines.forEach(line => {
            const lineDiv = Tool_diff_viewer.createDiffLine(line, showLineNumbers, 'right');
            textDiff.diffRight.appendChild(lineDiv);
        });
    },
    
    // Create diff line element
    createDiffLine: (line, showLineNumbers, side) => {
        const lineDiv = DOM.el('div', { className: 'diff-line' });
        
        // Add type class
        if (line.type) {
            lineDiv.classList.add(`diff-${line.type}`);
        }
        
        // Apply custom colors
        const colors = Tool_diff_viewer.state.colors;
        if (line.type === 'delete') {
            lineDiv.style.backgroundColor = colors.removed;
        } else if (line.type === 'insert') {
            lineDiv.style.backgroundColor = colors.added;
        } else if (line.type === 'equal') {
            lineDiv.style.backgroundColor = colors.unchanged;
        }
        
        // Line number
        if (showLineNumbers) {
            const lineNum = DOM.el('span', { className: 'line-number' });
            const num = side === 'left' ? line.leftNum : line.rightNum;
            lineNum.textContent = num !== null ? num : '';
            lineDiv.appendChild(lineNum);
        }
        
        // Line content
        const contentSpan = DOM.el('span', { className: 'line-content' });
        contentSpan.textContent = line.content || '';
        lineDiv.appendChild(contentSpan);
        
        return lineDiv;
    },
    
    // Swap text
    swapText: () => {
        const textDiff = Tool_diff_viewer.elements.textDiff;
        
        const temp = textDiff.originalText.value;
        textDiff.originalText.value = textDiff.modifiedText.value;
        textDiff.modifiedText.value = temp;
        
        Tool_diff_viewer.updateTextStats();
        
        if (window.Toasts) {
            Toasts.info('Texts swapped');
        }
    },
    
    // Clear text
    clearText: () => {
        const textDiff = Tool_diff_viewer.elements.textDiff;
        
        textDiff.originalText.value = '';
        textDiff.modifiedText.value = '';
        textDiff.diffOutput.style.display = 'none';
        
        Tool_diff_viewer.updateTextStats();
        
        if (window.Toasts) {
            Toasts.info('Text cleared');
        }
    },
    
    // Paste from clipboard
    pasteFromClipboard: async (target) => {
        try {
            const text = await navigator.clipboard.readText();
            const textDiff = Tool_diff_viewer.elements.textDiff;
            
            if (target === 'original') {
                textDiff.originalText.value = text;
            } else {
                textDiff.modifiedText.value = text;
            }
            
            Tool_diff_viewer.updateTextStats();
            
            if (window.Toasts) {
                Toasts.success('Text pasted from clipboard');
            }
        } catch (error) {
            Tool_diff_viewer.showError('Failed to read clipboard: ' + error.message);
        }
    },
    
    // Upload text file
    uploadTextFile: (target) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.log,.md';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const text = await file.text();
                    const textDiff = Tool_diff_viewer.elements.textDiff;
                    
                    if (target === 'original') {
                        textDiff.originalText.value = text;
                    } else {
                        textDiff.modifiedText.value = text;
                    }
                    
                    Tool_diff_viewer.updateTextStats();
                    
                    if (window.Toasts) {
                        Toasts.success(`File "${file.name}" loaded`);
                    }
                } catch (error) {
                    Tool_diff_viewer.showError('Error reading file: ' + error.message);
                }
            }
        };
        
        input.click();
    },
    
    // Copy text diff
    copyTextDiff: async () => {
        const result = Tool_diff_viewer.state.currentDiff;
        if (!result) return;
        
        let diffText = 'DIFF COMPARISON\n';
        diffText += '='.repeat(50) + '\n\n';
        diffText += `Lines Added: ${result.statistics.linesAdded}\n`;
        diffText += `Lines Removed: ${result.statistics.linesRemoved}\n`;
        diffText += `Similarity: ${result.statistics.similarity}%\n\n`;
        diffText += '='.repeat(50) + '\n\n';
        
        result.raw.changes.forEach(change => {
            let prefix = ' ';
            if (change.type === 'delete') prefix = '-';
            if (change.type === 'insert') prefix = '+';
            
            diffText += `${prefix} ${change.content}\n`;
        });
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(diffText, 'Diff copied to clipboard');
        }
    },
    
    // Download text diff
    downloadTextDiff: () => {
        const result = Tool_diff_viewer.state.currentDiff;
        if (!result) return;
        
        let diffText = 'DIFF COMPARISON\n';
        diffText += '='.repeat(50) + '\n\n';
        diffText += `Lines Added: ${result.statistics.linesAdded}\n`;
        diffText += `Lines Removed: ${result.statistics.linesRemoved}\n`;
        diffText += `Similarity: ${result.statistics.similarity}%\n\n`;
        diffText += '='.repeat(50) + '\n\n';
        
        result.raw.changes.forEach(change => {
            let prefix = ' ';
            if (change.type === 'delete') prefix = '-';
            if (change.type === 'insert') prefix = '+';
            
            diffText += `${prefix} ${change.content}\n`;
        });
        
        if (window.Download) {
            Download.downloadWithToast('diff-result.txt', diffText, 'text/plain');
        }
    },
    
    // Compare JSON
    compareJson: () => {
        const jsonDiff = Tool_diff_viewer.elements.jsonDiff;
        
        const originalJson = jsonDiff.originalJson?.value || '';
        const modifiedJson = jsonDiff.modifiedJson?.value || '';
        
        if (!originalJson && !modifiedJson) {
            Tool_diff_viewer.showError('Please enter JSON to compare');
            return;
        }
        
        try {
            const result = Tool_diff_viewer.state.diffService.compareJson(originalJson, modifiedJson);
            Tool_diff_viewer.state.currentDiff = result;
            
            // Update statistics
            if (jsonDiff.jsonAdded) jsonDiff.jsonAdded.textContent = result.statistics.added;
            if (jsonDiff.jsonRemoved) jsonDiff.jsonRemoved.textContent = result.statistics.removed;
            if (jsonDiff.jsonModified) jsonDiff.jsonModified.textContent = result.statistics.modified;
            if (jsonDiff.jsonUnchanged) jsonDiff.jsonUnchanged.textContent = result.statistics.unchanged;
            
            // Render JSON diff tree
            Tool_diff_viewer.renderJsonDiff(result);
            
            // Show output
            jsonDiff.diffOutput.style.display = 'block';
            
            if (window.Toasts) {
                Toasts.success('JSON comparison completed');
            }
            
        } catch (error) {
            Tool_diff_viewer.showError('Error comparing JSON: ' + error.message);
        }
    },
    
    // Render JSON diff
    renderJsonDiff: (result) => {
        const jsonDiff = Tool_diff_viewer.elements.jsonDiff;
        const showUnchanged = jsonDiff.showUnchanged?.checked || false;
        
        jsonDiff.diffTree.innerHTML = '';
        
        const tree = DOM.el('div', { className: 'json-tree' });
        
        result.changes.forEach(change => {
            // Skip unchanged if option is set
            if (change.type === 'unchanged' && !showUnchanged) {
                return;
            }
            
            const item = Tool_diff_viewer.createJsonDiffItem(change);
            tree.appendChild(item);
        });
        
        jsonDiff.diffTree.appendChild(tree);
    },
    
    // Create JSON diff item
    createJsonDiffItem: (change) => {
        const item = DOM.el('div', { className: 'json-diff-item' });
        item.classList.add(`diff-${change.type}`);
        
        const colors = Tool_diff_viewer.state.colors;
        if (change.type === 'added') {
            item.style.backgroundColor = colors.added;
        } else if (change.type === 'removed') {
            item.style.backgroundColor = colors.removed;
        } else if (change.type === 'modified') {
            item.style.backgroundColor = colors.modified;
        }
        
        // Icon
        const icon = DOM.el('span', { className: 'diff-icon' });
        if (change.type === 'added') icon.textContent = '➕';
        else if (change.type === 'removed') icon.textContent = '➖';
        else if (change.type === 'modified') icon.textContent = '⚠️';
        else icon.textContent = '✓';
        item.appendChild(icon);
        
        // Path
        const path = DOM.el('span', { className: 'json-path' });
        path.textContent = change.path;
        item.appendChild(path);
        
        // Value change
        if (change.type === 'modified') {
            const valueChange = DOM.el('span', { className: 'json-value-change' });
            valueChange.textContent = `: ${JSON.stringify(change.oldValue)} → ${JSON.stringify(change.value)}`;
            item.appendChild(valueChange);
        } else if (change.type === 'added') {
            const value = DOM.el('span', { className: 'json-value' });
            value.textContent = `: ${JSON.stringify(change.value)}`;
            item.appendChild(value);
        } else if (change.type === 'removed') {
            const value = DOM.el('span', { className: 'json-value' });
            value.textContent = `: ${JSON.stringify(change.oldValue)}`;
            item.appendChild(value);
        }
        
        return item;
    },
    
    // Beautify JSON
    beautifyJson: () => {
        const jsonDiff = Tool_diff_viewer.elements.jsonDiff;
        
        try {
            const originalJson = jsonDiff.originalJson?.value;
            const modifiedJson = jsonDiff.modifiedJson?.value;
            
            if (originalJson) {
                const parsed = JSON.parse(originalJson);
                jsonDiff.originalJson.value = JSON.stringify(parsed, null, 2);
            }
            
            if (modifiedJson) {
                const parsed = JSON.parse(modifiedJson);
                jsonDiff.modifiedJson.value = JSON.stringify(parsed, null, 2);
            }
            
            if (window.Toasts) {
                Toasts.success('JSON beautified');
            }
        } catch (error) {
            Tool_diff_viewer.showError('Error beautifying JSON: ' + error.message);
        }
    },
    
    // Clear JSON
    clearJson: () => {
        const jsonDiff = Tool_diff_viewer.elements.jsonDiff;
        
        jsonDiff.originalJson.value = '';
        jsonDiff.modifiedJson.value = '';
        jsonDiff.diffOutput.style.display = 'none';
        
        if (window.Toasts) {
            Toasts.info('JSON cleared');
        }
    },
    
    // Validate JSON
    validateJson: (target) => {
        const jsonDiff = Tool_diff_viewer.elements.jsonDiff;
        const textarea = target === 'original' ? jsonDiff.originalJson : jsonDiff.modifiedJson;
        const status = target === 'original' ? jsonDiff.originalStatus : jsonDiff.modifiedStatus;
        
        const value = textarea?.value;
        if (!value) {
            status.textContent = 'Ready';
            status.className = '';
            return;
        }
        
        try {
            JSON.parse(value);
            status.textContent = '✓ Valid JSON';
            status.className = 'status-success';
        } catch (error) {
            status.textContent = '✗ Invalid JSON';
            status.className = 'status-error';
        }
    },
    
    // Paste JSON from clipboard
    pasteJsonFromClipboard: async (target) => {
        try {
            const text = await navigator.clipboard.readText();
            const jsonDiff = Tool_diff_viewer.elements.jsonDiff;
            
            if (target === 'original') {
                jsonDiff.originalJson.value = text;
            } else {
                jsonDiff.modifiedJson.value = text;
            }
            
            Tool_diff_viewer.validateJson(target);
            
            if (window.Toasts) {
                Toasts.success('JSON pasted from clipboard');
            }
        } catch (error) {
            Tool_diff_viewer.showError('Failed to read clipboard: ' + error.message);
        }
    },
    
    // Copy JSON diff
    copyJsonDiff: async () => {
        const result = Tool_diff_viewer.state.currentDiff;
        if (!result || !result.changes) return;
        
        let diffText = 'JSON DIFF COMPARISON\n';
        diffText += '='.repeat(50) + '\n\n';
        diffText += `Added Properties: ${result.statistics.added}\n`;
        diffText += `Removed Properties: ${result.statistics.removed}\n`;
        diffText += `Modified Properties: ${result.statistics.modified}\n\n`;
        diffText += '='.repeat(50) + '\n\n';
        
        result.changes.forEach(change => {
            diffText += `${change.type.toUpperCase()}: ${change.path}\n`;
            if (change.type === 'modified') {
                diffText += `  Old: ${JSON.stringify(change.oldValue)}\n`;
                diffText += `  New: ${JSON.stringify(change.value)}\n`;
            } else if (change.type === 'added') {
                diffText += `  Value: ${JSON.stringify(change.value)}\n`;
            } else if (change.type === 'removed') {
                diffText += `  Value: ${JSON.stringify(change.oldValue)}\n`;
            }
            diffText += '\n';
        });
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(diffText, 'JSON diff copied to clipboard');
        }
    },
    
    // Download JSON diff
    downloadJsonDiff: () => {
        const result = Tool_diff_viewer.state.currentDiff;
        if (!result || !result.changes) return;
        
        let diffText = 'JSON DIFF COMPARISON\n';
        diffText += '='.repeat(50) + '\n\n';
        diffText += `Added Properties: ${result.statistics.added}\n`;
        diffText += `Removed Properties: ${result.statistics.removed}\n`;
        diffText += `Modified Properties: ${result.statistics.modified}\n\n`;
        diffText += '='.repeat(50) + '\n\n';
        
        result.changes.forEach(change => {
            diffText += `${change.type.toUpperCase()}: ${change.path}\n`;
            if (change.type === 'modified') {
                diffText += `  Old: ${JSON.stringify(change.oldValue)}\n`;
                diffText += `  New: ${JSON.stringify(change.value)}\n`;
            } else if (change.type === 'added') {
                diffText += `  Value: ${JSON.stringify(change.value)}\n`;
            } else if (change.type === 'removed') {
                diffText += `  Value: ${JSON.stringify(change.oldValue)}\n`;
            }
            diffText += '\n';
        });
        
        if (window.Download) {
            Download.downloadWithToast('json-diff-result.txt', diffText, 'text/plain');
        }
    },
    
    // Expand/collapse all JSON items
    expandAllJson: () => {
        // Placeholder for expand functionality
        if (window.Toasts) {
            Toasts.info('Expand all functionality');
        }
    },
    
    collapseAllJson: () => {
        // Placeholder for collapse functionality
        if (window.Toasts) {
            Toasts.info('Collapse all functionality');
        }
    },
    
    // File diff methods
    setupFileDragDrop: () => {
        const fileDiff = Tool_diff_viewer.elements.fileDiff;
        
        // Original file drop zone
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileDiff.originalDropZone?.addEventListener(eventName, preventDefaults, false);
            fileDiff.modifiedDropZone?.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            fileDiff.originalDropZone?.addEventListener(eventName, () => {
                fileDiff.originalDropZone.classList.add('drag-over');
            });
            fileDiff.modifiedDropZone?.addEventListener(eventName, () => {
                fileDiff.modifiedDropZone.classList.add('drag-over');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            fileDiff.originalDropZone?.addEventListener(eventName, () => {
                fileDiff.originalDropZone.classList.remove('drag-over');
            });
            fileDiff.modifiedDropZone?.addEventListener(eventName, () => {
                fileDiff.modifiedDropZone.classList.remove('drag-over');
            });
        });
        
        fileDiff.originalDropZone?.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                Tool_diff_viewer.handleFileSelect({ target: { files: [files[0]] } }, 'original');
            }
        });
        
        fileDiff.modifiedDropZone?.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                Tool_diff_viewer.handleFileSelect({ target: { files: [files[0]] } }, 'modified');
            }
        });
    },
    
    // Handle file select
    handleFileSelect: async (e, target) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            
            if (target === 'original') {
                Tool_diff_viewer.state.files.original = { name: file.name, content: text };
                Tool_diff_viewer.elements.fileDiff.originalFileInfo.textContent = `${file.name} (${Tool_diff_viewer.formatFileSize(file.size)})`;
            } else {
                Tool_diff_viewer.state.files.modified = { name: file.name, content: text };
                Tool_diff_viewer.elements.fileDiff.modifiedFileInfo.textContent = `${file.name} (${Tool_diff_viewer.formatFileSize(file.size)})`;
            }
            
            if (window.Toasts) {
                Toasts.success(`File "${file.name}" loaded`);
            }
        } catch (error) {
            Tool_diff_viewer.showError('Error reading file: ' + error.message);
        }
    },
    
    // Format file size
    formatFileSize: (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    },
    
    // Compare files
    compareFiles: () => {
        const files = Tool_diff_viewer.state.files;
        
        if (!files.original || !files.modified) {
            Tool_diff_viewer.showError('Please select both files to compare');
            return;
        }
        
        try {
            const result = Tool_diff_viewer.state.diffService.compareText(
                files.original.content,
                files.modified.content,
                { showLineNumbers: true }
            );
            
            Tool_diff_viewer.state.currentDiff = result;
            
            // Update statistics
            const fileDiff = Tool_diff_viewer.elements.fileDiff;
            if (fileDiff.fileAdded) fileDiff.fileAdded.textContent = result.statistics.linesAdded;
            if (fileDiff.fileRemoved) fileDiff.fileRemoved.textContent = result.statistics.linesRemoved;
            if (fileDiff.fileSimilarity) fileDiff.fileSimilarity.textContent = result.statistics.similarity + '%';
            
            // Render diff
            Tool_diff_viewer.renderFileDiff(result.formatted);
            
            // Show output
            fileDiff.diffOutput.style.display = 'block';
            
            if (window.Toasts) {
                Toasts.success('File comparison completed');
            }
            
        } catch (error) {
            Tool_diff_viewer.showError('Error comparing files: ' + error.message);
        }
    },
    
    // Render file diff
    renderFileDiff: (formatted) => {
        const fileDiff = Tool_diff_viewer.elements.fileDiff;
        const { leftLines, rightLines } = formatted;
        
        fileDiff.diffLeft.innerHTML = '';
        fileDiff.diffRight.innerHTML = '';
        
        leftLines.forEach(line => {
            const lineDiv = Tool_diff_viewer.createDiffLine(line, true, 'left');
            fileDiff.diffLeft.appendChild(lineDiv);
        });
        
        rightLines.forEach(line => {
            const lineDiv = Tool_diff_viewer.createDiffLine(line, true, 'right');
            fileDiff.diffRight.appendChild(lineDiv);
        });
    },
    
    // Swap files
    swapFiles: () => {
        const files = Tool_diff_viewer.state.files;
        const temp = files.original;
        files.original = files.modified;
        files.modified = temp;
        
        const fileDiff = Tool_diff_viewer.elements.fileDiff;
        const tempInfo = fileDiff.originalFileInfo.textContent;
        fileDiff.originalFileInfo.textContent = fileDiff.modifiedFileInfo.textContent;
        fileDiff.modifiedFileInfo.textContent = tempInfo;
        
        if (window.Toasts) {
            Toasts.info('Files swapped');
        }
    },
    
    // Clear files
    clearFiles: () => {
        Tool_diff_viewer.state.files.original = null;
        Tool_diff_viewer.state.files.modified = null;
        
        const fileDiff = Tool_diff_viewer.elements.fileDiff;
        fileDiff.originalFileInfo.textContent = 'No file selected';
        fileDiff.modifiedFileInfo.textContent = 'No file selected';
        fileDiff.originalFileInput.value = '';
        fileDiff.modifiedFileInput.value = '';
        fileDiff.diffOutput.style.display = 'none';
        
        if (window.Toasts) {
            Toasts.info('Files cleared');
        }
    },
    
    // Copy file diff
    copyFileDiff: () => {
        Tool_diff_viewer.copyTextDiff();
    },
    
    // Download file diff
    downloadFileDiff: () => {
        Tool_diff_viewer.downloadTextDiff();
    },
    
    // Color modal methods
    openColorModal: () => {
        Tool_diff_viewer.elements.shared.colorModal.style.display = 'flex';
    },
    
    closeColorModal: () => {
        Tool_diff_viewer.elements.shared.colorModal.style.display = 'none';
    },
    
    resetColors: () => {
        const defaults = {
            added: '#d4edda',
            removed: '#f8d7da',
            modified: '#fff3cd',
            unchanged: '#ffffff'
        };
        
        Tool_diff_viewer.state.colors = { ...defaults };
        
        const shared = Tool_diff_viewer.elements.shared;
        shared.colorAdded.value = defaults.added;
        shared.colorRemoved.value = defaults.removed;
        shared.colorModified.value = defaults.modified;
        shared.colorUnchanged.value = defaults.unchanged;
        
        Tool_diff_viewer.saveColors();
        
        if (window.Toasts) {
            Toasts.success('Colors reset to default');
        }
    },
    
    applyColors: () => {
        const shared = Tool_diff_viewer.elements.shared;
        
        Tool_diff_viewer.state.colors = {
            added: shared.colorAdded.value,
            removed: shared.colorRemoved.value,
            modified: shared.colorModified.value,
            unchanged: shared.colorUnchanged.value
        };
        
        Tool_diff_viewer.saveColors();
        Tool_diff_viewer.closeColorModal();
        
        if (window.Toasts) {
            Toasts.success('Colors applied successfully');
        }
    },
    
    // Save colors to localStorage
    saveColors: () => {
        if (window.Storage) {
            Storage.set('diff-viewer-colors', Tool_diff_viewer.state.colors);
        }
    },
    
    // Load colors from localStorage
    loadColors: () => {
        if (window.Storage) {
            const saved = Storage.get('diff-viewer-colors');
            if (saved) {
                try {
                    Tool_diff_viewer.state.colors = saved;
                    
                    const shared = Tool_diff_viewer.elements.shared;
                    shared.colorAdded.value = Tool_diff_viewer.state.colors.added;
                    shared.colorRemoved.value = Tool_diff_viewer.state.colors.removed;
                    shared.colorModified.value = Tool_diff_viewer.state.colors.modified;
                    shared.colorUnchanged.value = Tool_diff_viewer.state.colors.unchanged;
                } catch (error) {
                    console.error('Error loading saved colors:', error);
                }
            }
        }
    },
    
    // Show error
    showError: (message) => {
        if (window.Toasts) {
            Toasts.error(message);
        }
        console.error(message);
    }
};

// Make tool available globally
window.Tool_diff_viewer = Tool_diff_viewer;
