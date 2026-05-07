## ADDED Requirements

### Requirement: Table fits viewport on mobile without horizontal scroll
On screen widths at or below 600px, the table and its container SHALL fit within the viewport width without causing horizontal scrolling.

#### Scenario: Table on 360px viewport
- **WHEN** the app is viewed on a device with a 360px viewport width
- **THEN** the table renders fully within the viewport with no horizontal scrollbar

#### Scenario: Table on 430px viewport
- **WHEN** the app is viewed on a device with a 430px viewport width
- **THEN** all 4 columns (Fecha, Dosis, Brazo, Aplicada) are visible without scrolling

### Requirement: Reduced body padding on mobile
On screen widths at or below 600px, the `body` element SHALL use reduced padding (≤ 10px) to maximize horizontal space for the table.

#### Scenario: Body padding on mobile
- **WHEN** viewport width is 600px or less
- **THEN** body padding is 8px (versus 40px on desktop)

### Requirement: Tighter cell padding on mobile
On screen widths at or below 600px, `th` and `td` elements SHALL use reduced padding to allow all columns to coexist without overflow.

#### Scenario: Cell padding on mobile
- **WHEN** viewport width is 600px or less
- **THEN** th and td padding is 8px vertical / 6px horizontal

### Requirement: Header font size reduced on mobile
On screen widths at or below 600px, `th` elements SHALL use a font size of 11px to fit column headers comfortably.

#### Scenario: Header font on narrow viewport
- **WHEN** viewport width is 600px or less
- **THEN** th font-size is 11px
