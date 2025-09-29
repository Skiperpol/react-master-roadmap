# What I Learned — List Manipulation


## Details — Understanding
- Impact of `key` on reconciliation during changes.
- Best practices for list modifications.

## Deep Dive — Immutability and updates
- Use immutable operations (`map`, `filter`, `slice`, spreads) to produce new arrays.
- Keep `key` stable across add/remove/sort operations to preserve child state.

```tsx
// Remove
setItems(prev => prev.filter(x => x.id !== id));
// Add
setItems(prev => [...prev, newItem]);
// Sort (copy first)
setItems(prev => [...prev].sort((a,b) => a.name.localeCompare(b.name)));
```

## Quick checklist
- Update arrays immutably
- Ensure each item has a stable `key`