# Typst Editor

Two independent POCs for working with Typst templates.

> [!CAUTION]
> This is just a proof of concept. For production use, consider reading the official documentation at https://myriad-dreamin.github.io/typst.ts/cookery/introduction.html

## Projects

### [Frontend](./frontend)

Real-time resume editor with live preview in the browser. Form-based editing with instant SVG rendering using Typst WASM compiler client-side.

See [frontend/README.md](./frontend/README.md) for details.

### [Backend](./backend)

Server-side PDF generation demo. Compiles Typst templates to PDF buffers using Node.js compiler, suitable for HTTP endpoints or file export.

See [backend/README.md](./backend/README.md) for details.

## Key Difference

- **Frontend**: Client-side compilation (browser WASM), outputs SVG for preview
- **Backend**: Server-side compilation (Node.js), outputs PDF buffer for download
