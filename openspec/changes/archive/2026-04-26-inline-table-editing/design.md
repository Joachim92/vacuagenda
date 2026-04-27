## Context

The app is a plain HTML/CSS/JS SPA with no framework. All table rendering happens in `js/index.js` via DOM manipulation. Records are persisted in IndexedDB (`shots_db` / `shots_os`). The `#shots_table` is rebuilt on each data load. There is no existing edit flow — all rows are read-only today.

## Goals / Non-Goals

**Goals:**
- Inline editing for `date`, `dose`, and `arm` cells with save-on-blur/Enter, cancel-on-Escape
- One-click toggle for the `applied` cell with immediate DOM and DB update
- Minimal CSS additions — input should blend into the table row

**Non-Goals:**
- A modal or separate edit form
- Bulk editing or multi-row selection
- Undo/redo history beyond Escape-to-cancel

## Decisions

**Event delegation on the table instead of per-cell listeners**
Each table rebuild tears down all DOM nodes, so attaching listeners directly to cells would require re-attaching on every render. A single delegated listener on `#shots_table` survives rebuilds and keeps the listener count at O(1).

**Replace cell text content with `<input>` in-place, no extra wrapper**
Swapping the cell's inner HTML with a focused `<input>` is the simplest approach. The alternative — an absolutely-positioned overlay — adds layout complexity for no benefit in a table context.

**Save on blur and Enter; cancel on Escape**
Blur covers both keyboard Tab and mouse-click-away. Enter is the explicit confirm. Escape restores the original text. This matches standard spreadsheet UX expectations.

**Write directly to IndexedDB on confirm; re-read from DB to re-render**
Consistent with how the rest of `index.js` works — no in-memory cache to keep in sync.

## Risks / Trade-offs

- [Fast double-click may fire two edit activations] → The delegated handler checks for an already-active `<input>` in the same cell and bails early.
- [Date input: plain text vs `type="date"`] → Using `type="date"` gives a native picker on mobile but varies across browsers. Plain `type="text"` keeps behavior consistent and matches the existing stored format.
- [No optimistic UI for DB write failures] → IndexedDB writes rarely fail in this context; a console error on failure is acceptable for now.
