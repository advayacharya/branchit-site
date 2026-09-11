# Spec: Branchit landing site

Status: ready-for-agent
Owner: Advay Acharya
Design reference: https://claude.ai/code/artifact/5c0be562-8cdb-44fe-97f8-f46e0d290a3e

## Problem Statement

ChatGPT has a native feature called **Branch in new chat** that forks a conversation into a new thread from any message. Almost no one uses it because:

1. It's buried in a right-click menu most users never open — the feature is genuinely hidden.
2. When someone does use it, the branched conversation opens on a separate page, so the main thread disappears from view. The workflow feels like leaving, not exploring.

Branchit (the extension) solves the second problem by opening branches as a floating side-chat next to the main conversation. But Branchit itself has no public presence — no way for anyone to hear about it, learn what the Branch feature is, or install the extension.

## Solution

A single-page public marketing site at `branchit.vercel.app` that:

1. **Announces the Branch feature exists** (many visitors will have never heard of it).
2. **Explains why it's useful** in three concrete reasons.
3. **Introduces Branchit as the tool** that makes branching actually usable, with a mock preview of the floating side-chat.
4. **Walks the visitor through Load-unpacked installation in five alternating chapters**, with real screenshots where available.
5. **Provides contact and uninstall info** in the footer.

The site is the primary marketing surface until Branchit is published to the Chrome Web Store. Distribution is a single `branchit.zip` at a stable URL, unversioned.

## User Stories

1. As a first-time visitor unfamiliar with ChatGPT's Branch feature, I want to be told immediately what this page is about, so that I don't bounce in the first three seconds.
2. As a curious ChatGPT power user, I want to see a screenshot of the native "Branch in new chat" menu, so that I can verify the feature actually exists inside my own ChatGPT.
3. As a visitor evaluating whether to install, I want a preview of what Branchit looks like in action, so that I know what I'll get before installing anything.
4. As a visitor scanning for value, I want three concrete reasons to use branching, so that I can decide whether the workflow fits my usage.
5. As someone ready to install, I want a single obvious **Download** button in the hero, so that I don't have to hunt for it.
6. As someone still deciding, I want a secondary **See how it works ↓** link, so that I can scroll to the install steps without downloading first.
7. As someone worried about "Developer mode," I want the site to acknowledge it looks scary and reassure me it's routine, so that I don't back out.
8. As a Chrome user, I want to be told this works on Chrome, so that I don't worry it's Firefox-only.
9. As an Edge/Brave/Arc user, I want the site to say "any Chromium browser," so that I know I'm not excluded.
10. As a visitor on a laptop, I want the page to look good at 1440px, so that it feels considered.
11. As a visitor on a phone, I want the page to be readable and the download button to still work, so that I can send myself the link and install later on my laptop.
12. As a visitor at step 1 of install, I want to know the file is small (~50KB) and lands in Downloads, so that I know what to look for.
13. As a visitor at step 2 of install, I want to be told Chrome can't load a zip directly and I need to extract it, so that I don't waste time trying to drag the zip.
14. As a visitor at step 3 of install, I want to see a screenshot of the Developer-mode toggle, so that I know exactly what to click.
15. As a visitor at step 4 of install, I want to see a screenshot of the "Load unpacked" button, so that I know what I'm looking for in the extensions header.
16. As a visitor at step 5 of install, I want to see a confirmation of what a successful install looks like, so that I know when I'm done.
17. As a visitor who finished install, I want to be told the next action ("Open ChatGPT, right-click any message, hit 'Branch in new chat'"), so that I know how to actually try the feature.
18. As a visitor curious about who made this, I want a footer credit and contact email, so that I can report bugs or say thanks.
19. As a visitor who wants to remove Branchit later, I want a one-line uninstall reminder in the footer, so that I don't have to hunt for it.
20. As the site owner, I want basic page-view analytics without cookies, so that I know if anyone's visiting and can decide whether to keep iterating.
21. As the site owner, I want the download URL to stay stable across releases, so that I don't have to update the site every time I ship a new version of the extension.
22. As the site owner, I want the site to deploy without a build step, so that I can push updates by drag-drop or a single Git push.
23. As the site owner, I want the site's visual identity (branch-network background, dull-forest greens, monospace meta labels) to be distinctive enough that a stranger who sees a screenshot on Twitter can recognize it later.
24. As the site owner, I want the copy voice to be product-marketing neutral, so that the site doesn't feel like a personal project even though it is one.
25. As a visitor with reduced-motion preferences, I want the ambient background animations to respect `prefers-reduced-motion`, so that I'm not distracted or unwell.
26. As a visitor using a screen reader, I want the page's landmarks (nav, main, sections, footer) and headings (h1/h2/h3) to form a coherent outline, so that I can navigate without seeing the visual design.
27. As a visitor tabbing through, I want the download CTA and internal anchor links to be keyboard-reachable in a sensible order, so that I don't need a mouse.

## Implementation Decisions

### Stack

- **Zero build step.** Single `index.html`, one small `main.js`, one folder of assets. Tailwind loaded via the Play CDN (`https://cdn.tailwindcss.com`); no PostCSS, no npm build. This is deliberate — matches the solo-owner cadence and Vercel's simplest deploy path.
- **Fonts**: Google Fonts — Space Grotesk (500/600/700), IBM Plex Sans (400/500/600), IBM Plex Mono (400/500).
- **Vanilla JS only** for the two behaviours that need it: smooth-scroll on internal anchors, and an IntersectionObserver-driven fade-up on section entry (`prefers-reduced-motion` disables both).
- **Analytics**: Vercel Analytics, plain HTML snippet.

### Palette

- Ground: `#faf9f5` (warm cream)
- Primary text: `#1a1a1a`
- Muted text: `#444`, `#666`, `#888` for progressively deeper hierarchy
- Primary green: `#134e39` (deep forest — CTAs, logo, warm-bg links)
- Mid green: `#486a55` (muted mid-forest — strokes, dividers, install spine)
- Muted sage: `#7a9a85` (dull sage — accents on dark, meta labels, code highlights)
- Dark section ground: `#1a1a17` (install)
- Warm-white on dark: `#f5f4ea`
- Muted text on dark: `#b8b4a2`, `#7a7365`

Light-mode only. Dark-mode auto-detect is deferred (out of scope) — the warm cream palette is the identity.

### Page structure (top to bottom)

1. **Sticky nav** with frosted-glass backdrop — logo left, section links + Download CTA right.
2. **Hero** — meta label with pulsing dot, 76pt headline, 20pt subhead, primary CTA + scroll-hint link, small "not on Chrome Web Store yet" caveat. Below the copy: a mock ChatGPT browser frame showing the floating side-chat in action (the "money shot" preview).
3. **Divider**.
4. **"What is the Branch feature?"** — two-column: text + a mock of the native ChatGPT context menu with "Branch in new chat" highlighted (Screenshot A slot).
5. **"Why bother"** — three cards, hover-lift, each with an inline SVG icon.
6. **Install** — dark section. Header ("Five steps. About ninety seconds."). Five alternating chapters with 220pt background numerals, per-step `NN / 05` mono labels, larger visual mocks per step, and a central animated spine.
7. **Footer** — Branchit + credit / Contact / How to uninstall.

### Animation

- Hero: `fadeUp` on load (headline, subhead, CTAs staggered); `hero-glow` breathing radial gradient behind headline; download button `softpulse`.
- Section labels: no motion.
- Branch-network background (SVG, three layers, 29 paths + 12 nodes) draws and erases across the cream sections. Stops before the dark install section.
- Install: `draw-spine` on the central line; step numerals static; mocks static.
- All ambient animation disabled under `prefers-reduced-motion: reduce`.

### Meta labels

Monospace, tracked-uppercase, prefixed by a thin horizontal line. No enclosing pill/badge/border. Pulsing dot only on the hero. Per-step labels format: `01 / 05`, `02 / 05`, etc. — no "STEP" prefix.

### Distribution

- **Download URL**: `/branchit.zip` — stable, unversioned. Owner overwrites it on every release.
- **Zip structure**: `manifest.json` and the asset directories (`dist/`, `icons/`) live **at the top level of the archive** — no wrapper folder inside the zip. When a user extracts `branchit.zip`, Windows "Extract All" and macOS auto-extract both create a folder **named after the zip** (`branchit/`) and drop the archive's entries directly inside it. So the extracted layout is `Downloads/branchit/manifest.json`, and Chrome's Load-unpacked works when the user points at that folder. A wrapper folder inside the zip creates a double-nested `Downloads/branchit/branchit/manifest.json` and Chrome cannot find the manifest — this is the shape that got shipped and reverted; `scripts/check-zip.mjs` guards against it re-appearing.
- **Filename shown in UI**: always `branchit.zip`.

### Screenshots

Six slots (A–F). Site launches with:
- **Real screenshots** for B (side-chat in action, from the user), C (Developer mode toggle), and D (Load unpacked button).
- **SVG mock placeholders** for A (native branch menu), E (folder picker), F (installed extension card) — visually rich enough not to look like a wireframe. Real PNGs drop in later when provided.

### Deployment

- **Vercel** at `branchit.vercel.app`. Deploy by `vercel` CLI or drag-drop of the site folder.
- Vercel Analytics enabled.
- Custom domain deferred (out of scope for v1).

### Copy voice

Product-marketing neutral. Third-person, present tense. Confident, not chatty. Not first-person hobbyist. Confirmed in the grill-with-docs interview (Q13).

### Vocabulary

Follows `CONTEXT.md`: **the Branch feature** for ChatGPT's native capability, **Branchit** for the extension, **Load unpacked** for the sideload flow, **zip payload** for the download.

## Testing Decisions

- **Single testing seam**: the rendered HTML page. There is no logic below the page level worth unit-testing.
- **Automated checks**:
  - **HTML validity** via `html-validate` against `index.html`. Catches malformed markup and unclosed tags.
  - **Internal-anchor resolution**: a small Node script that parses `index.html`, collects every `href="#..."`, and confirms each matches an `id` on the page. Catches broken jump-links.
  - **Zip-payload check**: a small Node script that opens `branchit.zip` at the build root and confirms it contains `branchit/manifest.json`. Catches accidentally shipping an empty or misshaped zip.
- **Manual QA (unavoidable for design work)**: visual pass at 1440 / 1024 / 768 / 375 px viewports in Chrome, plus a smoke check that the branch-network background animates and no console errors appear.
- **What we're NOT testing**: no Playwright, no visual-regression screenshots, no unit tests. Overkill for a static one-pager, and the ambient animation would make screenshot diffs noisy.
- **Prior art**: none in this repo (it's a fresh project). `html-validate` and `linkinator` are the closest ecosystem-standard tools; the anchor check is custom because linkinator focuses on external links.

Good tests for this project verify **what a visitor sees and does**, not how the CSS was authored: does the download button link to `branchit.zip`? Does clicking "See how it works" jump to the install section? Do all 5 steps render? Does the footer show contact + uninstall? These are page-level facts.

## Out of Scope

- **Dark mode.** Warm cream palette only. Auto-detect via `prefers-color-scheme` is deferred.
- **Chrome Web Store distribution.** The site's install flow is Load-unpacked only.
- **Auto-install / one-click install.** Browsers don't allow it; the site does not attempt it.
- **Multiple pages** (about, FAQ, blog, changelog). Single-page site.
- **User accounts, sign-ups, mailing list.** None.
- **Telemetry beyond Vercel Analytics page views.** No custom event tracking.
- **Internationalization.** English only.
- **Custom domain.** `branchit.vercel.app` for v1.
- **Screenshots A, E, F as real PNGs.** Ship with SVG mock placeholders; swap in real images post-launch when the owner provides them.
- **Interactivity in the mock browser preview.** Static mock; no real ChatGPT.
- **Version-stamped downloads.** Always `branchit.zip`, never `branchit-0.2.0.zip`.
- **A "Suggest a feature / File a bug" form.** Contact is a footer email.
- **CSS build pipelines.** Tailwind Play CDN only.

## Further Notes

- The design canvas at [https://claude.ai/code/artifact/5c0be562-8cdb-44fe-97f8-f46e0d290a3e](https://claude.ai/code/artifact/5c0be562-8cdb-44fe-97f8-f46e0d290a3e) is the authoritative visual reference. When copy or layout disagrees with this spec, the canvas wins for visuals and the spec wins for behaviour.
- Working files for the design live at `design/Main.dc.html` + `design/canvas.json` — keep these in sync if the design changes.
- The `branchit.zip` file itself is built from the sibling `C:\branchit\` extension repo. This site does not build the extension; it hosts the pre-built zip. Wiring up how the zip gets copied here (manual for now, or a small script) is a side concern for `/implement` to answer.
- Motion is intentionally understated. If a reviewer says "the animations are cool," we overshot.
