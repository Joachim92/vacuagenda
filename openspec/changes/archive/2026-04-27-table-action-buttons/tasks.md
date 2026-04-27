## 1. HTML — Add minus button

- [x] 1.1 Add `#delete-row-btn` button element inside `#add-row-container`, to the left of `#add-row-btn`

## 2. JS — Delete last row

- [x] 2.1 Add `deleteRow()` function: guard for empty tbody, remove last `<tr>`, delete its IndexedDB record by ID
- [x] 2.2 Wire `#delete-row-btn` click listener in the `success` handler (alongside the existing add-row and table-click listeners)

## 3. JS — Autohide logic

- [x] 3.1 After DB opens, start a ~2 s timeout that adds a `.autohide` class to `#add-row-container`
- [x] 3.2 On `mouseenter` of `#add-row-container`: clear pending timeout, remove `.autohide`
- [x] 3.3 On `mouseleave` of `#add-row-container`: start a new ~2 s timeout that adds `.autohide` back

## 4. CSS — Minus button styles

- [x] 4.1 Style `#delete-row-btn` to match `#add-row-btn` (same size, border-radius, background, colour)

## 5. CSS — Autohide animation

- [x] 5.1 Add `opacity` transition on `#add-row-container` (slow fade, e.g. `transition: opacity 0.8s ease`)
- [x] 5.2 Add `#add-row-container.autohide` rule: `opacity: 0.08` and `pointer-events: none` so buttons don't block hover on the container
- [x] 5.3 Ensure hover re-shows buttons at `opacity: 1` (remove `.autohide` via JS — no extra CSS rule needed)

## 6. Verification

- [x] 6.1 Buttons visible on load, fade out after ~2 s
- [x] 6.2 Hover over container — buttons reappear; move cursor away — fade out again
- [x] 6.3 Minus button deletes the last row and persists after reload
- [x] 6.4 Minus button on empty table does nothing and throws no console errors
