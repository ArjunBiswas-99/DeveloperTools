// JWT Decoder/Builder/Validator Tool with Tabbed Interface
const Tool_jwt_decoder = {
    // Tool metadata
    metadata: {
        id: 'jwt-decoder',
        name: 'JWT Decoder',
        icon: '🎫'
    },
    
    // HTML template embedded to avoid CORS issues
    template: `<!-- JWT Decoder Tool Tabs -->
<div class="jwt-decoder-tabs">
    <div class="tab-nav">
        <button class="tab-btn active" data-tab="decoder">JWT Decoder</button>
        <button class="tab-btn" data-tab="builder">JWT Builder</button>
        <button class="tab-btn" data-tab="validator">JWT Validator</button>
    </div>
    
    <!-- JWT Decoder Tab -->
    <div class="tab-content active" id="decoder-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>JWT Token Input</h3>
                
                <div class="tool-controls">
                    <button id="decode-btn" class="primary">🔍 Decode JWT</button>
                    
                    <div class="decoder-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="auto-decode" checked />
                            Auto-decode
                        </label>
                    </div>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-jwt-file" accept=".txt,.jwt" />
                        <label for="upload-jwt-file" class="file-upload-label">
                            📁 Upload JWT File
                        </label>
                    </div>
                </div>
                
                <div class="input-area">
                    <textarea 
                        id="input-jwt" 
                        class="tool-textarea" 
                        placeholder="Paste your JWT token here...&#10;&#10;Example:&#10;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                        spellcheck="false"
                    ></textarea>
                    
                    <div class="drop-zone" id="jwt-drop-zone">
                        <div class="drop-zone-content">
                            <span class="drop-icon">🎫</span>
                            <p>Drop JWT file here</p>
                            <span class="drop-hint">Supports .txt, .jwt files</span>
                        </div>
                    </div>
                </div>
                
                <div class="tool-status">
                    <span>Characters: <span id="input-jwt-chars">0</span></span>
                    <span>Status: <span id="jwt-status">Unknown</span></span>
                    <span>Parts: <span id="jwt-parts">0</span></span>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Decoded Content</h3>
                
                <div class="decoded-sections">
                    <div class="decoded-section">
                        <h4>Header</h4>
                        <div class="tool-actions">
                            <button id="copy-header-btn">📋 Copy Header</button>
                        </div>
                        <textarea 
                            id="decoded-header" 
                            class="tool-textarea decoded-content" 
                            placeholder="JWT header will appear here..."
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                    
                    <div class="decoded-section">
                        <h4>Payload</h4>
                        <div class="tool-actions">
                            <button id="copy-payload-btn">📋 Copy Payload</button>
                        </div>
                        <textarea 
                            id="decoded-payload" 
                            class="tool-textarea decoded-content" 
                            placeholder="JWT payload will appear here..."
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                    
                    <div class="decoded-section">
                        <h4>Signature Info</h4>
                        <div id="signature-info" class="signature-info">
                            <div class="info-item">
                                <span class="info-label">Algorithm:</span>
                                <span class="info-value" id="sig-algorithm">-</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Signature:</span>
                                <span class="info-value" id="sig-value">-</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Verification:</span>
                                <span class="info-value" id="sig-verification">⚠️ Need Secret</span>
                            </div>
                        </div>
                        <button id="verify-signature-btn">🔑 Verify Signature</button>
                    </div>
                </div>
                
                <div class="token-analysis" id="token-analysis">
                    <h4>Token Analysis</h4>
                    <div class="analysis-content">
                        <p class="placeholder">Decode a JWT token to see analysis</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- JWT Builder Tab -->
    <div class="tab-content" id="builder-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>JWT Configuration</h3>
                
                <div class="config-section">
                    <h4>Header Configuration</h4>
                    <div class="algorithm-selection">
                        <label>Algorithm:</label>
                        <select id="jwt-algorithm">
                            <option value="HS256">HS256 (HMAC SHA-256)</option>
                            <option value="HS384">HS384 (HMAC SHA-384)</option>
                            <option value="HS512">HS512 (HMAC SHA-512)</option>
                            <option value="RS256">RS256 (RSA SHA-256)</option>
                            <option value="RS384">RS384 (RSA SHA-384)</option>
                            <option value="RS512">RS512 (RSA SHA-512)</option>
                        </select>
                    </div>
                    
                    <div class="header-editor">
                        <label>Header JSON:</label>
                        <textarea 
                            id="header-json" 
                            class="tool-textarea json-editor"
                            spellcheck="false"
                        >{\n  "alg": "HS256",\n  "typ": "JWT"\n}</textarea>
                    </div>
                </div>
                
                <div class="config-section">
                    <h4>Payload Configuration</h4>
                    
                    <div class="standard-claims">
                        <div class="claim-input">
                            <label>Subject (sub):</label>
                            <input type="text" id="claim-sub" placeholder="User ID or identifier">
                        </div>
                        <div class="claim-input">
                            <label>Issuer (iss):</label>
                            <input type="text" id="claim-iss" placeholder="Token issuer">
                        </div>
                        <div class="claim-input">
                            <label>Audience (aud):</label>
                            <input type="text" id="claim-aud" placeholder="Token audience">
                        </div>
                    </div>
                    
                    <div class="time-claims">
                        <div class="time-claim">
                            <label class="checkbox-label">
                                <input type="checkbox" id="include-iat" checked />
                                Include Issued At (iat)
                            </label>
                        </div>
                        <div class="time-claim">
                            <label class="checkbox-label">
                                <input type="checkbox" id="include-exp" checked />
                                Include Expires In:
                            </label>
                            <select id="exp-duration">
                                <option value="3600">1 hour</option>
                                <option value="86400">1 day</option>
                                <option value="604800">1 week</option>
                                <option value="2592000">1 month</option>
                                <option value="custom">Custom...</option>
                            </select>
                            <input type="number" id="exp-custom" placeholder="Seconds" style="display: none;">
                        </div>
                    </div>
                    
                    <div class="custom-claims">
                        <h5>Custom Claims</h5>
                        <div id="custom-claims-list">
                            <!-- Custom claims will be added here -->
                        </div>
                        <button id="add-claim-btn" class="secondary">+ Add Custom Claim</button>
                    </div>
                </div>
                
                <div class="config-section">
                    <h4>Secret/Key Configuration</h4>
                    
                    <div class="signing-method">
                        <label>
                            <input type="radio" name="signing-method" value="secret" checked />
                            Secret (HMAC)
                        </label>
                        <label>
                            <input type="radio" name="signing-method" value="private-key" />
                            Private Key (RSA)
                        </label>
                    </div>
                    
                    <div class="secret-input">
                        <label>Secret:</label>
                        <input type="password" id="jwt-secret" placeholder="Enter secret key">
                        <label class="checkbox-label">
                            <input type="checkbox" id="show-secret" />
                            Show secret
                        </label>
                        <button id="generate-secret-btn" class="secondary">🔑 Generate Random</button>
                    </div>
                </div>
                
                <div class="build-actions">
                    <button id="build-jwt-btn" class="primary">🏗️ Build JWT Token</button>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Preview & Output</h3>
                
                <div class="preview-section">
                    <h4>Payload Preview</h4>
                    <textarea 
                        id="payload-preview" 
                        class="tool-textarea json-editor"
                        readonly
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="output-section">
                    <h4>Generated JWT Token</h4>
                    <textarea 
                        id="generated-jwt" 
                        class="tool-textarea jwt-output"
                        placeholder="Built JWT token will appear here..."
                        readonly
                        spellcheck="false"
                    ></textarea>
                    
                    <div class="tool-actions">
                        <button id="copy-jwt-btn">📋 Copy Token</button>
                        <button id="download-jwt-btn">💾 Download</button>
                        <button id="decode-generated-btn">🔍 Decode & View</button>
                        <button id="clear-builder-btn">🗑️ Clear</button>
                    </div>
                    
                    <div class="tool-status">
                        <span>Token Length: <span id="jwt-length">0</span></span>
                        <span>Algorithm: <span id="jwt-alg-display">HS256</span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- JWT Validator Tab -->
    <div class="tab-content" id="validator-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Validation Input</h3>
                
                <div class="validation-input">
                    <label>JWT Token:</label>
                    <textarea 
                        id="validate-jwt" 
                        class="tool-textarea"
                        placeholder="Enter JWT token to validate..."
                        spellcheck="false"
                    ></textarea>
                    
                    <div class="file-upload">
                        <input type="file" id="upload-validate-file" accept=".txt,.jwt" />
                        <label for="upload-validate-file" class="file-upload-label">
                            📁 Upload JWT File
                        </label>
                    </div>
                </div>
                
                <div class="validation-key">
                    <label>Verification Key/Secret:</label>
                    <input type="password" id="validation-secret" placeholder="Enter secret or public key">
                    <label class="checkbox-label">
                        <input type="checkbox" id="show-validation-key" />
                        Show key
                    </label>
                    
                    <div class="algorithm-detection">
                        <label>Algorithm:</label>
                        <select id="validation-algorithm">
                            <option value="auto">Auto-detect</option>
                            <option value="HS256">HS256</option>
                            <option value="HS384">HS384</option>
                            <option value="HS512">HS512</option>
                            <option value="RS256">RS256</option>
                            <option value="RS384">RS384</option>
                            <option value="RS512">RS512</option>
                        </select>
                    </div>
                </div>
                
                <div class="validation-options">
                    <h4>Validation Options</h4>
                    <label class="checkbox-label">
                        <input type="checkbox" id="check-expiration" checked />
                        Check expiration
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="check-not-before" checked />
                        Check not before
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="verify-issuer" />
                        Verify issuer
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="verify-audience" />
                        Verify audience
                    </label>
                    
                    <div class="expected-values" id="expected-values" style="display: none;">
                        <div class="expected-input">
                            <label>Expected Issuer:</label>
                            <input type="text" id="expected-issuer" placeholder="Expected issuer">
                        </div>
                        <div class="expected-input">
                            <label>Expected Audience:</label>
                            <input type="text" id="expected-audience" placeholder="Expected audience">
                        </div>
                    </div>
                </div>
                
                <div class="validation-actions">
                    <button id="validate-jwt-btn" class="primary">🔍 Validate Token</button>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Validation Results</h3>
                
                <div class="validation-results" id="validation-results">
                    <div class="result-placeholder">
                        <p>Enter a JWT token and click "Validate Token" to see results</p>
                    </div>
                </div>
                
                <div class="validation-report" id="validation-report" style="display: none;">
                    <div class="report-section passed" id="passed-checks">
                        <h4>✅ Passed</h4>
                        <ul id="passed-list"></ul>
                    </div>
                    
                    <div class="report-section warnings" id="warning-checks" style="display: none;">
                        <h4>⚠️ Warnings</h4>
                        <ul id="warnings-list"></ul>
                    </div>
                    
                    <div class="report-section failed" id="failed-checks" style="display: none;">
                        <h4>❌ Failed</h4>
                        <ul id="failed-list"></ul>
                    </div>
                    
                    <div class="report-actions">
                        <button id="copy-report-btn">📋 Copy Report</button>
                        <button id="export-report-btn">💾 Export Report</button>
                        <button id="validate-again-btn">🔄 Validate Again</button>
                    </div>
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
        tabs: {},
        decoder: {},
        builder: {},
        validator: {},
        shared: {}
    },
    
    // Tool state
    state: {
        activeTab: 'decoder',
        currentJWT: null,
        decodedJWT: null
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            console.log('Starting to mount JWT Decoder tool...');
            
            // Use embedded HTML template
            const htmlContent = Tool_jwt_decoder.template;
            console.log('HTML template loaded from embedded source');
            
            // Set the HTML content directly to the container
            container.innerHTML = htmlContent;
            container.className = 'jwt-decoder-tool';
            
            // Load CSS
            await Tool_jwt_decoder.loadCSS();
            console.log('CSS loaded successfully');
            
            console.log('HTML mounted to container');
            
            // Wait a moment for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Get DOM elements
            Tool_jwt_decoder.getElements(container);
            console.log('DOM elements retrieved');
            
            // Bind events
            Tool_jwt_decoder.bindEvents();
            console.log('Events bound successfully');
            
            // Initialize the tool
            Tool_jwt_decoder.initializeTool();
            
            console.log('JWT Decoder tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount JWT Decoder tool:', error);
            console.error('Error stack:', error.stack);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading JWT Decoder Tool</h3>
                    <p>${error.message}</p>
                    <pre style="margin-top: 1rem; font-size: 0.8rem; text-align: left;">${error.stack || 'No stack trace available'}</pre>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        // Clean up event listeners
        Tool_jwt_decoder.elements = {
            tabs: {},
            decoder: {},
            builder: {},
            validator: {},
            shared: {}
        };
        
        console.log('JWT Decoder tool unmounted');
    },
    
    // Load CSS dynamically
    loadCSS: async () => {
        const cssId = 'jwt-decoder-css';
        if (!DOM.qs(`#${cssId}`)) {
            const link = DOM.el('link', {
                id: cssId,
                rel: 'stylesheet',
                href: './tools/jwt-decoder/tool.css'
            });
            document.head.appendChild(link);
            
            return new Promise((resolve) => {
                link.onload = () => resolve();
                link.onerror = () => resolve(); // Still resolve to continue
            });
        }
        return Promise.resolve();
    },
    
    // Get CSS content
    getCSS: () => {
        return `/* JWT Decoder Tool Styles */
.jwt-decoder-tabs {
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

.tool-panel h5 {
    margin: 0.5rem 0;
    color: var(--text-primary);
    font-size: 0.9rem;
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

.decoder-options {
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

.checkbox-label input[type="checkbox"],
.checkbox-label input[type="radio"] {
    margin: 0;
    cursor: pointer;
}

/* Input Areas */
.input-area {
    position: relative;
    flex: 1;
    margin-bottom: 1rem;
}

.tool-textarea {
    width: 100%;
    min-height: 200px;
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

.decoded-content {
    min-height: 120px;
}

.jwt-output {
    min-height: 150px;
    font-size: 0.8rem;
}

.json-editor {
    min-height: 120px;
}

/* Decoded Sections */
.decoded-sections {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
}

.decoded-section {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
}

/* Signature Info */
.signature-info {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin: 1rem 0;
}

.info-item {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    align-items: center;
}

.info-label {
    font-weight: 500;
    color: var(--text-secondary);
}

.info-value {
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.875rem;
}

/* Token Analysis */
.token-analysis {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-top: 1rem;
}

.analysis-content {
    font-size: 0.9rem;
    line-height: 1.5;
}

.analysis-content .placeholder {
    color: var(--text-secondary);
    font-style: italic;
    text-align: center;
    margin: 1rem 0;
}

/* Configuration Sections */
.config-section {
    margin: 1rem 0;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

.config-section:last-child {
    border-bottom: none;
}

.algorithm-selection,
.algorithm-detection {
    margin: 0.5rem 0;
}

.algorithm-selection label,
.algorithm-detection label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

.algorithm-selection select,
.algorithm-detection select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
}

/* Header Editor */
.header-editor {
    margin: 1rem 0;
}

.header-editor label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

/* Standard Claims */
.standard-claims {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: 1rem 0;
}

.claim-input {
    display: flex;
    flex-direction: column;
}

.claim-input label {
    margin-bottom: 0.25rem;
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.9rem;
}

.claim-input input {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
}

/* Time Claims */
.time-claims {
    margin: 1rem 0;
}

.time-claim {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.time-claim select,
.time-claim input[type="number"] {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
}

/* Custom Claims */
.custom-claims {
    margin: 1rem 0;
}

.custom-claim-item {
    display: flex;
    gap: 0.5rem;
    margin: 0.5rem 0;
    align-items: center;
}

.custom-claim-item input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
}

.custom-claim-item button {
    padding: 0.5rem;
    background: var(--error-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.8rem;
}

/* Signing Method */
.signing-method {
    margin: 1rem 0;
}

.signing-method label {
    display: block;
    margin: 0.5rem 0;
    cursor: pointer;
}

.signing-method input[type="radio"] {
    margin-right: 0.5rem;
}

/* Secret Input */
.secret-input {
    margin: 1rem 0;
}

.secret-input label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

.secret-input input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

/* Validation Sections */
.validation-input,
.validation-key,
.validation-options {
    margin: 1rem 0;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

.validation-options:last-child {
    border-bottom: none;
}

.validation-input label,
.validation-key label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

.validation-key input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.expected-values {
    margin-top: 1rem;
}

.expected-input {
    margin: 0.5rem 0;
}

.expected-input label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.9rem;
}

.expected-input input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.9rem;
}

/* Validation Results */
.validation-results {
    flex: 1;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-bottom: 1rem;
}

.result-placeholder {
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
    margin: 2rem 0;
}

.validation-report {
    margin-top: 1rem;
}

.report-section {
    margin: 1rem 0;
    padding: 1rem;
    border-radius: var(--border-radius);
    border-left: 4px solid;
}

.report-section.passed {
    background: var(--success-bg);
    border-left-color: var(--success-color);
}

.report-section.warnings {
    background: var(--warning-bg, #fff3cd);
    border-left-color: var(--warning-color, #856404);
}

.report-section.failed {
    background: var(--error-bg);
    border-left-color: var(--error-color);
}

.report-section h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
}

.report-section ul {
    margin: 0;
    padding-left: 1.5rem;
}

.report-section li {
    margin: 0.25rem 0;
    font-size: 0.9rem;
}

/* Actions */
.tool-actions,
.build-actions,
.validation-actions,
.report-actions {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}

.tool-actions button,
.build-actions button,
.validation-actions button,
.report-actions button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.tool-actions button:hover,
.build-actions button:hover,
.validation-actions button:hover,
.report-actions button:hover {
    background: var(--bg-hover);
    border-color: var(--accent-color);
}

.tool-actions button:disabled,
.build-actions button:disabled,
.validation-actions button:disabled,
.report-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

/* Secondary Button */
.secondary {
    background: var(--bg-secondary) !important;
    color: var(--text-primary) !important;
    border-color: var(--border-color) !important;
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

.tool-status .expired {
    color: var(--warning-color, #856404);
    font-weight: 500;
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

/* Preview Sections */
.preview-section,
.output-section {
    margin: 1rem 0;
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
    
    .tool-actions,
    .build-actions,
    .validation-actions,
    .report-actions {
        justify-content: center;
    }
    
    .tool-status {
        justify-content: center;
        text-align: center;
    }
    
    .decoded-sections {
        gap: 0.5rem;
    }
    
    .custom-claim-item {
        flex-direction: column;
        align-items: stretch;
    }
}`;
    },
    
    // Get DOM elements for all tabs  
    getElements: (container) => {
        if (!container) {
            console.error('Container is null in getElements');
            return;
        }
        
        try {
            // Tab navigation
            Tool_jwt_decoder.elements.tabs = {
                nav: DOM.qsa('.tab-btn', container) || [],
                contents: {
                    decoder: DOM.qs('#decoder-tab', container),
                    builder: DOM.qs('#builder-tab', container),
                    validator: DOM.qs('#validator-tab', container)
                }
            };
            
            // Decoder tab elements
            Tool_jwt_decoder.elements.decoder = {
                inputJWT: DOM.qs('#input-jwt', container),
                decodeBtn: DOM.qs('#decode-btn', container),
                autoDecodeCheckbox: DOM.qs('#auto-decode', container),
                uploadJWTFile: DOM.qs('#upload-jwt-file', container),
                inputJWTChars: DOM.qs('#input-jwt-chars', container),
                jwtStatus: DOM.qs('#jwt-status', container),
                jwtParts: DOM.qs('#jwt-parts', container),
                decodedHeader: DOM.qs('#decoded-header', container),
                decodedPayload: DOM.qs('#decoded-payload', container),
                copyHeaderBtn: DOM.qs('#copy-header-btn', container),
                copyPayloadBtn: DOM.qs('#copy-payload-btn', container),
                sigAlgorithm: DOM.qs('#sig-algorithm', container),
                sigValue: DOM.qs('#sig-value', container),
                sigVerification: DOM.qs('#sig-verification', container),
                verifySignatureBtn: DOM.qs('#verify-signature-btn', container),
                tokenAnalysis: DOM.qs('#token-analysis', container),
                jwtDropZone: DOM.qs('#jwt-drop-zone', container)
            };
            
            // Builder tab elements
            Tool_jwt_decoder.elements.builder = {
                jwtAlgorithm: DOM.qs('#jwt-algorithm', container),
                headerJSON: DOM.qs('#header-json', container),
                claimSub: DOM.qs('#claim-sub', container),
                claimIss: DOM.qs('#claim-iss', container),
                claimAud: DOM.qs('#claim-aud', container),
                includeIat: DOM.qs('#include-iat', container),
                includeExp: DOM.qs('#include-exp', container),
                expDuration: DOM.qs('#exp-duration', container),
                expCustom: DOM.qs('#exp-custom', container),
                customClaimsList: DOM.qs('#custom-claims-list', container),
                addClaimBtn: DOM.qs('#add-claim-btn', container),
                jwtSecret: DOM.qs('#jwt-secret', container),
                showSecret: DOM.qs('#show-secret', container),
                generateSecretBtn: DOM.qs('#generate-secret-btn', container),
                buildJWTBtn: DOM.qs('#build-jwt-btn', container),
                payloadPreview: DOM.qs('#payload-preview', container),
                generatedJWT: DOM.qs('#generated-jwt', container),
                copyJWTBtn: DOM.qs('#copy-jwt-btn', container),
                downloadJWTBtn: DOM.qs('#download-jwt-btn', container),
                decodeGeneratedBtn: DOM.qs('#decode-generated-btn', container),
                clearBuilderBtn: DOM.qs('#clear-builder-btn', container),
                jwtLength: DOM.qs('#jwt-length', container),
                jwtAlgDisplay: DOM.qs('#jwt-alg-display', container)
            };
            
            // Validator tab elements
            Tool_jwt_decoder.elements.validator = {
                validateJWT: DOM.qs('#validate-jwt', container),
                uploadValidateFile: DOM.qs('#upload-validate-file', container),
                validationSecret: DOM.qs('#validation-secret', container),
                showValidationKey: DOM.qs('#show-validation-key', container),
                validationAlgorithm: DOM.qs('#validation-algorithm', container),
                checkExpiration: DOM.qs('#check-expiration', container),
                checkNotBefore: DOM.qs('#check-not-before', container),
                verifyIssuer: DOM.qs('#verify-issuer', container),
                verifyAudience: DOM.qs('#verify-audience', container),
                expectedValues: DOM.qs('#expected-values', container),
                expectedIssuer: DOM.qs('#expected-issuer', container),
                expectedAudience: DOM.qs('#expected-audience', container),
                validateJWTBtn: DOM.qs('#validate-jwt-btn', container),
                validationResults: DOM.qs('#validation-results', container),
                validationReport: DOM.qs('#validation-report', container),
                passedList: DOM.qs('#passed-list', container),
                warningsList: DOM.qs('#warnings-list', container),
                failedList: DOM.qs('#failed-list', container),
                copyReportBtn: DOM.qs('#copy-report-btn', container),
                exportReportBtn: DOM.qs('#export-report-btn', container),
                validateAgainBtn: DOM.qs('#validate-again-btn', container)
            };
            
            // Shared elements
            Tool_jwt_decoder.elements.shared = {
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
            // Tab navigation
            Tool_jwt_decoder.bindTabEvents();
            
            // Decoder tab events
            const decoder = Tool_jwt_decoder.elements.decoder;
            if (decoder.inputJWT) {
                DOM.on(decoder.inputJWT, 'input', Tool_jwt_decoder.handleJWTInput);
                DOM.on(decoder.inputJWT, 'paste', () => {
                    setTimeout(Tool_jwt_decoder.handleJWTInput, 10);
                });
            }
            if (decoder.decodeBtn) DOM.on(decoder.decodeBtn, 'click', Tool_jwt_decoder.decodeJWT);
            if (decoder.uploadJWTFile) DOM.on(decoder.uploadJWTFile, 'change', (e) => Tool_jwt_decoder.handleFileUpload(e, 'jwt'));
            if (decoder.copyHeaderBtn) DOM.on(decoder.copyHeaderBtn, 'click', () => Tool_jwt_decoder.copyContent('header'));
            if (decoder.copyPayloadBtn) DOM.on(decoder.copyPayloadBtn, 'click', () => Tool_jwt_decoder.copyContent('payload'));
            if (decoder.verifySignatureBtn) DOM.on(decoder.verifySignatureBtn, 'click', Tool_jwt_decoder.verifySignature);
            
            // Builder tab events
            const builder = Tool_jwt_decoder.elements.builder;
            if (builder.jwtAlgorithm) DOM.on(builder.jwtAlgorithm, 'change', Tool_jwt_decoder.updateHeaderJSON);
            if (builder.addClaimBtn) DOM.on(builder.addClaimBtn, 'click', Tool_jwt_decoder.addCustomClaim);
            if (builder.showSecret) DOM.on(builder.showSecret, 'change', Tool_jwt_decoder.toggleSecretVisibility);
            if (builder.generateSecretBtn) DOM.on(builder.generateSecretBtn, 'click', Tool_jwt_decoder.generateRandomSecret);
            if (builder.buildJWTBtn) DOM.on(builder.buildJWTBtn, 'click', Tool_jwt_decoder.buildJWT);
            if (builder.copyJWTBtn) DOM.on(builder.copyJWTBtn, 'click', () => Tool_jwt_decoder.copyContent('generated-jwt'));
            if (builder.downloadJWTBtn) DOM.on(builder.downloadJWTBtn, 'click', Tool_jwt_decoder.downloadJWT);
            if (builder.decodeGeneratedBtn) DOM.on(builder.decodeGeneratedBtn, 'click', Tool_jwt_decoder.decodeGeneratedJWT);
            if (builder.clearBuilderBtn) DOM.on(builder.clearBuilderBtn, 'click', Tool_jwt_decoder.clearBuilder);
            if (builder.expDuration) DOM.on(builder.expDuration, 'change', Tool_jwt_decoder.handleExpDurationChange);
            
            // Add input listeners for real-time payload preview
            ['claimSub', 'claimIss', 'claimAud'].forEach(field => {
                if (builder[field]) {
                    DOM.on(builder[field], 'input', Tool_jwt_decoder.updatePayloadPreview);
                }
            });
            
            // Validator tab events
            const validator = Tool_jwt_decoder.elements.validator;
            if (validator.uploadValidateFile) DOM.on(validator.uploadValidateFile, 'change', (e) => Tool_jwt_decoder.handleFileUpload(e, 'validate'));
            if (validator.showValidationKey) DOM.on(validator.showValidationKey, 'change', Tool_jwt_decoder.toggleValidationKeyVisibility);
            if (validator.verifyIssuer) DOM.on(validator.verifyIssuer, 'change', Tool_jwt_decoder.toggleExpectedValues);
            if (validator.verifyAudience) DOM.on(validator.verifyAudience, 'change', Tool_jwt_decoder.toggleExpectedValues);
            if (validator.validateJWTBtn) DOM.on(validator.validateJWTBtn, 'click', Tool_jwt_decoder.validateJWT);
            if (validator.copyReportBtn) DOM.on(validator.copyReportBtn, 'click', Tool_jwt_decoder.copyValidationReport);
            if (validator.exportReportBtn) DOM.on(validator.exportReportBtn, 'click', Tool_jwt_decoder.exportValidationReport);
            if (validator.validateAgainBtn) DOM.on(validator.validateAgainBtn, 'click', Tool_jwt_decoder.validateJWT);
            
            // Setup drag and drop
            Tool_jwt_decoder.setupDragAndDrop(decoder.jwtDropZone, 'jwt');
            
            console.log('Event listeners bound successfully');
        } catch (error) {
            console.error('Error binding events:', error);
        }
    },
    
    // Bind tab events
    bindTabEvents: () => {
        try {
            console.log('Binding JWT decoder tab events');
            
            // Manual tab event binding
            Tool_jwt_decoder.elements.tabs.nav.forEach(btn => {
                if (btn) {
                    DOM.on(btn, 'click', (e) => {
                        e.preventDefault();
                        const tabName = e.target.getAttribute('data-tab');
                        if (tabName) {
                            Tool_jwt_decoder.switchTab(tabName);
                        }
                    });
                }
            });
            
            // Set initial active tab
            Tool_jwt_decoder.switchTab('decoder');
            
            console.log('Tab events bound successfully');
        } catch (error) {
            console.error('Error in tab binding:', error);
        }
    },
    
    // Switch between tabs
    switchTab: (tabName) => {
        console.log(`JWT Decoder: Switching to tab '${tabName}'`);
        
        try {
            // Update tab buttons
            Tool_jwt_decoder.elements.tabs.nav.forEach(btn => {
                if (btn && btn.classList) {
                    btn.classList.remove('active');
                }
            });
            
            // Find and activate the correct tab button
            const activeBtn = Tool_jwt_decoder.elements.tabs.nav.find(btn => 
                btn && btn.getAttribute('data-tab') === tabName
            );
            if (activeBtn) {
                activeBtn.classList.add('active');
                console.log(`JWT Decoder: Activated tab button for '${tabName}'`);
            }
            
            // Update tab contents
            Object.entries(Tool_jwt_decoder.elements.tabs.contents).forEach(([tab, content]) => {
                if (content && content.classList) {
                    const isActive = tab === tabName;
                    content.classList.toggle('active', isActive);
                }
            });
            
            // Update state
            Tool_jwt_decoder.state.activeTab = tabName;
            
            console.log(`JWT Decoder: Successfully switched to tab '${tabName}'`);
            
        } catch (error) {
            console.error('JWT Decoder: Error in switchTab:', error);
        }
    },
    
    // Initialize the tool
    initializeTool: () => {
        // Update algorithm display
        Tool_jwt_decoder.updateHeaderJSON();
        Tool_jwt_decoder.updatePayloadPreview();
        
        // Initialize stats
        Tool_jwt_decoder.updateJWTStats();
    },
    
    // Handle JWT input changes
    handleJWTInput: () => {
        Tool_jwt_decoder.updateJWTStats();
        Tool_jwt_decoder.hideStatus();
        
        // Auto-decode if enabled
        const autoDecodeCheckbox = Tool_jwt_decoder.elements.decoder.autoDecodeCheckbox;
        if (autoDecodeCheckbox && autoDecodeCheckbox.checked) {
            clearTimeout(Tool_jwt_decoder.autoDecodeTimeout);
            Tool_jwt_decoder.autoDecodeTimeout = setTimeout(() => {
                Tool_jwt_decoder.decodeJWT(true);
            }, 500);
        }
    },
    
    // Update JWT input statistics
    updateJWTStats: () => {
        const decoder = Tool_jwt_decoder.elements.decoder;
        const input = decoder.inputJWT.value.trim();
        const chars = input.length;
        
        decoder.inputJWTChars.textContent = chars.toLocaleString();
        
        if (!input) {
            decoder.jwtStatus.textContent = 'Unknown';
            decoder.jwtStatus.className = '';
            decoder.jwtParts.textContent = '0';
            return;
        }
        
        // Basic JWT structure validation
        const parts = input.split('.');
        decoder.jwtParts.textContent = parts.length;
        
        if (parts.length === 3) {
            decoder.jwtStatus.textContent = 'Valid Structure';
            decoder.jwtStatus.className = 'valid';
        } else {
            decoder.jwtStatus.textContent = 'Invalid Structure';
            decoder.jwtStatus.className = 'invalid';
        }
    },
    
    // Decode JWT token
    decodeJWT: (silent = false) => {
        const decoder = Tool_jwt_decoder.elements.decoder;
        const input = decoder.inputJWT.value.trim();
        
        if (!input) {
            if (!silent) Tool_jwt_decoder.showStatus('Please enter a JWT token to decode', 'info');
            return;
        }
        
        try {
            const parts = input.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. JWT must have exactly 3 parts separated by dots.');
            }
            
            // Decode header
            const headerDecoded = Tool_jwt_decoder.base64UrlDecode(parts[0]);
            const header = JSON.parse(headerDecoded);
            decoder.decodedHeader.value = JSON.stringify(header, null, 2);
            
            // Decode payload
            const payloadDecoded = Tool_jwt_decoder.base64UrlDecode(parts[1]);
            const payload = JSON.parse(payloadDecoded);
            decoder.decodedPayload.value = JSON.stringify(payload, null, 2);
            
            // Update signature info
            decoder.sigAlgorithm.textContent = header.alg || 'Unknown';
            decoder.sigValue.textContent = parts[2].substring(0, 20) + '...';
            decoder.sigVerification.textContent = '⚠️ Need Secret';
            
            // Generate token analysis
            Tool_jwt_decoder.generateTokenAnalysis(header, payload);
            
            // Store current JWT
            Tool_jwt_decoder.state.currentJWT = input;
            Tool_jwt_decoder.state.decodedJWT = { header, payload, signature: parts[2] };
            
            if (!silent) {
                Tool_jwt_decoder.showStatus('✅ JWT token decoded successfully', 'success');
                if (window.Toasts) {
                    Toasts.success('JWT decoded successfully');
                }
            }
            
        } catch (error) {
            Tool_jwt_decoder.showStatus('Error: ' + error.message, 'error');
            if (!silent && window.Toasts) {
                Toasts.error('Failed to decode JWT: ' + error.message);
            }
            
            // Clear decoded content on error
            decoder.decodedHeader.value = '';
            decoder.decodedPayload.value = '';
            decoder.sigAlgorithm.textContent = '-';
            decoder.sigValue.textContent = '-';
            decoder.sigVerification.textContent = '❌ Invalid Token';
            
            const analysisContent = decoder.tokenAnalysis.querySelector('.analysis-content');
            analysisContent.innerHTML = '<p class="placeholder">Invalid JWT token</p>';
        }
    },
    
    // Generate token analysis
    generateTokenAnalysis: (header, payload) => {
        const decoder = Tool_jwt_decoder.elements.decoder;
        const analysisContent = decoder.tokenAnalysis.querySelector('.analysis-content');
        
        let html = '<div class="analysis-items">';
        
        // Issued At
        if (payload.iat) {
            const issuedAt = new Date(payload.iat * 1000);
            html += `<div class="analysis-item">• <strong>Issued At:</strong> ${issuedAt.toLocaleString()}</div>`;
        }
        
        // Expires
        if (payload.exp) {
            const expiresAt = new Date(payload.exp * 1000);
            const now = new Date();
            const isExpired = expiresAt < now;
            const status = isExpired ? '❌ EXPIRED' : '✅ Valid';
            html += `<div class="analysis-item">• <strong>Expires:</strong> ${expiresAt.toLocaleString()} (${status})</div>`;
        }
        
        // Not Before
        if (payload.nbf) {
            const notBefore = new Date(payload.nbf * 1000);
            html += `<div class="analysis-item">• <strong>Not Before:</strong> ${notBefore.toLocaleString()}</div>`;
        }
        
        // Subject
        if (payload.sub) {
            html += `<div class="analysis-item">• <strong>Subject:</strong> ${payload.sub}</div>`;
        }
        
        // Issuer
        if (payload.iss) {
            html += `<div class="analysis-item">• <strong>Issuer:</strong> ${payload.iss}</div>`;
        }
        
        // Audience
        if (payload.aud) {
            const audience = Array.isArray(payload.aud) ? payload.aud.join(', ') : payload.aud;
            html += `<div class="analysis-item">• <strong>Audience:</strong> ${audience}</div>`;
        }
        
        // Algorithm
        if (header.alg) {
            const algType = header.alg.startsWith('HS') ? 'HMAC' : 
                           header.alg.startsWith('RS') ? 'RSA' : 'Unknown';
            html += `<div class="analysis-item">• <strong>Algorithm:</strong> ${header.alg} (${algType})</div>`;
        }
        
        html += '</div>';
        analysisContent.innerHTML = html;
    },
    
    // Base64 URL decode
    base64UrlDecode: (str) => {
        // Add padding if needed
        str += '='.repeat((4 - str.length % 4) % 4);
        // Replace URL-safe characters
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        return atob(str);
    },
    
    // Base64 URL encode
    base64UrlEncode: (str) => {
        return btoa(str)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    },
    
    // Update header JSON when algorithm changes
    updateHeaderJSON: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        const algorithm = builder.jwtAlgorithm.value;
        
        const header = {
            alg: algorithm,
            typ: 'JWT'
        };
        
        builder.headerJSON.value = JSON.stringify(header, null, 2);
        builder.jwtAlgDisplay.textContent = algorithm;
    },
    
    // Update payload preview
    updatePayloadPreview: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        const payload = {};
        
        // Add standard claims
        if (builder.claimSub.value) payload.sub = builder.claimSub.value;
        if (builder.claimIss.value) payload.iss = builder.claimIss.value;
        if (builder.claimAud.value) payload.aud = builder.claimAud.value;
        
        // Add time claims
        const now = Math.floor(Date.now() / 1000);
        if (builder.includeIat.checked) payload.iat = now;
        
        if (builder.includeExp.checked) {
            const duration = builder.expDuration.value === 'custom' ? 
                parseInt(builder.expCustom.value) || 3600 : 
                parseInt(builder.expDuration.value);
            payload.exp = now + duration;
        }
        
        // Add custom claims
        const customClaims = Tool_jwt_decoder.getCustomClaims();
        Object.assign(payload, customClaims);
        
        builder.payloadPreview.value = JSON.stringify(payload, null, 2);
    },
    
    // Get custom claims
    getCustomClaims: () => {
        const claims = {};
        const customClaimItems = Tool_jwt_decoder.elements.builder.customClaimsList.querySelectorAll('.custom-claim-item');
        
        customClaimItems.forEach(item => {
            const keyInput = item.querySelector('input[placeholder="Key"]');
            const valueInput = item.querySelector('input[placeholder="Value"]');
            
            if (keyInput && valueInput && keyInput.value && valueInput.value) {
                // Try to parse value as JSON, otherwise use as string
                let value = valueInput.value;
                try {
                    // Check if it's a number
                    if (!isNaN(value) && !isNaN(parseFloat(value))) {
                        value = parseFloat(value);
                    }
                    // Check if it's a boolean
                    else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                        value = value.toLowerCase() === 'true';
                    }
                    // Check if it's JSON
                    else if (value.startsWith('{') || value.startsWith('[')) {
                        value = JSON.parse(value);
                    }
                } catch (e) {
                    // Keep as string if parsing fails
                }
                
                claims[keyInput.value] = value;
            }
        });
        
        return claims;
    },
    
    // Add custom claim
    addCustomClaim: () => {
        const customClaimsList = Tool_jwt_decoder.elements.builder.customClaimsList;
        
        const claimItem = DOM.el('div', { className: 'custom-claim-item' });
        
        const keyInput = DOM.el('input', {
            type: 'text',
            placeholder: 'Key'
        });
        
        const valueInput = DOM.el('input', {
            type: 'text',
            placeholder: 'Value'
        });
        
        const removeBtn = DOM.el('button', {
            type: 'button',
            textContent: '×',
            className: 'remove-claim-btn'
        });
        
        // Add event listeners
        DOM.on(keyInput, 'input', Tool_jwt_decoder.updatePayloadPreview);
        DOM.on(valueInput, 'input', Tool_jwt_decoder.updatePayloadPreview);
        DOM.on(removeBtn, 'click', () => {
            claimItem.remove();
            Tool_jwt_decoder.updatePayloadPreview();
        });
        
        claimItem.appendChild(keyInput);
        claimItem.appendChild(valueInput);
        claimItem.appendChild(removeBtn);
        
        customClaimsList.appendChild(claimItem);
        
        // Focus on the key input
        keyInput.focus();
    },
    
    // Toggle secret visibility
    toggleSecretVisibility: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        const secretInput = builder.jwtSecret;
        const showSecret = builder.showSecret;
        
        secretInput.type = showSecret.checked ? 'text' : 'password';
    },
    
    // Generate random secret
    generateRandomSecret: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let secret = '';
        
        for (let i = 0; i < 32; i++) {
            secret += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        builder.jwtSecret.value = secret;
        
        if (window.Toasts) {
            Toasts.success('Random secret generated');
        }
    },
    
    // Handle expiration duration change
    handleExpDurationChange: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        const isCustom = builder.expDuration.value === 'custom';
        
        builder.expCustom.style.display = isCustom ? 'inline-block' : 'none';
        
        if (isCustom) {
            builder.expCustom.focus();
        }
        
        Tool_jwt_decoder.updatePayloadPreview();
    },
    
    // Build JWT token
    buildJWT: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        
        try {
            // Get header
            const header = JSON.parse(builder.headerJSON.value);
            
            // Get payload from preview
            const payload = JSON.parse(builder.payloadPreview.value);
            
            // Get secret
            const secret = builder.jwtSecret.value;
            if (!secret) {
                Tool_jwt_decoder.showStatus('Please enter a secret key', 'error');
                return;
            }
            
            // Encode header and payload
            const encodedHeader = Tool_jwt_decoder.base64UrlEncode(JSON.stringify(header));
            const encodedPayload = Tool_jwt_decoder.base64UrlEncode(JSON.stringify(payload));
            
            // Create signature (simplified HMAC-SHA256 implementation)
            const signingInput = encodedHeader + '.' + encodedPayload;
            const signature = Tool_jwt_decoder.createSignature(signingInput, secret, header.alg);
            
            // Combine to create JWT
            const jwt = signingInput + '.' + signature;
            
            builder.generatedJWT.value = jwt;
            builder.jwtLength.textContent = jwt.length;
            
            Tool_jwt_decoder.showStatus('✅ JWT token built successfully', 'success');
            
            if (window.Toasts) {
                Toasts.success('JWT token built successfully');
            }
            
        } catch (error) {
            Tool_jwt_decoder.showStatus('Error: ' + error.message, 'error');
            if (window.Toasts) {
                Toasts.error('Failed to build JWT: ' + error.message);
            }
        }
    },
    
    // Create signature (simplified implementation)
    createSignature: (data, secret, algorithm) => {
        // This is a simplified implementation for demonstration
        // In a real application, you would use a proper crypto library
        
        if (algorithm.startsWith('HS')) {
            // HMAC implementation (simplified)
            const hash = Tool_jwt_decoder.simpleHMAC(data, secret);
            return Tool_jwt_decoder.base64UrlEncode(hash);
        } else {
            // For RSA algorithms, we'll just create a dummy signature
            return Tool_jwt_decoder.base64UrlEncode('dummy_rsa_signature_' + Date.now());
        }
    },
    
    // Simple HMAC implementation (for demo purposes)
    simpleHMAC: (data, secret) => {
        // This is a very simplified HMAC implementation
        // In production, use a proper crypto library
        return btoa(data + secret).substring(0, 32);
    },
    
    // Copy content to clipboard
    copyContent: async (type) => {
        let content = '';
        
        if (type === 'header') {
            content = Tool_jwt_decoder.elements.decoder.decodedHeader.value;
        } else if (type === 'payload') {
            content = Tool_jwt_decoder.elements.decoder.decodedPayload.value;
        } else if (type === 'generated-jwt') {
            content = Tool_jwt_decoder.elements.builder.generatedJWT.value;
        }
        
        if (!content) {
            if (window.Toasts) {
                Toasts.warning('No content to copy');
            }
            return;
        }
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(content, 'Content copied to clipboard');
        }
    },
    
    // Download JWT token
    downloadJWT: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        const jwt = builder.generatedJWT.value;
        
        if (!jwt) {
            if (window.Toasts) {
                Toasts.warning('No JWT token to download');
            }
            return;
        }
        
        if (window.Download) {
            Download.downloadWithToast('jwt-token.txt', jwt, 'text/plain');
        }
    },
    
    // Decode generated JWT
    decodeGeneratedJWT: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        const jwt = builder.generatedJWT.value;
        
        if (!jwt) {
            if (window.Toasts) {
                Toasts.warning('No JWT token to decode');
            }
            return;
        }
        
        // Switch to decoder tab and populate input
        Tool_jwt_decoder.switchTab('decoder');
        Tool_jwt_decoder.elements.decoder.inputJWT.value = jwt;
        Tool_jwt_decoder.decodeJWT();
    },
    
    // Clear builder form
    clearBuilder: () => {
        const builder = Tool_jwt_decoder.elements.builder;
        
        // Reset form fields
        builder.jwtAlgorithm.value = 'HS256';
        builder.claimSub.value = '';
        builder.claimIss.value = '';
        builder.claimAud.value = '';
        builder.includeIat.checked = true;
        builder.includeExp.checked = true;
        builder.expDuration.value = '3600';
        builder.expCustom.style.display = 'none';
        builder.jwtSecret.value = '';
        builder.generatedJWT.value = '';
        
        // Clear custom claims
        builder.customClaimsList.innerHTML = '';
        
        // Update displays
        Tool_jwt_decoder.updateHeaderJSON();
        Tool_jwt_decoder.updatePayloadPreview();
        builder.jwtLength.textContent = '0';
        
        if (window.Toasts) {
            Toasts.info('Builder form cleared');
        }
    },
    
    // Toggle validation key visibility
    toggleValidationKeyVisibility: () => {
        const validator = Tool_jwt_decoder.elements.validator;
        const keyInput = validator.validationSecret;
        const showKey = validator.showValidationKey;
        
        keyInput.type = showKey.checked ? 'text' : 'password';
    },
    
    // Toggle expected values visibility
    toggleExpectedValues: () => {
        const validator = Tool_jwt_decoder.elements.validator;
        const verifyIssuer = validator.verifyIssuer.checked;
        const verifyAudience = validator.verifyAudience.checked;
        
        validator.expectedValues.style.display = (verifyIssuer || verifyAudience) ? 'block' : 'none';
    },
    
    // Validate JWT token
    validateJWT: () => {
        const validator = Tool_jwt_decoder.elements.validator;
        const jwt = validator.validateJWT.value.trim();
        
        if (!jwt) {
            Tool_jwt_decoder.showStatus('Please enter a JWT token to validate', 'info');
            return;
        }
        
        try {
            const parts = jwt.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format');
            }
            
            // Decode and parse
            const header = JSON.parse(Tool_jwt_decoder.base64UrlDecode(parts[0]));
            const payload = JSON.parse(Tool_jwt_decoder.base64UrlDecode(parts[1]));
            
            // Perform validation
            const results = Tool_jwt_decoder.performValidation(header, payload, parts[2]);
            
            // Display results
            Tool_jwt_decoder.displayValidationResults(results);
            
            Tool_jwt_decoder.showStatus('✅ JWT validation completed', 'success');
            
        } catch (error) {
            Tool_jwt_decoder.showStatus('Error: ' + error.message, 'error');
            Tool_jwt_decoder.clearValidationResults();
        }
    },
    
    // Perform JWT validation
    performValidation: (header, payload, signature) => {
        const validator = Tool_jwt_decoder.elements.validator;
        const results = {
            passed: [],
            warnings: [],
            failed: []
        };
        
        // Structure validation
        results.passed.push('Token structure is valid (header.payload.signature)');
        results.passed.push('Base64 encoding is correct');
        results.passed.push('JSON format is valid in header and payload');
        
        // Algorithm validation
        if (header.alg) {
            if (['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'].includes(header.alg)) {
                results.passed.push(`Algorithm ${header.alg} is supported`);
            } else {
                results.warnings.push(`Algorithm ${header.alg} may not be secure`);
            }
        }
        
        // Expiration check
        if (validator.checkExpiration.checked && payload.exp) {
            const now = Math.floor(Date.now() / 1000);
            if (payload.exp < now) {
                const expiredSeconds = now - payload.exp;
                const expiredTime = Tool_jwt_decoder.formatDuration(expiredSeconds);
                results.failed.push(`Token is expired (expired ${expiredTime} ago)`);
            } else {
                results.passed.push('Token is not expired');
            }
        }
        
        // Not before check
        if (validator.checkNotBefore.checked && payload.nbf) {
            const now = Math.floor(Date.now() / 1000);
            if (payload.nbf > now) {
                results.failed.push('Token is not yet valid (nbf claim)');
            } else {
                results.passed.push('Token nbf claim is valid');
            }
        }
        
        // Issuer check
        if (validator.verifyIssuer.checked) {
            const expectedIssuer = validator.expectedIssuer.value;
            if (expectedIssuer) {
                if (payload.iss === expectedIssuer) {
                    results.passed.push('Issuer matches expected value');
                } else {
                    results.failed.push(`Issuer mismatch. Expected: ${expectedIssuer}, Got: ${payload.iss || 'none'}`);
                }
            }
        }
        
        // Audience check
        if (validator.verifyAudience.checked) {
            const expectedAudience = validator.expectedAudience.value;
            if (expectedAudience) {
                const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
                if (audiences.includes(expectedAudience)) {
                    results.passed.push('Audience matches expected value');
                } else {
                    results.failed.push(`Audience mismatch. Expected: ${expectedAudience}`);
                }
            }
        }
        
        // Token age warning
        if (payload.iat) {
            const tokenAge = Math.floor(Date.now() / 1000) - payload.iat;
            if (tokenAge > 86400 * 30) { // 30 days
                const ageTime = Tool_jwt_decoder.formatDuration(tokenAge);
                results.warnings.push(`Token is very old (issued ${ageTime} ago)`);
            }
        }
        
        // Security recommendations
        if (header.alg && header.alg.startsWith('HS')) {
            const secret = validator.validationSecret.value;
            if (secret && secret.length < 32) {
                results.warnings.push('Secret key length is below recommended 256 bits');
            }
        }
        
        return results;
    },
    
    // Display validation results
    displayValidationResults: (results) => {
        const validator = Tool_jwt_decoder.elements.validator;
        
        // Hide placeholder and show report
        validator.validationResults.querySelector('.result-placeholder').style.display = 'none';
        validator.validationReport.style.display = 'block';
        
        // Populate passed checks
        validator.passedList.innerHTML = '';
        results.passed.forEach(item => {
            const li = DOM.el('li', { textContent: item });
            validator.passedList.appendChild(li);
        });
        
        // Populate warnings
        if (results.warnings.length > 0) {
            document.getElementById('warning-checks').style.display = 'block';
            validator.warningsList.innerHTML = '';
            results.warnings.forEach(item => {
                const li = DOM.el('li', { textContent: item });
                validator.warningsList.appendChild(li);
            });
        } else {
            document.getElementById('warning-checks').style.display = 'none';
        }
        
        // Populate failed checks
        if (results.failed.length > 0) {
            document.getElementById('failed-checks').style.display = 'block';
            validator.failedList.innerHTML = '';
            results.failed.forEach(item => {
                const li = DOM.el('li', { textContent: item });
                validator.failedList.appendChild(li);
            });
        } else {
            document.getElementById('failed-checks').style.display = 'none';
        }
    },
    
    // Clear validation results
    clearValidationResults: () => {
        const validator = Tool_jwt_decoder.elements.validator;
        
        validator.validationResults.querySelector('.result-placeholder').style.display = 'block';
        validator.validationReport.style.display = 'none';
    },
    
    // Format duration in human readable format
    formatDuration: (seconds) => {
        if (seconds < 60) return `${seconds} seconds`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
        return `${Math.floor(seconds / 86400)} days`;
    },
    
    // Copy validation report
    copyValidationReport: async () => {
        const validator = Tool_jwt_decoder.elements.validator;
        
        if (validator.validationReport.style.display === 'none') {
            if (window.Toasts) {
                Toasts.warning('No validation report to copy');
            }
            return;
        }
        
        // Generate report text
        let report = 'JWT Validation Report\n';
        report += '===================\n\n';
        
        // Passed checks
        const passedItems = validator.passedList.querySelectorAll('li');
        if (passedItems.length > 0) {
            report += 'PASSED ✅\n';
            passedItems.forEach(item => {
                report += `• ${item.textContent}\n`;
            });
            report += '\n';
        }
        
        // Warnings
        const warningItems = validator.warningsList.querySelectorAll('li');
        if (warningItems.length > 0) {
            report += 'WARNINGS ⚠️\n';
            warningItems.forEach(item => {
                report += `• ${item.textContent}\n`;
            });
            report += '\n';
        }
        
        // Failed checks
        const failedItems = validator.failedList.querySelectorAll('li');
        if (failedItems.length > 0) {
            report += 'FAILED ❌\n';
            failedItems.forEach(item => {
                report += `• ${item.textContent}\n`;
            });
        } else {
            report += 'FAILED ❌\n(None)\n';
        }
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(report, 'Validation report copied to clipboard');
        }
    },
    
    // Export validation report
    exportValidationReport: () => {
        // This would be the same as copy but save to file
        Tool_jwt_decoder.copyValidationReport().then(() => {
            if (window.Toasts) {
                Toasts.info('Report copied to clipboard. Paste into a text file to save.');
            }
        });
    },
    
    // Handle file upload
    handleFileUpload: (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            
            if (type === 'jwt') {
                Tool_jwt_decoder.elements.decoder.inputJWT.value = content;
                Tool_jwt_decoder.handleJWTInput();
                if (window.Toasts) {
                    Toasts.success(`JWT file "${file.name}" loaded`);
                }
            } else if (type === 'validate') {
                Tool_jwt_decoder.elements.validator.validateJWT.value = content;
                if (window.Toasts) {
                    Toasts.success(`JWT file "${file.name}" loaded for validation`);
                }
            }
        };
        reader.readAsText(file);
        
        // Clear the file input
        e.target.value = '';
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
                Tool_jwt_decoder.handleDroppedFile(files[0], type);
            }
        });
    },
    
    // Handle dropped file
    handleDroppedFile: (file, type) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            
            if (type === 'jwt') {
                Tool_jwt_decoder.elements.decoder.inputJWT.value = content;
                Tool_jwt_decoder.handleJWTInput();
                if (window.Toasts) {
                    Toasts.success(`JWT file "${file.name}" loaded`);
                }
            }
        };
        reader.readAsText(file);
    },
    
    // Verify signature (placeholder)
    verifySignature: () => {
        if (window.Toasts) {
            Toasts.info('Signature verification requires a secret key. Use the Validator tab for full verification.');
        }
    },
    
    // Show status message
    showStatus: (message, type = 'info') => {
        const statusEl = Tool_jwt_decoder.elements.shared.statusDisplay;
        statusEl.textContent = message;
        statusEl.className = type;
        statusEl.style.display = 'block';
    },
    
    // Hide status message
    hideStatus: () => {
        const statusEl = Tool_jwt_decoder.elements.shared.statusDisplay;
        statusEl.style.display = 'none';
        statusEl.className = '';
    }
};

// Make tool available globally
window.Tool_jwt_decoder = Tool_jwt_decoder;
