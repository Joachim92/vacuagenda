## 1. Reminder UI

- [x] 1.1 Add `#reminder-container` to `index.html` below `#reset-container`, containing a label, `#reminder-time` time input, and `#export-calendar-btn` button ("Añadir al calendario")
- [x] 1.2 Add `#reminder-container` to the CSS default-hidden group; add layout styles for the section
- [x] 1.3 Show `#reminder-container` alongside `#reset-container` on returning visit and after form submit; hide it on the "Aplicadas" tab, show it on "Pendientes"
- [x] 1.4 On page load, restore `#reminder-time` from `localStorage` key `vacuagenda_reminder_time` (default `"08:00"`); wire change handler to save updated value

## 2. ICS Generation

- [x] 2.1 Add `generateICS(config, reminderTime)` function in `js/index.js` that builds an iCalendar string with a single recurring `VEVENT`: `DTSTART;VALUE=DATE` from `config.treatment_start_date`, `RRULE:FREQ=DAILY;INTERVAL={time_between_shots};COUNT={Math.ceil(treatment_duration/time_between_shots)}`, `SUMMARY` with dose, and a `VALARM` with `TRIGGER` computed from `reminderTime` (`"08:00"` → `PT8H`, `"09:30"` → `PT9H30M`)
- [x] 2.2 Wire `#export-calendar-btn` click handler: read config from `localStorage`, call `generateICS`, create a `Blob` and trigger download via `URL.createObjectURL` + programmatic `<a>` click
