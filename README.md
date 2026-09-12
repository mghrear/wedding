# Amabel & Majd — Wedding Website

A static site (no build step) for our wedding, deployed via GitHub Pages at
[amaandmajd.com](https://amaandmajd.com).

## Structure

- `index.html` — Welcome / homepage
- `schedule.html` — Wedding day schedule
- `travel.html` — Travel & accommodations
- `things-to-do.html` — Local recommendations
- `faq.html` — FAQ
- `gallery.html` — Photo gallery
- `rsvp.html` — RSVP (Google Form template + embed instructions inside the file)
- `css/style.css`, `js/script.js`, `images/` — shared styles, scripts, assets
- `CNAME` — tells GitHub Pages to serve this repo at amaandmajd.com

## Editing content

Every page is plain HTML — open any `.html` file in a text editor and change the text
directly. Shared look-and-feel lives in `css/style.css`.

To add real photos to the gallery, put image files in `images/gallery/` and replace the
placeholder `<figure>` tiles in `gallery.html` with `<img src="images/gallery/yourfile.jpg">`.

To activate RSVPs, create a Google Form (see the field template in `rsvp.html`), then embed
it by following the instructions in the HTML comment at the top of that file.

## Deploying updates

Any push to the `main` branch automatically updates the live site (once GitHub Pages is
enabled — see below). To publish a change:

```
git add .
git commit -m "Update schedule details"
git push
```

## One-time setup (GitHub Pages + custom domain)

See the setup steps shared in the project conversation, or:

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**, set the source to the `main` branch, `/ (root)`.
3. Under **Custom domain**, enter `amaandmajd.com` and save (this matches the `CNAME` file already in the repo).
4. At your domain registrar, point `amaandmajd.com` at GitHub Pages:
   - Add `A` records for `@` pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Add a `CNAME` record for `www` pointing to `mghrear.github.io`
5. Back in GitHub Pages settings, once DNS has propagated, check **Enforce HTTPS**.

DNS changes can take anywhere from a few minutes to ~24 hours to propagate.
