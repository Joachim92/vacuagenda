## 1. Implement table generation logic

- [x] 1.1 Add `generateInitialTable(config)` function in `js/index.js` that computes `Math.ceil(treatment_duration / time_between_shots)` records and calls `insertOne` + `display` for each
- [x] 1.2 Implement arm alternation logic: even index → `config.initial_arm`, odd index → opposite arm (`'Izquierdo'` ↔ `'Derecho'`)
- [x] 1.3 Set each record's date to today-at-midnight + `shotIndex * time_between_shots` days

## 2. Wire generation into setup form submit

- [x] 2.1 Call `generateInitialTable(config)` inside the `setup-form` submit handler in `initSetupForm`, after saving to localStorage and before showing the table view
