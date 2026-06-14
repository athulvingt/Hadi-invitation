# Hadi & Muhsina — Wedding Website

A single-page wedding invitation website built with React, TypeScript, and Vite. Features a Three.js particle background, GSAP scroll animations, falling petal canvas effect, and an RSVP form.

## Pages & Sections

- **Hero** — couple names, date, and venue with animated particle background
- **Invitation** — poetic invite with Arabic calligraphy
- **Story** — couple's story with Quranic verse
- **Events** — function details with map link
- **Details** — date, time, venue, and dress code cards
- **Gallery** — masonry photo grid
- **RSVP** — form with attendance, guest count, and dietary preferences
- **Footer** — falling petal animation and social links

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output goes to `dist/`.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_FORM_ENDPOINT` | RSVP form submission URL (e.g. Formspree, Netlify Forms) |
| `VITE_PETALS` | Number of falling petals in the footer animation (default: 30) |

## Customisation

All content (names, dates, venue, story text, gallery images) lives in `src/content.ts`. Edit that file to update the site without touching any component code.

## Tech Stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com)
- [Three.js](https://threejs.org)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)

## Deploying

The `dist/` folder is a standard static site — deploy to Netlify, Vercel, or any static host.

For Netlify, add a `_redirects` file inside `public/`:

```
/*  /index.html  200
```

## What to delete before sharing

Remove these folders before zipping — your friend can regenerate them:

```
node_modules/   # npm install
dist/           # npm run build
.vite/          # auto-generated cache
```
