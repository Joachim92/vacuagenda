### Requirement: Toggle applied status on cell click
The system SHALL toggle the `applied` boolean field for a shot record when the user clicks its cell in the `applied` column.

#### Scenario: Toggle from false to true
- **WHEN** the user clicks an `applied` cell that currently shows an unchecked checkbox SVG
- **THEN** the `applied` value is set to `true` in IndexedDB and the cell updates to show a checked checkbox SVG

#### Scenario: Toggle from true to false
- **WHEN** the user clicks an `applied` cell that currently shows a checked checkbox SVG
- **THEN** the `applied` value is set to `false` in IndexedDB and the cell updates to show an unchecked checkbox SVG

#### Scenario: Toggle is immediate
- **WHEN** the user clicks an `applied` cell
- **THEN** the checkbox SVG updates in the DOM before the IndexedDB write completes (optimistic update)
