# Task: `dangerouslySetInnerHTML`


**Goal**: intentionally inject HTML into an element.


## Instructions
1. Use `dangerouslySetInnerHTML={{ __html: '<em>Text</em>' }}`.
2. Observe the required object shape with `__html`.
3. Replace with a variable and discuss trust/sanitization requirements.


## Acceptance Criteria
- HTML renders as markup, not literal text.
- Notes explain why this API is dangerous and when to avoid it.