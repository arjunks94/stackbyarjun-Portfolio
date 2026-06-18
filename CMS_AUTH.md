# CMS Admin — Production GitHub Login (Cloudflare)

The `/admin` login fails with `api.netlify.com` because Decap CMS defaults to **Netlify auth**. On Cloudflare Pages you need a **GitHub OAuth proxy** (small Worker).

---

## Overview

```
/admin  →  "Login with GitHub"  →  OAuth Worker  →  GitHub  →  back to /admin
```

You will:
1. Create a GitHub OAuth App
2. Deploy `workers/cms-oauth` to Cloudflare
3. Point `public/admin/config.yml` at the Worker URL
4. Redeploy the site

---

## Step A — Create GitHub OAuth App

1. Open **https://github.com/settings/developers** → **OAuth Apps** → **New OAuth App**
2. Fill in:

| Field | Value |
|-------|-------|
| Application name | `StackByArjun CMS` |
| Homepage URL | `https://stackbyarjun.qzz.io` |
| Authorization callback URL | `https://stackbyarjun-cms-oauth.<YOUR-CF-SUBDOMAIN>.workers.dev/callback?provider=github` |

> Replace `<YOUR-CF-SUBDOMAIN>` after Step B — you can create the OAuth app first with a placeholder, then edit the callback URL once you know the Worker URL.

3. Click **Register application**
4. Copy **Client ID**
5. Click **Generate a new client secret** → copy **Client secret** (shown once)

Store both in Notepad — you need them in Step B.

---

## Step B — Deploy the OAuth Worker

In PowerShell:

```powershell
Set-Location "E:\Dev\stackbyarjun-Portfolio\workers\cms-oauth"

# Log in to Cloudflare (if not already)
npx wrangler login

# Set secrets (paste values when prompted)
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET

# Deploy
npx wrangler deploy
```

After deploy, note the URL, e.g.:

```
https://stackbyarjun-cms-oauth.arjunks94.workers.dev
```

**Go back to GitHub OAuth App** → edit **Authorization callback URL** to:

```
https://stackbyarjun-cms-oauth.arjunks94.workers.dev/callback?provider=github
```

(Use your exact Worker URL.)

---

## Step C — Update Decap CMS config

Edit `public/admin/config.yml` — add `base_url` and `auth_endpoint` under `backend`:

```yaml
backend:
  name: github
  repo: arjunks-dev/stackbyarjun-Portfolio
  branch: main
  base_url: https://stackbyarjun-cms-oauth.arjunks94.workers.dev
  auth_endpoint: auth
```

Keep `local_backend` — it only works on `localhost` and is ignored in production.

Commit and push:

```powershell
Set-Location "E:\Dev\stackbyarjun-Portfolio"
git add public/admin/config.yml
git commit -m "Configure Decap CMS GitHub OAuth for Cloudflare"
git push org main
```

Cloudflare Pages will auto-redeploy.

---

## Step D — Test

1. Open **https://stackbyarjun.qzz.io/admin**
2. Click **Login with GitHub**
3. Popup should go to **GitHub** (not `api.netlify.com`)
4. Authorize → popup closes → CMS editor loads

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Still opens `api.netlify.com` | `base_url` missing in `config.yml` or site not redeployed yet |
| GitHub shows redirect URI mismatch | Callback URL must exactly match Worker URL + `/callback?provider=github` |
| Popup closes but CMS blank | Check Worker logs: Cloudflare → Workers → `stackbyarjun-cms-oauth` → Logs |
| 401 / repo access denied | GitHub account must have write access to `arjunks-dev/stackbyarjun-Portfolio` |

---

## Optional: custom subdomain

Instead of `*.workers.dev`, add a route like `cms-auth.stackbyarjun.qzz.io` in Worker **Settings → Domains & Routes**, then use that URL as `base_url` and update the GitHub OAuth callback URL to match.

---

## Local dev (unchanged)

```powershell
npm run dev:all
```

Open http://localhost:3000/admin — no GitHub login needed (`local_backend`).
