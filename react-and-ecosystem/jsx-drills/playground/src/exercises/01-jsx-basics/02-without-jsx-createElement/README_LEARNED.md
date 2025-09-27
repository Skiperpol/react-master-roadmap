# What I Learned — Without JSX

## Key Concepts

### Understanding React.createElement
- How JSX maps to `React.createElement` calls
- How props and children are passed under the hood
- Advantages of JSX (readability) vs raw `createElement`

### JSX vs createElement Comparison

**JSX Syntax** (what we write):
```tsx
function App() {
  return (
    <div>
      <h1>Hello TSX</h1>
      <p>Testing</p>
    </div>
  );
}
```

**React.createElement Syntax** (what JSX compiles to):
```tsx
function App() {
  return React.createElement("div", null,
    React.createElement("h1", null, "Hello TSX"),
    React.createElement("p", null, "Testing")
  );
}
```

## Key Takeaways

### createElement Parameters
The `React.createElement` function takes three main parameters:
1. **Element type** (string for HTML tags, component for custom components)
2. **Props object** (attributes, event handlers, etc.)
3. **Children** (text content, other elements, or components)

### Why JSX is Better
- **Readability**: Much easier to read and understand
- **Familiarity**: Looks like HTML, which developers already know
- **Maintainability**: Easier to modify and debug
- **Developer Experience**: Better IDE support, syntax highlighting, and error messages

### When You Might Use createElement
- When you need to dynamically create elements based on runtime conditions
- When working with libraries that don't support JSX
- When you need fine-grained control over element creation