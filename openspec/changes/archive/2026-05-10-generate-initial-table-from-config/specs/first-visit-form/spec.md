## MODIFIED Requirements

### Requirement: Setup form collects 5 treatment fields
The form SHALL include the following fields, all required:
- `name`: text — "Nombre"
- `time_between_shots`: number — "¿Cada cuántos días te aplicas las vacunas?"
- `initial_arm`: text — "Brazo de la primer vacuna"
- `dose`: number — "Dosis (ml)"
- `treatment_duration`: number — "Duración del tratamiento (días)"

#### Scenario: Form renders all fields
- **WHEN** the setup form is visible
- **THEN** all 5 fields are rendered with their Spanish labels and a submit button

#### Scenario: Form prevents submit with missing fields
- **WHEN** the user submits the form with one or more empty required fields
- **THEN** the browser's native validation prevents submission and highlights the empty field(s)

### Requirement: Form submit saves config to localStorage and generates the initial table
On valid form submission, the app SHALL save all 5 values as a JSON object under the key `vacuagenda_config` in localStorage, then generate and display the full shot schedule before showing the table view.

#### Scenario: Successful submit persists config and populates table
- **WHEN** the user fills all 5 fields and submits the form
- **THEN** `localStorage.getItem('vacuagenda_config')` returns a JSON string with all 5 field values
- **THEN** the shot table is populated with generated records (not empty)
- **THEN** the setup form is hidden and the table and add-row container are visible
