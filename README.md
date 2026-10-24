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

- `src/data/projects.generated.json`: public GitHub project metadata, featured selections, and the automatically discovered archive.
- `projects.config.json`: exclusions, explicitly included learning forks, showcase visuals, and already-published private fallback copy.
- `src/data/projects.ts`: typed project data consumed by the existing design.
- `src/data/profiles.ts`: email and social links.
- `src/components/Signal.tsx`: interactive delivery / platform / observability architecture sketch.
- `src/components/ProjectVisual.tsx`: original SVG and CSS illustrations of project concepts, rather than screenshots or live telemetry.
- `src/data/contributions.generated.json`: a verified snapshot of public merged PRs, merge dates, and authorship. Bundled with the site; no browser API calls.
- `contributions.config.json`: optional project names and descriptions, friendly PR titles/summaries, and links to original PRs. These entries also seed discovery, but GitHub still verifies every merge and contribution credit.
- `src/data/contributions.ts`: combines the verified snapshot with optional editorial copy. New repositories and PRs render without adding a component or hand-written card.
- `scripts/sync-contributions.mjs`: refreshes the snapshot from GitHub during scheduled and main-branch builds.
- `src/components/Projects.tsx`: accessible featured / open-source / archive tabs.
- `src/data/certifications.ts`: AWS credential records and original certificate links supplied in Arnav's resume.
- `src/components/Certifications.tsx`: a credential gallery, with an honest pending state when no records exist.
- `src/index.css`: responsive layout, design tokens, and reduced-motion rules.
- `public/fonts`: locally hosted, openly licensed fonts and their licenses.

Public project names, descriptions, languages, visibility, and archive membership are refreshed from GitHub. Explicitly selected private showcases retain only their previously published fallback copy. Upstream work is attributed to the original projects, with individual PR links; co-authored work is explicitly credited, and original PR links are retained when a follow-up PR landed the contribution. OriginFence is credited as a team project and a prototype. There are no placeholder destinations, fabricated credentials, runtime GitHub API calls, analytics, or client-side secrets.

## Accessibility and behavior

Semantic landmarks, a skip link, keyboard-operable tabs with Arrow/Home/End navigation, visible focus rings, descriptive project links, reduced-motion support, and a global pause control for decorative animation. Email copying reports success or offers a fallback when clipboard access is unavailable. The former timing game has been removed; Drift remains an archive project linked to its source.

## Publishing

GitHub Actions checks formatting, lint, sync tests, and production builds on pull requests. Pushes to `main` (or a manual workflow run on `main`) build and publish to the existing GitHub Pages site. The `/portfolio/` base is configured in `vite.config.ts`; update the Vite base and canonical/social URLs together if the hosting path changes.

Use focused commits on a feature branch and open a pull request into `main`. Preview changes locally before merging.

## Automatic projects

The same six-hour Pages workflow runs `npm run sync:github` to refresh both projects and contributions. New public repositories owned by this account enter More Projects automatically. Public GitHub pins lead Featured projects; existing showcases fill remaining slots, followed by recently active repositories, up to the configured limit. A newly pinned project moves out of More Projects into Featured rather than appearing twice.

Repository names, descriptions, language stacks, source links, and public/private labels update from GitHub. Change a repository description or pin on GitHub to update its portfolio presentation at the next successful deployment. The profile repository and this portfolio are excluded. Forks are excluded by default because upstream work has its own section; the already-listed Django learning fork remains explicitly included. Archived projects remain visible and are labelled. Ordinary new public, non-fork repositories increase the archive count; private repositories are never automatically discovered or published.

The sync uses the public owner-repositories endpoint even with a privileged local token. Only public repositories are configured today. An explicitly configured, already-published private showcase can retain fallback prose if required in future; private contents are never fetched. Repositories removed from the public list otherwise disappear automatically. Visual illustrations and categories stay consistent with the site design; they are optional presentation choices rather than repository facts.

```sh
npm run sync:projects  # refresh project snapshot only
npm run sync:github    # refresh projects and contributions
```

## Automatic open-source contributions

Each upstream project shows its newest merged contribution, with a **See all contributions** link to a dedicated repository page. Every repository page is generated from the same refreshed data, with search, authored/co-authored filters, merge dates, and original PR links. Shareable `#/contributions/owner/repo` routes support direct visits, reloads, and browser back/forward on GitHub Pages without server rewrites. New upstream projects automatically get pages without hand-written routes. Counts, merge dates, and the verification date come from the snapshot; Repowise's four merged PRs are included. The original Hatoba #234 link remains attached to its merged, co-authored landing PR #242 and is not counted twice.

The existing Pages workflow refreshes and deploys contributions every six hours (at 00:17, 06:17, 12:17, and 18:17 UTC), on pushes to `main`, and on manual runs. It discovers authored merged PRs across public upstream repositories, so a first contribution to a new project creates a project entry automatically. Only public merged PRs outside this account's own repositories qualify.

Co-authored work is discovered from authored commits and indexed `Co-authored-by` trailers, including verified public email aliases used on previous commits. Candidates count only when GitHub's commit-author records link the contribution to this account and its associated PR is merged. A mention in a title or message is insufficient. Emails are used only in memory for discovery and are never published in the snapshot.

Discovery depends on GitHub's search index and credit attribution. If a co-authored landing PR uses an identity search cannot discover, add its `owner/repo#number` to `pullRequests` in the config; the sync verifies its commit authors before publishing it. This is also how original-PR links and hand-written summaries are preserved. New entries without editorial copy use their actual upstream PR title and merge date.

To refresh locally:

```sh
gh auth login                 # or supply GH_TOKEN / GITHUB_TOKEN
npm run sync:contributions
npm test
npm run lint
npm run format:check
npm run build
```

The workflow uses its existing read-only `GITHUB_TOKEN`; no personal access token, repository-write permission, or browser secret is required. PR builds use the committed snapshot and do not receive a sync token. Scheduled refreshes update the build artifact rather than making recurring bot commits. The checked-in JSON is an offline development baseline; the deployed site can be newer.

For an end-to-end verification before publishing, manually run the workflow on a feature branch: it refreshes and validates with the Actions token, while only runs on `main` upload a Pages artifact and deploy.

If GitHub is unavailable, rate-limited, or returns incomplete results, sync fails before replacing the snapshot and the last successful deployment remains live. Search sets larger than GitHub's 1,000-result limit fail explicitly rather than silently dropping older work. Scheduled runs may be delayed by GitHub; public repositories can have schedules disabled after 60 days without repository activity, in which case re-enable the workflow in Actions. Updates are periodic, not instant webhooks from upstream repositories.

## Adding credentials

Add a record to `src/data/certifications.ts` with `name`, `issuer`, and the original `url`; `issued` is optional. The gallery renders automatically. Do not infer earned certifications from study plans or tooling experience.
