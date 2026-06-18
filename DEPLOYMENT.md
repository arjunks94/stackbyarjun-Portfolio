# Deployment Guide

This portfolio supports deployment to **Cloudflare Pages**, **Vercel**, **Netlify**, and **GitHub Actions**.

---

## Cloudflare Pages (Recommended)

### Prerequisites

- Cloudflare account
- GitHub repository connected to Cloudflare Pages
- Node.js 20+

### Dashboard Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Select your repository: `arjunks94/stackbyarjun-Portfolio`
3. Configure build settings:

| Setting | Value |
|---------|-------|
| **Framework preset** | Next.js |
| **Build command** | `npm run pages:build` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | `/` |
| **Node.js version** | `20` |

4. Add environment variables:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CF_BEACON_TOKEN=your-token
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
CONTACT_FORM_WEBHOOK_URL=https://your-webhook-url
```

5. Click **Save and Deploy**

### Advanced: Full Next.js on Cloudflare (Edge)

For SSR and API routes on Cloudflare Workers edge:

```bash
npm run pages:build
npm run pages:deploy
```

This uses `@cloudflare/next-on-pages` to compile Next.js for Cloudflare's edge runtime.

### Cloudflare Web Analytics

1. Go to **Analytics & Logs** → **Web Analytics**
2. Add your site and copy the beacon token
3. Set `NEXT_PUBLIC_CF_BEACON_TOKEN` in environment variables

### Cloudflare Turnstile

1. Go to **Turnstile** in Cloudflare Dashboard
2. Create a widget for your domain
3. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`

### Custom Domain

1. In your Pages project → **Custom domains**
2. Add your domain (e.g., `stackbyarjun.com`)
3. Update DNS records as instructed
4. SSL is provisioned automatically

---

## GitHub Actions (CI/CD)

The repository includes automated deployment workflows:

- **`.github/workflows/ci.yml`** — Lint and build on every push/PR
- **`.github/workflows/deploy.yml`** — Deploy to Cloudflare Pages on push to `main`

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | API token with Pages edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | Analytics beacon token |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key |

### Required GitHub Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username |

---

## Vercel

1. Import repository at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. Add environment variables from `.env.example`
4. Deploy

Vercel provides native Next.js support with zero configuration.

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

---

## Netlify

1. Import repository at [app.netlify.com](https://app.netlify.com)
2. Build settings:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `20` |

3. Install the Next.js Netlify plugin or use static export
4. Add environment variables
5. Deploy

For full Next.js support, add `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Decap CMS Authentication

Decap CMS requires GitHub OAuth for production editing.

### Option 1: Cloudflare Worker OAuth Proxy

Deploy an OAuth proxy worker and update `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: your-username/your-repo
  branch: main
  base_url: https://your-oauth-proxy.workers.dev
  auth_endpoint: auth
```

### Option 2: Netlify Identity (if using Netlify)

Enable Netlify Identity and Git Gateway for authentication.

### Local Development

```bash
npx decap-server
```

Set `local_backend: true` in `config.yml` (already configured).

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test CMS admin at `/admin`
- [ ] Confirm contact form with Turnstile
- [ ] Check sitemap at `/sitemap.xml`
- [ ] Validate robots.txt at `/robots.txt`
- [ ] Run Lighthouse audit (target: 95+)
- [ ] Verify OpenGraph previews
- [ ] Test mobile responsiveness
- [ ] Confirm Cloudflare Analytics tracking

---

## Performance Tips

- Replace placeholder images in `/public/images/` with optimized WebP/AVIF
- Replace `/public/resume.pdf` with your actual resume
- Update `content/personal/info.json` with your details
- Configure CDN caching headers in Cloudflare
- Enable Cloudflare Auto Minify and Brotli compression
