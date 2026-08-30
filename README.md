# Sharun E M — Cinematographer & Colorist Portfolio

Built with Eleventy (11ty) + Decap CMS. Deploys to Vercel from a Git repo.

## Local development

```
npm install
npm run serve
```

Site runs at http://localhost:8080

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: "Add New Project" → import this repo.
   - Build command: `npm run build`
   - Output directory: `_site`
   - (Both are already set in `vercel.json`, Vercel should detect them automatically.)
3. Deploy. Your site will be live at `your-project.vercel.app` (or a custom domain).

## Setting up the CMS (Decap CMS + GitHub OAuth on Vercel)

Vercel doesn't have Netlify's built-in Identity/Git Gateway, so Decap CMS is
configured here to use **GitHub OAuth directly**, via a small separate OAuth
proxy. This is Decap's standard, documented approach for non-Netlify hosts.

### 1. Create a GitHub OAuth App
- Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
- Homepage URL: `https://your-site.vercel.app`
- Authorization callback URL: `https://your-oauth-proxy.vercel.app/callback`
- Save the generated **Client ID** and **Client Secret**

### 2. Deploy an OAuth proxy
Decap CMS needs a tiny backend to complete the GitHub OAuth handshake. The
simplest option is deploying the community proxy as its own small Vercel
project:
- Repo: https://github.com/vencax/netlify-cms-github-oauth-provider
  (works fine on Vercel despite the "netlify-cms" name — it's a generic
  Node OAuth handler)
- Deploy it as a separate Vercel project
- Set its environment variables: `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`
  (from step 1), and `OAUTH_HOST_NAME=github.com`

### 3. Update `src/admin/config.yml`
Replace the placeholders with your real values:
```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
  branch: main
  base_url: https://your-oauth-proxy.vercel.app
  auth_endpoint: auth
```

### 4. Log in
Visit `your-site.vercel.app/admin`, click "Login with GitHub", authorize the
app. Any GitHub account with write access to the repo can now edit:
- Work / Projects (title, date, categories, summary, cover image, body)
- Site Settings (name, contact info, reel link, social links)

Every edit through `/admin` commits directly to this repo and triggers a new
Vercel deploy automatically.

## Structure

- `src/index.njk` — Home (hero reel, stills grid, selected work)
- `src/work.njk` — Work page with category filtering (Corporate & Brand / Cinematography / Color Grading)
- `src/about.njk` — About page (DOP + Colorist roles, experience timeline)
- `src/contact.njk` — Contact page (mailto CTA + contact list, no form/backend)
- `src/content/projects/` — one markdown file per project, edited via CMS or by hand
- `src/admin/` — Decap CMS admin panel and config
- `src/_data/site.json` — global site settings (name, contact, socials, reel link)

## Adding real photos

Replace the placeholder blocks in `src/index.njk` (Recent Stills grid) and
project cards' `image` field once you have stills ready — or do it through
the `/admin` panel by uploading images to each project entry.

## Notes

- The Work category "Weddings & Events" was intentionally excluded per brief;
  a project can carry multiple tags (e.g. a project both shot and graded
  appears under both "Cinematography" and "Color Grading").
- Contact form was intentionally simplified to a mailto link — no backend
  or third-party form service required.
