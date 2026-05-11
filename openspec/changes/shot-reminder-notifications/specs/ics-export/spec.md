## ADDED Requirements

### Requirement: Export treatment schedule as a recurring ICS calendar event
The app SHALL provide an "Añadir al calendario" button (`#export-calendar-btn`) that, when clicked, generates a valid iCalendar (`.ics`) file containing a single recurring `VEVENT` built from `localStorage` config, and triggers a download or share sheet. The event SHALL recur with `FREQ=DAILY;INTERVAL={time_between_shots}` starting on `treatment_start_date`, for `COUNT=Math.ceil(treatment_duration / time_between_shots)` occurrences. Each recurrence SHALL include a `VALARM` at the time configured in `#reminder-time`.

#### Scenario: Export triggers download on click
- **WHEN** the user clicks `#export-calendar-btn`
- **THEN** a `.ics` file is downloaded or the iOS share sheet is presented

#### Scenario: Recurring event uses config values
- **WHEN** the ICS is generated with `time_between_shots = 7`, `treatment_duration = 365`, `treatment_start_date = "2026-05-10"`, `dose = 50`
- **THEN** the VEVENT has `DTSTART;VALUE=DATE:20260510`, `RRULE:FREQ=DAILY;INTERVAL=7;COUNT=53`, and `SUMMARY` containing `50`

#### Scenario: VALARM fires at reminder time
- **WHEN** the reminder time is `"08:00"`
- **THEN** the VALARM has `TRIGGER:PT8H` and `ACTION:DISPLAY`

#### Scenario: VALARM handles non-hour-aligned times
- **WHEN** the reminder time is `"09:30"`
- **THEN** the VALARM has `TRIGGER:PT9H30M`

#### Scenario: Re-import deduplicates
- **WHEN** the user exports and imports the ICS a second time
- **THEN** iOS Calendar updates the existing recurring event rather than creating a duplicate, because the UID `vacuagenda-treatment@vacuagenda` is stable
