# What I Learned — Inline Styles


## Details — Understanding
- CamelCase in styles (e.g. `backgroundColor`).
- Numeric units (e.g. `fontSize: 16` → `16px`).
- When to use inline vs classes/CSS-in-JS.

## Deep Dive — Inline style object in React
- React expects the `style` prop to be a JavaScript object mapping CSS properties to values.
- Property names use camelCase, not kebab-case.
- Values can be strings (with units) or numbers (interpreted as px for most properties).

```tsx
export function Card() {
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 8,        // becomes 8px
    padding: '1rem',        // explicit unit string
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
  } as const;

  return <div style={cardStyle}>Hello</div>;
}
```

## Units and numbers — important nuances
- Numbers are treated as px by default (e.g., `width: 200` → `200px`).
- Some properties are unitless and should stay numbers: `lineHeight`, `zIndex`, `opacity`, `flex`, `fontWeight`, `zoom`.
- For non-px units, pass strings: `height: '50vh'`, `fontSize: '1.25rem'`, `letterSpacing: '0.02em'`.

## Shorthand vs longhand
- Shorthands work as strings: `margin: '8px 12px'`, `border: '1px solid #ddd'`.
- Longhands use camelCase numbers/strings: `marginTop: 8`, `borderTopLeftRadius: 12`.

## Vendor prefixes
- Use vendor-prefixed property names in camelCase when needed: `WebkitLineClamp`, `msOverflowStyle`.
- React does not auto-prefix values; you must specify the correct property.

## TypeScript tips
- The `style` prop type is `React.CSSProperties`.

```tsx
type ButtonProps = { isPrimary?: boolean };

export function Button({ isPrimary }: ButtonProps) {
  const style: React.CSSProperties = {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    backgroundColor: isPrimary ? '#2563eb' : '#e5e7eb',
    color: isPrimary ? '#fff' : '#111827'
  };
  return <button style={style}>Click</button>;
}
```

## Dynamic and conditional styles
- Build style objects from smaller pieces and conditionally merge.

```tsx
const baseStyle: React.CSSProperties = { padding: 12, borderRadius: 6 };
const dangerStyle: React.CSSProperties = { backgroundColor: '#fee2e2', color: '#991b1b' };

export function Alert({ danger }: { danger?: boolean }) {
  const style = { ...baseStyle, ...(danger ? dangerStyle : {}) };
  return <div style={style}>Alert text</div>;
}
```

## Specificity, performance, and when to use inline styles
- Inline styles have high specificity and override many stylesheet rules, but cannot target `:hover`, `:focus`, `:active`, or media queries directly.
- Prefer inline styles for:
  - Highly dynamic, computed-at-runtime values
  - One-off styles where creating a class is overkill
- Prefer classes/CSS-in-JS for:
  - Pseudo-classes/elements, media queries, complex theming
  - Reuse across many components and better caching

## Things inline styles cannot do
- Pseudo-classes/elements (`:hover`, `::before`) — use classes or CSS-in-JS.
- Media queries and container queries — use CSS or CSS-in-JS.
- Keyframe declarations — use CSS or CSS-in-JS `@keyframes` utilities.

## Common gotchas
- Passing arrays to `style` is not supported in React DOM (unlike React Native). Use object spread to merge.
- CSS custom properties (variables) can be set via strings: `style={{ ['--gap' as any]: '8px' }}` and then used in CSS; but using them directly for layout still needs CSS.
- `!important` cannot be expressed via the style object; restructure styles instead.

## Quick checklist
- CamelCase property names
- Numbers for px-based properties; strings for other units
- Use `React.CSSProperties` when in TypeScript
- Merge conditionally with object spread
- Prefer classes/CSS-in-JS for pseudo-classes, media queries, and animations