## Why

The table shows all shots with the same visual appearance regardless of whether they are overdue. Users have no way to see at a glance which past shots were never applied, making it hard to track missed doses.

## What Changes

- On page load, any shot whose date is in the past and whose `applied` field is `false` SHALL be visually flagged as "missed" in the table.
- A missed row gets a distinct visual style (e.g., muted/red row background or text) to differentiate it from future unapplied shots.
- The missed state is derived at render time — it is not a new field persisted to IndexedDB.
- Missed rows remain toggleable: marking a missed shot as applied removes the missed styling.

## Capabilities

### New Capabilities
- `missed-shot-indicator`: Visual flagging of past unapplied shots in the table at render time and when applied status changes.

### Modified Capabilities

## Impact

- `js/index.js`: `display` function gains missed-state logic; `toggleApplied` must re-evaluate missed state after toggling.
- `styles/style.css`: New `.missed` row style.
- No HTML changes needed.
- No IndexedDB schema changes.
