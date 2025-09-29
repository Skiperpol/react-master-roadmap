# What I Learned — Index as Key


## Details — Understanding
- When index is acceptable, when not.
- Effect on UI stability and animations.

## Deep Dive — Risks of index keys
- Using the array index as `key` breaks identity when items are inserted/removed/reordered.
- Symptoms: toggles, inputs, or animations appear to "jump" to different items.

## When index may be OK
- Static lists that never change order and contain no stateful children.

## Quick checklist
- Prefer stable identifiers; avoid index unless truly static