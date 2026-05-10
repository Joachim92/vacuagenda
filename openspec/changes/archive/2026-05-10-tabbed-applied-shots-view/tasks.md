## 1. HTML Structure

- [x] 1.1 Add tab bar markup (`#table-tabs` with two `<button>` elements: "Pendientes" and "Aplicadas") above `#shots_table` in `index.html`
- [x] 1.2 Add `#applied_shots_table` table with identical `<thead>` columns after `#shots_table` in `index.html`

## 2. CSS

- [x] 2.1 Add tab bar styles to `styles/style.css` (layout, active state, hover)
- [x] 2.2 Hide `#applied_shots_table` by default (alongside existing `#shots_table` hide rule); show/hide is handled by JS

## 3. JS — Routing and Tab Logic

- [x] 3.1 Update `display()` in `js/index.js` to append the row to `#applied_shots_table tbody` when `rowObj.applied === true`, and to `#shots_table tbody` otherwise
- [x] 3.2 Add tab click handlers in the `request success` callback: clicking a tab shows its table, hides the other, and toggles `.active`
- [x] 3.3 Update `toggleApplied()` in `js/index.js` to move the row to `#applied_shots_table` when toggled to applied, and back to `#shots_table` when toggled to unapplied
