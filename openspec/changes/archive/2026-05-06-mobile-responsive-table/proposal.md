## Why

The table layout uses fixed padding and no responsive breakpoints, making it cramped and hard to use on mobile screens. Users on phones see too much padding and cells that don't adapt to narrow viewports.

## What Changes

- Add CSS media queries to reduce `body` padding on small screens
- Tighten cell padding at narrow widths so all 4 columns fit comfortably
- Ensure the `#add-row-container` buttons and action controls remain accessible on mobile
- Remove or reduce any layout constraints that break on small viewports

## Capabilities

### New Capabilities
- `mobile-table-layout`: Responsive CSS adjustments that adapt the table and surrounding UI to mobile screen sizes

### Modified Capabilities
<!-- none -->

## Impact

- `styles/style.css` — add media query block(s) for small screens
- `index.html` — no changes needed (viewport meta tag already present)
- `js/index.js` — no changes needed
