# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

INESC TEC Open-Source Software showcase website - a React application displaying open-source projects organized by innovation areas (Energy, Robotics, AI, Industry).

**Live site**: https://inesctec.github.io/

## Common Commands

```bash
npm start          # Development server (localhost:3000)
npm run build      # Production build
npm run deploy     # Build and deploy to GitHub Pages
npm test           # Run tests (interactive watch mode)
npm test -- --watchAll=false  # Run tests once
```

## Architecture

### Routing
- Uses **HashRouter** (required for GitHub Pages compatibility)
- Routes defined in `src/App.js` with lazy loading via `React.lazy()` + `Suspense`
- URL query params used for category filtering: `?category=Energy`

### Data Flow
- **No global state management** - each page manages its own state with `useState`
- Project and area data fetched from JSON files in `/public/` directory:
  - `/public/projects_input.json` - hand-edited source of truth for projects (never read by the app directly)
  - `/public/projects.json` - GENERATED from `projects_input.json` by `scripts/update_projects.py`; do not hand-edit, it is overwritten on every run
  - `/public/areas.json` - innovation areas with featured projects; hand-edited, but `total_stars` / `total_repos` are rewritten in place by `scripts/update_areas.py`
- Client-side filtering, searching, sorting, and pagination
- Logos are loaded dynamically via `import(\`../assets/${project_logo}\`)` in `ProjectCard.js` and `AreaCard.js`, so `project_logo` is a filename inside `src/assets/`

### Automated Data Refresh (GitHub Actions)
- `.github/workflows/update-json-files.yml` runs daily (cron), on every push to `master`, and on manual dispatch. It runs `update_areas.py` then `update_projects.py` and commits `areas.json` / `projects.json` as `github-actions[bot]` when they change.
- `.github/workflows/auto-deploy.yml` (`workflow_run` on "Update JSON Files") rebuilds and publishes to GitHub Pages.
- Scripts query the GitHub Search API: `org:INESCTEC topic:<project_topic>`; `update_projects.py` keeps the top 3 repos by stars and merges their topics into `project_tags`.
- Both scripts read the token from the `GH_TOKEN` env var. In CI it is the built-in `secrets.GITHUB_TOKEN` (auto-issued per run, never expires). Do not switch back to a PAT secret: the old `GH_TOKEN` PAT expired in Oct 2026 and silently zeroed every project. Never hardcode a token.
- Scripts exit non-zero on any API error, so a failed refresh never commits or deploys; `auto-deploy.yml` only runs when the update workflow succeeded. To run locally: `GH_TOKEN=$(gh auth token) python scripts/update_projects.py`. Running locally is rarely needed; trigger the workflow instead.
- Because the bot commits to `master` almost daily, always `git pull` before committing. Conflicts on `projects.json` / `areas.json` counts should be resolved by taking the remote version (it is regenerated anyway).

### Key Directories
- `src/pages/` - route-level components (HomePage, ProjectsPage, NotFoundPage)
- `src/components/` - reusable UI components (ProjectCard, AreaCard, Header, etc.)
- `src/assets/` - static images and logos
- `public/` - JSON data files and static assets

### Styling
- **Tailwind CSS** with custom color palette defined in `tailwind.config.js`
- Custom colors: `dark-blue`, `light-blue`, `energy-yellow`, `industry-red`, `def-grey`
- Global styles and custom utility classes in `src/index.css`
- Mobile-first responsive design using Tailwind breakpoints

### UI Libraries
- **Ant Design** (`antd`) for complex components (Popover, tooltips)
- **FontAwesome** and **Octicons** for icons
- **react-scroll** for smooth scrolling navigation on HomePage

## Security / Secrets

Public repo. Nothing in it may contain a credential.
- No tokens in code or committed files. Scripts read `GH_TOKEN` from the env; CI passes the built-in `GITHUB_TOKEN`. Locally: `GH_TOKEN=$(gh auth token) ...`.
- Secret scanning runs in two layers with the same tool and baseline (`detect-secrets` 1.5.0, `.secrets.baseline`):
  - local: `.pre-commit-config.yaml` (each clone must run `pre-commit install` once)
  - CI: `.github/workflows/secret-scan.yml` on every push / PR
- A false positive is added with `detect-secrets scan --baseline .secrets.baseline` and then `detect-secrets audit .secrets.baseline`; never by disabling the hook.
- Workflows declare explicit least-privilege `permissions:`. Action/npm updates come via `.github/dependabot.yml`.
- If a secret is ever committed: revoke it first (rewriting public history does not un-leak it), then remove it from the code.

## Adding a New Project

1. Add an entry to `/public/projects_input.json`:
   ```json
   {
       "project_area": "Energy",
       "project_name": "My Project",
       "project_logo": "myproject.png",
       "project_website": "https://... or null",
       "project_description": "...",
       "project_topic": "myproject",
       "project_tags": ["Energy"]
   }
   ```
   `project_area` must be one of the areas in `areas.json`. `project_tags` is replaced by the repos' GitHub topics; `top_repositories`, `total_stars` and `total_repositories` are added by the script.
2. On GitHub, add the topic `<project_topic>` to every INESCTEC repo belonging to the project. Without it the project shows zero repos.
3. Put the logo in `src/assets/` with the exact filename used in `project_logo` (or use `null`).
4. Optional: to feature it on the home page, add `{ "project_name", "project_topic", "project_logo" }` to that area's `featured_projects` in `/public/areas.json`.
5. `git pull`, commit, push to `master`. The workflow regenerates `projects.json` and redeploys.
