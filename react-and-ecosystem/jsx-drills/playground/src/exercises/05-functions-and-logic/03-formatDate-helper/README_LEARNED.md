# What I Learned — Date Formatting


## Details — Understanding
- Separation of formatting logic from view.
- Accessibility: using `<time dateTime=...>`.

## Deep Dive — Formatting dates safely
- Keep locale/formatting concerns outside JSX; use a helper or Intl API.
- Always set `<time dateTime>` to a machine-readable ISO string.

```tsx
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(date);
}

export function Timestamp({ date }: { date: Date }) {
  return <time dateTime={date.toISOString()}>{formatDate(date)}</time>;
}
```

## Quick checklist
- Use `Intl` or a tested util; avoid ad-hoc string building
- Provide ISO value in `dateTime`