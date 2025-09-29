# Task: Nesting and Returning Multiple Elements in Loops


**Goal**: compose multiple elements conveniently inside loops.


## Instructions
1. Render a list by mapping over data and returning multiple siblings per item.
2. Wrap siblings in a fragment; use `<React.Fragment key={...}>`.
3. Verify that keys are stable (use IDs, not indices, when possible).
4. Confirm that no extra wrapper nodes appear in the DOM.


## Acceptance Criteria
- List renders with multiple siblings per item using fragments.
- Each mapped fragment has a stable `key`.
- DOM has no unnecessary wrapper nodes.