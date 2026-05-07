## Requirements

### Requirement: Show setup form on first visit
On first visit (no `vacuagenda_config` key in localStorage), the app SHALL display a setup form and hide the main table and add-row controls.

#### Scenario: First visit with no config
- **WHEN** the page loads and `vacuagenda_config` is not present in localStorage
- **THEN** the setup form is visible and the table and add-row container are hidden

#### Scenario: Returning visit with existing config
- **WHEN** the page loads and `vacuagenda_config` is present in localStorage
- **THEN** the setup form is hidden and the table and add-row container are shown normally

### Requirement: Setup form collects 7 treatment fields
The form SHALL include the following fields, all required:
- `name`: text — "Nombre"
- `time_between_shots`: number — "¿Cada cuántos días te aplicas las vacunas?"
- `initial_arm`: text — "Brazo de la primer vacuna"
- `initial_dose`: number — "Dosis inicial (mínima)"
- `dose_increase`: number — "¿Cuánto incrementa la dosis cada vez?"
- `last_dose`: number — "Dosis final (máxima)"
- `treatment_duration`: number — "Duración del tratamiento"

#### Scenario: Form renders all fields
- **WHEN** the setup form is visible
- **THEN** all 7 fields are rendered with their Spanish labels and a submit button

#### Scenario: Form prevents submit with missing fields
- **WHEN** the user submits the form with one or more empty required fields
- **THEN** the browser's native validation prevents submission and highlights the empty field(s)

### Requirement: Form submit saves config to localStorage and logs to console
On valid form submission, the app SHALL save all 7 values as a JSON object under the key `vacuagenda_config` in localStorage, and log the object to the browser console.

#### Scenario: Successful submit
- **WHEN** the user fills all fields and submits the form
- **THEN** `localStorage.getItem('vacuagenda_config')` returns a JSON string containing all 7 field values
- **THEN** the browser console shows the config object

### Requirement: After submit, show main table view
After a successful form submission, the app SHALL hide the setup form and show the main table and add-row controls.

#### Scenario: Transition to table view
- **WHEN** the form is successfully submitted
- **THEN** the setup form is hidden and the table and add-row container become visible
