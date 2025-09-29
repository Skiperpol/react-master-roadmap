# What I Learned — String with HTML


## Details — Understanding
- Default XSS protection via escaping.
- Why this behavior is desirable.

## Deep Dive — Escaping by default
- React escapes strings before rendering to the DOM, preventing HTML injection by default.
- Rendering `"<strong>Hello</strong>"` shows literal text, not bold HTML.

## Quick checklist
- Assume strings are untrusted by default
- Prefer React’s escaping; do not bypass it unless necessary