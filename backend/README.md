# Typst Backend

POC for server-side PDF generation using Typst in Node.js.

## Overview

Demonstrates PDF export using `@myriaddreamin/typst-ts-node-compiler`. Compiles
Typst templates to PDF buffers that can be saved to disk or sent over HTTP.

## Implementation

- Loads `.typ` template files from disk
- Compiles to PDF using Typst compiler WASM in Node
- Outputs PDF buffer (ready for file write or HTTP response)

## Development

```bash
bun install
bun run index.ts
```
