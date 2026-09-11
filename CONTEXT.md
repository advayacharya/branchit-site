# CONTEXT

Glossary for the Branchit landing site.

## Terms

### Branch feature

ChatGPT's own native ability to fork a conversation from any message into a new chat, via the "Branch in new chat" menu item. This is a feature of ChatGPT itself, not something Branchit adds. The landing site's primary job is to raise awareness that this feature exists — many ChatGPT users have never noticed it.

Avoid: "branching" as a verb ("I want to branch this chat") — it's ambiguous with git. When talking about the feature always call it **the Branch feature** or **ChatGPT's Branch feature**.

### Branchit

The Chrome extension. Turns ChatGPT's Branch feature into a **floating side-chat widget**, so a branch opens beside the main conversation instead of navigating away to a separate chat page. Distributed as a `.zip` that users **Load unpacked** into `chrome://extensions`.

Avoid conflating with the Branch feature. Branchit is the *delivery vehicle*; the Branch feature is the underlying capability.

### Load unpacked

Chrome's developer-mode sideload flow: `chrome://extensions` → toggle Developer mode → "Load unpacked" → point at an extracted folder. Works identically on Chromium browsers (Edge, Brave, Opera). This is the only install path available to Branchit until it's published to the Chrome Web Store.

The user must **extract** the downloaded `.zip` before this — Chrome cannot load a zip directly.

### Zip payload

The downloaded artifact users install. Contents are packaged so extracting produces exactly one top-level `branchit/` folder, giving users a single clean folder to point Chrome at.
