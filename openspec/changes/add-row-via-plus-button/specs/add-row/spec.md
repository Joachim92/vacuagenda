## ADDED Requirements

### Requirement: Plus button is visible below the table
The page SHALL display a `+` button below the `#shots_table` at all times.

#### Scenario: Button is present on load
- **WHEN** the page loads and the DB opens successfully
- **THEN** a `+` button is visible below the shots table

### Requirement: Clicking + adds a new row to the table and IndexedDB
When the user clicks the `+` button, the system SHALL create a new shot record with default values, persist it to IndexedDB, and append it as a new row in the table.

#### Scenario: New row appears in table after click
- **WHEN** the user clicks the `+` button
- **THEN** a new row is appended to `#shots_table tbody` with today's date, dose `0`, empty arm, and unchecked applied status

#### Scenario: New record is persisted to IndexedDB
- **WHEN** the user clicks the `+` button
- **THEN** a new record is added to the `shots_os` object store with a unique `id`, `date: new Date()`, `dose: 0`, `arm: ''`, `applied: false`

#### Scenario: Row persists after page reload
- **WHEN** a new row was added and the page is reloaded
- **THEN** the new row appears in the table (loaded from IndexedDB)
