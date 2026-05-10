## Context

The app stores shot records in IndexedDB (`shots_os`). Config is saved to localStorage as `vacuagenda_config` with 5 fields: `name`, `time_between_shots`, `initial_arm`, `dose`, `treatment_duration`. Today the table starts empty after setup; users must add every row manually.

## Goals / Non-Goals

**Goals:**
- Add a `treatment-start-date` field in the form and set it's default value to today.
- After setup form submit, auto-generate and persist all shot records for the full treatment duration.
- Display the generated table immediately without a page reload.

**Non-Goals:**
- Regenerating the table if config is edited later.
- Supporting variable doses (dose is fixed per the current form).
- Any UI to preview or confirm before generation.

## Decisions

**Compute row count as `Math.ceil(treatment_duration / time_between_shots)`.**
Treatment duration is in days and interval is in days, so integer division with ceiling covers partial final cycles. Alternative (floor) would miss the last shot.

**Start date is obtained from the initial form.**
The form will have a `treatment-start-date` field. Today is the default that can be updated by the user prior to submitting the form.

**Arm alternates per shot index: even indices → `initial_arm`, odd → the other arm.**
The two arms are "Izquierdo" and "Derecho". Rather than hardcoding both strings, derive the alternate as: `initial_arm === 'Izquierdo' ? 'Derecho' : 'Izquierdo'`. This keeps it simple without needing the user to specify both arms.

**IDs use `i` offset.**
Existing `addRow` uses `Date.now()`. That is extra complexity, update it so that it uses a simple integer for the id. Generating N records in a loop needs unique IDs; adding the loop index as an offset is the simplest approach without introducing a UUID library.

**Generation runs inside the form submit handler, before `location.reload` or any page transition.**
The existing `insertOne` function is reused for each record; `display` is called for each as well. No new persistence layer needed.

## Risks / Trade-offs

- [Large treatment duration] → A 365-day treatment with 7-day intervals generates ~52 rows; negligible for IndexedDB.
- [IDs with `i` collision] → If two sessions open simultaneously they could theoretically collide, but this is a single-user local app so risk is negligible.
- [Arm alternation assumes "Izquierdo"/"Derecho"] → If a user enters an unexpected `initial_arm` value, the alternate will always be "Izquierdo" (fallback). Acceptable for now.