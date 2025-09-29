# Task: Adding `key`


**Goal**: remove warning and improve reconciliation.


## Instructions
1. Add a stable unique `key` (e.g., `item.id`).
2. Confirm the missing-key warning disappears.
3. Reorder items and verify child state stays with its item.


## Acceptance Criteria
- No warnings, keys are stable and unique per sibling set.
- Reordering preserves item-specific state.