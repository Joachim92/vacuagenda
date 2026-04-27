## Why

The table is currently read-only with hardcoded seed data. Users need a way to add new vaccination records directly from the UI without modifying code.

## What Changes

- A `+` button appears at the bottom of the table (or on row hover) to trigger adding a new row
- Clicking `+` inserts a new blank row into the table and persists it to IndexedDB
- The new row is appended in the table and stored with a generated ID

## Capabilities

### New Capabilities
- `add-row`: UI control (+ button) that creates a new vaccination record in the table and saves it to IndexedDB

### Modified Capabilities

## Impact

- `js/index.js`: new `addRow()` function, ID generation logic, event listener for the + button
- `index.html`: + button element added to the page
- `styles/style.css`: styles for the + button and its hover/active states
- IndexedDB `shots_os` object store: new records written on user action
