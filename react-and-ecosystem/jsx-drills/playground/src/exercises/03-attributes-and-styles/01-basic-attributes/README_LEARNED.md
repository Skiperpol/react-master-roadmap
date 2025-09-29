# What I Learned — Basic Attributes

## Key Concepts

### 1. **JSX Attribute Naming Convention**
- **CamelCase vs HTML**: JSX uses camelCase for most attributes, while HTML uses lowercase
- **JavaScript Properties**: JSX attributes map to JavaScript DOM properties, not HTML attributes
- **Consistency**: This naming convention is consistent with JavaScript object property naming

### 2. **Key Attribute Differences from HTML**

| HTML Attribute | JSX Attribute | Purpose |
|----------------|---------------|---------|
| `class` | `className` | CSS class assignment |
| `for` | `htmlFor` | Label association with form controls |
| `onclick` | `onClick` | Click event handler |
| `onchange` | `onChange` | Change event handler |
| `onkeydown` | `onKeyDown` | Keyboard event handler |

### 3. **Core Attributes Explored**

#### **`className`**
```jsx
<h1 className="title">Heading</h1>
```
- **Purpose**: Assigns CSS classes to elements
- **Why not `class`**: `class` is a reserved keyword in JavaScript
- **Multiple classes**: Use space-separated strings or template literals
- **Dynamic classes**: Can use expressions: `className={isActive ? "active" : "inactive"}`

#### **`id`**
```jsx
<h1 id="main-title">Heading</h1>
```
- **Purpose**: Unique identifier for the element
- **Accessibility**: Used for ARIA relationships and form labels
- **CSS targeting**: Can be styled with `#id` selector
- **JavaScript access**: Used with `document.getElementById()`

#### **`tabIndex`**
```jsx
<h1 tabIndex={0}>Focusable Heading</h1>
```
- **Purpose**: Controls keyboard navigation order
- **Values**:
  - `-1`: Element is focusable but not in tab order
  - `0`: Element is focusable and in natural tab order
  - `>0`: Custom tab order (not recommended)

## Implementation Details

### **Basic Attribute Usage**
```jsx
function App() {
    return (
        <div>
            <h1 className="title" id="main-title" tabIndex={0}>
                First element
            </h1>
            <button className="btn" id="first-btn" tabIndex={1}>
                Click me
            </button>
            <p className="paragraph" id="info-text" tabIndex={2}>
                Some text here
            </p>
        </div>
    );
}
```

### **What Each Attribute Does:**
- **`className="title"`**: Applies CSS styles from `.title` class
- **`id="main-title"`**: Creates unique identifier for targeting
- **`tabIndex={0}`**: Makes element focusable with keyboard navigation

## Accessibility Considerations

### 1. **Keyboard Navigation with `tabIndex`**
- **Natural flow**: Elements like buttons and links are naturally focusable
- **Custom focus**: `tabIndex={0}` makes any element focusable
- **Tab order**: Positive tabIndex values create custom navigation order
- **Testing**: Use Tab key to navigate through focusable elements

### 2. **Focus Management**
```jsx
// Good: Natural tab order
<button tabIndex={0}>Button 1</button>
<input tabIndex={0} />

// Avoid: Custom tab order (can confuse users)
<button tabIndex={3}>Button 1</button>
<input tabIndex={1} />
```

### 3. **Focus Styles**
The CSS includes focus-visible styles:
```css
:focus-visible {
    outline: 3px solid var(--focus);
    outline-offset: 3px;
    border-radius: 10px;
}
```

## Best Practices

### ✅ **Do:**
- Use `className` instead of `class`
- Provide meaningful `id` values that describe the element's purpose
- Use `tabIndex={0}` to make non-interactive elements focusable when needed
- Test keyboard navigation with Tab key
- Use semantic HTML elements when possible

### ❌ **Don't:**
- Use positive `tabIndex` values (breaks natural tab order)
- Use generic `id` values like "element1", "div2"
- Forget to test accessibility with keyboard navigation
- Use `class` instead of `className`

## Dynamic Attributes

### **Conditional Classes**
```jsx
<button className={`btn ${isActive ? 'active' : ''}`}>
    Dynamic Button
</button>
```

### **Dynamic IDs**
```jsx
<div id={`item-${itemId}`}>Item {itemId}</div>
```

### **Conditional Attributes**
```jsx
<button 
    className="btn" 
    id="submit-btn"
    tabIndex={isEnabled ? 0 : -1}
    disabled={!isEnabled}
>
    Submit
</button>
```

## Common Patterns

### 1. **Form Elements**
```jsx
<label htmlFor="username">Username</label>
<input id="username" className="form-input" tabIndex={0} />
```

### 2. **Navigation Elements**
```jsx
<nav>
    <a href="/home" className="nav-link" tabIndex={0}>Home</a>
    <a href="/about" className="nav-link" tabIndex={0}>About</a>
</nav>
```

### 3. **Interactive Elements**
```jsx
<div 
    className="card" 
    id="user-card"
    tabIndex={0}
    role="button"
    onClick={handleClick}
>
    User Information
</div>
```

## CSS Integration

### **Class-based Styling**
The solution uses CSS classes for styling:
```css
.title {
    background: var(--card);
    border-radius: 14px;
    padding: 12px 16px;
}

.btn {
    background: var(--brand);
    border-radius: 12px;
    transition: transform 120ms ease;
}
```

### **ID-based Targeting**
```css
#main-title {
    font-size: 2rem;
    font-weight: bold;
}
```

## Real-World Applications

### **User Interface Components**
- Navigation menus with keyboard accessibility
- Form elements with proper labeling
- Interactive cards and buttons

### **Accessibility Features**
- Screen reader compatibility
- Keyboard-only navigation
- Focus management in complex UIs

### **CSS Architecture**
- Component-based styling with classes
- ID-based targeting for specific elements
- Responsive design with media queries

## Related Concepts
- **Accessibility (a11y)** best practices
- **CSS-in-JS** alternatives to className
- **Semantic HTML** elements
- **Event handling** with onClick and other event props
- **Form handling** with controlled components