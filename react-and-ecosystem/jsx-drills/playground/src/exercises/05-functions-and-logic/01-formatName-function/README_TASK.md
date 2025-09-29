# Task: Helper Function in JSX


**Goal**: use `formatName(user)` in JSX.


## Instructions
1. Implement a pure `formatName(user)` that returns `"First Last"`.
2. Use it inside `<h2>{formatName(user)}</h2>`.
3. Handle missing parts gracefully (e.g. only first or last name).


## Acceptance Criteria
- Renders the correct full name for typical inputs.
- Handles partial inputs without crashing (empty/undefined fields).