## Why

Users forget to take their shots because the app offers no proactive reminders. A native iOS Calendar alert — generated from the shot schedule — fires reliably even when the phone is locked and the app is fully closed, which Web Push without a server cannot achieve.

## What Changes

- A "Añadir al calendario" button exports the treatment schedule as a `.ics` file.
- The schedule is generated as a **single recurring calendar event** using `RRULE`, with the interval derived from `time_between_shots` in `localStorage` config.
- Each recurrence has a built-in alert (`VALARM`) at a user-configured time.
- A time picker lets the user set the reminder time before exporting; it is stored in `localStorage`.
- The user opens the `.ics` file once → iOS Calendar imports the recurring event with native alerts. All instances can be edited at once in Calendar (e.g. to change the alert time).
- The event description includes dose and notes that the arm alternates with each shot.
- No Service Worker, no push server, no permission prompts required.

## Capabilities

### New Capabilities
- `ics-export`: generates a `.ics` calendar file with a single recurring `VEVENT` (interval from `time_between_shots`, count from `treatment_duration`), a `VALARM` at the configured reminder time, and triggers a download/share.
- `reminder-time-picker`: time input UI for configuring the alert time used in the ICS export, persisted in `localStorage`.

### Modified Capabilities

## Impact

- New file: none (ICS is generated in-memory and downloaded as a blob).
- `index.html`: add reminder time picker and export button to a `#reminder-container` section.
- `js/index.js`: ICS generation logic + download trigger.
- `styles/style.css`: styles for the reminder section.
- No IndexedDB or manifest changes required.
