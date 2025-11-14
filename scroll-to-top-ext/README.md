# Scroll To Top Button (Chrome extension)

This simple extension injects a floating button on every page that smoothly scrolls the page back to the top when clicked.

Files added

- `manifest.json` — manifest v3 content script registration
- `content.js` — content script that injects the button and handles behavior
- `styles.css` — styles for the floating button

How to load locally (Chrome / Edge)

1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" (top-right).
3. Click "Load unpacked" and select the `scroll-to-top-ext/` folder from this repository.
4. Open any website and scroll down — a round blue button will appear at bottom-right. Click it to scroll to the top.

Notes

- The button is injected as a content script using `<all_urls>`. It won't run on Chrome's internal pages (e.g. `chrome://`) or sites that disallow content scripts.
- If a page needs to remove the button, it can call `window.__removeScrollToTopButton()` from the console.
