# Typst Resume Editor

POC for realtime resume input and rendering using Typst.

## Overview

React + Vite frontend that enables live resume editing with instant visual
feedback. Form inputs on the left, rendered PDF preview on the right. PDF
download support to be added.

## Architecture

- **Template System**: Schema-driven form generation from template adapters
- **State Management**: Zustand store for resume data
- **Code Generation**: Template adapters generate Typst markup from form data
- **Compilation**: Typst.ts WASM compiler renders to SVG in-browser

## Current Template

Uses `@preview/basic-resume:0.2.9` template with support for:

- Personal info
- Work experience
- Projects
- Extracurriculars
- Certificates
- Skills

## Development

```bash
bun install
bun run dev
```
