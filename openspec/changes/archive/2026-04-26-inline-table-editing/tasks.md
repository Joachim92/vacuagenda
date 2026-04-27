## 1. Event Delegation Setup

- [x] 1.1 Add a single delegated `click` listener on `#shots_table` (or its wrapper) to handle all cell interactions
- [x] 1.2 Identify clicked cell column (date / dose / arm / applied) by inspecting `data-*` attribute or column index

## 2. Inline Cell Editing

- [x] 2.1 On click of a `date`, `dose`, or `arm` cell — skip if cell already contains an `<input>`, otherwise replace text with a focused `<input>` pre-filled with current value
- [x] 2.2 On `keydown` Enter in the input — read value, save to IndexedDB, restore cell to text display with updated value
- [x] 2.3 On `keydown` Escape in the input — restore cell to original text value without DB write
- [x] 2.4 On `blur` of the input — treat same as Enter (save and restore)

## 3. Applied Toggle

- [x] 3.1 On click of an `applied` cell — optimistically flip the checkbox SVG in the DOM, then write the toggled boolean to IndexedDB
- [x] 3.2 Ensure the SVG swap uses the existing checked/unchecked SVG assets already in `assets/`

## 4. Styles

- [x] 4.1 Add CSS for the inline `<input>` inside a table cell: remove default borders, match font/size, fill the cell width

## 5. Verification

- [ ] 5.1 Manually test editing date, dose, and arm — confirm values persist after page reload
- [ ] 5.2 Manually test applied toggle — confirm checked/unchecked SVG switches and persists after reload
- [ ] 5.3 Confirm Escape cancels without writing to DB (reload and verify value unchanged)
- [ ] 5.4 Confirm Tab/blur saves the value
