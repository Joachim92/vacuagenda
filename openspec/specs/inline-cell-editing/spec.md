### Requirement: Editable table cells for date, dose, and arm
The system SHALL allow users to click on a cell in the `date`, `dose`, or `arm` columns to enter inline edit mode for that cell.

#### Scenario: Cell enters edit mode on click
- **WHEN** the user clicks a cell in the `date`, `dose`, or `arm` column
- **THEN** the cell's text content is replaced with a focused text input pre-filled with the current value

#### Scenario: Already-editing cell ignores repeated clicks
- **WHEN** the user clicks a cell that already contains an active input
- **THEN** no additional input is created and focus remains on the existing input

### Requirement: Save edit on blur or Enter key
The system SHALL persist the updated value to IndexedDB and restore the cell to text display when the user confirms an edit.

#### Scenario: Save on Enter key
- **WHEN** the user presses Enter while an inline input is focused
- **THEN** the new value is saved to IndexedDB and the cell returns to text display showing the updated value

#### Scenario: Save on blur
- **WHEN** the inline input loses focus (e.g., user clicks elsewhere or presses Tab)
- **THEN** the new value is saved to IndexedDB and the cell returns to text display showing the updated value

### Requirement: Cancel edit on Escape key
The system SHALL discard changes and restore the original cell value when the user presses Escape.

#### Scenario: Cancel restores original value
- **WHEN** the user presses Escape while an inline input is focused
- **THEN** the cell returns to text display with the original unchanged value and no DB write is performed
