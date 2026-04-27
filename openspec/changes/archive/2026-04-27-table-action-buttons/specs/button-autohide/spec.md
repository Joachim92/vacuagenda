## ADDED Requirements

### Requirement: Buttons fade out after idle period
The system SHALL fade both action buttons to near-invisible opacity a few seconds after the page loads or after the cursor leaves the button container.

#### Scenario: Initial autohide on page load
- **WHEN** the page loads and the user does not hover over the button container
- **THEN** both buttons fade out after approximately 2 seconds

#### Scenario: Fade out after cursor leaves
- **WHEN** the cursor leaves the button container
- **THEN** both buttons fade out after approximately 2 seconds

### Requirement: Buttons reappear on hover
The system SHALL restore full opacity on both buttons when the cursor enters the button container, and SHALL fade them out again after the cursor leaves.

#### Scenario: Reappear on hover
- **WHEN** the cursor enters the button container while buttons are faded out
- **THEN** both buttons immediately transition back to full opacity

#### Scenario: Fade out again after hover ends
- **WHEN** the cursor leaves the button container after hovering
- **THEN** both buttons fade out again after approximately 2 seconds

### Requirement: Hidden buttons remain interactive area
The system SHALL keep the button container in the document layout even when buttons are faded out, so that `mouseenter` can re-show them.

#### Scenario: Hover target persists when hidden
- **WHEN** the buttons are in the faded-out state
- **THEN** the container still occupies its layout space and responds to `mouseenter`
