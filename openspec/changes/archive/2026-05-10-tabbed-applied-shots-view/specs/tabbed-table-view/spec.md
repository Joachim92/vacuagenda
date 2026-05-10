## ADDED Requirements

### Requirement: Tab bar switches between pending and applied tables
The app SHALL render a tab bar with two tabs — "Pendientes" and "Aplicadas" — above the tables. Clicking a tab SHALL show the corresponding table and hide the other. The active tab SHALL have a visually distinct `.active` style. The default active tab on load SHALL be "Pendientes".

#### Scenario: Default tab is Pendientes
- **WHEN** the page loads with an existing config
- **THEN** the "Pendientes" tab is active and the pending table is visible; the applied table is hidden

#### Scenario: Switching to Aplicadas tab
- **WHEN** the user clicks the "Aplicadas" tab
- **THEN** the applied shots table becomes visible, the pending table is hidden, and "Aplicadas" has the `.active` class

#### Scenario: Switching back to Pendientes tab
- **WHEN** the user clicks the "Pendientes" tab while "Aplicadas" is active
- **THEN** the pending table becomes visible, the applied table is hidden, and "Pendientes" has the `.active` class
