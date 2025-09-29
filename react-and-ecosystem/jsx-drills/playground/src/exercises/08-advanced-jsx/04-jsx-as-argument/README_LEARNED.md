# What I Learned — JSX as Value


## Details — Understanding
- Flexibility of JSX as a data tree.
- Boundaries: what’s readable vs too magical.

## Deep Dive — Passing JSX around
- JSX is syntactic sugar for objects; you can pass it to functions and return transformed JSX.
- Use this sparingly; prefer components for clearer composition.

```tsx
function withFrame(content: React.ReactNode) {
  return <div className="frame">{content}</div>;
}

export function Example() {
  return withFrame(<strong>Hello</strong>);
}
```

## Quick checklist
- Prefer components for composition; use helpers for simple wrappers