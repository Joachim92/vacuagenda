## Context

Plain HTML/CSS/JS app with no framework. All state lives in IndexedDB (`shots_db`). There is currently no user configuration — no name, no treatment parameters. The app needs a way to collect these on first visit without adding a backend or build step.

## Goals / Non-Goals

**Goals:**
- Detect first visit and show setup form before the main table
- Collect 7 treatment parameters and persist them to `localStorage`
- Log submitted values to the browser console
- Return to normal table view after submit

**Non-Goals:**
- Using submitted values to pre-populate the table (future change)
- Editing config after initial setup
- Server-side persistence

## Decisions

**localStorage for config, not IndexedDB**
Rationale: IndexedDB is async and already used for shot records. Treatment config is a small flat object — `localStorage` is synchronous, simple, and survives page reloads. Key: `vacuagenda_config`.

**First-visit detection: presence of `vacuagenda_config` key in localStorage**
Rationale: Simple and reliable. If the key exists, config was already submitted; skip the form. No need for a separate `firstVisit` flag.

**Form in HTML, toggled via JS (not dynamically created)**
Rationale: Keeps markup inspectable, form accessible (native `<form>` semantics), and avoids cluttering JS with HTML strings. The form is hidden by default with `display: none`; JS shows it on first visit and hides it after submit.

**Single `<form>` element wrapping all fields, submit via `submit` event**
Rationale: Lets the browser handle native validation (required fields, number ranges). No need for a custom validation layer.

**Config object shape saved to localStorage:**
```js
{
  name: string,
  time_between_shots: number,   // days
  initial_arm: string,          // "izquierdo" | "derecho"
  initial_dose: number,
  dose_increase: number,
  last_dose: number,
  treatment_duration: number    // days or weeks — stored as entered
}
```

## Risks / Trade-offs

- [localStorage can be cleared by user] → Acceptable: form will simply re-appear on next visit. No data loss since shots are in IndexedDB.
- [Native validation UX varies by browser/OS] → Acceptable for v1; custom validation can be added later if needed.
