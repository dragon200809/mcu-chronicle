# MCU Chronicle

A tracker for Veer's Hybrid Master Order — tick off movies/series, watch real
runtimes log automatically (researched per movie and per episode), and see
total screen time converted into days/hours/minutes.

Pure HTML/CSS/JS. No build step, no dependencies, no backend. Progress is
saved with `localStorage`, so it survives closing the tab, closing the
browser, or restarting your computer — it's tied to the browser on that
device, not to any account.

## Files
- `index.html` — page shell
- `style.css` — all styling
- `data.js` — the watch order + researched runtimes (edit this to change the list)
- `icons.js` — small inline SVG icons + abstract decorative emblems
- `app.js` — app logic (rendering, state, save/load)

## Run it locally
Just open `index.html` in a browser. That's it — no install needed.

## Deploy to GitHub Pages (free, get a live URL in ~2 minutes)
1. Create a new repository on GitHub (e.g. `mcu-chronicle`).
2. Upload all 5 files in this folder to the repo (drag-and-drop on the
   GitHub website works, or use `git`):
   ```bash
   git init
   git add .
   git commit -m "MCU Chronicle"
   git branch -M main
   git remote add origin https://github.com/<your-username>/mcu-chronicle.git
   git push -u origin main
   ```
3. On GitHub: go to the repo → **Settings** → **Pages**.
4. Under "Build and deployment" → Source: **Deploy from a branch**.
5. Branch: **main**, folder: **/ (root)** → **Save**.
6. Wait ~1 minute, then your site is live at:
   `https://<your-username>.github.io/mcu-chronicle/`

## Using your own domain
1. Buy a domain (Namecheap, GoDaddy, Google Domains, etc. — any registrar).
2. In your domain's DNS settings, add either:
   - A **CNAME record** pointing your subdomain (e.g. `mcu.yourdomain.com`) to
     `<your-username>.github.io`, or
   - Four **A records** for the root domain pointing to GitHub Pages' IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Back in your repo → **Settings** → **Pages** → "Custom domain" → enter
   your domain → **Save**. GitHub will verify it and can auto-provision
   HTTPS for you (check "Enforce HTTPS" once it's available).
4. DNS changes can take a few minutes to a few hours to propagate.

## Editing the watch list or runtimes
Everything content-related lives in `data.js` — `PARTS` (the 9 sections) and
`ITEMS` (every movie/series, in order, with `runtimeMin` for movies/specials
or an `episodes` array for series). Add, remove, or reorder entries there;
the app picks it up automatically, no other file needs to change.
