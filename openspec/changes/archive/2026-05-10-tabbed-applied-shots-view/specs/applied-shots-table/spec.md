## ADDED Requirements

### Requirement: Applied shots table shows only applied records
The app SHALL maintain a second table (`#applied_shots_table`) with identical columns to the pending table. On initial load, all records with `applied === true` SHALL be rendered into this table. Records with `applied === false` SHALL be rendered into the pending table (`#shots_table`).

#### Scenario: Applied records render in applied table on load
- **WHEN** the page loads and IndexedDB contains records with `applied === true`
- **THEN** those records appear in `#applied_shots_table` and not in `#shots_table`

#### Scenario: Unapplied records render in pending table on load
- **WHEN** the page loads and IndexedDB contains records with `applied === false`
- **THEN** those records appear in `#shots_table` and not in `#applied_shots_table`
