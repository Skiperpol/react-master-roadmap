# What I Learned — Keys


## Details — Understanding
- React’s heuristic: matching elements by `key`.
- Impact of `key` on performance and child state.

## Deep Dive — Stable identity and reconciliation
- `key` helps React identify which items changed, are added, or removed.
- Stable keys preserve state within list items during reordering.

```tsx
{items.map(item => (
  <Row key={item.id} item={item} />
))}
```

## Quick checklist
- Use stable IDs, not array indexes, for `key`
- Keys must be unique among siblings