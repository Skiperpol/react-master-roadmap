# What I Learned — `children`


## Details — Understanding
- Composition via `children`.
- When to use `children` vs explicit props.

## Deep Dive — Composing with children
- `children` lets parents control layout while children provide content.
- Prefer explicit props when the parent needs structured data; use `children` for free-form content.

```tsx
type CardProps = { title?: string; children: React.ReactNode };
export function Card({ title, children }: CardProps) {
  return (
    <section className="card">
      {title && <h3>{title}</h3>}
      <div className="content">{children}</div>
    </section>
  );
}
```

## Quick checklist
- Use `children` for arbitrary JSX slots
- Use explicit props for structured, named regions