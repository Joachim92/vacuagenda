## Why

As applied shots accumulate, the main table grows long and makes it harder to focus on upcoming shots. Separating applied shots into their own view keeps the pending schedule clean while still giving access to the history.

## What Changes

- A tab bar is added above the table with two tabs: "Pendientes" (pending/unapplied) and "Aplicadas" (applied).
- The original table (`#shots_table`) shows only unapplied shots (`applied === false`).
- A new applied shots table shows only applied shots (`applied === true`), in the same column layout.
- Clicking a tab switches the visible table; only one table is shown at a time.
- When a shot is toggled to applied, its row moves from the pending table to the applied table.
- When a shot is toggled back to unapplied, its row moves back to the pending table.
- IndexedDB data model is unchanged — this is a purely visual reorganization.

## Capabilities

### New Capabilities
- `tabbed-table-view`: Tab bar UI that switches between the pending and applied shot tables.
- `applied-shots-table`: Second table that holds and displays only applied shot rows.

### Modified Capabilities
- `applied-toggle`: After toggling, the row moves between tables instead of only updating its checkbox in place.

## Impact

- `index.html`: Add tab bar markup and a second table (`#applied_shots_table`).
- `js/index.js`: `display()` routes rows to the correct table based on `applied`; `toggleApplied()` moves rows between tables on toggle.
- `styles/style.css`: Tab bar styles; second table shares existing table styles.
