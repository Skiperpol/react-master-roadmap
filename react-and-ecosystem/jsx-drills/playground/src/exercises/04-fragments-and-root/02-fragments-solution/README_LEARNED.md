# What I Learned — Fragments


## Details — Understanding
- `<>...</>` vs `<div>...</div>` — differences in DOM and styling.
- When to use fragments instead of wrappers.

## Deep Dive — Fragments in practice
- Fragments let you group children without adding extra nodes to the DOM, which helps avoid styling/layout side effects.
- Two syntaxes: short `<>...</>` and `<React.Fragment>...</React.Fragment>`.
- Use `React.Fragment` when you need to provide a key on the fragment.

```tsx
// ✅ No extra DOM node created
export function Toolbar() {
  return (
    <>
      <Button primary>Save</Button>
      <Button>Cancel</Button>
    </>
  );
}

// ✅ Keyed fragments in lists
const items = [1,2,3];
export function List() {
  return items.map(id => (
    <React.Fragment key={id}>
      <dt>Item {id}</dt>
      <dd>Details for {id}</dd>
    </React.Fragment>
  ));
}
```

## When not to use fragments
- If you need a wrapper for layout, semantics, or accessibility (e.g., `<ul>` for `<li>` items), use a real element.

## Quick checklist
- Prefer fragments to avoid unnecessary wrappers
- Use `<React.Fragment key>` when mapping