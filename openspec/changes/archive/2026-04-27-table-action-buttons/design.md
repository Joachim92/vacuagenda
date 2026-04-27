## Context

The `#add-row-container` currently holds a single `#add-row-btn` (a circular `+` button). Both buttons sit below the table in a centered flex row. There is no delete action today. The autohide behaviour is purely presentational — no JS state needs to change for it.

## Goals / Non-Goals

**Goals:**
- Add `#delete-row-btn` to the left of `#add-row-btn` inside `#add-row-container`
- Delete the last `<tr>` in `tbody` and its corresponding IndexedDB record on click
- Both buttons fade to nearly invisible ~2 s after the page loads or after the cursor leaves the container; fade back in on hover

**Non-Goals:**
- Selecting which row to delete (always targets the last row)
- Undo / confirmation dialog before deleting
- Separate autohide timers per button

## Decisions

**CSS-only autohide via `opacity` transition + a timer class toggled by JS**
Pure CSS `opacity` transitions handle the visual fade smoothly. A single `setTimeout` in JS adds a `.hidden` class to `#add-row-container` after the idle delay; `mouseenter` removes it; `mouseleave` restarts the timer. This keeps the logic trivial and avoids animation libraries.

`opacity` + `pointer-events: none` (when hidden) rather than `display: none` — keeps layout stable and allows the hover target to remain in the DOM so `mouseenter` can re-show the buttons.

**Delete targets the last `<tr>` in `tbody`**
Simple and predictable. The alternative (selecting a row first) is a separate feature. `tbody.lastElementChild.dataset.id` gives the record ID for the IndexedDB delete.

**Minus button mirrors the add button's style**
Same size, same border-radius, same teal colour — only the label differs. Keeps visual consistency without new design tokens.

## Risks / Trade-offs

- [Empty table: delete button clicks when tbody is empty] → Guard with `if (!tbody.lastElementChild) return;` before deleting.
- [Race between mouseleave timer and immediate re-hover] → Clear the pending timeout on `mouseenter` before removing `.hidden`, so the timer doesn't fire mid-hover.
