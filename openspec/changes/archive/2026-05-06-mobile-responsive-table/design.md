## Context

The app is a plain HTML/CSS/JS single-page app with no framework or build step. All styles live in `styles/style.css`. The table (`#shots_table`) has 4 columns (Fecha, Dosis, Brazo, Aplicada) plus action buttons injected by JS on hover. The viewport meta tag is already set correctly in `index.html`. Currently there are no media queries — `body` has a fixed 40px padding and cells have 12px 15px padding regardless of screen width.

## Goals / Non-Goals

**Goals:**
- Table fits within the viewport on common mobile widths (360px–430px) without horizontal scroll
- Body padding shrinks on small screens to reclaim horizontal space
- Cell padding tightens on mobile so all 4 columns remain visible
- Action button area stays accessible on touch screens

**Non-Goals:**
- Redesigning the table as a card/stacked layout — the 4-column grid stays as-is
- Touch-specific gesture support (swipe to delete, etc.)
- Changes to JS logic or the data model

## Decisions

**Media query breakpoint: 600px**
Rationale: covers phones in portrait (360–430px) without affecting tablets or desktop. A single breakpoint keeps the CSS minimal — no need for multiple tiers for this simple layout.

**Approach: tighten existing layout, not reflow**
Rationale: With only 4 short columns (date, dose, arm, applied), all content fits if padding is reduced. A card/stacked reflow would be more complex and is unnecessary here.

**Reduce `body` padding to 8px on mobile**
The 40px body padding consumes ~80px of horizontal space on a 360px screen — over 20%. Dropping to 8px frees most of that without eliminating breathing room.

**Tighten `th, td` padding to 8px 6px on mobile**
The 12px 15px desktop padding is generous; 8px 6px on mobile keeps rows readable while fitting the 4 columns.

**Font size on `th`: reduce to 11px on mobile**
The uppercased header labels are decorative; a slight size reduction helps narrow viewports.

## Risks / Trade-offs

- [Hover-injected action buttons may be narrow on mobile] → Mitigated: buttons are fixed-size (36×36px circles) and appear on row hover; on mobile, touch interaction triggers hover state adequately in most browsers.
- [Inline cell editing inputs may feel tight at 6px horizontal padding] → Acceptable: the `.cell-edit-input` is full-width within its cell; column width drives the experience, not the input padding.

