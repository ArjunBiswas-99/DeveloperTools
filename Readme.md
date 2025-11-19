# DeveloperTools

A lightweight, client-side web application that aggregates common developer utilities in a single interface. Built with pure HTML, CSS, and vanilla JavaScript.

## Overview

- **UI**: Top panel (tabs/menu) + bottom panel (tool content)
- **Navigation**: Hash-based routing for deep-linking tools
- **Architecture**: Modular - each tool in its own folder

## Tool List

1. **JSON Validator & Beautifier** *(first implementation)*
2. Base64 Encode/Decode
3. URL Encoder/Decoder  
4. UUID Generator
5. Hash Generator (MD5/SHA-1/SHA-256/SHA-512)
6. JWT Decoder (Header/Payload)
7. Color Utilities (HEX/RGB/HSL + contrast)
8. Epoch/Time Converter
9. CSV ↔ JSON Converter
10. Diff Viewer (Text/JSON)

## Directory Structure

```
DeveloperTools/
├── app/                     # Root app
│   ├── index.html
│   ├── styles/
│   │   ├── base.css
│   │   └── theme.css
│   ├── scripts/
│   │   ├── main.js
│   │   ├── router.js
│   │   ├── tools-registry.js
│   │   ├── ui/
│   │   │   ├── tabs.js
│   │   │   └── toasts.js
│   │   └── utils/
│   │       ├── clipboard.js
│   │       ├── download.js
│   │       ├── dom.js
│   │       └── storage.js
│   └── assets/icons/
└── tools/                   # Each tool folder
    ├── json-validator/
    ├── base64/
    ├── url-encoder-decoder/
    ├── uuid-generator/
    ├── hash-generator/
    ├── jwt-decoder/
    ├── color-utilities/
    ├── epoch-converter/
    ├── csv-json/
    └── diff-viewer/
```

## Tool Module Contract

Each tool exports:
- `metadata`: `{ id, name, icon }`
- `mount(container)`: render UI and attach events
- `unmount()`: cleanup listeners/timers

## First Tool: JSON Validator & Beautifier

### Features
- Validate JSON with clear error messages
- Beautify with configurable indentation (2/4 spaces)
- Minify JSON
- Copy/download results
- File upload support

### UI Layout
- **Left**: Input textarea, controls (validate/beautify/minify/upload)
- **Right**: Output textarea, actions (copy/download), status line
- **Bottom**: Error display with line/column info

### Core Functions
- `validate()`: JSON.parse with error handling
- `beautify(indent)`: JSON.stringify with spacing
- `minify()`: JSON.stringify without spacing
- Copy/download via utility modules

## Roadmap/TODOs

### Remaining Tools to Implement
- [ ] Base64 Encode/Decode
- [ ] URL Encoder/Decoder
- [ ] UUID Generator
- [ ] Hash Generator
- [ ] JWT Decoder
- [ ] Color Utilities
- [ ] Epoch/Time Converter
- [ ] CSV ↔ JSON Converter
- [ ] Diff Viewer

### App Infrastructure
- [ ] Scaffold app structure
- [ ] Implement router and tabs
- [ ] Create utility modules
- [ ] Add theming support

## Running the App

1. **Direct**: Open `app/index.html` in browser
2. **Server** (recommended): `python3 -m http.server`

## Development Notes

- No external dependencies required
- Each tool is self-contained
- Hash-based routing: `#tool=json-validator`
- Utilities for copy/download functionality
# DeveloeprTools
