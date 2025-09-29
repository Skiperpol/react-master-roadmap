# Task: Date Formatting Helper


**Goal**: format a date and render it in JSX.


## Instructions
1. Create `formatDate(date: Date)` using `Intl.DateTimeFormat`.
2. Render `<time dateTime={date.toISOString()}>` with the formatted label.
3. Test with different dates; ensure locale formatting is applied.


## Acceptance Criteria
- `time` shows a human-friendly date and has a valid ISO `dateTime`.