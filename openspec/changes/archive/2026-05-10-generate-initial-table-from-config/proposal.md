## Why

When the user completes the setup form, the shots table is currently empty — they must manually add each row one by one. The config already contains all the information needed (start date, dose, arm alternation, treatment duration) to pre-populate the full schedule automatically.

## What Changes

- After the setup form is submitted, generate all shot rows for the entire treatment duration and persist them to IndexedDB.
- Rows are calculated from `time_between_shots` and `treatment_duration` config fields.
- Arm alternates starting from `initial_arm` with each successive shot.
- All generated rows have `dose` equal to the value in the form by default.
- All generated rows have `applied: false` by default.

## Capabilities

### New Capabilities
- `initial-table-generation`: Generate and persist the full shot schedule to IndexedDB immediately after setup form submission, based on config values.

### Modified Capabilities
- `first-visit-form`: After form submit, instead of just showing an empty table, trigger table generation before displaying it.

## Impact

- `js/index.js`: `initSetupForm` submit handler gains a call to the new generation logic; new function to compute and insert all records.
- No HTML or CSS changes needed.
- IndexedDB `shots_os` store is populated on first use instead of remaining empty.