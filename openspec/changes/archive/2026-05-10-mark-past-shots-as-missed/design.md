## Context

Each shot row has a `date` (Date object) and `applied` (boolean). Currently `display()` always renders unapplied rows identically regardless of whether their date is in the past. The `toggleApplied` function updates `applied` in the DOM and IndexedDB but doesn't re-evaluate any missed state.

## Goals / Non-Goals

**Goals:**
- Flag rows as missed when `date < today` and `applied === false`.
- Remove the missed flag when a missed row is toggled to applied.
- Re-add the missed flag if a row is toggled back to unapplied and its date is still in the past.

**Non-Goals:**
- Persisting missed state to IndexedDB — it is always derived from date + applied.
- A separate "missed" value distinct from unapplied — missed is purely a visual overlay.
- Any notification or count badge for missed shots.

## Decisions

**Derive missed state from date comparison at render time, not stored state.**
Storing it would require a migration and could get out of sync. Computing it on the fly from `date < midnight-today` is always correct. Alternative (store a `missed` field) was rejected for added complexity.

**Add/remove a `.missed` CSS class on the `<tr>` element.**
The row element is the right scope — it affects the full row visually. Individual cell classes would require touching 4 elements per row. The `<tr>` is already in scope via `row` in `display` and via `cell.closest('tr')` in `toggleApplied`.

**"Today" boundary is midnight local time.**
A shot scheduled for today is not yet missed even if the current time is past the scheduled date — users shouldn't be penalized for applying a shot the same day. Alternative (compare to exact datetime) would make same-day shots flash as missed mid-day.

**`toggleApplied` re-evaluates missed state after every toggle.**
After toggling to applied → remove `.missed`. After toggling back to unapplied → re-check date, add `.missed` if past. This keeps DOM state always consistent without a full re-render.

## Risks / Trade-offs

- [Date stored as Date object in IndexedDB] → When retrieved, dates deserialize correctly as Date objects; `date < today` comparison works as expected.
- [Timezone edge cases] → Midnight-local comparison is consistent with how dates are stored (local midnight from `new Date(config.treatment_start_date + 'T00:00:00')`).
