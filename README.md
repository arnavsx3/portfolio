# Arnav — Cloud & DevOps

A cloud and DevOps portfolio covering infrastructure as code, automated delivery, cloud-native systems, and upstream open-source contributions.

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

- `src/data/projects.ts`: six featured projects and the expandable project archive. Private featured repositories are deliberately linked; the `private` flag only labels their source availability and never changes GitHub permissions. Clear it when a repository becomes public.
- `src/data/profiles.ts`: email and social links.
- `src/components/Signal.tsx`: interactive delivery / platform / observability architecture sketch.
- `src/components/ProjectVisual.tsx`: original SVG and CSS illustrations of project concepts, rather than screenshots or live telemetry.
- `src/data/contributions.ts`: verified upstream pull requests, summaries, and merge status. Refresh the recorded verification date when updating these entries.
- `src/components/Projects.tsx`: accessible featured / open-source / archive tabs.
- `src/data/certifications.ts`: credential records supplied by Arnav; leave empty until verification links are supplied.
- `src/components/Certifications.tsx`: a credential gallery, with an honest pending state when no records exist.
- `src/index.css`: responsive layout, design tokens, and reduced-motion rules.
- `public/fonts`: locally hosted, openly licensed fonts and their licenses.

Project descriptions are curated from the corresponding repository READMEs, including the private projects Arnav explicitly selected for this portfolio. Upstream work is attributed to the original projects, with individual PR links; co-authored work is explicitly credited, and original PR links are retained when a follow-up PR landed the contribution. OriginFence is credited as a team project and a prototype. There are no placeholder destinations, fabricated credentials, runtime GitHub API calls, analytics, or client-side secrets.

## Accessibility and behavior

Semantic landmarks, a skip link, keyboard-operable tabs with Arrow/Home/End navigation, visible focus rings, descriptive project links, reduced-motion support, and a global pause control for decorative animation. Email copying reports success or offers a fallback when clipboard access is unavailable. The former timing game has been removed; Drift remains an archive project linked to its source.

## Publishing

GitHub Actions checks formatting and builds pull requests. Pushes to `main` (or a manual workflow run on `main`) build and publish to the existing GitHub Pages site. The `/portfolio/` base is configured in `vite.config.ts`; update the Vite base and canonical/social URLs together if the hosting path changes.

Use focused commits on a feature branch and open a pull request into `main`. Preview changes locally before merging.

## Adding credentials

Add a record to `src/data/certifications.ts` with `name`, `issuer`, and the original `url`; `issued` is optional. The gallery renders automatically. Do not infer earned certifications from study plans or tooling experience.
