# Ruggable-like Prototype (React + Vite + Tailwind)

A clickable demo that mirrors key Ruggable.com flows: product configurator with dynamic pricing, cart, account mock, and order tracking mock.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (Vercel)
1. Create a new Vercel project and **Import** this repo/zip.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Deploy.

## Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`

## Customize
- Edit brand colors, copy, and products in `src/App.jsx`.
- Tailwind styles live in `src/index.css` and `tailwind.config.js`.
