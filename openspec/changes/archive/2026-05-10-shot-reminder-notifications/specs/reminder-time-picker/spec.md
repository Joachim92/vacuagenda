## ADDED Requirements

### Requirement: Reminder time picker persists user's preferred alert time
The app SHALL display a `#reminder-time` time input in a `#reminder-container` section. The selected time SHALL be stored in `localStorage` under the key `vacuagenda_reminder_time` as an `"HH:MM"` string. On page load the input SHALL be restored from localStorage, defaulting to `"08:00"` if no value is stored. The section SHALL follow the same visibility rules as `#reset-container` (hidden by default, shown when config exists and "Pendientes" tab is active, hidden on "Aplicadas" tab).

#### Scenario: Default time on first use
- **WHEN** the user views `#reminder-container` and no `vacuagenda_reminder_time` exists in localStorage
- **THEN** the time input shows `08:00`

#### Scenario: Time persists across page loads
- **WHEN** the user changes the time input to `09:30` and reloads the page
- **THEN** the time input shows `09:30`

#### Scenario: Reminder section hidden on Aplicadas tab
- **WHEN** the user switches to the "Aplicadas" tab
- **THEN** `#reminder-container` is not visible
