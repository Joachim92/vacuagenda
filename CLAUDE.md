# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

No build step. Serve with:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Architecture

Plain HTML/CSS/JS single-page app — no framework, no bundler, no package manager.

- **`index.html`** — single page; contains the `#shots_table` table (columns: Fecha, Dosis, Brazo, Aplicada). The `<tbody>` is empty on load and populated by JS.
- **`js/index.js`** — all application logic. Opens an IndexedDB database (`shots_db` v1) with one object store (`shots_os`, keyPath: `id`, indexed by `date`). On `success`, inserts seed records and calls `init()` to read all records and render them via `display()`.
- **`styles/style.css`** — all styles. `.applied-yes` / `.applied-no` classes style the "applied" column.
- **`assets/`** — SVG icons (`checked.svg`, `unchecked.svg`, `plus.svg`).

## Data Model

Shot record stored in IndexedDB:
```js
{ id, date, dose, arm, applied }
```

## Planned Features (from README)

- Add rows via a hover `+` button
- Inline editing of cells: date, dose, arm, applied status
