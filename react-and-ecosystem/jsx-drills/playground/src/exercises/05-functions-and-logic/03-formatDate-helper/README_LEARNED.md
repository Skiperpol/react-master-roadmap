# What I Learned — Date Formatting

## Basic Concepts

- Separation of concerns: move formatting logic out of JSX into a small, testable helper.
- Use the platform: prefer the `Intl` API over manual string concatenation.
- Accessibility: render human-readable text, but keep a machine-readable value via `<time dateTime="...">`.

## Detailed Understanding

### Why a helper function?
- Centralizes date formatting logic so changes (locale, style) happen in one place.
- Keeps components focused on structure, not formatting rules.
- Easier to test, mock, and reuse across the app.

### The Intl.DateTimeFormat API
```tsx
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions, locale: string = 'en') {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', ...options }).format(date);
}
```
- Common options:
  - `dateStyle`: 'short' | 'medium' | 'long' | 'full'
  - `timeStyle`: 'short' | 'medium' | 'long' | 'full'
  - `weekday`, `month`, `year`, `day`, `hour`, `minute`, `second`
  - `timeZone`, `hour12`, `timeZoneName`

### Accessible timestamp component
```tsx
export function Timestamp({ date, locale = 'en' }: { date: Date; locale?: string }) {
  const human = formatDate(date, undefined, locale);
  return <time dateTime={date.toISOString()}>{human}</time>;
}
```
- `dateTime` should be an ISO 8601 string (e.g., `2024-09-17T12:34:56.000Z`).
- Screen readers and crawlers can rely on `dateTime` while users see a localized label.

## Deep Dive — Formatting Dates Safely

- Keep locale/formatting outside JSX; pass in a pre-formatted string or call a helper.
- Always set `<time dateTime>` to a machine-readable ISO string from the original `Date`.
- Avoid concatenating date parts manually; it is error-prone across locales.

### Time zones and consistency
- Prefer storing times in UTC and converting on display.
- For consistent server/client output, explicitly set `timeZone` when needed.

```tsx
export function formatDateTimeUtc(date: Date, locale = 'en') {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date);
}
```

### Handling invalid input
```tsx
export function safeFormatDate(value: unknown, locale = 'en') {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
}
```
- Return an empty string or a placeholder when the date is invalid.

## Extended Examples

### Different locales
```tsx
const d = new Date('2024-09-17T12:34:56Z');
formatDate(d, { dateStyle: 'long' }, 'en'); // September 17, 2024
formatDate(d, { dateStyle: 'long' }, 'pl'); // 17 września 2024
formatDate(d, { dateStyle: 'long' }, 'de'); // 17. September 2024
```

### Date and time together
```tsx
export function formatDateTime(date: Date, locale = 'en') {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
```

### Custom pieces
```tsx
new Intl.DateTimeFormat('en', {
  year: 'numeric', month: 'short', day: '2-digit',
  hour: '2-digit', minute: '2-digit',
}).format(new Date());
```

## Edge Cases to Consider

- Null/undefined inputs: guard and show a fallback.
- Invalid dates (NaN): avoid rendering broken strings.
- Server vs client rendering: ensure deterministic output or set explicit `timeZone`.
- User locale: allow passing a locale or reading from app settings.

## Testing Tips

- Unit test the helper (not the component) with a fixed `Date` input.
- Mock `Intl.DateTimeFormat` or freeze time to avoid flaky tests.
- Verify that `<time dateTime>` contains a correct ISO string.

## Performance Notes

- Constructing `Intl.DateTimeFormat` repeatedly can be relatively costly.
- If formatting the same way many times, cache the formatter instance.

```tsx
const dateFormatters = new Map<string, Intl.DateTimeFormat>();

export function getFormatter(locale: string, options: Intl.DateTimeFormatOptions) {
  const key = JSON.stringify([locale, options]);
  let fmt = dateFormatters.get(key);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat(locale, options);
    dateFormatters.set(key, fmt);
  }
  return fmt;
}

export function fastFormat(date: Date, locale = 'en') {
  return getFormatter(locale, { dateStyle: 'medium' }).format(date);
}
```

## Quick Checklist

- Use `Intl` or a well-tested utility; avoid ad-hoc string building.
- Provide an ISO value in `dateTime` for the `<time>` element.
- Guard against invalid dates and null/undefined inputs.
- Consider locale and time zone explicitly for consistent rendering.