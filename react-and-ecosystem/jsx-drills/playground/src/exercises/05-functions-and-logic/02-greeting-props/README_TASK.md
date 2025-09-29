# Task: Greeting Component with Props


**Goal**: conditionally render a greeting based on `props.name`.


## Instructions
1. Create `Greeting` with optional `name?: string`.
2. If `name` is truthy, show `Hello, {name}!`; otherwise show `Hello, stranger!`.
3. Test with various inputs (empty string, undefined, null).


## Acceptance Criteria
- Renders personalized greeting for truthy `name`.
- Renders default fallback for falsy `name` values.