# What I Learned — Layout and Composition


## Details — Understanding
- Reusability through composition.
- Separation of layout from content.

## Deep Dive — Layout components
- Create layout components that take `children` and possibly named slots.
- Keep layout responsibilities (structure, spacing) separate from page content.

```tsx
type LayoutProps = { header?: React.ReactNode; footer?: React.ReactNode; children: React.ReactNode };
export function Layout({ header, footer, children }: LayoutProps) {
  return (
    <div className="layout">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}
```

## Quick checklist
- Encapsulate structure in layout components
- Pass content via children/slots