## Context

The app is a plain HTML/CSS/JS SPA with no build step. Data is persisted in IndexedDB (`shots_db`, object store `shots_os`, keyPath `id`). Currently, seed records are hardcoded in the `success` handler of the DB open request. There is no way for users to add records through the UI.

## Goals / Non-Goals

**Goals:**
- Render a `+` button below the table
- On click, insert a new row with default values into IndexedDB and display it in the table

**Non-Goals:**
- Inline editing of the new row's fields (separate future feature)
- Validation or confirmation dialogs
- Hover-per-row `+` button (simpler single button at the bottom is sufficient for now)

## Decisions

**Single `+` button below the table (not per-row hover)**
The README mentions "on hover, display + button" per row, but a single button at the bottom is simpler to implement without framework support and avoids CSS hover complexity for a first iteration. Per-row hover can be added later.

**ID generation via `Date.now()`**
IndexedDB uses `id` as the keyPath. Using `Date.now()` gives a unique integer without requiring a separate counter or cursor to find the max ID. Collision risk is negligible for single-user local data.

**Default field values for new rows**
New records are inserted with `date: new Date()`, `dose: 0`, `arm: ''`, `applied: false`. These are placeholders until inline editing is implemented.

## Risks / Trade-offs

- `Date.now()` as ID → two rapid clicks could theoretically collide → acceptable for single-user local app
- Seed records in the `success` handler will duplicate on every page reload → pre-existing issue, not introduced by this change
