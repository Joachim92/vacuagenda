## 1. HTML — Setup Form Markup

- [x] 1.1 Add `<section id="setup-form-container">` with a `<form id="setup-form">` to `index.html`, placed before the table
- [x] 1.2 Add field: `name` (text, required) with label "Nombre"
- [x] 1.3 Add field: `time_between_shots` (number, required) with label "¿Cada cuántos días te aplicas las vacunas?"
- [x] 1.4 Add field: `initial_arm` (text, required) with label "Brazo de la primer vacuna"
- [x] 1.5 Add field: `initial_dose` (number, required) with label "Dosis inicial (mínima)"
- [x] 1.6 Add field: `dose_increase` (number, required) with label "¿Cuánto incrementa la dosis cada vez?"
- [x] 1.7 Add field: `last_dose` (number, required) with label "Dosis final (máxima)"
- [x] 1.8 Add field: `treatment_duration` (number, required) with label "Duración del tratamiento"
- [x] 1.9 Add a submit button inside the form

## 2. JS — First-Visit Detection and Form Logic

- [x] 2.1 On page load, check `localStorage.getItem('vacuagenda_config')`; if present, skip form and show table normally
- [x] 2.2 If config absent, hide `#shots_table`, `#add-row-container`, and show `#setup-form-container`
- [x] 2.3 Add `submit` event listener on `#setup-form`; read all 7 field values
- [x] 2.4 Save config object to `localStorage` as JSON under key `vacuagenda_config`
- [x] 2.5 Log the config object to the browser console
- [x] 2.6 After save, hide `#setup-form-container` and show `#shots_table` and `#add-row-container`

## 3. CSS — Form Styles

- [x] 3.1 Style `#setup-form-container` to fill the page (centered, consistent with existing body styles)
- [x] 3.2 Style form labels and inputs (full-width inputs, spacing between fields)
- [x] 3.3 Style the submit button to match existing button styles (green `#036c5f`)

## 4. Verify

- [x] 4.1 Clear localStorage and reload — confirm form appears, table is hidden
- [x] 4.2 Fill and submit the form — confirm table appears and console logs the config object
- [x] 4.3 Reload page — confirm form does not reappear (config persists)
