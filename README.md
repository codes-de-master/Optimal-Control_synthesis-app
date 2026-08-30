# Optimal Control — Synthesis App

Interactive study notes for the Optimal Control course.

## Stack

- Astro 7.2.9
- Native browser JavaScript for interactive examples
- Static output, deployable to Vercel with zero adapter configuration
- Node.js 22.12.0 or newer

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Vercel

The project uses Astro's default static output. Vercel detects Astro automatically when the GitHub repository is imported. No Vercel adapter is required unless the app later needs on-demand rendering, server islands, actions, sessions, Vercel image optimization, or similar server-side features.

## Structure

- `src/pages/index.astro`: course synthesis and interactive examples
- `src/styles/global.css`: application styles
- `astro.config.mjs`: Astro configuration

The content is intended to be extended progressively as new Optimal Control concepts are reviewed.
