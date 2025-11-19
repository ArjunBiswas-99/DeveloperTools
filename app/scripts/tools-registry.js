// Tools registry - defines all available tools
const ToolsRegistry = {
    tools: [
        {
            id: 'json-validator',
            name: 'JSON Validator & Beautifier',
            description: 'Validate, beautify, and minify JSON with error reporting',
            icon: '📋',
            modulePath: '../tools/json-validator/tool.js',
            category: 'formatters',
            tags: ['json', 'validate', 'beautify', 'format']
        },
        {
            id: 'base64',
            name: 'Base64 Encode/Decode',
            description: 'Encode and decode Base64 strings and files',
            icon: '🔐',
            modulePath: '../tools/base64/tool.js',
            category: 'encoders',
            tags: ['base64', 'encode', 'decode']
        },
        {
            id: 'url-encoder-decoder',
            name: 'URL Encoder/Decoder',
            description: 'Percent-encode and decode URLs and query parameters',
            icon: '🔗',
            modulePath: '../tools/url-encoder-decoder/tool.js',
            category: 'encoders',
            tags: ['url', 'encode', 'decode', 'percent']
        },
        {
            id: 'uuid-generator',
            name: 'UUID Generator',
            description: 'Generate v4 (random) UUIDs with bulk generation and validation',
            icon: '🆔',
            modulePath: '../tools/uuid-generator/tool.js',
            category: 'generators',
            tags: ['uuid', 'guid', 'generate', 'random']
        },
        {
            id: 'hash-generator',
            name: 'Hash Generator',
            description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
            icon: '#️⃣',
            modulePath: '../tools/hash-generator/tool.js',
            category: 'security',
            tags: ['hash', 'md5', 'sha', 'checksum'],
            disabled: true
        },
        {
            id: 'jwt-decoder',
            name: 'JWT Decoder',
            description: 'Decode JWT tokens and view header/payload',
            icon: '🎫',
            modulePath: '../tools/jwt-decoder/tool.js',
            category: 'security',
            tags: ['jwt', 'decode', 'token', 'auth'],
            disabled: true
        },
        {
            id: 'color-utilities',
            name: 'Color Utilities',
            description: 'Convert between HEX, RGB, HSL and check contrast',
            icon: '🎨',
            modulePath: '../tools/color-utilities/tool.js',
            category: 'design',
            tags: ['color', 'hex', 'rgb', 'hsl', 'contrast'],
            disabled: true
        },
        {
            id: 'epoch-converter',
            name: 'Epoch/Time Converter',
            description: 'Convert between UNIX timestamp and human-readable dates',
            icon: '⏰',
            modulePath: '../tools/epoch-converter/tool.js',
            category: 'converters',
            tags: ['time', 'epoch', 'unix', 'timestamp', 'date'],
            disabled: true
        },
        {
            id: 'csv-json',
            name: 'CSV ↔ JSON Converter',
            description: 'Convert between CSV and JSON formats with preview',
            icon: '📊',
            modulePath: '../tools/csv-json/tool.js',
            category: 'converters',
            tags: ['csv', 'json', 'convert', 'data'],
            disabled: true
        },
        {
            id: 'diff-viewer',
            name: 'Diff Viewer',
            description: 'Compare text and JSON with side-by-side diff view',
            icon: '🔍',
            modulePath: '../tools/diff-viewer/tool.js',
            category: 'utilities',
            tags: ['diff', 'compare', 'text', 'json'],
            disabled: true
        }
    ],
    
    // Get all tools
    getAll: () => {
        return ToolsRegistry.tools;
    },
    
    // Get enabled tools only
    getEnabled: () => {
        return ToolsRegistry.tools.filter(tool => !tool.disabled);
    },
    
    // Get tool by ID
    getById: (id) => {
        return ToolsRegistry.tools.find(tool => tool.id === id);
    },
    
    // Get tools by category
    getByCategory: (category) => {
        return ToolsRegistry.tools.filter(tool => tool.category === category);
    },
    
    // Get tools by tag
    getByTag: (tag) => {
        return ToolsRegistry.tools.filter(tool => 
            tool.tags && tool.tags.includes(tag)
        );
    },
    
    // Search tools
    search: (query) => {
        const lowerQuery = query.toLowerCase();
        return ToolsRegistry.tools.filter(tool => 
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.id.toLowerCase().includes(lowerQuery) ||
            (tool.tags && tool.tags.some(tag => tag.includes(lowerQuery)))
        );
    },
    
    // Get categories
    getCategories: () => {
        const categories = [...new Set(ToolsRegistry.tools.map(tool => tool.category))];
        return categories.filter(Boolean).sort();
    },
    
    // Get all tags
    getTags: () => {
        const allTags = ToolsRegistry.tools.reduce((tags, tool) => {
            if (tool.tags) {
                tags.push(...tool.tags);
            }
            return tags;
        }, []);
        return [...new Set(allTags)].sort();
    },
    
    // Enable tool
    enableTool: (id) => {
        const tool = ToolsRegistry.getById(id);
        if (tool) {
            tool.disabled = false;
            return true;
        }
        return false;
    },
    
    // Disable tool
    disableTool: (id) => {
        const tool = ToolsRegistry.getById(id);
        if (tool) {
            tool.disabled = true;
            return true;
        }
        return false;
    },
    
    // Add new tool
    addTool: (tool) => {
        // Validate required fields
        if (!tool.id || !tool.name || !tool.modulePath) {
            console.error('Tool missing required fields: id, name, modulePath');
            return false;
        }
        
        // Check if tool already exists
        if (ToolsRegistry.getById(tool.id)) {
            console.error(`Tool with id '${tool.id}' already exists`);
            return false;
        }
        
        // Add default values
        const newTool = {
            description: '',
            icon: 'default',
            category: 'utilities',
            tags: [],
            disabled: false,
            ...tool
        };
        
        ToolsRegistry.tools.push(newTool);
        return true;
    },
    
    // Remove tool
    removeTool: (id) => {
        const index = ToolsRegistry.tools.findIndex(tool => tool.id === id);
        if (index !== -1) {
            ToolsRegistry.tools.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Update tool
    updateTool: (id, updates) => {
        const tool = ToolsRegistry.getById(id);
        if (tool) {
            Object.assign(tool, updates);
            return true;
        }
        return false;
    },
    
    // Load tool module dynamically
    loadTool: async (id) => {
        const tool = ToolsRegistry.getById(id);
        if (!tool) {
            throw new Error(`Tool '${id}' not found`);
        }
        
        if (tool.disabled) {
            throw new Error(`Tool '${id}' is disabled`);
        }
        
        try {
            // For ES modules, we would use dynamic import
            // For now, we'll assume tools are loaded as scripts
            const modulePath = tool.modulePath;
            
            // Check if tool module is already loaded
            const toolNamespace = `Tool_${id.replace(/-/g, '_')}`;
            if (window[toolNamespace]) {
                return window[toolNamespace];
            }
            
            // Load the tool script dynamically
            const script = document.createElement('script');
            script.src = modulePath;
            
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    const toolModule = window[toolNamespace];
                    if (toolModule) {
                        resolve(toolModule);
                    } else {
                        reject(new Error(`Tool module '${toolNamespace}' not found after loading`));
                    }
                };
                
                script.onerror = () => {
                    reject(new Error(`Failed to load tool script: ${modulePath}`));
                };
                
                document.head.appendChild(script);
            });
        } catch (error) {
            console.error(`Failed to load tool '${id}':`, error);
            throw error;
        }
    },
    
    // Mount tool to container
    mountTool: async (id, containerId) => {
        const tool = ToolsRegistry.getById(id);
        if (!tool) {
            throw new Error(`Tool '${id}' not found`);
        }
        
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container '${containerId}' not found`);
        }
        
        try {
            // Clear container
            container.innerHTML = '';
            
            // Load tool CSS dynamically to avoid CORS issues
            if (id === 'json-validator') {
                // Check if CSS is already loaded
                if (!document.querySelector('style[data-tool="json-validator"]')) {
                    const style = document.createElement('style');
                    style.setAttribute('data-tool', 'json-validator');
                    style.textContent = `/* JSON Validator Tool Styles */
.json-validator {
    padding: 1rem;
    max-width: 100%;
    overflow: hidden;
}

/* Tab Navigation */
.json-tabs {
    width: 100%;
}

.tab-nav {
    display: flex;
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 1rem;
    gap: 0;
}

.tab-btn {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-bottom: none;
    color: var(--text-secondary);
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 8px 8px 0 0;
    position: relative;
    min-width: 120px;
}

.tab-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.tab-btn.active {
    background: var(--bg-primary);
    color: var(--primary-color);
    border-color: var(--primary-color);
    z-index: 1;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--bg-primary);
}

/* Tab Content */
.tab-content {
    display: none;
    animation: fadeIn 0.3s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Validation Result Styles */
.validation-result {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    min-height: 200px;
    font-family: var(--font-mono);
    white-space: pre-wrap;
    overflow-y: auto;
    max-height: 400px;
}

.validation-result .placeholder {
    color: var(--text-secondary);
    font-style: italic;
    text-align: center;
    margin: 2rem 0;
}

.validation-result.success {
    border-color: var(--success-color);
    background: var(--success-bg);
}

.validation-result.error {
    border-color: var(--error-color);
    background: var(--error-bg);
}

.validation-success {
    color: var(--success-color);
    font-weight: 600;
}

.validation-error {
    color: var(--error-color);
    font-weight: 600;
}

.validation-details {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
    font-size: 0.9rem;
}

/* Enhanced tool layout for JSON validator */
.json-validator .tool-layout {
    flex: 1;
    min-height: 0;
}

.json-validator .tool-panel {
    min-height: 0;
}

.json-validator .tool-textarea {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.4;
    tab-size: 2;
    white-space: pre;
    word-wrap: break-word;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    resize: vertical;
    min-height: 300px;
}

.json-validator .tool-textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.json-validator .tool-textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
}

/* Status displays */
.json-validator .tool-status {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.json-validator .tool-status.success {
    background: var(--success-bg);
    color: var(--success-color);
    border-color: var(--success-color);
}

.json-validator .tool-status.error {
    background: var(--error-bg);
    color: var(--error-color);
    border-color: var(--error-color);
}

/* Additional styles truncated for brevity */`;
                    document.head.appendChild(style);
                }
            } else if (id === 'base64') {
                // Check if CSS is already loaded
                if (!document.querySelector('style[data-tool="base64"]')) {
                    const style = document.createElement('style');
                    style.setAttribute('data-tool', 'base64');
                    style.textContent = `/* Base64 Tool Styles */
.base64-tabs {
    width: 100%;
    padding: 1rem;
    max-width: 100%;
    overflow: hidden;
}

/* Tab Navigation */
.tab-nav {
    display: flex;
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 1rem;
    gap: 0;
}

.tab-btn {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-bottom: none;
    color: var(--text-secondary);
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 8px 8px 0 0;
    position: relative;
    min-width: 140px;
    text-align: center;
}

.tab-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.tab-btn.active {
    background: var(--bg-primary);
    color: var(--primary-color);
    border-color: var(--primary-color);
    z-index: 1;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--bg-primary);
}

/* Tab Content */
.tab-content {
    display: none;
    animation: fadeIn 0.3s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Tool Layout */
.tool-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    min-height: 600px;
}

.tool-panel {
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
}

.tool-panel h3 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
}

/* Tool Controls */
.tool-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
    align-items: center;
}

.encoding-options,
.decoding-options {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    user-select: none;
}

.checkbox-label input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
}

/* Input Area */
.input-area {
    position: relative;
    flex: 1;
    margin-bottom: 1rem;
}

.tool-textarea {
    width: 100%;
    min-height: 300px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.4;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    resize: vertical;
    box-sizing: border-box;
}

.tool-textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.tool-textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
}

/* Drop Zone */
.drop-zone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 110, 253, 0.05);
    border: 2px dashed var(--border-color);
    border-radius: var(--border-radius);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.2s ease;
}

.drop-zone.drag-over {
    display: flex;
    border-color: var(--accent-color);
    background: rgba(13, 110, 253, 0.1);
}

.drop-zone-content {
    text-align: center;
    color: var(--text-secondary);
}

.drop-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.5rem;
}

.drop-zone-content p {
    margin: 0.5rem 0;
    font-weight: 500;
    color: var(--text-primary);
}

.drop-hint {
    font-size: 0.85rem;
    opacity: 0.7;
}

/* Output Area */
.output-area {
    flex: 1;
    margin-bottom: 1rem;
}

.binary-output {
    width: 100%;
    min-height: 300px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
}

.binary-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    text-align: left;
}

.binary-icon {
    font-size: 3rem;
    opacity: 0.7;
}

.binary-details p {
    margin: 0.5rem 0;
    color: var(--text-secondary);
}

.binary-details strong {
    color: var(--text-primary);
}

/* Tool Actions */
.tool-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.tool-actions button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.tool-actions button:hover {
    background: var(--bg-hover);
    border-color: var(--accent-color);
}

.tool-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Tool Status */
.tool-status {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    background: var(--bg-tertiary, var(--bg-primary));
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    color: var(--text-secondary);
    flex-wrap: wrap;
}

.tool-status span {
    white-space: nowrap;
}

/* Progress Indicator */
.progress-indicator {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 300px;
}

.progress-indicator.hidden {
    display: none;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background: var(--accent-color);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 4px;
}

.progress-text {
    text-align: center;
    color: var(--text-primary);
    font-weight: 500;
}

/* File Upload */
.file-upload {
    display: inline-block;
}

.file-upload input[type="file"] {
    display: none;
}

.file-upload-label {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    color: var(--text-primary);
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.file-upload-label:hover {
    background: var(--bg-hover);
    border-color: var(--accent-color);
}

/* Primary Button */
.primary {
    background: var(--accent-color) !important;
    color: white !important;
    border-color: var(--accent-color) !important;
    font-weight: 500;
}

.primary:hover {
    background: var(--accent-color-hover, var(--accent-color)) !important;
    transform: translateY(-1px);
}

.primary:disabled {
    background: var(--bg-secondary) !important;
    color: var(--text-secondary) !important;
    border-color: var(--border-color) !important;
    transform: none !important;
}

/* Error Display */
.error-display {
    background: var(--error-bg);
    border: 1px solid var(--error-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin: 1rem 0;
    color: var(--error-color);
}

.error-display.hidden {
    display: none;
}

/* Status Display */
#status-display {
    margin: 1rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .tool-layout {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .tab-btn {
        min-width: 120px;
        padding: 0.6rem 1rem;
        font-size: 0.875rem;
    }
    
    .tool-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .tool-actions {
        justify-content: center;
    }
    
    .tool-status {
        justify-content: center;
        text-align: center;
    }
    
    .progress-indicator {
        min-width: 280px;
        padding: 1.5rem;
    }
}`;
                    document.head.appendChild(style);
                }
            }
            
            // Embed tool HTML directly to avoid CORS issues
            let html = '';
            if (id === 'json-validator') {
                html = `<!-- JSON Tool Tabs -->
<div class="json-tabs">
    <div class="tab-nav">
        <button class="tab-btn active" data-tab="validator">JSON Validator</button>
        <button class="tab-btn" data-tab="beautifier">JSON Beautifier</button>
        <button class="tab-btn" data-tab="minifier">JSON Minifier</button>
    </div>
    
    <!-- JSON Validator Tab -->
    <div class="tab-content active" id="validator-tab">
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
    <div class="tab-content" id="beautifier-tab">
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
    <div class="tab-content" id="minifier-tab">
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
<div id="error-display" class="error-display hidden"></div>`;
            } else if (id === 'base64') {
                html = `<!-- Base64 Tool Tabs -->
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
<div id="error-display" class="error-display hidden"></div>`;
            } else if (id === 'url-encoder-decoder') {
                // Check if CSS is already loaded
                if (!document.querySelector('style[data-tool="url-encoder-decoder"]')) {
                    const style = document.createElement('style');
                    style.setAttribute('data-tool', 'url-encoder-decoder');
                    style.textContent = `/* URL Encoder/Decoder Tool Styles */
.url-encoder-tabs {
    width: 100%;
    padding: 1rem;
    max-width: 100%;
    overflow: hidden;
}

/* Tab Navigation */
.tab-nav {
    display: flex;
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 1rem;
    gap: 0;
}

.tab-btn {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-bottom: none;
    color: var(--text-secondary);
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 8px 8px 0 0;
    position: relative;
    min-width: 140px;
    text-align: center;
}

.tab-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.tab-btn.active {
    background: var(--bg-primary);
    color: var(--primary-color);
    border-color: var(--primary-color);
    z-index: 1;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--bg-primary);
}

/* Tab Content */
.tab-content {
    display: none;
    animation: fadeIn 0.3s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Tool Layout */
.tool-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    min-height: 600px;
}

.tool-panel {
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
}

.tool-panel h3 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
}

/* Tool Controls */
.tool-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
    align-items: center;
}

.encoding-options,
.decoding-options {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    user-select: none;
}

.checkbox-label input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
}

.option-hint {
    display: block;
    font-size: 0.8rem;
    color: var(--text-secondary);
    opacity: 0.8;
    margin-top: 0.2rem;
}

/* Input Area */
.input-area {
    position: relative;
    flex: 1;
    margin-bottom: 1rem;
}

.tool-textarea {
    width: 100%;
    min-height: 300px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.4;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    resize: vertical;
    box-sizing: border-box;
}

.tool-textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.tool-textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
}

/* Tool Actions */
.tool-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.tool-actions button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.tool-actions button:hover {
    background: var(--bg-hover);
    border-color: var(--accent-color);
}

.tool-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Tool Status */
.tool-status {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    background: var(--bg-tertiary, var(--bg-primary));
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    color: var(--text-secondary);
    flex-wrap: wrap;
}

.tool-status span {
    white-space: nowrap;
}

.tool-status .valid {
    color: var(--success-color);
    font-weight: 500;
}

.tool-status .invalid {
    color: var(--error-color);
    font-weight: 500;
}

/* Primary Button */
.primary {
    background: var(--accent-color) !important;
    color: white !important;
    border-color: var(--accent-color) !important;
    font-weight: 500;
}

.primary:hover {
    background: var(--accent-color-hover, var(--accent-color)) !important;
    transform: translateY(-1px);
}

.primary:disabled {
    background: var(--bg-secondary) !important;
    color: var(--text-secondary) !important;
    border-color: var(--border-color) !important;
    transform: none !important;
}

/* Status Display */
#status-display {
    margin: 1rem 0;
    padding: 0.75rem;
    border-radius: var(--border-radius);
    display: none;
}

#status-display.info {
    background: var(--info-bg, #e3f2fd);
    color: var(--info-color, #1976d2);
    border: 1px solid var(--info-color, #1976d2);
}

#status-display.success {
    background: var(--success-bg);
    color: var(--success-color);
    border: 1px solid var(--success-color);
}

#status-display.error {
    background: var(--error-bg);
    color: var(--error-color);
    border: 1px solid var(--error-color);
}

/* Examples Section */
.examples-section {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-top: 2rem;
}

.examples-section h3 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
}

.examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.example-item {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
}

.example-item h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
    font-size: 0.95rem;
    font-weight: 600;
}

.example-item p {
    margin: 0.25rem 0;
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.example-item code {
    font-family: var(--font-mono);
    background: var(--bg-tertiary, var(--bg-secondary));
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.8rem;
}

/* Error Display */
.error-display {
    background: var(--error-bg);
    border: 1px solid var(--error-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin: 1rem 0;
    color: var(--error-color);
}

.error-display.hidden {
    display: none;
}

/* Responsive Design */
@media (max-width: 768px) {
    .tool-layout {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .tab-btn {
        min-width: 120px;
        padding: 0.6rem 1rem;
        font-size: 0.875rem;
    }
    
    .tool-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .tool-actions {
        justify-content: center;
    }
    
    .tool-status {
        justify-content: center;
        text-align: center;
    }
    
    .examples-grid {
        grid-template-columns: 1fr;
    }
}`;
                    document.head.appendChild(style);
                }
                
                html = `<!-- URL Encoder/Decoder Tool Tabs -->
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
<div id="error-display" class="error-display hidden"></div>`;
            } else if (id === 'uuid-generator') {
                // Check if CSS is already loaded
                if (!document.querySelector('style[data-tool="uuid-generator"]')) {
                    const style = document.createElement('style');
                    style.setAttribute('data-tool', 'uuid-generator');
                    style.textContent = `/* UUID Generator Tool Styles */
.uuid-generator-tabs {
    width: 100%;
    padding: 1rem;
    max-width: 100%;
    overflow: hidden;
}

/* Tab Navigation */
.tab-nav {
    display: flex;
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 1rem;
    gap: 0;
}

.tab-btn {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-bottom: none;
    color: var(--text-secondary);
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 8px 8px 0 0;
    position: relative;
    min-width: 140px;
    text-align: center;
}

.tab-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.tab-btn.active {
    background: var(--bg-primary);
    color: var(--primary-color);
    border-color: var(--primary-color);
    z-index: 1;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--bg-primary);
}

/* Tab Content */
.tab-content {
    display: none;
    animation: fadeIn 0.3s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Tool Layout */
.tool-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    min-height: 600px;
}

.tool-panel {
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
}

.tool-panel h3 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
}

.tool-panel h4 {
    margin: 1rem 0 0.5rem 0;
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 600;
}

/* Tool Controls */
.tool-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
    align-items: center;
}

.format-options,
.validation-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.checkbox-label,
.radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    user-select: none;
}

.checkbox-label input[type="checkbox"],
.radio-label input[type="radio"] {
    margin: 0;
    cursor: pointer;
}

/* Quantity Control */
.quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.quantity-control label {
    color: var(--text-primary);
    font-weight: 500;
}

.quantity-control input[type="number"] {
    width: 80px;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
}

.quantity-label {
    color: var(--text-secondary);
    font-size: 0.85rem;
}

/* Radio Group */
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Input/Output Areas */
.input-area,
.output-area {
    flex: 1;
    margin-bottom: 1rem;
}

.tool-textarea {
    width: 100%;
    min-height: 250px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.4;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    resize: vertical;
    box-sizing: border-box;
}

.tool-textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.tool-textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
}

.uuid-output {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    min-height: 100px;
}

.uuid-output-bulk {
    min-height: 300px;
}

/* Tool Actions */
.tool-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.tool-actions button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.tool-actions button:hover {
    background: var(--bg-hover);
    border-color: var(--accent-color);
}

.tool-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Statistics Panel */
.statistics-panel {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-top: 1rem;
}

.stat-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 0.85rem;
}

.stat-value {
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.85rem;
}

/* Examples Section */
.examples-section {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-top: 1rem;
}

.example-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.example-item {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-family: var(--font-mono);
}

.example-item strong {
    color: var(--text-primary);
}

/* Validation Result */
.validation-result {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    min-height: 200px;
    font-family: var(--font-mono);
    flex: 1;
    margin-bottom: 1rem;
}

.validation-result .placeholder {
    color: var(--text-secondary);
    font-style: italic;
    text-align: center;
    margin: 2rem 0;
}

.validation-result.success {
    border-color: var(--success-color);
    background: var(--success-bg);
}

.validation-result.error {
    border-color: var(--error-color);
    background: var(--error-bg);
}

.validation-success {
    color: var(--success-color);
    font-weight: 600;
}

.validation-error {
    color: var(--error-color);
    font-weight: 600;
}

.validation-details {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
    font-size: 0.9rem;
}

.validation-detail-item {
    display: flex;
    justify-content: space-between;
    margin: 0.25rem 0;
}

/* Tool Status */
.tool-status {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    background: var(--bg-tertiary, var(--bg-primary));
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    color: var(--text-secondary);
    flex-wrap: wrap;
}

.tool-status span {
    white-space: nowrap;
}

.tool-status .valid {
    color: var(--success-color);
    font-weight: 500;
}

.tool-status .invalid {
    color: var(--error-color);
    font-weight: 500;
}

/* Primary Button */
.primary {
    background: var(--accent-color) !important;
    color: white !important;
    border-color: var(--accent-color) !important;
    font-weight: 500;
}

.primary:hover {
    background: var(--accent-color-hover, var(--accent-color)) !important;
    transform: translateY(-1px);
}

.primary:disabled {
    background: var(--bg-secondary) !important;
    color: var(--text-secondary) !important;
    border-color: var(--border-color) !important;
    transform: none !important;
}

/* Progress Indicator */
.progress-indicator {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 300px;
}

.progress-indicator.hidden {
    display: none;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background: var(--accent-color);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 4px;
}

.progress-text {
    text-align: center;
    color: var(--text-primary);
    font-weight: 500;
}

/* Status Display */
#status-display {
    margin: 1rem 0;
    padding: 0.75rem;
    border-radius: var(--border-radius);
    display: none;
}

#status-display.info {
    background: var(--info-bg, #e3f2fd);
    color: var(--info-color, #1976d2);
    border: 1px solid var(--info-color, #1976d2);
}

#status-display.success {
    background: var(--success-bg);
    color: var(--success-color);
    border: 1px solid var(--success-color);
}

#status-display.error {
    background: var(--error-bg);
    color: var(--error-color);
    border: 1px solid var(--error-color);
}

/* Error Display */
.error-display {
    background: var(--error-bg);
    border: 1px solid var(--error-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin: 1rem 0;
    color: var(--error-color);
}

.error-display.hidden {
    display: none;
}

/* Auto Options */
.auto-options {
    margin: 1rem 0;
    padding: 0.75rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
}

.output-format-options {
    margin-top: 1rem;
    padding: 0.75rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
}

/* Responsive Design */
@media (max-width: 768px) {
    .tool-layout {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .tab-btn {
        min-width: 120px;
        padding: 0.6rem 1rem;
        font-size: 0.875rem;
    }
    
    .tool-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .tool-actions {
        justify-content: center;
    }
    
    .tool-status {
        justify-content: center;
        text-align: center;
    }
    
    .progress-indicator {
        min-width: 280px;
        padding: 1.5rem;
    }
    
    .quantity-control {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
    }
    
    .stat-grid {
        gap: 0.25rem;
    }
}`;
                    document.head.appendChild(style);
                }
                
                html = `<!-- UUID Generator Tool Tabs -->
<div class="uuid-generator-tabs">
    <div class="tab-nav">
        <button class="tab-btn active" data-tab="single">Single Generator</button>
        <button class="tab-btn" data-tab="bulk">Bulk Generator</button>
        <button class="tab-btn" data-tab="validator">UUID Validator</button>
    </div>
    
    <!-- Single Generator Tab -->
    <div class="tab-content active" id="single-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Configuration</h3>
                
                <div class="tool-controls">
                    <button id="generate-single-btn" class="primary">Generate UUID</button>
                    
                    <div class="format-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="include-hyphens-single" checked />
                            Include hyphens
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="lowercase-single" checked />
                            Lowercase
                        </label>
                    </div>
                </div>
                
                <div class="auto-options">
                    <label class="checkbox-label">
                        <input type="checkbox" id="auto-generate" />
                        Generate on page load
                    </label>
                </div>
                
                <div class="statistics-panel">
                    <h4>Statistics</h4>
                    <div class="stat-grid">
                        <div class="stat-item">
                            <span class="stat-label">Format:</span>
                            <span class="stat-value" id="format-display">Standard UUID v4</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Characters:</span>
                            <span class="stat-value" id="char-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Version:</span>
                            <span class="stat-value">4 (Random)</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Generated UUID</h3>
                
                <div class="output-area">
                    <textarea 
                        id="uuid-output-single" 
                        class="tool-textarea uuid-output" 
                        placeholder="Generated UUID will appear here..."
                        readonly
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-actions">
                    <button id="copy-btn-single">📋 Copy</button>
                    <button id="download-btn-single">💾 Download</button>
                    <button id="clear-btn-single">🗑️ Clear</button>
                    <button id="new-uuid-btn">🔄 New UUID</button>
                </div>
                
                <div class="tool-status">
                    <span>Status: <span id="generation-status">Ready to generate</span></span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bulk Generator Tab -->
    <div class="tab-content" id="bulk-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Bulk Configuration</h3>
                
                <div class="quantity-control">
                    <label for="bulk-quantity">Quantity:</label>
                    <input type="number" id="bulk-quantity" min="1" max="1000" value="10" />
                    <span class="quantity-label">UUIDs (1-1000)</span>
                </div>
                
                <div class="tool-controls">
                    <button id="generate-bulk-btn" class="primary">Generate Bulk</button>
                </div>
                
                <div class="format-options">
                    <label class="checkbox-label">
                        <input type="checkbox" id="include-hyphens-bulk" checked />
                        Include hyphens
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="lowercase-bulk" checked />
                        Lowercase
                    </label>
                </div>
                
                <div class="output-format-options">
                    <h4>Output Format</h4>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="output-format" value="lines" checked />
                            Line separated
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="output-format" value="comma" />
                            Comma separated
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="output-format" value="json" />
                            JSON array
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Generated UUIDs</h3>
                
                <div class="output-area">
                    <textarea 
                        id="uuid-output-bulk" 
                        class="tool-textarea uuid-output-bulk" 
                        placeholder="Generated UUIDs will appear here..."
                        readonly
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-actions">
                    <button id="copy-btn-bulk">📋 Copy</button>
                    <button id="download-btn-bulk">💾 Download</button>
                    <button id="clear-btn-bulk">🗑️ Clear</button>
                </div>
                
                <div class="tool-status">
                    <span>Status: <span id="bulk-status">Ready to generate</span></span>
                    <span>Size: <span id="bulk-size">0 characters</span></span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- UUID Validator Tab -->
    <div class="tab-content" id="validator-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>UUID Input</h3>
                
                <div class="input-area">
                    <textarea 
                        id="uuid-input-validator" 
                        class="tool-textarea" 
                        placeholder="Enter UUID to validate...&#10;&#10;Examples:&#10;12345678-1234-4abc-def0-123456789abc&#10;123456781234def0123456789abc&#10;12345678-1234-4ABC-DEF0-123456789ABC"
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tool-controls">
                    <button id="validate-btn" class="primary">Validate UUID</button>
                    
                    <div class="validation-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="auto-validate" checked />
                            Validate as you type
                        </label>
                    </div>
                </div>
                
                <div class="examples-section">
                    <h4>Valid Examples</h4>
                    <div class="example-list">
                        <div class="example-item">
                            <strong>Standard:</strong> 12345678-1234-4abc-def0-123456789abc
                        </div>
                        <div class="example-item">
                            <strong>No hyphens:</strong> 123456781234abcdef0123456789abc
                        </div>
                        <div class="example-item">
                            <strong>Uppercase:</strong> 12345678-1234-4ABC-DEF0-123456789ABC
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Validation Results</h3>
                
                <div class="validation-result" id="validation-result">
                    <p class="placeholder">Enter a UUID to validate</p>
                </div>
                
                <div class="tool-actions">
                    <button id="copy-valid-btn">📋 Copy Valid UUID</button>
                    <button id="generate-similar-btn">🔄 Generate Similar</button>
                    <button id="clear-validator-btn">🗑️ Clear</button>
                </div>
                
                <div class="tool-status">
                    <span>Input: <span id="validator-char-count">0 characters</span></span>
                    <span>Valid: <span id="validation-status">Unknown</span></span>
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
    <div class="progress-text" id="progress-text">Generating UUIDs...</div>
</div>

<!-- Status and Error Display -->
<div id="status-display"></div>
<div id="error-display" class="error-display hidden"></div>`;
            } else {
                throw new Error(`Tool '${id}' HTML template not found`);
            }
            
            container.innerHTML = html;
            
            // Get tool namespace
            const toolNamespace = `Tool_${id.replace(/-/g, '_')}`;
            const toolModule = window[toolNamespace];
            
            if (toolModule && typeof toolModule.mount === 'function') {
                // Mount the tool
                await toolModule.mount(container);
            } else if (toolModule && typeof toolModule.init === 'function') {
                // Fallback to init method for compatibility
                await toolModule.init(container);
            }
            
            return true;
        } catch (error) {
            console.error(`Failed to mount tool '${id}':`, error);
            throw error;
        }
    },
    
    // Get tool statistics
    getStats: () => {
        const total = ToolsRegistry.tools.length;
        const enabled = ToolsRegistry.getEnabled().length;
        const disabled = total - enabled;
        const categories = ToolsRegistry.getCategories().length;
        const tags = ToolsRegistry.getTags().length;
        
        return {
            total,
            enabled,
            disabled,
            categories,
            tags
        };
    }
};

// Make it available globally
window.ToolsRegistry = ToolsRegistry;
