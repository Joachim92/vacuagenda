## Why

New users land on an empty table with no context for what to enter or how the treatment schedule works. A first-visit setup form collects the treatment parameters needed to understand the user's vaccination schedule before they start logging shots.

## What Changes

- On first visit (no localStorage config present), show a full-screen setup form instead of the main table
- Form collects 7 fields: name, days between shots, initial arm, initial dose, dose increment, last dose, treatment duration
- On submit, values are saved to `localStorage` under a single config key and logged to the console
- After submit, the normal table view is shown

## Capabilities

### New Capabilities
- `first-visit-form`: Full-screen onboarding form shown on first visit; saves treatment config to localStorage

### Modified Capabilities
<!-- none -->

## Impact

- `index.html` — add form markup (hidden by default or toggled via JS)
- `js/index.js` — add first-visit detection, form submit handler, localStorage read/write
- `styles/style.css` — add form styles
