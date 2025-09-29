# Task: Index as `key` — Experiment


**Goal**: observe issues when inserting/removing items.


## Instructions
1. Use index as `key` when rendering a list with stateful children (e.g., checkboxes).
2. Insert/remove items in the middle and reorder items.
3. Observe state/selection/animation jumping between rows.
4. Replace with stable `id` keys and verify the issue disappears.


## Acceptance Criteria
- With index keys, UI state visibly attaches to positions, not items.
- With stable keys, state remains attached to the correct item during changes.