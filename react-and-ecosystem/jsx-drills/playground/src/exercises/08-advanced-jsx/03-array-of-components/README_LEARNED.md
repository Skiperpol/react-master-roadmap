# What I Learned — Array of Components


## Details — Understanding
- Components as values.
- Careful with `key` and render order.

## Deep Dive — Storing components in arrays
- JSX elements are just objects; you can store and render them from arrays.
- When generating arrays dynamically, ensure each element has a stable `key` when rendered in a list.

```tsx
const parts = [<Header key="h"/>, <Content key="c"/>, <Footer key="f"/>];
export function Page() { return <>{parts}</>; }
```

## Quick checklist
- Provide keys for dynamic arrays
- Prefer functions returning elements for more control