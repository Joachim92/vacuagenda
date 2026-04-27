## Why

The table currently only has an add button; users have no way to delete records. The buttons also clutter the UI at rest — auto-hiding them and revealing on hover keeps the interface clean without sacrificing discoverability.

## What Changes

- Add a minus (−) button to the left of the existing `#add-row-btn` that deletes the last row in the table and removes its record from IndexedDB
- Both buttons fade out after a couple of seconds of inactivity and reappear on hover over the button container; they fade out again after the cursor leaves

## Capabilities

### New Capabilities

- `delete-row-button`: A minus button in the `#add-row-container` that removes the last table row and its IndexedDB record
- `button-autohide`: Both action buttons slowly fade out after a short idle period and reappear on hover, then fade out again after the cursor leaves

### Modified Capabilities

## Impact

- `index.html` — add the minus button element inside `#add-row-container`
- `js/index.js` — add delete-last-row logic
- `styles/style.css` — add styles for the minus button and the fade-in/fade-out animation behavior
