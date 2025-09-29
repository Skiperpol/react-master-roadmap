# Task: Two Elements Side by Side — Error


**Goal**: trigger and understand the “Adjacent JSX elements...” error.


## Instructions
1. In a component, try returning two siblings at the top level without a wrapper.
2. Observe the exact error message and where it points in the file.
3. Wrap them with a single parent element and verify the error disappears.
4. Optionally, try with a fragment and compare the DOM output.


## Acceptance Criteria
- Error is reproduced by returning two adjacent JSX elements.
- The fix using a single wrapper element works.
- You can explain when to use a wrapper vs a fragment and how each affects the DOM.