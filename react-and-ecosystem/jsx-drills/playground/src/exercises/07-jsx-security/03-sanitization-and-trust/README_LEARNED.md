# What I Learned — Sanitization


## Details — Understanding
- Threat model: where does content come from?
- Principle of least trust.

## Deep Dive — Sanitizing untrusted HTML
- Use a vetted sanitizer library or server-side sanitation when rendering user-generated content.
- Whitelist allowed tags/attributes and strip everything else.

## Quick checklist
- Treat external/user data as untrusted
- Sanitize before injecting; prefer plain text when possible