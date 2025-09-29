# What I Learned — Props and Conditions


## Details — Understanding
- Data flow through props.
- Conditional rendering in components.

## Deep Dive — Conditional rendering patterns
- Use ternary or logical-AND for concise conditions inside JSX.
- Prefer explicit fallbacks over rendering `undefined`.

```tsx
export function Greeting({ name }: { name?: string }) {
  return <h2>{name ? `Hello, ${name}!` : 'Hello, stranger!'}</h2>;
}
```

## Quick checklist
- Keep conditions simple and readable
- Provide sensible defaults for missing props