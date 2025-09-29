# What I Learned — Nesting


## Details — Understanding
- Returning arrays of elements.
- Fragments inside `map`.

## Deep Dive — Mapping and fragmenting
- In lists, JSX must return a single parent per iteration; fragments provide that parent without adding a DOM node.
- Each sibling produced in a `map` needs a stable `key` to help React reconcile efficiently.

```tsx
const products = [
  { id: 'p1', name: 'Book', price: 19 },
  { id: 'p2', name: 'Pen', price: 3 }
];

export function ProductList() {
  return products.map(p => (
    <React.Fragment key={p.id}>
      <h3>{p.name}</h3>
      <p>${p.price}</p>
    </React.Fragment>
  ));
}
```

## When to use arrays directly
- You can return an array of elements from a component, but you still need keys on each top-level item.
- Fragments often read better and align with JSX tree shape.

## Quick checklist
- Provide stable keys when mapping
- Use fragments to group multiple siblings per item