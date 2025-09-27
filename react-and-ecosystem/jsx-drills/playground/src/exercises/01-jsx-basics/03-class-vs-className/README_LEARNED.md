# What I Learned — className vs class

## Core Concepts

### Why `className` instead of `class`?
- **JavaScript Reserved Word**: `class` is a reserved keyword in JavaScript (introduced in ES6 for class declarations)
- **JSX is JavaScript**: Since JSX is JavaScript under the hood, using `class` would cause syntax errors
- **React Convention**: React uses `className` as the JSX attribute name to avoid conflicts

### HTML vs JSX Attribute Differences
- **HTML**: `<div class="title">` - uses `class` attribute
- **JSX**: `<div className="title">` - uses `className` attribute
- **Result**: Both produce the same HTML output in the browser

## Key Learnings

### 1. Attribute Naming Conventions in JSX
- **CamelCase**: Most HTML attributes become camelCase in JSX
  - `tabindex` → `tabIndex`
  - `readonly` → `readOnly`
  - `maxlength` → `maxLength`
- **Special Cases**:
  - `class` → `className`
  - `for` → `htmlFor` (to avoid conflict with JavaScript's `for` loop)

### 2. CSS Classes in React
- **Import CSS**: Need to import CSS files (`import "./style.css"`)
- **Apply Classes**: Use `className` to apply CSS classes
- **Multiple Classes**: Can use template literals or array methods for multiple classes
  ```jsx
  className={`class1 class2`}
  className={["class1", "class2"].join(" ")}
  ```

### 3. Error Handling and Development Experience
- **Console Warnings**: React shows helpful warnings when using `class` instead of `className`
- **TypeScript**: TypeScript will catch these errors at compile time
- **ESLint**: React ESLint rules can enforce correct attribute usage

### 4. Browser Compatibility
- **Final Output**: React transforms `className` to `class` in the final HTML
- **No Impact**: End users see standard HTML with `class` attributes
- **Development Only**: The `className` vs `class` difference only matters during development

## Common Patterns

### Dynamic Class Names
```jsx
const isActive = true;
<div className={`button ${isActive ? 'active' : ''}`}>
<div className={isActive ? 'button active' : 'button'}>
```

### Conditional Classes
```jsx
<div className={[
  'base-class',
  condition && 'conditional-class',
  anotherCondition ? 'true-class' : 'false-class'
].filter(Boolean).join(' ')}>
```

### CSS Modules (Future Learning)
```jsx
import styles from './Component.module.css';
<div className={styles.title}>
```

## Best Practices
- Always use `className` in JSX components
- Import CSS files at the top of your component files
- Use descriptive class names that follow BEM or similar conventions
- Consider using CSS-in-JS libraries for dynamic styling
- Use tools like `clsx` or `classnames` for complex conditional class logic