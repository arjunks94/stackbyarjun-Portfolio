# StackByArjun Portfolio

A world-class personal portfolio built with Next.js 15, featuring premium animations, Decap CMS content management, and Cloudflare Pages deployment.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** TailwindCSS + CSS Variables (dark theme first)
- **Animations:** Framer Motion + GSAP
- **CMS:** Decap CMS (Git-based)
- **Hosting:** Cloudflare Pages, Vercel, Netlify compatible
- **Analytics:** Cloudflare Web Analytics
- **Forms:** Cloudflare Turnstile

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS dashboard.

### Local CMS Development

```bash
# Run Decap CMS local backend (in a separate terminal)
npx decap-server
```

## Project Structure

```
├── content/                 # CMS-managed content (markdown + JSON)
│   ├── personal/
│   ├── social/
│   ├── skills/
│   ├── projects/
│   ├── experience/
│   ├── certifications/
│   └── blog/
├── public/
│   ├── admin/              # Decap CMS admin panel
│   └── images/
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/
│   │   ├── animations/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   └── types/
└── .github/workflows/      # CI/CD pipelines
```

## Content Management

All content is managed through Decap CMS at `/admin`. No code changes needed to update:

- Personal information
- Social links
- Skills
- Projects
- Experience
- Certifications
- Blog posts

## Features

- Premium dark theme with glassmorphism
- Scroll-triggered animations and page transitions
- Command palette (Ctrl+K)
- Theme settings panel
- Project search, filter, and sort
- Blog with tags, categories, and reading time
- GitHub contribution widget
- Featured project carousel
- Resume viewer
- SEO optimized (metadata, OpenGraph, JSON-LD, sitemap)
- Cloudflare Turnstile contact form protection

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for Cloudflare Pages, Vercel, and Netlify.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | Cloudflare Web Analytics token |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |
| `CONTACT_FORM_WEBHOOK_URL` | Webhook for contact form submissions |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username for contributions widget |

## License

MIT
