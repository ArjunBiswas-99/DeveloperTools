// Tools registry - defines all available tools
const ToolsRegistry = {
    tools: [
        {
            id: 'json-validator',
            name: 'JSON Validator & Beautifier',
            description: 'Validate, beautify, and minify JSON with error reporting',
            icon: 'json',
            modulePath: '../tools/json-validator/tool.js',
            category: 'formatters',
            tags: ['json', 'validate', 'beautify', 'format']
        },
        {
            id: 'base64',
            name: 'Base64 Encode/Decode',
            description: 'Encode and decode Base64 strings and files',
            icon: 'base64',
            modulePath: '../tools/base64/tool.js',
            category: 'encoders',
            tags: ['base64', 'encode', 'decode'],
            disabled: true // Will enable when implemented
        },
        {
            id: 'url-encoder-decoder',
            name: 'URL Encoder/Decoder',
            description: 'Percent-encode and decode URLs and query parameters',
            icon: 'url',
            modulePath: '../tools/url-encoder-decoder/tool.js',
            category: 'encoders',
            tags: ['url', 'encode', 'decode', 'percent'],
            disabled: true
        },
        {
            id: 'uuid-generator',
            name: 'UUID Generator',
            description: 'Generate v4 (random) and v1 (timestamp) UUIDs',
            icon: 'uuid',
            modulePath: '../tools/uuid-generator/tool.js',
            category: 'generators',
            tags: ['uuid', 'guid', 'generate', 'random'],
            disabled: true
        },
        {
            id: 'hash-generator',
            name: 'Hash Generator',
            description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
            icon: 'hash',
            modulePath: '../tools/hash-generator/tool.js',
            category: 'security',
            tags: ['hash', 'md5', 'sha', 'checksum'],
            disabled: true
        },
        {
            id: 'jwt-decoder',
            name: 'JWT Decoder',
            description: 'Decode JWT tokens and view header/payload',
            icon: 'jwt',
            modulePath: '../tools/jwt-decoder/tool.js',
            category: 'security',
            tags: ['jwt', 'decode', 'token', 'auth'],
            disabled: true
        },
        {
            id: 'color-utilities',
            name: 'Color Utilities',
            description: 'Convert between HEX, RGB, HSL and check contrast',
            icon: 'color',
            modulePath: '../tools/color-utilities/tool.js',
            category: 'design',
            tags: ['color', 'hex', 'rgb', 'hsl', 'contrast'],
            disabled: true
        },
        {
            id: 'epoch-converter',
            name: 'Epoch/Time Converter',
            description: 'Convert between UNIX timestamp and human-readable dates',
            icon: 'time',
            modulePath: '../tools/epoch-converter/tool.js',
            category: 'converters',
            tags: ['time', 'epoch', 'unix', 'timestamp', 'date'],
            disabled: true
        },
        {
            id: 'csv-json',
            name: 'CSV ↔ JSON Converter',
            description: 'Convert between CSV and JSON formats with preview',
            icon: 'csv',
            modulePath: '../tools/csv-json/tool.js',
            category: 'converters',
            tags: ['csv', 'json', 'convert', 'data'],
            disabled: true
        },
        {
            id: 'diff-viewer',
            name: 'Diff Viewer',
            description: 'Compare text and JSON with side-by-side diff view',
            icon: 'diff',
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
