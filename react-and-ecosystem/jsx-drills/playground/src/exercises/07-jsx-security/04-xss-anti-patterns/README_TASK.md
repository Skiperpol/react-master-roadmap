# Task: Anti-Patterns and XSS Tests


**Goal**: identify dangerous patterns.


## Instructions
1. Try injecting `<script>` and `onerror` attributes via data.
2. Note what React escapes vs what still runs when using `dangerouslySetInnerHTML`.
3. Propose safe alternatives: sanitize, render as text, or restructure UI.


## Acceptance Criteria
- A list of anti-patterns with safe alternatives is documented.
- Demonstration clearly shows what React blocks and what must be sanitized.