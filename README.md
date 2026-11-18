# Walker Strauss's Personal Website

Personal Website showcasing skills in web design using HTML, CSS, JavaScript and React.

## Run locally

These instructions assume you have Node.js (18+) and npm installed. The project uses Vite for development.

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) to view the site locally.

3. Build for production

```bash
npm run build
```

4. Preview the production build locally

```bash
npm run preview
```

5. Deploy to GitHub Pages

This project already includes a deploy script that uses `gh-pages` and will build before publishing.

```bash
npm run deploy
```

## Available npm scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build production files into `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint
- `npm run deploy` — build and publish `dist/` to GitHub Pages (uses `gh-pages`)

## Troubleshooting

- If the dev server reports a port in use, set `PORT` before running (example for macOS/Linux):

```bash
PORT=3000 npm run dev
```

- If you don't have `gh-pages` installed globally, the `deploy` script uses the local devDependency and should work after `npm install`.
