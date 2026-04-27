## 1. HTML

- [x] 1.1 Add a `<button id="add-row-btn">+</button>` element below `#shots_table` in `index.html`

## 2. CSS

- [x] 2.1 Style the `#add-row-btn` button (size, color, cursor, hover state) in `styles/style.css`

## 3. JavaScript

- [x] 3.1 Add `addRow()` function in `js/index.js` that creates a record with `id: Date.now()`, `date: new Date()`, `dose: 0`, `arm: ''`, `applied: false`
- [x] 3.2 Call `insertOne(record)` inside `addRow()` to persist to IndexedDB
- [x] 3.3 Call `display(record)` inside `addRow()` to append the row to the table
- [x] 3.4 Attach a `click` event listener on `#add-row-btn` that calls `addRow()` (attach after DB opens successfully)
