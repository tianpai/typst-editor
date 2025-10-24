# Backend Project Instructions

This is a POC for server-side Typst PDF generation using Bun.

## Running the Project

```bash
bun install
bun run index.ts
```

## Key Dependencies

- `@myriaddreamin/typst-ts-node-compiler` - Typst compiler for Node.js/Bun
- Bun runtime for TypeScript execution

## Implementation Notes

- Loads Typst templates from `template.typ`
- Compiles to PDF buffer using Typst WASM compiler
- Outputs to `output.pdf` (or can send buffer via HTTP)
