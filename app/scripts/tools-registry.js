// Tools registry - defines all available tools
const ToolsRegistry = {
    tools: [
        {
            id: 'json-validator',
            name: 'JSON Validator & Beautifier',
            description: 'Validate, beautify, and minify JSON with error reporting',
            icon: '📋',
            modulePath: './tools/json-validator/tool.js',
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
            tags: ['base64', 'encode', 'decode'],
            disabled: true // Will enable when implemented
        },
        {
            id: 'url-encoder-decoder',
            name: 'URL Encoder/Decoder',
            description: 'Percent-encode and decode URLs and query parameters',
            icon: '🔗',
            modulePath: '../tools/url-encoder-decoder/tool.js',
            category: 'encoders',
            tags: ['url', 'encode', 'decode', 'percent'],
            disabled: true
        },
        {
            id: 'uuid-generator',
            name: 'UUID Generator',
            description: 'Generate v4 (random) and v1 (timestamp) UUIDs',
            icon: '🆔',
            modulePath: '../tools/uuid-generator/tool.js',
            category: 'generators',
            tags: ['uuid', 'guid', 'generate', 'random'],
            disabled: true
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
