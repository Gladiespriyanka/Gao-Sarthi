# Gaon Saathi – rural learning & livelihood platform (MVP)

Six features in one app: Jugaad-to-Innovation, Opportunity Radar, Living Knowledge Vault,
5-Km Economy, offline Community Learning Packs, and the What-If Career Planner.
Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run in VS Code
**Option A: Live Server (easiest)**
1. Open this folder in VS Code (File > Open Folder).
2. Install the "Live Server" extension (VS Code will suggest it).
3. Right-click `index.html` > "Open with Live Server".

**Option B: terminal**
```
npm start
```
or `python -m http.server 5500`, then open http://localhost:5500

Use localhost (not double-clicking the file) so voice input and offline caching work.
Voice input works best in Chrome or Edge.

## Structure
- `index.html`: page shell
- `css/styles.css`: theme (light and dark)
- `js/app.js`: all logic and sample data (opportunities, vault, packs, careers)
- `sw.js`: service worker for offline reopening

## Notes
Sample data is illustrative; verify scheme details before applying.
Data is saved in the browser's localStorage. To reset, clear site data.
Next steps: a backend (Node/Firebase) for shared data, an LLM for Vault answers, more languages.
