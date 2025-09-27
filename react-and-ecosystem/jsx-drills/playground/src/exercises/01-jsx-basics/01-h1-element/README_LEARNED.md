# What I Learned — First JSX Element

## Key Concepts

### Understanding TSX
- TSX compiles to `React.createElement` calls
- A component must return a single parent element (fragment/`<div>`)
- Difference between plain HTML and TSX (e.g. expressions in `{}`)

### JSX Fragments vs Divs
- **Fragment (`<>...</>`)**: Use when you just need to group elements without adding extra HTML to the DOM. Keeps it clean
- **Div (`<div>...</div>`)**: Use when you actually need a container (for styling, layout, or semantics)

### Common Errors
- "Adjacent JSX elements..." error — why it happens and how to fix

## Export/Import Patterns

### Default Export

**When to use**: If the file has one main thing (e.g. a React component, layout, or main hook)

**Example**:
```tsx
// App.tsx
export default function App() {
  return <h1>Hello</h1>;
}

// another file
import App from "./App";     // standard name
import MyApp from "./App";   // any name works
```

### Named Export

**When to use**: If the file has multiple helpers, constants, or components

**Example**:
```tsx
// utils.ts
export function sum(a: number, b: number) { 
  return a + b; 
}

export function multiply(a: number, b: number) { 
  return a * b; 
}

// another file
import { sum, multiply } from "./utils"; // must match exact names
```

## Best Practices

### Export Strategy
- **For components** → usually `export default`
- **For utilities/constants/multiple items** → use named exports

### Code Organization
In larger projects, it's often cleaner to define functions/components first and export them at the end:

```tsx
function App() {
  return <h1>Hello</h1>;
}

export default App;
```