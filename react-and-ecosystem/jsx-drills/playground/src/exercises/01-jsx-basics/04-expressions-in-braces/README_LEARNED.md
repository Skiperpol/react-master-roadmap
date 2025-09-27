# What I Learned — Expressions in JSX

## Core Concepts

### What are JSX Expressions?
- **Curly Braces `{}`**: Allow embedding JavaScript expressions directly in JSX
- **Dynamic Content**: Enable rendering dynamic values, calculations, and function calls
- **JavaScript Inside JSX**: Bridge between JavaScript logic and JSX markup

### Expression vs Statement Distinction
- **✅ Expressions**: Return a value (can be used in `{}`)
- **❌ Statements**: Control flow, don't return values (cannot be used in `{}`)

## Key Learnings

### 1. What Can Go Inside `{}`

#### ✅ Valid Expressions
```jsx
// Variables
{name}
{count}

// Calculations
{2 + 2}
{price * quantity}

// Function calls
{new Date().toLocaleTimeString()}
{Math.random()}
{getFullName()}

// Object properties
{user.name}
{items[0]}

// Ternary operators
{isLoggedIn ? 'Welcome' : 'Please login'}

// Logical AND
{isLoading && <Spinner />}
```

#### ❌ Invalid Statements
```jsx
// if statements
{if (condition) return <div>Hello</div>} // ❌

// for loops
{for (let i = 0; i < 5; i++) { ... }} // ❌

// Variable declarations
{let x = 5} // ❌
{const y = 10} // ❌

// Function declarations
{function myFunc() { ... }} // ❌
```

### 2. Data Preparation Patterns

#### Pre-calculate Values
```jsx
function App() {
    // Calculate before rendering
    const currentTime = new Date().toLocaleTimeString();
    const sum = 2 + 2;
    const userFullName = `${user.firstName} ${user.lastName}`;
    
    return (
        <div>
            {currentTime}
            <br />
            {sum}
            <br />
            {userFullName}
        </div>
    );
}
```

#### Helper Functions
```jsx
function App() {
    const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
    const calculateTotal = (price, quantity) => price * quantity;
    
    return (
        <div>
            Price: {formatCurrency(25.99)}
            <br />
            Total: {formatCurrency(calculateTotal(25.99, 3))}
        </div>
    );
}
```

### 3. Expression Evaluation Rules

#### Automatic Type Conversion
```jsx
// Numbers are converted to strings
{42} // renders "42"

// Booleans are converted to strings
{true} // renders "true"
{false} // renders "false"

// null, undefined render nothing
{null} // renders nothing
{undefined} // renders nothing

// Objects cause errors
{{name: 'John'}} // ❌ Error: Objects are not valid as a React child
```

#### Safe Expression Handling
```jsx
// Safe object property access
{user?.name || 'Anonymous'}

// Safe array access
{items?.[0]?.title || 'No items'}

// Fallback values
{count ?? 0}
{message || 'No message'}
```

### 4. Common Expression Patterns

#### Conditional Rendering
```jsx
// Ternary for two options
{isLoggedIn ? <UserMenu /> : <LoginButton />}

// Logical AND for single condition
{hasError && <ErrorMessage />}

// Multiple conditions
{status === 'loading' && <Spinner />}
{status === 'error' && <ErrorMessage />}
{status === 'success' && <SuccessMessage />}
```

#### Dynamic Styling
```jsx
<div style={{ color: isActive ? 'green' : 'red' }}>
    {text}
</div>

<div className={`button ${isActive ? 'active' : ''}`}>
    Click me
</div>
```

#### List Rendering (Preview)
```jsx
{items.map(item => (
    <div key={item.id}>
        {item.name}
    </div>
))}
```

## Best Practices

### 1. Keep Expressions Simple
```jsx
// ✅ Good: Pre-calculate complex logic
const formattedDate = formatDate(user.createdAt);
return <div>{formattedDate}</div>;

// ❌ Avoid: Complex logic in JSX
return <div>{formatDate(user.createdAt.toISOString().split('T')[0])}</div>;
```

### 2. Use Meaningful Variable Names
```jsx
// ✅ Good
const currentTime = new Date().toLocaleTimeString();
const totalPrice = calculateTotal(items);

// ❌ Avoid
const a = new Date().toLocaleTimeString();
const b = calculateTotal(items);
```

### 3. Handle Edge Cases
```jsx
// ✅ Safe rendering
{user?.name || 'Anonymous User'}
{items?.length > 0 ? items.length : 'No items'}
{price ? `$${price.toFixed(2)}` : 'Price not available'}
```

### 4. Performance Considerations
```jsx
// ✅ Good: Calculate once
const expensiveValue = useMemo(() => calculateExpensiveValue(data), [data]);
return <div>{expensiveValue}</div>;

// ❌ Avoid: Recalculating on every render
return <div>{calculateExpensiveValue(data)}</div>;
```

## Common Mistakes to Avoid

1. **Using statements instead of expressions**
2. **Not handling null/undefined values**
3. **Putting objects directly in JSX**
4. **Complex calculations in JSX instead of pre-calculating**
5. **Forgetting that expressions are evaluated on every render**

## Advanced Concepts (Future Learning)

- **useMemo** for expensive calculations
- **useCallback** for function expressions
- **Template literals** in expressions
- **Array methods** like map, filter, reduce
- **Object destructuring** in expressions