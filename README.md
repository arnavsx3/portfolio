# Arnav — Built from curiosity.

A personal portfolio for cloud-native systems, developer tools, and creative experiments.

**Live:** https://arnavsx3.github.io/portfolio/

## Development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Vite serves the site at `http://localhost:5173/portfolio/`.

```sh
npm run build         # TypeScript checks and production build
npm run preview       # Serve the production build locally
npm run format        # Apply the shared code style
npm run format:check  # Verify formatting without changing files
```

## Content and structure

- `src/data/projects.ts`: curated projects, descriptions, categories, technology tags, and GitHub links. Update this file to add or retire a project.
- `src/data/profiles.ts`: email and social links.
- `src/components/Signal.tsx`: interactive build / ship / observe illustration.
- `src/components/ProjectVisual.tsx`: original SVG and CSS illustrations of project concepts, rather than screenshots or live telemetry.
- `src/components/Playground.tsx`: browser-local timing challenge inspired by Drift. It uses a monotonic clock; no results leave the browser.
- `src/index.css`: responsive layout, design tokens, and reduced-motion rules.
- `public/fonts`: locally hosted, openly licensed fonts and their licenses.

Project descriptions are curated from the corresponding public repositories. OriginFence is credited as a team project and a prototype. There are no placeholder destinations, fabricated credentials, runtime GitHub API calls, analytics, or client-side secrets.

## Accessibility and behavior

Semantic landmarks, a skip link, keyboard-operable buttons, visible focus rings, filter announcements, descriptive project links, reduced-motion support, and a global pause control for decorative animation. Email copying reports success or offers a fallback when clipboard access is unavailable. The timing challenge is optional and has no impact on navigation or project access.

## Publishing

GitHub Actions checks formatting and builds pull requests. Pushes to `main` (or a manual workflow run on `main`) build and publish to the existing GitHub Pages site. The `/portfolio/` base is configured in `vite.config.ts`; update the Vite base and canonical/social URLs together if the hosting path changes.

Use focused commits on a feature branch and open a pull request into `main`. Preview changes locally before merging.
