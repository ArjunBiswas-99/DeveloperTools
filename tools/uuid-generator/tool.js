// UUID Generator Tool with Tabbed Interface
const Tool_uuid_generator = {
    // Tool metadata
    metadata: {
        id: 'uuid-generator',
        name: 'UUID Generator',
        icon: '🆔'
    },
    
    // HTML template embedded to avoid CORS issues
    template: `<!-- UUID Generator Tool Tabs -->
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
<div id="error-display" class="error-display hidden"></div>`,
    
    // DOM elements for each tab
    elements: {
        tabs: {},
        single: {},
        bulk: {},
        validator: {},
        shared: {}
    },
    
    // Tool state
    state: {
        activeTab: 'single',
        isProcessing: false,
        validationCache: new Map()
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            console.log('Starting to mount UUID Generator tool...');
            
            // Use embedded HTML template
            container.innerHTML = Tool_uuid_generator.template;
            container.className = 'uuid-generator';
            
            // Load CSS
            await Tool_uuid_generator.loadCSS();
            console.log('CSS loaded successfully');
            
            // Wait a moment for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Get DOM elements
            Tool_uuid_generator.getElements(container);
            console.log('DOM elements retrieved');
            
            // Bind events
            Tool_uuid_generator.bindEvents();
            console.log('Events bound successfully');
            
            // Load saved state
            Tool_uuid_generator.loadState();
            
            // Initialize stats
            Tool_uuid_generator.updateStats('single');
            
            // Auto-generate if enabled
            if (Tool_uuid_generator.elements.single.autoGenerate?.checked) {
                Tool_uuid_generator.generateSingle();
            }
            
            console.log('UUID Generator tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount UUID Generator tool:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading UUID Generator Tool</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        // Save current state
        Tool_uuid_generator.saveState();
        
        // Clean up event listeners
        Tool_uuid_generator.elements = {
            tabs: {},
            single: {},
            bulk: {},
            validator: {},
            shared: {}
        };
        
        console.log('UUID Generator tool unmounted');
    },
    
    // Load CSS dynamically
    loadCSS: async () => {
        const cssId = 'uuid-generator-css';
        if (!document.querySelector(`#${cssId}`)) {
            const style = document.createElement('style');
            style.id = cssId;
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
            Tool_uuid_generator.elements.tabs = {
                nav: DOM.qsa('.tab-btn', container) || [],
                contents: {
                    single: DOM.qs('#single-tab', container),
                    bulk: DOM.qs('#bulk-tab', container),
                    validator: DOM.qs('#validator-tab', container)
                }
            };
            
            // Single generator tab elements
            Tool_uuid_generator.elements.single = {
                generateBtn: DOM.qs('#generate-single-btn', container),
                includeHyphens: DOM.qs('#include-hyphens-single', container),
                lowercase: DOM.qs('#lowercase-single', container),
                autoGenerate: DOM.qs('#auto-generate', container),
                output: DOM.qs('#uuid-output-single', container),
                copyBtn: DOM.qs('#copy-btn-single', container),
                downloadBtn: DOM.qs('#download-btn-single', container),
                clearBtn: DOM.qs('#clear-btn-single', container),
                newUuidBtn: DOM.qs('#new-uuid-btn', container),
                formatDisplay: DOM.qs('#format-display', container),
                charCount: DOM.qs('#char-count', container),
                generationStatus: DOM.qs('#generation-status', container)
            };
            
            // Bulk generator tab elements
            Tool_uuid_generator.elements.bulk = {
                quantity: DOM.qs('#bulk-quantity', container),
                generateBtn: DOM.qs('#generate-bulk-btn', container),
                includeHyphens: DOM.qs('#include-hyphens-bulk', container),
                lowercase: DOM.qs('#lowercase-bulk', container),
                outputFormat: DOM.qsa('input[name="output-format"]', container),
                output: DOM.qs('#uuid-output-bulk', container),
                copyBtn: DOM.qs('#copy-btn-bulk', container),
                downloadBtn: DOM.qs('#download-btn-bulk', container),
                clearBtn: DOM.qs('#clear-btn-bulk', container),
                status: DOM.qs('#bulk-status', container),
                size: DOM.qs('#bulk-size', container)
            };
            
            // Validator tab elements
            Tool_uuid_generator.elements.validator = {
                input: DOM.qs('#uuid-input-validator', container),
                validateBtn: DOM.qs('#validate-btn', container),
                autoValidate: DOM.qs('#auto-validate', container),
                result: DOM.qs('#validation-result', container),
                copyValidBtn: DOM.qs('#copy-valid-btn', container),
                generateSimilarBtn: DOM.qs('#generate-similar-btn', container),
                clearBtn: DOM.qs('#clear-validator-btn', container),
                charCount: DOM.qs('#validator-char-count', container),
                validationStatus: DOM.qs('#validation-status', container)
            };
            
            // Shared elements
            Tool_uuid_generator.elements.shared = {
                statusDisplay: DOM.qs('#status-display', container),
                errorDisplay: DOM.qs('#error-display', container),
                progressIndicator: DOM.qs('#progress-indicator', container),
                progressFill: DOM.qs('#progress-fill', container),
                progressText: DOM.qs('#progress-text', container)
            };
            
        } catch (error) {
            console.error('Error in getElements:', error);
        }
    },
    
    // Bind event listeners for all tabs
    bindEvents: () => {
        try {
            // Tab navigation using SubTabs utility
            if (window.SubTabs && Tool_uuid_generator.elements.tabs && Tool_uuid_generator.elements.tabs.nav) {
                const container = document.querySelector('.uuid-generator');
                if (container && SubTabs.validateTabStructure(Tool_uuid_generator.elements)) {
                    SubTabs.bindTabEvents(
                        container,
                        Tool_uuid_generator.elements,
                        Tool_uuid_generator.switchTab
                    );
                    
                    SubTabs.setInitialTab(
                        container,
                        'single',
                        Tool_uuid_generator.elements,
                        Tool_uuid_generator.switchTab
                    );
                } else {
                    Tool_uuid_generator.bindTabEventsFallback();
                }
            } else {
                Tool_uuid_generator.bindTabEventsFallback();
            }
            
            // Single generator tab events
            const single = Tool_uuid_generator.elements.single;
            if (single.generateBtn) DOM.on(single.generateBtn, 'click', Tool_uuid_generator.generateSingle);
            if (single.newUuidBtn) DOM.on(single.newUuidBtn, 'click', Tool_uuid_generator.generateSingle);
            if (single.copyBtn) DOM.on(single.copyBtn, 'click', () => Tool_uuid_generator.copyOutput('single'));
            if (single.downloadBtn) DOM.on(single.downloadBtn, 'click', () => Tool_uuid_generator.downloadOutput('single'));
            if (single.clearBtn) DOM.on(single.clearBtn, 'click', () => Tool_uuid_generator.clear('single'));
            
            // Format option changes for single generator
            if (single.includeHyphens) DOM.on(single.includeHyphens, 'change', Tool_uuid_generator.updateSingleFormat);
            if (single.lowercase) DOM.on(single.lowercase, 'change', Tool_uuid_generator.updateSingleFormat);
            
            // Bulk generator tab events
            const bulk = Tool_uuid_generator.elements.bulk;
            if (bulk.generateBtn) DOM.on(bulk.generateBtn, 'click', Tool_uuid_generator.generateBulk);
            if (bulk.copyBtn) DOM.on(bulk.copyBtn, 'click', () => Tool_uuid_generator.copyOutput('bulk'));
            if (bulk.downloadBtn) DOM.on(bulk.downloadBtn, 'click', () => Tool_uuid_generator.downloadOutput('bulk'));
            if (bulk.clearBtn) DOM.on(bulk.clearBtn, 'click', () => Tool_uuid_generator.clear('bulk'));
            if (bulk.quantity) DOM.on(bulk.quantity, 'input', Tool_uuid_generator.validateQuantity);
            
            // Validator tab events
            const validator = Tool_uuid_generator.elements.validator;
            if (validator.input) {
                DOM.on(validator.input, 'input', () => Tool_uuid_generator.handleValidatorInput());
                DOM.on(validator.input, 'paste', () => {
                    setTimeout(() => Tool_uuid_generator.handleValidatorInput(), 10);
                });
            }
            if (validator.validateBtn) DOM.on(validator.validateBtn, 'click', Tool_uuid_generator.validateUuid);
            if (validator.copyValidBtn) DOM.on(validator.copyValidBtn, 'click', () => Tool_uuid_generator.copyOutput('validator'));
            if (validator.generateSimilarBtn) DOM.on(validator.generateSimilarBtn, 'click', Tool_uuid_generator.generateSimilar);
            if (validator.clearBtn) DOM.on(validator.clearBtn, 'click', () => Tool_uuid_generator.clear('validator'));
            
            console.log('Event listeners bound successfully');
        } catch (error) {
            console.error('Error binding events:', error);
            Tool_uuid_generator.bindTabEventsFallback();
        }
    },

    // Fallback method for binding tab events
    bindTabEventsFallback: () => {
        try {
            console.log('Using fallback tab event binding for UUID Generator tool');
            
            Tool_uuid_generator.elements.tabs.nav.forEach(btn => {
                if (btn) {
                    DOM.on(btn, 'click', (e) => {
                        e.preventDefault();
                        const tabName = e.target.getAttribute('data-tab');
                        if (tabName) {
                            Tool_uuid_generator.switchTab(tabName);
                        }
                    });
                }
            });
            
            Tool_uuid_generator.switchTab('single');
            console.log('Fallback tab events bound successfully');
        } catch (error) {
            console.error('Error in fallback tab binding:', error);
        }
    },
    
    // Switch between tabs
    switchTab: (tabName) => {
        console.log(`UUID Generator: Switching to tab '${tabName}'`);
        
        try {
            // Manual tab switching
            Tool_uuid_generator.elements.tabs.nav.forEach(btn => {
                if (btn && btn.classList) {
                    btn.classList.remove('active');
                }
            });
            
            const activeBtn = Tool_uuid_generator.elements.tabs.nav.find(btn => 
                btn && btn.getAttribute('data-tab') === tabName
            );
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Update tab contents
            Object.entries(Tool_uuid_generator.elements.tabs.contents).forEach(([tab, content]) => {
                if (content && content.classList) {
                    const isActive = tab === tabName;
                    content.classList.toggle('active', isActive);
                }
            });
            
            Tool_uuid_generator.state.activeTab = tabName;
            Tool_uuid_generator.updateStats(tabName);
            
            console.log(`UUID Generator: Successfully switched to tab '${tabName}'`);
            
        } catch (error) {
            console.error('UUID Generator: Error in switchTab:', error);
        }
    },
    
    // Generate UUID v4
    generateUuidV4: () => {
        // Use crypto.randomUUID() if available (modern browsers)
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        
        // Fallback implementation
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    
    // Format UUID based on options
    formatUuid: (uuid, includeHyphens = true, lowercase = true) => {
        let formatted = uuid;
        
        if (!includeHyphens) {
            formatted = formatted.replace(/-/g, '');
        }
        
        if (lowercase) {
            formatted = formatted.toLowerCase();
        } else {
            formatted = formatted.toUpperCase();
        }
        
        return formatted;
    },
    
    // Generate single UUID
    generateSingle: () => {
        try {
            const single = Tool_uuid_generator.elements.single;
            const uuid = Tool_uuid_generator.generateUuidV4();
            const includeHyphens = single.includeHyphens.checked;
            const lowercase = single.lowercase.checked;
            
            const formatted = Tool_uuid_generator.formatUuid(uuid, includeHyphens, lowercase);
            single.output.value = formatted;
            
            Tool_uuid_generator.updateStats('single');
            single.generationStatus.textContent = 'Generated successfully';
            
            if (window.Toasts) {
                Toasts.success('UUID generated successfully');
            }
        } catch (error) {
            Tool_uuid_generator.showStatus('Error generating UUID: ' + error.message, 'error');
            if (window.Toasts) {
                Toasts.error('Failed to generate UUID');
            }
        }
    },
    
    // Generate bulk UUIDs
    generateBulk: async () => {
        try {
            const bulk = Tool_uuid_generator.elements.bulk;
            const quantity = parseInt(bulk.quantity.value);
            const includeHyphens = bulk.includeHyphens.checked;
            const lowercase = bulk.lowercase.checked;
            
            if (quantity < 1 || quantity > 1000) {
                Tool_uuid_generator.showStatus('Quantity must be between 1 and 1000', 'error');
                return;
            }
            
            Tool_uuid_generator.showProgress('Generating UUIDs...', 0);
            Tool_uuid_generator.state.isProcessing = true;
            
            const uuids = [];
            const batchSize = 50; // Process in batches for better UX
            
            for (let i = 0; i < quantity; i += batchSize) {
                const currentBatch = Math.min(batchSize, quantity - i);
                
                for (let j = 0; j < currentBatch; j++) {
                    const uuid = Tool_uuid_generator.generateUuidV4();
                    const formatted = Tool_uuid_generator.formatUuid(uuid, includeHyphens, lowercase);
                    uuids.push(formatted);
                }
                
                // Update progress
                const progress = ((i + currentBatch) / quantity) * 100;
                Tool_uuid_generator.updateProgress(progress);
                
                // Allow UI to update
                if (i + batchSize < quantity) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            }
            
            // Format output based on selected format
            const outputFormat = bulk.outputFormat.find(radio => radio.checked)?.value || 'lines';
            let output = '';
            
            switch (outputFormat) {
                case 'lines':
                    output = uuids.join('\n');
                    break;
                case 'comma':
                    output = uuids.join(', ');
                    break;
                case 'json':
                    output = JSON.stringify(uuids, null, 2);
                    break;
            }
            
            bulk.output.value = output;
            Tool_uuid_generator.updateStats('bulk');
            
            bulk.status.textContent = `${quantity} UUIDs generated`;
            
            Tool_uuid_generator.hideProgress();
            Tool_uuid_generator.state.isProcessing = false;
            
            if (window.Toasts) {
                Toasts.success(`Generated ${quantity} UUIDs successfully`);
            }
            
        } catch (error) {
            Tool_uuid_generator.hideProgress();
            Tool_uuid_generator.state.isProcessing = false;
            Tool_uuid_generator.showStatus('Error generating bulk UUIDs: ' + error.message, 'error');
            if (window.Toasts) {
                Toasts.error('Failed to generate bulk UUIDs');
            }
        }
    },
    
    // Validate UUID
    validateUuid: () => {
        const validator = Tool_uuid_generator.elements.validator;
        const input = validator.input.value.trim();
        
        if (!input) {
            Tool_uuid_generator.showValidationResult('Please enter a UUID to validate', false);
            return;
        }
        
        const result = Tool_uuid_generator.performUuidValidation(input);
        Tool_uuid_generator.showValidationResult(result.message, result.isValid, result.details);
        
        validator.validationStatus.textContent = result.isValid ? 'Valid' : 'Invalid';
        validator.validationStatus.className = result.isValid ? 'valid' : 'invalid';
    },
    
    // Perform UUID validation
    performUuidValidation: (input) => {
        try {
            // Remove whitespace
            const cleaned = input.replace(/\s/g, '');
            
            // Check basic format patterns
            const withHyphens = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            const withoutHyphens = /^[0-9a-f]{32}$/i;
            
            let isValid = false;
            let hasHyphens = false;
            let version = 'Unknown';
            let caseType = 'Mixed';
            
            if (withHyphens.test(cleaned)) {
                isValid = true;
                hasHyphens = true;
                
                // Extract version (13th character)
                const versionChar = cleaned.charAt(14);
                if (versionChar === '1') version = '1 (Timestamp)';
                else if (versionChar === '4') version = '4 (Random)';
                else version = `${versionChar} (Other)`;
                
            } else if (withoutHyphens.test(cleaned)) {
                isValid = true;
                hasHyphens = false;
                
                // Extract version (13th character)
                const versionChar = cleaned.charAt(12);
                if (versionChar === '1') version = '1 (Timestamp)';
                else if (versionChar === '4') version = '4 (Random)';
                else version = `${versionChar} (Other)`;
            }
            
            // Determine case
            if (cleaned === cleaned.toLowerCase()) caseType = 'Lowercase';
            else if (cleaned === cleaned.toUpperCase()) caseType = 'Uppercase';
            
            const details = {
                version,
                format: hasHyphens ? 'Standard (with hyphens)' : 'Compact (no hyphens)',
                length: cleaned.length,
                case: caseType,
                hyphens: hasHyphens ? 'Present' : 'Missing'
            };
            
            const message = isValid 
                ? `✅ Valid UUID\n\nThis is a properly formatted UUID.`
                : `❌ Invalid UUID\n\nThe input does not match UUID format requirements.`;
            
            return { isValid, message, details };
            
        } catch (error) {
            return {
                isValid: false,
                message: `❌ Validation Error\n\n${error.message}`,
                details: null
            };
        }
    },
    
    // Show validation result
    showValidationResult: (message, isValid, details = null) => {
        const validator = Tool_uuid_generator.elements.validator;
        const result = validator.result;
        
        result.innerHTML = '';
        result.className = 'validation-result';
        
        if (isValid) {
            result.classList.add('success');
        } else {
            result.classList.add('error');
        }
        
        // Add main message
        const messageEl = DOM.el('div', {
            className: isValid ? 'validation-success' : 'validation-error',
            textContent: message.split('\n')[0] // First line only
        });
        result.appendChild(messageEl);
        
        // Add description
        const lines = message.split('\n');
        if (lines.length > 2) {
            const descEl = DOM.el('p', {
                textContent: lines.slice(2).join(' ')
            });
            result.appendChild(descEl);
        }
        
        // Add details if available
        if (details) {
            const detailsEl = DOM.el('div', { className: 'validation-details' });
            
            Object.entries(details).forEach(([key, value]) => {
                const item = DOM.el('div', { className: 'validation-detail-item' });
                item.appendChild(DOM.el('span', { textContent: `${key}:` }));
                item.appendChild(DOM.el('strong', { textContent: value }));
                detailsEl.appendChild(item);
            });
            
            result.appendChild(detailsEl);
        }
    },
    
    // Handle validator input changes
    handleValidatorInput: () => {
        Tool_uuid_generator.updateStats('validator');
        
        const validator = Tool_uuid_generator.elements.validator;
        if (validator.autoValidate.checked) {
            clearTimeout(Tool_uuid_generator.validationTimeout);
            Tool_uuid_generator.validationTimeout = setTimeout(() => {
                Tool_uuid_generator.validateUuid();
            }, 300);
        }
    },
    
    // Generate similar UUID
    generateSimilar: () => {
        const validator = Tool_uuid_generator.elements.validator;
        const input = validator.input.value.trim();
        
        if (!input) {
            Tool_uuid_generator.showStatus('Please enter a UUID first', 'info');
            return;
        }
        
        // Generate new UUID with similar format
        const hasHyphens = input.includes('-');
        const isLowercase = input === input.toLowerCase();
        
        const newUuid = Tool_uuid_generator.generateUuidV4();
        const formatted = Tool_uuid_generator.formatUuid(newUuid, hasHyphens, isLowercase);
        
        validator.input.value = formatted;
        Tool_uuid_generator.handleValidatorInput();
        
        if (window.Toasts) {
            Toasts.success('Generated similar UUID');
        }
    },
    
    // Update format display for single generator
    updateSingleFormat: () => {
        const single = Tool_uuid_generator.elements.single;
        const includeHyphens = single.includeHyphens.checked;
        const lowercase = single.lowercase.checked;
        
        let format = 'UUID v4';
        if (!includeHyphens) format += ' (compact)';
        if (!lowercase) format += ' (uppercase)';
        
        single.formatDisplay.textContent = format;
        Tool_uuid_generator.updateStats('single');
    },
    
    // Validate quantity input
    validateQuantity: () => {
        const bulk = Tool_uuid_generator.elements.bulk;
        const quantity = parseInt(bulk.quantity.value);
        
        if (isNaN(quantity) || quantity < 1) {
            bulk.quantity.value = 1;
        } else if (quantity > 1000) {
            bulk.quantity.value = 1000;
        }
    },
    
    // Copy output to clipboard
    copyOutput: async (tabName) => {
        let output = '';
        
        if (tabName === 'single') {
            output = Tool_uuid_generator.elements.single.output.value;
        } else if (tabName === 'bulk') {
            output = Tool_uuid_generator.elements.bulk.output.value;
        } else if (tabName === 'validator') {
            output = Tool_uuid_generator.elements.validator.input.value.trim();
        }
        
        if (!output) {
            if (window.Toasts) {
                Toasts.warning('No content to copy');
            }
            return;
        }
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(output, 'Copied to clipboard');
        }
    },
    
    // Download output as file
    downloadOutput: (tabName) => {
        let output = '';
        let filename = '';
        const mimeType = 'text/plain';
        
        if (tabName === 'single') {
            output = Tool_uuid_generator.elements.single.output.value;
            filename = 'uuid.txt';
        } else if (tabName === 'bulk') {
            output = Tool_uuid_generator.elements.bulk.output.value;
            const quantity = Tool_uuid_generator.elements.bulk.quantity.value;
            filename = `uuids-${quantity}.txt`;
        }
        
        if (!output) {
            if (window.Toasts) {
                Toasts.warning('No content to download');
            }
            return;
        }
        
        if (window.Download) {
            Download.downloadWithToast(filename, output, mimeType);
        }
    },
    
    // Clear content for specific tab
    clear: (tabName) => {
        if (tabName === 'single') {
            const single = Tool_uuid_generator.elements.single;
            single.output.value = '';
            single.generationStatus.textContent = 'Ready to generate';
        } else if (tabName === 'bulk') {
            const bulk = Tool_uuid_generator.elements.bulk;
            bulk.output.value = '';
            bulk.status.textContent = 'Ready to generate';
        } else if (tabName === 'validator') {
            const validator = Tool_uuid_generator.elements.validator;
            validator.input.value = '';
            validator.result.innerHTML = '<p class="placeholder">Enter a UUID to validate</p>';
            validator.result.className = 'validation-result';
            validator.validationStatus.textContent = 'Unknown';
            validator.validationStatus.className = '';
        }
        
        Tool_uuid_generator.hideStatus();
        Tool_uuid_generator.updateStats(tabName);
        
        if (window.Toasts) {
            Toasts.info('Content cleared');
        }
    },
    
    // Update statistics
    updateStats: (tabName) => {
        if (tabName === 'single') {
            const single = Tool_uuid_generator.elements.single;
            const output = single.output.value;
            const chars = output.length;
            
            single.charCount.textContent = chars.toString();
            
        } else if (tabName === 'bulk') {
            const bulk = Tool_uuid_generator.elements.bulk;
            const output = bulk.output.value;
            const chars = output.length;
            
            bulk.size.textContent = `${chars.toLocaleString()} characters`;
            
        } else if (tabName === 'validator') {
            const validator = Tool_uuid_generator.elements.validator;
            const input = validator.input.value;
            const chars = input.length;
            
            validator.charCount.textContent = `${chars} characters`;
        }
    },
    
    // Show progress indicator
    showProgress: (text, percent) => {
        const elements = Tool_uuid_generator.elements.shared;
        elements.progressIndicator.classList.remove('hidden');
        elements.progressText.textContent = text;
        elements.progressFill.style.width = percent + '%';
    },
    
    // Update progress
    updateProgress: (percent) => {
        const elements = Tool_uuid_generator.elements.shared;
        elements.progressFill.style.width = percent + '%';
    },
    
    // Hide progress indicator
    hideProgress: () => {
        Tool_uuid_generator.elements.shared.progressIndicator.classList.add('hidden');
    },
    
    // Show status message
    showStatus: (message, type = 'info') => {
        const statusEl = Tool_uuid_generator.elements.shared.statusDisplay;
        statusEl.textContent = message;
        statusEl.className = type;
        statusEl.style.display = 'block';
    },
    
    // Hide status message
    hideStatus: () => {
        const statusEl = Tool_uuid_generator.elements.shared.statusDisplay;
        statusEl.style.display = 'none';
        statusEl.className = '';
    },
    
    // Load saved state
    loadState: () => {
        if (!Storage) return;
        
        const state = Storage.getToolState('uuid-generator');
        
        // Load single generator settings
        if (state.single_includeHyphens !== undefined) {
            Tool_uuid_generator.elements.single.includeHyphens.checked = state.single_includeHyphens;
        }
        if (state.single_lowercase !== undefined) {
            Tool_uuid_generator.elements.single.lowercase.checked = state.single_lowercase;
        }
        if (state.auto_generate !== undefined) {
            Tool_uuid_generator.elements.single.autoGenerate.checked = state.auto_generate;
        }
        
        // Load bulk generator settings
        if (state.bulk_quantity) {
            Tool_uuid_generator.elements.bulk.quantity.value = state.bulk_quantity;
        }
        if (state.bulk_includeHyphens !== undefined) {
            Tool_uuid_generator.elements.bulk.includeHyphens.checked = state.bulk_includeHyphens;
        }
        if (state.bulk_lowercase !== undefined) {
            Tool_uuid_generator.elements.bulk.lowercase.checked = state.bulk_lowercase;
        }
        
        // Load validator settings
        if (state.auto_validate !== undefined) {
            Tool_uuid_generator.elements.validator.autoValidate.checked = state.auto_validate;
        }
        
        // Load active tab
        if (state.activeTab) {
            Tool_uuid_generator.switchTab(state.activeTab);
        }
        
        // Update format display
        Tool_uuid_generator.updateSingleFormat();
    },
    
    // Save current state
    saveState: () => {
        if (!Storage) return;
        
        const state = {
            activeTab: Tool_uuid_generator.state.activeTab,
            single_includeHyphens: Tool_uuid_generator.elements.single?.includeHyphens?.checked,
            single_lowercase: Tool_uuid_generator.elements.single?.lowercase?.checked,
            auto_generate: Tool_uuid_generator.elements.single?.autoGenerate?.checked,
            bulk_quantity: Tool_uuid_generator.elements.bulk?.quantity?.value,
            bulk_includeHyphens: Tool_uuid_generator.elements.bulk?.includeHyphens?.checked,
            bulk_lowercase: Tool_uuid_generator.elements.bulk?.lowercase?.checked,
            auto_validate: Tool_uuid_generator.elements.validator?.autoValidate?.checked
        };
        
        Storage.setToolState('uuid-generator', state);
    }
};

// Make tool available globally
window.Tool_uuid_generator = Tool_uuid_generator;
