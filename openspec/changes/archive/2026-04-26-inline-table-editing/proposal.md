## Why

The defult values that are assigned when a new shot record is added after clicking the button at bottom of the table need adjustments for each user. — users need to update values directly in the table without a separate edit form. The `applied` field in particular needs quick one-click toggling.

## What Changes

- Clicking a cell in the `date`, `dose`, or `arm` columns switches it to an inline text input
- Confirming the edit (blur or Enter) saves the updated value to IndexedDB and re-renders the cell
- Clicking the `applied` column cell toggles the boolean value in the IndexedDB and updates the checkbox SVG immediately
- Pressing Escape cancels an in-progress edit without saving

## Capabilities

### New Capabilities

- `inline-cell-editing`: Inline edit mode for `date`, `dose`, and `arm` table cells — click to edit, blur/Enter to save, Escape to cancel
- `applied-toggle`: One-click toggle of the `applied` boolean field with immediate checkbox SVG update

### Modified Capabilities

## Impact

- `js/index.js` — add event delegation for cell clicks, edit-mode rendering, and IndexedDB update calls
- `styles/style.css` — style the inline input element inside table cells
- No new dependencies or breaking API changes