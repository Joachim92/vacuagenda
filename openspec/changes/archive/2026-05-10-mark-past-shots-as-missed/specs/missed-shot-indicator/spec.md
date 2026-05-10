## ADDED Requirements

### Requirement: Past unapplied shots are visually flagged as missed
The app SHALL add a `.missed` CSS class to the `<tr>` of any shot whose `date` is before today (midnight local time) and whose `applied` value is `false`. This class SHALL be evaluated when the row is first rendered and re-evaluated whenever `applied` is toggled.

#### Scenario: Past unapplied shot is flagged on load
- **WHEN** the table renders a record whose `date` is before today and `applied` is `false`
- **THEN** the row `<tr>` has the `.missed` class

#### Scenario: Future unapplied shot is not flagged
- **WHEN** the table renders a record whose `date` is today or later and `applied` is `false`
- **THEN** the row `<tr>` does not have the `.missed` class

#### Scenario: Applied past shot is not flagged
- **WHEN** the table renders a record whose `date` is before today and `applied` is `true`
- **THEN** the row `<tr>` does not have the `.missed` class

#### Scenario: Marking a missed shot as applied removes the flag
- **WHEN** the user toggles `applied` to `true` on a row with the `.missed` class
- **THEN** the `.missed` class is removed from the row

#### Scenario: Unmarking an applied past shot re-adds the flag
- **WHEN** the user toggles `applied` to `false` on a row whose `date` is before today
- **THEN** the `.missed` class is added back to the row
