# Task: Sanitizing Data


**Goal**: add sanitization before injecting HTML.


## Instructions
1. Use or stub a sanitizer that whitelists basic tags (e.g., `<b>`, `<i>`).
2. Sanitize untrusted input before setting `dangerouslySetInnerHTML`.
3. Demonstrate blocked tags/attributes by attempting to inject scripts/events.


## Acceptance Criteria
- Untrusted input is sanitized before render.
- Dangerous tags/attributes are removed and do not execute.