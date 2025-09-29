# What I Learned — Conditional Rendering

## Key Concepts

### 1. **Two Main Conditional Rendering Patterns**

#### **Ternary Operator (`? :`)**
- **Syntax**: `condition ? trueValue : falseValue`
- **Use case**: When you want to render **either** one thing **or** another
- **Always returns something** - never undefined
- **Perfect for**: toggle between two different elements/values

#### **Logical AND Operator (`&&`)**
- **Syntax**: `condition && element`
- **Use case**: When you want to render something **or nothing at all**
- **Returns**: the element if condition is truthy, or falsy value if condition is falsy
- **Perfect for**: conditionally showing/hiding elements

### 2. **Semantic Differences**

| Aspect | Ternary (`? :`) | Logical AND (`&&`) |
|--------|-----------------|-------------------|
| **Purpose** | Choose between two options | Show something or nothing |
| **Return** | Always returns a value | Returns element or falsy |
| **Use when** | You have two alternatives | You have one optional element |
| **Syntax** | `cond ? A : B` | `cond && A` |

### 3. **Understanding Falsy Values**
React treats these as falsy and won't render them:
- `false`, `null`, `undefined`, `0`, `""` (empty string)

**Critical Edge Case with `0`:**
```jsx
// ❌ Problematic - 0 renders as "0" in UI
{count && <div>Items: {count}</div>}

// ✅ Better - use explicit boolean check
{count > 0 && <div>Items: {count}</div>}

// ✅ Or use ternary
{count ? <div>Items: {count}</div> : null}
```

## Implementation Examples

### **Ternary Operator Examples**
```jsx
// Toggle between two different messages
{isLoggedIn ? "Welcome back!" : "Please log in"}

// Toggle between two different components
{isLoading ? <Spinner /> : <Content />}

// Toggle between two different styles
<div className={isActive ? "active" : "inactive"}>
```

### **Logical AND Examples**
```jsx
// Show element only if condition is true
{isVisible && <div>This shows conditionally</div>}

// Show multiple elements conditionally
{isAdmin && (
    <>
        <AdminPanel />
        <DeleteButton />
    </>
)}

// Show element based on array length
{items.length > 0 && <ItemList items={items} />}
```

## Best Practices

### ✅ **Use Ternary When:**
- You have exactly two alternatives
- You always want to render something
- The alternatives are different in nature
- You need to handle both true and false cases explicitly

### ✅ **Use Logical AND When:**
- You want to show something or nothing
- The condition is a simple boolean check
- You're checking for existence/truthiness
- You want cleaner, more readable code

### ✅ **Handle Falsy Values Safely:**
```jsx
// Safe approaches for potentially falsy values
{count > 0 && <div>Count: {count}</div>}
{items.length > 0 && <ItemList items={items} />}
{user && <UserProfile user={user} />}
```

## Common Patterns

### 1. **Loading States**
```jsx
{isLoading ? <Spinner /> : <Content />}
```

### 2. **Error Handling**
```jsx
{error ? <ErrorMessage error={error} /> : <SuccessMessage />}
```

### 3. **Authentication**
```jsx
{isAuthenticated ? <Dashboard /> : <LoginForm />}
```

### 4. **Optional Elements**
```jsx
{showDetails && <DetailsPanel />}
{hasPermission && <AdminButton />}
```

### 5. **Lists with Conditional Rendering**
```jsx
{items.length > 0 ? (
    <ItemList items={items} />
) : (
    <EmptyState message="No items found" />
)}
```

## Advanced Patterns

### **Nested Conditional Rendering**
```jsx
{isLoggedIn ? (
    isAdmin ? <AdminDashboard /> : <UserDashboard />
) : (
    <LoginPrompt />
)}
```

### **Multiple Conditions with AND**
```jsx
{isLoggedIn && isAdmin && hasPermission && <AdminPanel />}
```

### **Combining Both Patterns**
```jsx
{isLoading ? (
    <Spinner />
) : error ? (
    <ErrorMessage error={error} />
) : (
    data && <DataDisplay data={data} />
)}
```

## Performance Considerations

### **Short-Circuit Evaluation**
- `&&` stops evaluating if the first condition is falsy
- `? :` always evaluates the condition but only renders one branch
- Both are efficient for conditional rendering

### **Component Re-mounting**
```jsx
// Components will mount/unmount (expensive)
{showComponent && <ExpensiveComponent />}

// Components will only update props (cheaper)
<ExpensiveComponent visible={showComponent} />
```

## Real-World Applications

### **User Interface Elements**
- Show/hide navigation based on user role
- Display different content for logged in vs anonymous users
- Toggle between edit and view modes

### **Data Display**
- Show loading states during API calls
- Display error messages when requests fail
- Show empty states when no data is available

### **Form Interactions**
- Show validation errors conditionally
- Display different form fields based on selections
- Show/hide submit buttons based on form validity

## Related Concepts
- **Boolean coercion** in JavaScript
- **Short-circuit evaluation** in logical operators
- **Component lifecycle** and re-mounting behavior
- **Performance optimization** with conditional rendering
- **Accessibility** considerations for conditional content