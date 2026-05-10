## MODIFIED Requirements

### Requirement: Toggle applied status on cell click
The system SHALL toggle the `applied` boolean field for a shot record when the user clicks its cell in the `applied` column. After toggling, the row SHALL move to the table that corresponds to the new `applied` value.

#### Scenario: Toggle from false to true
- **WHEN** the user clicks an `applied` cell that currently shows an unchecked checkbox SVG
- **THEN** the `applied` value is set to `true` in IndexedDB, the cell updates to show a checked checkbox SVG, and the row moves from `#shots_table` to `#applied_shots_table`

#### Scenario: Toggle from true to false
- **WHEN** the user clicks an `applied` cell that currently shows a checked checkbox SVG
- **THEN** the `applied` value is set to `false` in IndexedDB, the cell updates to show an unchecked checkbox SVG, and the row moves from `#applied_shots_table` to `#shots_table`

#### Scenario: Toggle is immediate
- **WHEN** the user clicks an `applied` cell
- **THEN** the checkbox SVG updates and the row moves in the DOM before the IndexedDB write completes (optimistic update)
