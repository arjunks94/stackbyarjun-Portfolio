# Local CMS Setup (No GitHub Login)

For testing, the admin panel uses **Decap CMS local backend** — no GitHub OAuth required.

## Quick start (one command)

```bash
npm run dev:all
```

This starts both:
- **Site** at http://localhost:3000
- **CMS proxy** at http://localhost:8081

Then open **http://localhost:3000/admin** — you should go straight to the editor with no login screen.

## Manual start (two terminals)

**Terminal 1 — CMS proxy (must run first):**
```bash
npm run cms
```

**Terminal 2 — website:**
```bash
npm run dev
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Login with GitHub" still appears | Ensure `npm run cms` is running and you're on `localhost:3000` (not `127.0.0.1` unless listed in config) |
| Changes not saving | Check terminal running `decap-server` for errors |
| Admin blank page | Hard refresh (`Ctrl+Shift+R`) |

## What gets saved

Edits are written directly to files in `/content` and `/public/images/uploads`. Restart `npm run dev` if the site doesn't reflect changes immediately.

## Production (later)

When you deploy, add GitHub OAuth to `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: your-username/your-repo
  branch: main
  base_url: https://your-oauth-proxy.workers.dev
  auth_endpoint: auth
```

Remove or disable `local_backend` for production builds.
