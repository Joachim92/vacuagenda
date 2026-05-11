## Context

VacuAgenda is a serverless PWA. All config lives in `localStorage` under `vacuagenda_config`: `treatment_start_date`, `time_between_shots`, `treatment_duration`, `dose`, `initial_arm`. The shot schedule is a fixed-interval sequence — identical spacing between every shot — which maps naturally to a Calendar recurring event.

iOS Calendar accepts `.ics` files via share sheet, imports recurring events, and allows the user to edit all instances at once (e.g. change the alert time after import). This is the key advantage over individual events.

## Goals / Non-Goals

**Goals:**
- Generate a single recurring `VEVENT` with `RRULE` from `localStorage` config (no IndexedDB read needed).
- `DTSTART` = `treatment_start_date`; `INTERVAL` = `time_between_shots`; `COUNT` = `Math.ceil(treatment_duration / time_between_shots)`.
- Each recurrence has a `VALARM` at the user-configured reminder time.
- A time picker in the UI controls the reminder time; persisted in `localStorage` as `vacuagenda_reminder_time` (default `"08:00"`).
- Export button generates the ICS blob and triggers download/share.

**Non-Goals:**
- Per-instance arm/dose variations in the calendar (arms alternate but that detail isn't encodable in a single recurring event summary; noted in description instead).
- Excluding already-applied shots from Calendar (the full treatment schedule is exported; Calendar represents the plan, not the applied state).
- Dynamic sync between IndexedDB applied state and Calendar.

## Decisions

**Single `VEVENT` with `RRULE:FREQ=DAILY;INTERVAL={time_between_shots};COUNT={n}`.**
All shots are evenly spaced — a recurring event is an exact match. Alternative (N individual events) loses the bulk-edit benefit in iOS Calendar. `FREQ=DAILY` with `INTERVAL` is more general than `FREQ=WEEKLY`, covering any interval (7, 14, 30 days, etc.).

```
BEGIN:VEVENT
UID:vacuagenda-treatment@vacuagenda
DTSTART;VALUE=DATE:20260510
RRULE:FREQ=DAILY;INTERVAL=7;COUNT=52
SUMMARY:💉 Vacuna - 50ml
DESCRIPTION:El brazo alterna entre Izquierdo y Derecho.
BEGIN:VALARM
TRIGGER:PT8H
ACTION:DISPLAY
DESCRIPTION:Recordatorio: vacuna hoy
END:VALARM
END:VEVENT
```

**All-day events with a relative `VALARM` trigger (`PTxH` or `PTxHyM`).**
`DTSTART;VALUE=DATE` avoids timezone handling entirely. The VALARM trigger is a duration from midnight: `"08:00"` → `PT8H`; `"09:30"` → `PT9H30M`. Fires at the local time on each shot day, regardless of timezone.

**ICS generated from `localStorage` config only — no IndexedDB access.**
The recurring event is fully defined by `treatment_start_date`, `time_between_shots`, `treatment_duration`, and `dose`. This avoids async IndexedDB reads in the export handler.

**Stable UID `vacuagenda-treatment@vacuagenda`.**
A single recurring event has one UID. Re-importing the ICS updates the existing Calendar entry rather than duplicating it.

**Reminder time stored as `vacuagenda_reminder_time: "HH:MM"` in `localStorage`.**
Simple string, independent of main config. Default `"08:00"`.

## Risks / Trade-offs

- [Arm alternation not visible per-event] → Described in the event body as a note. The Calendar event can't encode per-instance variation in summary/title. Acceptable.
- [Applied shots still appear in Calendar] → The recurring event represents the full treatment plan, not current applied state. Users understand Calendar as a schedule, not a checklist.
- [iOS share sheet on Safari] → `<a download>` on iOS Safari triggers the share sheet instead of a direct download. The share sheet includes "Add to Calendar" which is exactly the desired action.
- [Re-import updates, not duplicates] → Stable UID means safe to re-export (e.g. after a reset and new treatment setup — though UID would still be the same; acceptable for a single-user app).
