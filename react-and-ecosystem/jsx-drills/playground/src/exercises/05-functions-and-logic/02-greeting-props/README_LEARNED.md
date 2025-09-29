# What I Learned — Props and Conditions

## Basic Concepts

### Props in React
**Props** (properties) are the mechanism for passing data from parent components to child components. They are function arguments that allow for:
- Passing data down the component hierarchy
- Creating reusable components
- Controlling component behavior from outside

### Props Types
```tsx
// Optional props with TypeScript
type GreetingProps = {
  name?: string;  // ? indicates optionality
}

// Required props
type ButtonProps = {
  text: string;   // without ? - required
  onClick: () => void;
}
```

## Detailed Understanding

### Data Flow Through Props
- **Unidirectional flow**: data flows only downward (from parent to child)
- **Immutable**: props cannot be modified by the component that receives them
- **Reactivity**: changing props automatically triggers component re-render

### Conditional Rendering in Components
Conditional rendering allows displaying different content based on application state or props values.

## Deep Dive — Conditional Rendering Patterns

### 1. Ternary Operator
```tsx
// Basic pattern
{condition ? <ComponentA /> : <ComponentB />}

// Example with props
export function Greeting({ name }: { name?: string }) {
  return <h2>{name ? `Hello, ${name}!` : 'Hello, stranger!'}</h2>;
}
```

### 2. Logical AND Operator (&&)
```tsx
// Render only when condition is true
{isLoggedIn && <UserDashboard />}

// Example with props
export function UserProfile({ user }: { user?: User }) {
  return (
    <div>
      {user && <h1>Welcome, {user.name}!</h1>}
      {user?.email && <p>Email: {user.email}</p>}
    </div>
  );
}
```

### 3. Helper Functions
```tsx
// For more complex logic
function renderGreeting(name?: string) {
  if (!name) return 'Hello, stranger!';
  if (name.length < 2) return 'Hello, friend!';
  return `Hello, ${name}!`;
}

export function Greeting({ name }: { name?: string }) {
  return <h2>{renderGreeting(name)}</h2>;
}
```

### 4. Early Return Pattern
```tsx
export function Greeting({ name }: { name?: string }) {
  if (!name) {
    return <h2>Hello, stranger!</h2>;
  }
  
  return <h2>Hello, {name}!</h2>;
}
```

## Best Practices

### 1. Prefer Explicit Fallbacks Over Rendering `undefined`
```tsx
// ❌ Bad - might render "undefined"
{name && `Hello, ${name}!`}

// ✅ Good - always has fallback
{name ? `Hello, ${name}!` : 'Hello, stranger!'}
```

### 2. Use TypeScript for Type Safety
```tsx
// Interface definition
interface GreetingProps {
  name?: string;
  age?: number;
  isVip?: boolean;
}

// Usage with destructuring
export function Greeting({ name, age, isVip }: GreetingProps) {
  return (
    <div>
      <h2>{name ? `Hello, ${name}!` : 'Hello, stranger!'}</h2>
      {age && <p>You are {age} years old</p>}
      {isVip && <span className="vip-badge">VIP</span>}
    </div>
  );
}
```

### 3. Props Validation
```tsx
export function Greeting({ name }: { name?: string }) {
  // Validation at component level
  const displayName = name?.trim() || 'stranger';
  
  return <h2>Hello, {displayName}!</h2>;
}
```

### 4. Components with Default Values
```tsx
// Using default parameters
export function Greeting({ name = 'stranger' }: { name?: string }) {
  return <h2>Hello, {name}!</h2>;
}

// Or using destructuring with defaults
export function Greeting({ name }: { name?: string }) {
  const { name: displayName = 'stranger' } = { name };
  return <h2>Hello, {displayName}!</h2>;
}
```

## Different Test Scenarios

### Falsy Values in JavaScript
```tsx
// These values are "falsy" in JavaScript:
// false, 0, -0, 0n, "", null, undefined, NaN

export function Greeting({ name }: { name?: string }) {
  // Checks if name is "truthy"
  return <h2>{name ? `Hello, ${name}!` : 'Hello, stranger!'}</h2>;
}

// Test cases:
// <Greeting name="John" />     → "Hello, John!"
// <Greeting name="" />         → "Hello, stranger!"
// <Greeting name={null} />     → "Hello, stranger!"
// <Greeting name={undefined} /> → "Hello, stranger!"
// <Greeting />                 → "Hello, stranger!"
```

## Best Practices Checklist

### Basic Principles
- ✅ Keep conditions simple and readable
- ✅ Provide sensible default values for missing props
- ✅ Use TypeScript for type safety
- ✅ Test different scenarios (empty strings, null, undefined)

### Advanced
- ✅ Prefer explicit fallbacks over rendering `undefined`
- ✅ Use optional chaining operator (`?.`) for safe access
- ✅ Consider using helper functions for complex logic
- ✅ Validate input data at component level
- ✅ Document expected prop types in comments

### Performance
- ✅ Avoid complex calculations in JSX
- ✅ Use `useMemo` for expensive calculations
- ✅ Consider component memoization with `React.memo` for simple props

## Extended Examples

### Component with Multiple Conditions
```tsx
interface UserGreetingProps {
  user?: {
    name: string;
    isOnline: boolean;
    lastSeen?: Date;
  };
  showDetails?: boolean;
}

export function UserGreeting({ user, showDetails = false }: UserGreetingProps) {
  if (!user) {
    return <h2>Hello, guest!</h2>;
  }

  return (
    <div>
      <h2>
        Hello, {user.name}!
        {user.isOnline && <span className="online-indicator">●</span>}
      </h2>
      
      {showDetails && user.lastSeen && (
        <p>Last seen: {user.lastSeen.toLocaleDateString()}</p>
      )}
    </div>
  );
}
```

### Component with Validation
```tsx
export function ValidatedGreeting({ name }: { name?: string }) {
  // Validation and normalization
  const normalizedName = name?.trim();
  const isValidName = normalizedName && normalizedName.length >= 2;
  
  if (!isValidName) {
    return <h2>Hello, stranger!</h2>;
  }
  
  return <h2>Hello, {normalizedName}!</h2>;
}
```