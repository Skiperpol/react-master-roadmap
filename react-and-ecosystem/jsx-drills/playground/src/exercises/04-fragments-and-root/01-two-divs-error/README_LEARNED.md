# What I Learned — Multiple Roots Error


## Details — Understanding
- Why components require a single root element.
- How this impacts the DOM structure.

## Deep Dive — Why a single root?
- JSX compiles to function calls that must return a single value. Returning siblings at the top level without a wrapper yields a syntax/runtime error: "Adjacent JSX elements must be wrapped in an enclosing tag".
- The single root ensures predictable reconciliation and a clear parent node in the DOM.

```tsx
// ❌ Invalid: two top-level elements
export function Bad() {
  return (
    <div>Left</div>
    <div>Right</div>
  );
}

// ✅ Valid: wrap with a single parent
export function Good() {
  return (
    <div>
      <div>Left</div>
      <div>Right</div>
    </div>
  );
}
```

## Alternatives to a wrapper element
- Use a fragment (`<>...</>` or `<React.Fragment>`) when you want multiple children but do not want an extra DOM node.
- Use arrays of elements with keys in special cases, but fragments are preferred for readability.

## Quick checklist
- Ensure each component's `return` has a single root
- Use fragments to avoid extra DOM wrappers when appropriate