## ADDED Requirements

### Requirement: Generate full shot schedule from config
After the setup form is submitted, the app SHALL compute and persist all shot records for the entire treatment duration based on the saved config.

The number of shots SHALL be `Math.ceil(treatment_duration / time_between_shots)`.

Each record SHALL contain:
- `id`: unique numeric ID (`Date.now() + shotIndex`)
- `date`: start date + `shotIndex * time_between_shots` days (start date = today at midnight)
- `dose`: `config.dose` (same for every record)
- `arm`: alternates each shot starting from `config.initial_arm`; odd-indexed shots use the opposite arm (`'Izquierdo'` ↔ `'Derecho'`)
- `applied`: `false`

All records SHALL be inserted into IndexedDB (`shots_os`) and rendered in the table immediately.

#### Scenario: Records generated for full treatment
- **WHEN** the user submits the setup form with `time_between_shots = 7` and `treatment_duration = 14`
- **THEN** exactly 2 shot records are inserted into `shots_os` and displayed in the table

#### Scenario: Arm alternates correctly
- **WHEN** `initial_arm` is `"Izquierdo"` and 3 records are generated
- **THEN** the arms are `["Izquierdo", "Derecho", "Izquierdo"]` in order

#### Scenario: Dates spaced by interval
- **WHEN** `time_between_shots = 7` and generation starts today
- **THEN** record 0 has today's date, record 1 has today + 7 days, record 2 has today + 14 days

#### Scenario: All records start as not applied
- **WHEN** the initial table is generated
- **THEN** every record has `applied: false`
