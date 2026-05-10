## Context

The app has a single `#shots_table` whose `tbody` is populated by `display()` for every record loaded from IndexedDB. `toggleApplied()` currently updates the checkbox SVG and the `.missed` class in place on the existing row. There is no second table or tab UI today.

## Goals / Non-Goals

**Goals:**
- Tab bar with "Pendientes" and "Aplicadas" tabs that shows/hides the two tables.
- `display()` routes newly rendered rows to the correct table based on `applied`.
- `toggleApplied()` moves the row between the two `<tbody>` elements instead of only mutating it in place.
- Active tab is highlighted; inactive tab is visually distinct.

**Non-Goals:**
- Persisting the selected tab across page reloads.
- Pagination or sorting within either table.
- Any IndexedDB changes.

## Decisions

**Two separate `<table>` elements, each with their own `<tbody>`.**
An alternative would be one table with CSS `display:none` on rows, but two tables is simpler to reason about: each table owns its rows and the DOM always reflects the data split. Moving a row is a single `appendChild` call.

**Tab bar is implemented as two `<button>` elements above the tables.**
Simple, accessible, no extra dependencies. The active tab gets an `.active` class. Alternative (radio inputs + labels) adds unnecessary markup complexity.

**`display()` selects target tbody by checking `rowObj.applied`.**
Keeps the routing logic in one place. `display()` already builds the full row; it just needs to know which `tbody` to append to.

**`toggleApplied()` physically moves the row via `appendChild`.**
`appendChild` on an existing node removes it from its current parent and inserts it into the new one — no clone needed. The row's `data-id`, `data-date`, and class state are preserved.

**Default active tab is "Pendientes".**
The main use case is checking upcoming shots; applied history is secondary.

## Risks / Trade-offs

- [Row order in applied table] → Rows are appended in the order they're toggled, not sorted by date. Acceptable since applied shots are historical and order matters less.
- [add-row button] → New rows added via `+` have `applied: false` so they always go to the pending table. No change needed.
- [delete-row button] → Deletes the last row of the pending table's tbody. If the user is on the "Aplicadas" tab, the last pending row may not be visible. This is a pre-existing UX issue, out of scope.
