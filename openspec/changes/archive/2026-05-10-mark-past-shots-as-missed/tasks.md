## 1. Styling

- [x] 1.1 Add `.missed` CSS rule to `styles/style.css` (distinct visual style for missed rows, e.g. muted red background)

## 2. Core Logic

- [x] 2.1 In `display()` in `js/index.js`, add `.missed` to the row `<tr>` when `rowObj.date < midnight-today` and `rowObj.applied === false`
- [x] 2.2 In `toggleApplied()` in `js/index.js`, remove `.missed` when toggling to applied; re-add `.missed` when toggling back to unapplied if the row's date is before today
