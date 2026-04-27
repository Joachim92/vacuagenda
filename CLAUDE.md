# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

No build step. There is a python http service that is already running in port 8000. 
The website can be visited at `http://localhost:8000`.

## Architecture

Plain HTML/CSS/JS single-page app — no framework, no bundler, no package manager.

- **`index.html`** — single page; contains the `#shots_table` table.
- **`js/index.js`** — all application logic. Uses an IndexedDB database (`shots_db`) with one object store (`shots_os`).
- **`styles/style.css`** — all styles.
- **`assets/`** — SVG icons.

## Data Model

Shot record stored in IndexedDB:
```js
{ id, date, dose, arm, applied }
```
