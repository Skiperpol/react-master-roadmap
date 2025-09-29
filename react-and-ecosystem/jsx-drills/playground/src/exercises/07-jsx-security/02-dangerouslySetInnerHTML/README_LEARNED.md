# What I Learned — `dangerouslySetInnerHTML`


## Details — Understanding
- XSS risks, when this tool makes sense.
- Using trusted content sources.

## Deep Dive — Use with extreme caution
- `dangerouslySetInnerHTML` bypasses React’s escaping; the browser will interpret the string as HTML.
- Only inject HTML from trusted, sanitized sources.

```tsx
<div dangerouslySetInnerHTML={{ __html: safeHtml }} />
```

## Quick checklist
- Avoid unless you must render preformatted HTML
- Sanitize or whitelist content before injecting