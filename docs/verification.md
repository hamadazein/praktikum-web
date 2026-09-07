# Verification — Praktika

Verified locally on 7 September 2026, in `C:/Users/hamad/Documents/praktikum-web`.

## Results

- `npm run build`: passed; seven modules, 28 canonical practices, local source bundles and font assets.
- `npm test`: eight tests passed, zero failures.
- `npm run test:e2e`: 31 Chromium browser tests passed, zero failures.
- `npm run format:check`: passed.
- `git diff --check`: passed.
- Desktop and mobile screenshots inspected for home, reading, and playground; saved locally in ignored `artifacts/`.

## Tested behavior

Original guides and practice lists for all seven modules; search, categories, shared query URLs, bookmarks, completion persistence, quiz retry, blocked storage, missing-content recovery, old anchors, and unknown routes. Playground tests cover HTML/CSS import, JavaScript execution, runtime errors, isolation from app storage, forged-message rejection, reset, download, and async success/error flows. Assets and module sources also work when mounted under a repository subpath.

Keyboard tests cover the home search shortcut, mobile navigation, tab arrows, skip link, preferences, and dialog dismissal. Reflow checks cover ten routes at 320, 390, 768, and 1440 pixels, including larger text.

axe checks report no WCAG 2 A/AA or 2.1 AA violations on the tested home, catalog, guide, quiz, PHP practice, projects, saved, progress, playground host, settings dialog, and mobile navigation states. These automated checks do not constitute a complete accessibility certification. Student-authored iframe documents are excluded from the host audit.

## Scope and limits

The original PHP examples were inspected as source and their instructions tested; PHP is not installed in this environment, so server-side execution was not tested. Original demos may rely on external CDN or API services. Main application assets and playground presets are local. Progress and drafts are stored in the current browser, without account synchronization. Publication is separate from this local implementation.
