# What I Learned — Functions in JSX


## Details — Understanding
- When to move logic into functions.
- Cleaner JSX with helpers.

## Deep Dive — Extracting logic improves readability
- Keep JSX declarative by extracting string/number formatting into pure functions.
- Test helpers independently; they should not depend on component state or effects.

```tsx
type User = { firstName: string; lastName: string };

export function formatName(user: User) {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function Header({ user }: { user: User }) {
  return <h2>{formatName(user)}</h2>;
}
```

## TypeScript note
- Add parameter/result types to helpers for clarity and safer usage across components.

## Quick checklist
- Keep helpers pure and reusable
- Keep JSX minimal; call helpers inside braces