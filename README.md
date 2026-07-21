# Police Scotland Knowledge Base

This repository contains a Next.js + Tailwind CSS static documentation site scaffold. It aims to replicate the layout, navigation and user experience of a GitBook-style documentation portal while remaining original and suitable for Police Scotland themed roleplay use.

How to run locally:

1. Install dependencies: npm install
2. Start dev server: npm run dev

Notes:
- Content files are stored under /docs as Markdown (index.md per folder).
- A lightweight client-side search reads /public/search-index.json. A node script can be added to generate the index from /docs.
