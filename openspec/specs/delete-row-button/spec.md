### Requirement: Delete last row button
The system SHALL provide a minus button in `#add-row-container`, to the left of the add button, that removes the last row from the table and its record from IndexedDB.

#### Scenario: Delete last row
- **WHEN** the user clicks the minus button and the table has at least one row
- **THEN** the last `<tr>` is removed from `tbody` and its IndexedDB record is deleted

#### Scenario: No-op on empty table
- **WHEN** the user clicks the minus button and the table has no rows
- **THEN** nothing happens and no error is thrown

#### Scenario: Button placement
- **WHEN** the page renders
- **THEN** the minus button appears to the left of the add button within `#add-row-container`
