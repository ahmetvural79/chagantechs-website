# Chagan Technology — chagantechs.com

The corporate website of **Çağan Yazılım Teknolojileri ve Pazarlama Ltd. Şti.**
A bilingual (Turkish / English) single-page site, built as plain HTML, CSS and
vanilla JavaScript with no build step and no dependencies.

**Contact:** [contact@chagantechs.com](mailto:contact@chagantechs.com)

---

## Products featured on the site

| Product | Site | What it is |
|---|---|---|
| **tunr** | [tunr.sh](https://www.tunr.sh) | Deployment and tunnelling platform for apps built by AI agents |
| **Vitrus** | [vitrus.dev](https://www.vitrus.dev) | Cookie-free, open-source web analytics with a transparency layer |
| **Eduira** | [eduira.com](https://www.eduira.com) | AI-native lesson, worksheet and classroom-game engine for teachers |
| **Kavriyo** | [kavriyo.com](https://www.kavriyo.com) | LGS and YKS exam preparation platform for students in Türkiye |

---

## Structure

```
.
├── index.html            # the whole site — one page, Turkish authored inline
├── thanks.html           # contact form success page
├── 404.html              # not found page
├── netlify.toml          # headers, caching, redirects (no build command)
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── favicon.ico
└── assets/
    ├── css/style.css     # the complete stylesheet
    ├── js/i18n.js        # English translation dictionary
    ├── js/main.js        # language switch, nav, scroll reveal
    └── img/              # brand mark, icons, social card
```

## How the two languages work

Turkish is written directly into `index.html`, so the page is fully readable by
search engines and by visitors without JavaScript. Every translatable element
carries a `data-i18n="key"` attribute.

On load, `assets/js/main.js` snapshots the Turkish markup, then swaps in the
English strings from `assets/js/i18n.js` if English is selected. Language is
chosen in this order:

1. `?lang=tr` or `?lang=en` in the URL
2. the visitor's previous choice, from `localStorage`
3. the browser language — Turkish browsers get Turkish, everyone else English

**To edit copy:** change the Turkish inside `index.html` and the matching key in
`assets/js/i18n.js`. The two must stay in sync — a key missing from `i18n.js`
simply stays Turkish when English is selected.

## Local preview

No build, no install. Any static server works:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` straight from the filesystem will not work, because the
assets are referenced by absolute path (`/assets/...`).

## Deploying to Netlify

1. In Netlify, choose **Add new site → Import an existing project** and pick
   this GitHub repository.
2. Leave the build command empty; the publish directory is `.` (already set in
   `netlify.toml`).
3. Deploy. Add the custom domain `chagantechs.com` under **Domain management**.

### Contact form

The contact form uses **Netlify Forms** — it is wired up by the
`data-netlify="true"` attribute and needs no backend. Submissions appear under
**Forms** in the Netlify dashboard; add a notification e-mail there to have them
forwarded to `contact@chagantechs.com`. A hidden honeypot field blocks most
spam bots.

## Browser support

Modern evergreen browsers. The site degrades gracefully: without JavaScript it
renders in Turkish with all content visible, and `prefers-reduced-motion` turns
off every animation.

---

## A note on the previous site

The 2017 Bootstrap/PHP version of this site is kept locally in `legacy/`, which
is **git-ignored on purpose**. Those files contain hardcoded production database
credentials and must not be published. If any of those servers are still
reachable, the credentials in them should be rotated.

---

© Chagan Technology · Çağan Yazılım Teknolojileri ve Pazarlama Ltd. Şti.
