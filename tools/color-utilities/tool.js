// Color Utilities Tool - Color Converter & Contrast Checker
const Tool_color_utilities = {
    // Tool metadata
    metadata: {
        id: 'color-utilities',
        name: 'Color Utilities',
        icon: '🎨'
    },
    
    // HTML template embedded to avoid CORS issues
    template: `<!-- Color Utilities Tool Tabs -->
<div class="color-utilities-tabs">
    <div class="tab-nav">
        <button class="tab-btn active" data-tab="converter">Color Converter</button>
        <button class="tab-btn" data-tab="contrast">Contrast Checker</button>
    </div>
    
    <!-- Color Converter Tab -->
    <div class="tab-content active" id="converter-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Input & Picker</h3>
                
                <div class="tool-controls">
                    <label>Color Input:</label>
                    <div class="input-group">
                        <input type="text" id="color-input" class="color-text-input" placeholder="#3B82F6" value="#3B82F6" />
                        <input type="color" id="color-picker-input" class="color-picker-btn" value="#3B82F6" title="Pick a color" />
                    </div>
                </div>
                
                <div class="color-swatch-container">
                    <div id="color-swatch" class="color-swatch" style="background-color: #3B82F6;">
                        <span class="swatch-label">#3B82F6</span>
                    </div>
                </div>
                
                <div class="alpha-control">
                    <label>Alpha Channel: <span id="alpha-value">100%</span></label>
                    <input type="range" id="alpha-slider" min="0" max="100" value="100" class="slider" />
                </div>
                
                <div class="visual-picker-section">
                    <h4>Visual Color Picker:</h4>
                    <div class="visual-picker">
                        <canvas id="saturation-lightness-picker" width="200" height="200"></canvas>
                        <div class="picker-cursor" id="sl-cursor"></div>
                    </div>
                    <div class="hue-slider-container">
                        <label>Hue:</label>
                        <input type="range" id="hue-slider" min="0" max="360" value="217" class="slider hue-slider" />
                    </div>
                </div>
                
                <div class="recent-colors">
                    <label>Recent Colors:</label>
                    <div id="recent-colors-list" class="recent-colors-list">
                        <!-- Recent colors will be added here -->
                    </div>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Output & Formats</h3>
                
                <div class="format-outputs">
                    <div class="format-item">
                        <label>HEX</label>
                        <div class="format-value-group">
                            <input type="text" id="hex-output" class="format-output" readonly value="#3B82F6" />
                            <button class="copy-btn-small" data-copy="hex">📋</button>
                        </div>
                    </div>
                    
                    <div class="format-item">
                        <label>RGB</label>
                        <div class="format-value-group">
                            <input type="text" id="rgb-output" class="format-output" readonly value="rgb(59, 130, 246)" />
                            <button class="copy-btn-small" data-copy="rgb">📋</button>
                        </div>
                    </div>
                    
                    <div class="format-item">
                        <label>HSL</label>
                        <div class="format-value-group">
                            <input type="text" id="hsl-output" class="format-output" readonly value="hsl(217, 91%, 60%)" />
                            <button class="copy-btn-small" data-copy="hsl">📋</button>
                        </div>
                    </div>
                    
                    <div class="format-item">
                        <label>RGBA</label>
                        <div class="format-value-group">
                            <input type="text" id="rgba-output" class="format-output" readonly value="rgba(59, 130, 246, 1.0)" />
                            <button class="copy-btn-small" data-copy="rgba">📋</button>
                        </div>
                    </div>
                    
                    <div class="format-item">
                        <label>HSLA</label>
                        <div class="format-value-group">
                            <input type="text" id="hsla-output" class="format-output" readonly value="hsla(217, 91%, 60%, 1.0)" />
                            <button class="copy-btn-small" data-copy="hsla">📋</button>
                        </div>
                    </div>
                </div>
                
                <div class="color-info">
                    <h4>Color Info:</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Brightness:</span>
                            <span id="brightness-value" class="info-value">66%</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Luminance:</span>
                            <span id="luminance-value" class="info-value">0.45</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Perceived:</span>
                            <span id="perceived-value" class="info-value">Light</span>
                        </div>
                    </div>
                </div>
                
                <div class="tool-actions">
                    <button id="copy-all-btn" class="primary">📋 Copy All Formats</button>
                    <button id="download-css-btn">💾 Download CSS</button>
                    <button id="clear-converter-btn">🗑️ Clear</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Contrast Checker Tab -->
    <div class="tab-content" id="contrast-tab">
        <div class="tool-layout">
            <div class="tool-panel">
                <h3>Color Selection</h3>
                
                <div class="contrast-color-input">
                    <label>Foreground Color:</label>
                    <div class="input-group">
                        <input type="text" id="fg-color-input" class="color-text-input" placeholder="#000000" value="#000000" />
                        <input type="color" id="fg-color-picker" class="color-picker-btn" value="#000000" title="Pick foreground color" />
                    </div>
                    <div class="color-preview-small" id="fg-preview" style="background-color: #000000;">
                        <span class="preview-label">#000000</span>
                    </div>
                </div>
                
                <div class="contrast-color-input">
                    <label>Background Color:</label>
                    <div class="input-group">
                        <input type="text" id="bg-color-input" class="color-text-input" placeholder="#FFFFFF" value="#FFFFFF" />
                        <input type="color" id="bg-color-picker" class="color-picker-btn" value="#FFFFFF" title="Pick background color" />
                    </div>
                    <div class="color-preview-small" id="bg-preview" style="background-color: #FFFFFF;">
                        <span class="preview-label" style="color: #000000;">#FFFFFF</span>
                    </div>
                </div>
                
                <div class="tool-controls">
                    <button id="swap-colors-btn">🔄 Swap Colors</button>
                </div>
                
                <div class="preview-panel">
                    <h4>Preview:</h4>
                    <div id="contrast-preview" class="contrast-preview" style="background-color: #FFFFFF; color: #000000;">
                        <div class="preview-text-large">Sample Text Here</div>
                        <div class="preview-text-small">Background: #FFFFFF</div>
                        <div class="preview-text-small">Foreground: #000000</div>
                        <div class="preview-text-xlarge">Aa Bb 123</div>
                    </div>
                </div>
                
                <div class="font-size-buttons">
                    <label>Font Size Preview:</label>
                    <div class="button-group">
                        <button class="size-btn" data-size="18">18px</button>
                        <button class="size-btn active" data-size="24">24px</button>
                        <button class="size-btn" data-size="32">32px</button>
                    </div>
                </div>
                
                <div class="tool-actions">
                    <button id="copy-contrast-colors-btn">📋 Copy Colors</button>
                    <button id="clear-contrast-btn">🗑️ Clear</button>
                </div>
            </div>
            
            <div class="tool-panel">
                <h3>Contrast Results</h3>
                
                <div class="contrast-ratio-display">
                    <div class="ratio-value" id="contrast-ratio">21:1</div>
                    <div class="ratio-label">Contrast Ratio</div>
                </div>
                
                <div class="wcag-results">
                    <h4>WCAG AA Compliance:</h4>
                    <div class="compliance-list">
                        <div class="compliance-item" id="aa-normal">
                            <span class="status-icon">✓</span>
                            <span class="compliance-text">Normal Text (18pt+)</span>
                            <span class="compliance-ratio">PASS (needs 3:1)</span>
                        </div>
                        <div class="compliance-item" id="aa-large">
                            <span class="status-icon">✓</span>
                            <span class="compliance-text">Large Text (24pt+)</span>
                            <span class="compliance-ratio">PASS (needs 3:1)</span>
                        </div>
                        <div class="compliance-item" id="aa-small">
                            <span class="status-icon">✓</span>
                            <span class="compliance-text">Small Text (&lt; 18pt)</span>
                            <span class="compliance-ratio">PASS (needs 4.5:1)</span>
                        </div>
                    </div>
                </div>
                
                <div class="wcag-results">
                    <h4>WCAG AAA Compliance:</h4>
                    <div class="compliance-list">
                        <div class="compliance-item" id="aaa-normal">
                            <span class="status-icon">✓</span>
                            <span class="compliance-text">Normal Text (18pt+)</span>
                            <span class="compliance-ratio">PASS (needs 4.5:1)</span>
                        </div>
                        <div class="compliance-item" id="aaa-large">
                            <span class="status-icon">✓</span>
                            <span class="compliance-text">Large Text (24pt+)</span>
                            <span class="compliance-ratio">PASS (needs 4.5:1)</span>
                        </div>
                        <div class="compliance-item" id="aaa-small">
                            <span class="status-icon">✓</span>
                            <span class="compliance-text">Small Text (&lt; 18pt)</span>
                            <span class="compliance-ratio">PASS (needs 7:1)</span>
                        </div>
                    </div>
                </div>
                
                <div class="recommendations">
                    <h4>Recommendations:</h4>
                    <div id="recommendations-list" class="recommendations-list">
                        <div class="recommendation-item success">✓ Excellent contrast</div>
                        <div class="recommendation-item success">✓ Suitable for all uses</div>
                        <div class="recommendation-item success">✓ Meets all WCAG standards</div>
                    </div>
                </div>
                
                <div class="tool-actions">
                    <button id="copy-report-btn">📋 Copy Report</button>
                    <button id="download-report-btn">💾 Download Report</button>
                </div>
            </div>
        </div>
    </div>
</div>`,
    
    // DOM elements
    elements: {
        tabs: {},
        converter: {},
        contrast: {}
    },
    
    // Tool state
    state: {
        activeTab: 'converter',
        currentColor: { r: 59, g: 130, b: 246 },
        currentAlpha: 1.0,
        currentHSL: { h: 217, s: 91, l: 60 },
        recentColors: [],
        foregroundColor: { r: 0, g: 0, b: 0 },
        backgroundColor: { r: 255, g: 255, b: 255 },
        isUpdatingPicker: false
    },
    
    // Mount the tool
    mount: async (container) => {
        try {
            console.log('Mounting Color Utilities tool...');
            
            // Set HTML content
            container.innerHTML = Tool_color_utilities.template;
            container.className = 'color-utilities';
            
            // Wait for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Get DOM elements
            Tool_color_utilities.getElements(container);
            
            // Initialize subtabs
            Tool_color_utilities.initializeSubTabs(container);
            
            // Bind events
            Tool_color_utilities.bindEvents();
            
            // Load saved state
            Tool_color_utilities.loadState();
            
            // Initialize visual picker
            Tool_color_utilities.initializeVisualPicker();
            
            // Update initial display
            Tool_color_utilities.updateConverterDisplay();
            Tool_color_utilities.updateContrastDisplay();
            
            console.log('Color Utilities tool mounted successfully');
            
        } catch (error) {
            console.error('Failed to mount Color Utilities tool:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h3>Error loading Color Utilities</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    },
    
    // Unmount the tool
    unmount: () => {
        Tool_color_utilities.saveState();
        Tool_color_utilities.elements = {
            tabs: {},
            converter: {},
            contrast: {}
        };
        console.log('Color Utilities tool unmounted');
    },
    
    // Initialize SubTabs
    initializeSubTabs: (container) => {
        try {
            const tabNavButtons = Array.from(DOM.qsa('.tab-btn', container));
            
            const tabStructure = {
                tabs: {
                    nav: tabNavButtons,
                    contents: {
                        converter: DOM.qs('#converter-tab', container),
                        contrast: DOM.qs('#contrast-tab', container)
                    }
                }
            };
            
            if (!SubTabs.validateTabStructure(tabStructure)) {
                console.error('Invalid tab structure');
                return false;
            }
            
            const switchTabCallback = (tabName) => {
                SubTabs.switchTab(container, tabName, tabStructure);
                Tool_color_utilities.state.activeTab = tabName;
            };
            
            SubTabs.bindTabEvents(container, tabStructure, switchTabCallback);
            SubTabs.setInitialTab(container, 'converter', tabStructure, switchTabCallback);
            
            Tool_color_utilities.elements.tabs = tabStructure.tabs;
            
            return true;
        } catch (error) {
            console.error('Error initializing SubTabs:', error);
            return false;
        }
    },
    
    // Get DOM elements
    getElements: (container) => {
        // Converter elements
        Tool_color_utilities.elements.converter = {
            colorInput: DOM.qs('#color-input', container),
            colorPickerInput: DOM.qs('#color-picker-input', container),
            colorSwatch: DOM.qs('#color-swatch', container),
            swatchLabel: DOM.qs('.swatch-label', container),
            alphaSlider: DOM.qs('#alpha-slider', container),
            alphaValue: DOM.qs('#alpha-value', container),
            slPicker: DOM.qs('#saturation-lightness-picker', container),
            slCursor: DOM.qs('#sl-cursor', container),
            hueSlider: DOM.qs('#hue-slider', container),
            recentColorsList: DOM.qs('#recent-colors-list', container),
            hexOutput: DOM.qs('#hex-output', container),
            rgbOutput: DOM.qs('#rgb-output', container),
            hslOutput: DOM.qs('#hsl-output', container),
            rgbaOutput: DOM.qs('#rgba-output', container),
            hslaOutput: DOM.qs('#hsla-output', container),
            brightnessValue: DOM.qs('#brightness-value', container),
            luminanceValue: DOM.qs('#luminance-value', container),
            perceivedValue: DOM.qs('#perceived-value', container),
            copyAllBtn: DOM.qs('#copy-all-btn', container),
            downloadCssBtn: DOM.qs('#download-css-btn', container),
            clearConverterBtn: DOM.qs('#clear-converter-btn', container)
        };
        
        // Contrast checker elements
        Tool_color_utilities.elements.contrast = {
            fgColorInput: DOM.qs('#fg-color-input', container),
            fgColorPicker: DOM.qs('#fg-color-picker', container),
            fgPreview: DOM.qs('#fg-preview', container),
            bgColorInput: DOM.qs('#bg-color-input', container),
            bgColorPicker: DOM.qs('#bg-color-picker', container),
            bgPreview: DOM.qs('#bg-preview', container),
            swapColorsBtn: DOM.qs('#swap-colors-btn', container),
            contrastPreview: DOM.qs('#contrast-preview', container),
            contrastRatio: DOM.qs('#contrast-ratio', container),
            copyContrastColorsBtn: DOM.qs('#copy-contrast-colors-btn', container),
            clearContrastBtn: DOM.qs('#clear-contrast-btn', container),
            copyReportBtn: DOM.qs('#copy-report-btn', container),
            downloadReportBtn: DOM.qs('#download-report-btn', container),
            recommendationsList: DOM.qs('#recommendations-list', container)
        };
    },
    
    // Bind event listeners
    bindEvents: () => {
        const conv = Tool_color_utilities.elements.converter;
        const cont = Tool_color_utilities.elements.contrast;
        
        // Converter events
        if (conv.colorInput) {
            DOM.on(conv.colorInput, 'input', Tool_color_utilities.handleColorInput);
            DOM.on(conv.colorInput, 'change', Tool_color_utilities.handleColorInput);
        }
        if (conv.colorPickerInput) {
            DOM.on(conv.colorPickerInput, 'input', Tool_color_utilities.handleColorPickerInput);
        }
        if (conv.alphaSlider) {
            DOM.on(conv.alphaSlider, 'input', Tool_color_utilities.handleAlphaChange);
        }
        if (conv.hueSlider) {
            DOM.on(conv.hueSlider, 'input', Tool_color_utilities.handleHueChange);
        }
        if (conv.slPicker) {
            DOM.on(conv.slPicker, 'mousedown', Tool_color_utilities.handlePickerMouseDown);
        }
        if (conv.copyAllBtn) {
            DOM.on(conv.copyAllBtn, 'click', Tool_color_utilities.copyAllFormats);
        }
        if (conv.downloadCssBtn) {
            DOM.on(conv.downloadCssBtn, 'click', Tool_color_utilities.downloadCSS);
        }
        if (conv.clearConverterBtn) {
            DOM.on(conv.clearConverterBtn, 'click', Tool_color_utilities.clearConverter);
        }
        
        // Copy buttons for individual formats
        const copyButtons = DOM.qsa('.copy-btn-small');
        copyButtons.forEach(btn => {
            DOM.on(btn, 'click', (e) => {
                const format = e.target.getAttribute('data-copy');
                Tool_color_utilities.copyFormat(format);
            });
        });
        
        // Contrast checker events
        if (cont.fgColorInput) {
            DOM.on(cont.fgColorInput, 'input', () => Tool_color_utilities.handleContrastColorInput('fg'));
        }
        if (cont.fgColorPicker) {
            DOM.on(cont.fgColorPicker, 'input', () => Tool_color_utilities.handleContrastColorPicker('fg'));
        }
        if (cont.bgColorInput) {
            DOM.on(cont.bgColorInput, 'input', () => Tool_color_utilities.handleContrastColorInput('bg'));
        }
        if (cont.bgColorPicker) {
            DOM.on(cont.bgColorPicker, 'input', () => Tool_color_utilities.handleContrastColorPicker('bg'));
        }
        if (cont.swapColorsBtn) {
            DOM.on(cont.swapColorsBtn, 'click', Tool_color_utilities.swapColors);
        }
        if (cont.copyContrastColorsBtn) {
            DOM.on(cont.copyContrastColorsBtn, 'click', Tool_color_utilities.copyContrastColors);
        }
        if (cont.clearContrastBtn) {
            DOM.on(cont.clearContrastBtn, 'click', Tool_color_utilities.clearContrast);
        }
        if (cont.copyReportBtn) {
            DOM.on(cont.copyReportBtn, 'click', Tool_color_utilities.copyReport);
        }
        if (cont.downloadReportBtn) {
            DOM.on(cont.downloadReportBtn, 'click', Tool_color_utilities.downloadReport);
        }
        
        // Font size buttons
        const sizeButtons = DOM.qsa('.size-btn');
        sizeButtons.forEach(btn => {
            DOM.on(btn, 'click', (e) => {
                sizeButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const size = e.target.getAttribute('data-size');
                Tool_color_utilities.updatePreviewFontSize(size);
            });
        });
    },
    
    // Initialize visual color picker canvas
    initializeVisualPicker: () => {
        const canvas = Tool_color_utilities.elements.converter.slPicker;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        Tool_color_utilities.drawSaturationLightnessPicker(ctx, Tool_color_utilities.state.currentHSL.h);
    },
    
    // Draw saturation-lightness picker
    drawSaturationLightnessPicker: (ctx, hue) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Draw saturation-lightness gradient
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const saturation = (x / width) * 100;
                const lightness = 100 - (y / height) * 100;
                const color = Tool_color_utilities.hslToRgb(hue, saturation, lightness);
                ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    },
    
    // Handle color input change
    handleColorInput: (e) => {
        const input = e.target.value.trim();
        const color = Tool_color_utilities.parseColor(input);
        
        if (color) {
            Tool_color_utilities.state.currentColor = color;
            Tool_color_utilities.state.currentHSL = Tool_color_utilities.rgbToHsl(color.r, color.g, color.b);
            Tool_color_utilities.updateConverterDisplay();
            Tool_color_utilities.addToRecentColors(input);
        }
    },
    
    // Handle color picker input
    handleColorPickerInput: (e) => {
        const hex = e.target.value;
        const color = Tool_color_utilities.hexToRgb(hex);
        
        if (color) {
            Tool_color_utilities.state.currentColor = color;
            Tool_color_utilities.state.currentHSL = Tool_color_utilities.rgbToHsl(color.r, color.g, color.b);
            Tool_color_utilities.elements.converter.colorInput.value = hex;
            Tool_color_utilities.updateConverterDisplay();
            Tool_color_utilities.addToRecentColors(hex);
        }
    },
    
    // Handle alpha slider change
    handleAlphaChange: (e) => {
        const alpha = parseInt(e.target.value) / 100;
        Tool_color_utilities.state.currentAlpha = alpha;
        Tool_color_utilities.elements.converter.alphaValue.textContent = `${e.target.value}%`;
        Tool_color_utilities.updateConverterDisplay();
    },
    
    // Handle hue slider change
    handleHueChange: (e) => {
        const hue = parseInt(e.target.value);
        Tool_color_utilities.state.currentHSL.h = hue;
        
        const color = Tool_color_utilities.hslToRgb(
            Tool_color_utilities.state.currentHSL.h,
            Tool_color_utilities.state.currentHSL.s,
            Tool_color_utilities.state.currentHSL.l
        );
        Tool_color_utilities.state.currentColor = color;
        
        // Redraw picker with new hue
        const ctx = Tool_color_utilities.elements.converter.slPicker.getContext('2d');
        Tool_color_utilities.drawSaturationLightnessPicker(ctx, hue);
        
        Tool_color_utilities.updateConverterDisplay();
    },
    
    // Handle picker mouse down
    handlePickerMouseDown: (e) => {
        Tool_color_utilities.state.isUpdatingPicker = true;
        Tool_color_utilities.updatePickerPosition(e);
        
        const handleMouseMove = (e) => {
            if (Tool_color_utilities.state.isUpdatingPicker) {
                Tool_color_utilities.updatePickerPosition(e);
            }
        };
        
        const handleMouseUp = () => {
            Tool_color_utilities.state.isUpdatingPicker = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    },
    
    // Update picker position and color
    updatePickerPosition: (e) => {
        const canvas = Tool_color_utilities.elements.converter.slPicker;
        const rect = canvas.getBoundingClientRect();
        
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));
        
        const saturation = (x / rect.width) * 100;
        const lightness = 100 - (y / rect.height) * 100;
        
        Tool_color_utilities.state.currentHSL.s = saturation;
        Tool_color_utilities.state.currentHSL.l = lightness;
        
        const color = Tool_color_utilities.hslToRgb(
            Tool_color_utilities.state.currentHSL.h,
            saturation,
            lightness
        );
        Tool_color_utilities.state.currentColor = color;
        
        // Update cursor position
        const cursor = Tool_color_utilities.elements.converter.slCursor;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        
        Tool_color_utilities.updateConverterDisplay();
    },
    
    // Update converter display
    updateConverterDisplay: () => {
        const { r, g, b } = Tool_color_utilities.state.currentColor;
        const alpha = Tool_color_utilities.state.currentAlpha;
        const hsl = Tool_color_utilities.state.currentHSL;
        
        const hex = Tool_color_utilities.rgbToHex(r, g, b);
        const rgb = `rgb(${r}, ${g}, ${b})`;
        const hslStr = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
        const rgba = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(1)})`;
        const hsla = `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${alpha.toFixed(1)})`;
        
        // Update inputs and outputs
        const conv = Tool_color_utilities.elements.converter;
        conv.colorInput.value = hex;
        conv.colorPickerInput.value = hex;
        conv.colorSwatch.style.backgroundColor = rgba;
        conv.swatchLabel.textContent = hex;
        conv.hexOutput.value = hex;
        conv.rgbOutput.value = rgb;
        conv.hslOutput.value = hslStr;
        conv.rgbaOutput.value = rgba;
        conv.hslaOutput.value = hsla;
        
        // Update hue slider
        conv.hueSlider.value = Math.round(hsl.h);
        
        // Update color info
        const brightness = Math.round(((r + g + b) / 3 / 255) * 100);
        const luminance = Tool_color_utilities.getLuminance(r, g, b);
        const isLight = luminance > 0.5;
        
        conv.brightnessValue.textContent = `${brightness}%`;
        conv.luminanceValue.textContent = luminance.toFixed(2);
        conv.perceivedValue.textContent = isLight ? 'Light' : 'Dark';
    },
    
    // Parse color from various formats
    parseColor: (input) => {
        input = input.trim();
        
        // HEX format
        if (input.startsWith('#')) {
            return Tool_color_utilities.hexToRgb(input);
        }
        
        // RGB format
        const rgbMatch = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            return {
                r: parseInt(rgbMatch[1]),
                g: parseInt(rgbMatch[2]),
                b: parseInt(rgbMatch[3])
            };
        }
        
        // HSL format
        const hslMatch = input.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (hslMatch) {
            return Tool_color_utilities.hslToRgb(
                parseInt(hslMatch[1]),
                parseInt(hslMatch[2]),
                parseInt(hslMatch[3])
            );
        }
        
        return null;
    },
    
    // Color conversion utilities
    hexToRgb: (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    
    rgbToHex: (r, g, b) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },
    
    rgbToHsl: (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    },
    
    hslToRgb: (h, s, l) => {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    },
    
    getLuminance: (r, g, b) => {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    },
    
    // Add color to recent colors
    addToRecentColors: (color) => {
        const colors = Tool_color_utilities.state.recentColors;
        if (!colors.includes(color)) {
            colors.unshift(color);
            if (colors.length > 5) colors.pop();
            Tool_color_utilities.updateRecentColors();
        }
    },
    
    // Update recent colors display
    updateRecentColors: () => {
        const list = Tool_color_utilities.elements.converter.recentColorsList;
        list.innerHTML = '';
        
        Tool_color_utilities.state.recentColors.forEach(color => {
            const div = DOM.el('div', { className: 'recent-color-item' });
            div.style.backgroundColor = color;
            div.title = color;
            DOM.on(div, 'click', () => {
                Tool_color_utilities.elements.converter.colorInput.value = color;
                Tool_color_utilities.handleColorInput({ target: { value: color } });
            });
            list.appendChild(div);
        });
    },
    
    // Copy individual format
    copyFormat: async (format) => {
        const conv = Tool_color_utilities.elements.converter;
        let value = '';
        
        switch (format) {
            case 'hex': value = conv.hexOutput.value; break;
            case 'rgb': value = conv.rgbOutput.value; break;
            case 'hsl': value = conv.hslOutput.value; break;
            case 'rgba': value = conv.rgbaOutput.value; break;
            case 'hsla': value = conv.hslaOutput.value; break;
        }
        
        if (value && window.Clipboard) {
            await Clipboard.copyWithToast(value, `${format.toUpperCase()} copied`);
        }
    },
    
    // Copy all formats
    copyAllFormats: async () => {
        const conv = Tool_color_utilities.elements.converter;
        const text = `HEX: ${conv.hexOutput.value}
RGB: ${conv.rgbOutput.value}
HSL: ${conv.hslOutput.value}
RGBA: ${conv.rgbaOutput.value}
HSLA: ${conv.hslaOutput.value}`;
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(text, 'All formats copied');
        }
    },
    
    // Download CSS
    downloadCSS: () => {
        const conv = Tool_color_utilities.elements.converter;
        const css = `/* Color Variables */
:root {
  --color-hex: ${conv.hexOutput.value};
  --color-rgb: ${conv.rgbOutput.value};
  --color-hsl: ${conv.hslOutput.value};
  --color-rgba: ${conv.rgbaOutput.value};
  --color-hsla: ${conv.hslaOutput.value};
}`;
        
        if (window.Download) {
            Download.downloadWithToast('color-variables.css', css, 'text/css');
        }
    },
    
    // Clear converter
    clearConverter: () => {
        Tool_color_utilities.state.currentColor = { r: 59, g: 130, b: 246 };
        Tool_color_utilities.state.currentAlpha = 1.0;
        Tool_color_utilities.state.currentHSL = { h: 217, s: 91, l: 60 };
        Tool_color_utilities.elements.converter.alphaSlider.value = 100;
        Tool_color_utilities.elements.converter.alphaValue.textContent = '100%';
        Tool_color_utilities.updateConverterDisplay();
        
        if (window.Toasts) {
            Toasts.info('Converter cleared');
        }
    },
    
    // Handle contrast color input
    handleContrastColorInput: (type) => {
        const cont = Tool_color_utilities.elements.contrast;
        const input = type === 'fg' ? cont.fgColorInput : cont.bgColorInput;
        const color = Tool_color_utilities.parseColor(input.value);
        
        if (color) {
            if (type === 'fg') {
                Tool_color_utilities.state.foregroundColor = color;
            } else {
                Tool_color_utilities.state.backgroundColor = color;
            }
            Tool_color_utilities.updateContrastDisplay();
        }
    },
    
    // Handle contrast color picker
    handleContrastColorPicker: (type) => {
        const cont = Tool_color_utilities.elements.contrast;
        const picker = type === 'fg' ? cont.fgColorPicker : cont.fgColorPicker;
        const hex = picker.value;
        const color = Tool_color_utilities.hexToRgb(hex);
        
        if (color) {
            if (type === 'fg') {
                Tool_color_utilities.state.foregroundColor = color;
                cont.fgColorInput.value = hex;
            } else {
                Tool_color_utilities.state.backgroundColor = color;
                cont.bgColorInput.value = hex;
            }
            Tool_color_utilities.updateContrastDisplay();
        }
    },
    
    // Update contrast display
    updateContrastDisplay: () => {
        const cont = Tool_color_utilities.elements.contrast;
        const fg = Tool_color_utilities.state.foregroundColor;
        const bg = Tool_color_utilities.state.backgroundColor;
        
        const fgHex = Tool_color_utilities.rgbToHex(fg.r, fg.g, fg.b);
        const bgHex = Tool_color_utilities.rgbToHex(bg.r, bg.g, bg.b);
        
        // Update previews
        cont.fgPreview.style.backgroundColor = fgHex;
        cont.fgPreview.querySelector('.preview-label').textContent = fgHex;
        cont.bgPreview.style.backgroundColor = bgHex;
        const bgLabel = cont.bgPreview.querySelector('.preview-label');
        bgLabel.textContent = bgHex;
        bgLabel.style.color = Tool_color_utilities.getLuminance(bg.r, bg.g, bg.b) > 0.5 ? '#000000' : '#FFFFFF';
        
        // Update contrast preview
        cont.contrastPreview.style.backgroundColor = bgHex;
        cont.contrastPreview.style.color = fgHex;
        
        // Calculate contrast ratio
        const fgLum = Tool_color_utilities.getLuminance(fg.r, fg.g, fg.b);
        const bgLum = Tool_color_utilities.getLuminance(bg.r, bg.g, bg.b);
        const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
        
        cont.contrastRatio.textContent = `${ratio.toFixed(2)}:1`;
        
        // Update WCAG compliance
        Tool_color_utilities.updateWCAGCompliance(ratio);
    },
    
    // Update WCAG compliance indicators
    updateWCAGCompliance: (ratio) => {
        const updateItem = (id, passes, requiredRatio) => {
            const item = DOM.qs(`#${id}`);
            if (!item) return;
            
            const icon = item.querySelector('.status-icon');
            const ratioText = item.querySelector('.compliance-ratio');
            
            if (passes) {
                icon.textContent = '✓';
                icon.style.color = 'var(--success-color)';
                ratioText.textContent = `PASS (needs ${requiredRatio}:1)`;
                item.classList.remove('fail');
                item.classList.add('pass');
            } else {
                icon.textContent = '✗';
                icon.style.color = 'var(--error-color)';
                ratioText.textContent = `FAIL (needs ${requiredRatio}:1)`;
                item.classList.remove('pass');
                item.classList.add('fail');
            }
        };
        
        // WCAG AA
        updateItem('aa-normal', ratio >= 3, '3');
        updateItem('aa-large', ratio >= 3, '3');
        updateItem('aa-small', ratio >= 4.5, '4.5');
        
        // WCAG AAA
        updateItem('aaa-normal', ratio >= 4.5, '4.5');
        updateItem('aaa-large', ratio >= 4.5, '4.5');
        updateItem('aaa-small', ratio >= 7, '7');
        
        // Update recommendations
        Tool_color_utilities.updateRecommendations(ratio);
    },
    
    // Update recommendations
    updateRecommendations: (ratio) => {
        const list = Tool_color_utilities.elements.contrast.recommendationsList;
        list.innerHTML = '';
        
        if (ratio >= 7) {
            list.innerHTML = `
                <div class="recommendation-item success">✓ Excellent contrast</div>
                <div class="recommendation-item success">✓ Suitable for all uses</div>
                <div class="recommendation-item success">✓ Meets all WCAG standards</div>
            `;
        } else if (ratio >= 4.5) {
            list.innerHTML = `
                <div class="recommendation-item success">✓ Good contrast</div>
                <div class="recommendation-item success">✓ Meets WCAG AA standards</div>
                <div class="recommendation-item warning">⚠ Consider improving for AAA</div>
            `;
        } else if (ratio >= 3) {
            list.innerHTML = `
                <div class="recommendation-item warning">⚠ Minimum contrast</div>
                <div class="recommendation-item warning">⚠ Only for large text (AA)</div>
                <div class="recommendation-item error">✗ Improve for small text</div>
            `;
        } else {
            list.innerHTML = `
                <div class="recommendation-item error">✗ Poor contrast</div>
                <div class="recommendation-item error">✗ Does not meet standards</div>
                <div class="recommendation-item error">✗ Increase contrast ratio</div>
            `;
        }
    },
    
    // Swap foreground and background colors
    swapColors: () => {
        const temp = Tool_color_utilities.state.foregroundColor;
        Tool_color_utilities.state.foregroundColor = Tool_color_utilities.state.backgroundColor;
        Tool_color_utilities.state.backgroundColor = temp;
        
        const cont = Tool_color_utilities.elements.contrast;
        const fgHex = Tool_color_utilities.rgbToHex(
            Tool_color_utilities.state.foregroundColor.r,
            Tool_color_utilities.state.foregroundColor.g,
            Tool_color_utilities.state.foregroundColor.b
        );
        const bgHex = Tool_color_utilities.rgbToHex(
            Tool_color_utilities.state.backgroundColor.r,
            Tool_color_utilities.state.backgroundColor.g,
            Tool_color_utilities.state.backgroundColor.b
        );
        
        cont.fgColorInput.value = fgHex;
        cont.fgColorPicker.value = fgHex;
        cont.bgColorInput.value = bgHex;
        cont.bgColorPicker.value = bgHex;
        
        Tool_color_utilities.updateContrastDisplay();
        
        if (window.Toasts) {
            Toasts.info('Colors swapped');
        }
    },
    
    // Update preview font size
    updatePreviewFontSize: (size) => {
        const preview = Tool_color_utilities.elements.contrast.contrastPreview;
        const large = preview.querySelector('.preview-text-large');
        if (large) {
            large.style.fontSize = `${size}px`;
        }
    },
    
    // Copy contrast colors
    copyContrastColors: async () => {
        const fg = Tool_color_utilities.state.foregroundColor;
        const bg = Tool_color_utilities.state.backgroundColor;
        const fgHex = Tool_color_utilities.rgbToHex(fg.r, fg.g, fg.b);
        const bgHex = Tool_color_utilities.rgbToHex(bg.r, bg.g, bg.b);
        
        const text = `Foreground: ${fgHex}\nBackground: ${bgHex}`;
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(text, 'Colors copied');
        }
    },
    
    // Clear contrast checker
    clearContrast: () => {
        Tool_color_utilities.state.foregroundColor = { r: 0, g: 0, b: 0 };
        Tool_color_utilities.state.backgroundColor = { r: 255, g: 255, b: 255 };
        
        const cont = Tool_color_utilities.elements.contrast;
        cont.fgColorInput.value = '#000000';
        cont.fgColorPicker.value = '#000000';
        cont.bgColorInput.value = '#FFFFFF';
        cont.bgColorPicker.value = '#FFFFFF';
        
        Tool_color_utilities.updateContrastDisplay();
        
        if (window.Toasts) {
            Toasts.info('Contrast checker cleared');
        }
    },
    
    // Copy report
    copyReport: async () => {
        const fg = Tool_color_utilities.state.foregroundColor;
        const bg = Tool_color_utilities.state.backgroundColor;
        const fgHex = Tool_color_utilities.rgbToHex(fg.r, fg.g, fg.b);
        const bgHex = Tool_color_utilities.rgbToHex(bg.r, bg.g, bg.b);
        
        const fgLum = Tool_color_utilities.getLuminance(fg.r, fg.g, fg.b);
        const bgLum = Tool_color_utilities.getLuminance(bg.r, bg.g, bg.b);
        const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
        
        const report = `Color Contrast Report
=====================
Foreground: ${fgHex}
Background: ${bgHex}
Contrast Ratio: ${ratio.toFixed(2)}:1

WCAG AA Compliance:
- Normal Text: ${ratio >= 3 ? 'PASS' : 'FAIL'}
- Large Text: ${ratio >= 3 ? 'PASS' : 'FAIL'}
- Small Text: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}

WCAG AAA Compliance:
- Normal Text: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}
- Large Text: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}
- Small Text: ${ratio >= 7 ? 'PASS' : 'FAIL'}`;
        
        if (window.Clipboard) {
            await Clipboard.copyWithToast(report, 'Report copied');
        }
    },
    
    // Download report
    downloadReport: () => {
        const fg = Tool_color_utilities.state.foregroundColor;
        const bg = Tool_color_utilities.state.backgroundColor;
        const fgHex = Tool_color_utilities.rgbToHex(fg.r, fg.g, fg.b);
        const bgHex = Tool_color_utilities.rgbToHex(bg.r, bg.g, bg.b);
        
        const fgLum = Tool_color_utilities.getLuminance(fg.r, fg.g, fg.b);
        const bgLum = Tool_color_utilities.getLuminance(bg.r, bg.g, bg.b);
        const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
        
        const report = `Color Contrast Report
=====================
Foreground: ${fgHex}
Background: ${bgHex}
Contrast Ratio: ${ratio.toFixed(2)}:1

WCAG AA Compliance:
- Normal Text: ${ratio >= 3 ? 'PASS' : 'FAIL'}
- Large Text: ${ratio >= 3 ? 'PASS' : 'FAIL'}
- Small Text: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}

WCAG AAA Compliance:
- Normal Text: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}
- Large Text: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}
- Small Text: ${ratio >= 7 ? 'PASS' : 'FAIL'}`;
        
        if (window.Download) {
            Download.downloadWithToast('contrast-report.txt', report, 'text/plain');
        }
    },
    
    // Load saved state
    loadState: () => {
        if (!Storage) return;
        
        const state = Storage.getToolState('color-utilities');
        if (state) {
            if (state.currentColor) Tool_color_utilities.state.currentColor = state.currentColor;
            if (state.currentAlpha) Tool_color_utilities.state.currentAlpha = state.currentAlpha;
            if (state.currentHSL) Tool_color_utilities.state.currentHSL = state.currentHSL;
            if (state.recentColors) Tool_color_utilities.state.recentColors = state.recentColors;
            if (state.foregroundColor) Tool_color_utilities.state.foregroundColor = state.foregroundColor;
            if (state.backgroundColor) Tool_color_utilities.state.backgroundColor = state.backgroundColor;
            
            Tool_color_utilities.updateRecentColors();
        }
    },
    
    // Save current state
    saveState: () => {
        if (!Storage) return;
        
        Storage.setToolState('color-utilities', {
            currentColor: Tool_color_utilities.state.currentColor,
            currentAlpha: Tool_color_utilities.state.currentAlpha,
            currentHSL: Tool_color_utilities.state.currentHSL,
            recentColors: Tool_color_utilities.state.recentColors,
            foregroundColor: Tool_color_utilities.state.foregroundColor,
            backgroundColor: Tool_color_utilities.state.backgroundColor
        });
    }
};

// Make tool available globally
window.Tool_color_utilities = Tool_color_utilities;
