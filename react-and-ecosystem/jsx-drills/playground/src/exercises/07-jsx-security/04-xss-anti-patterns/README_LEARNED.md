# What I Learned — XSS Anti-Patterns


## Details — Understanding
- Examples of XSS vectors in UI.
- Security checklist for working with HTML.

## Deep Dive — Common pitfalls
- Concatenating untrusted strings into HTML and injecting.
- Trusting query params, localStorage, or external APIs without validation.
- Inline event handlers from data (e.g., `onClick` strings) — avoid.

## Quick checklist
- Escape by default; avoid HTML injection
- Sanitize or avoid `dangerouslySetInnerHTML`
- Validate and encode external inputs