# What I Learned — Array of Components

## Overview
React components and JSX elements are just JavaScript objects, which means they can be stored in arrays, manipulated, and rendered dynamically. This lesson explores how to work with arrays of components, the importance of proper key management, and advanced patterns for dynamic component rendering.

## Details — Understanding

### Components as Values
In React, components and JSX elements are first-class values that can be:
- **Stored in variables**: Components can be assigned to variables
- **Passed as arguments**: Components can be passed to functions
- **Returned from functions**: Functions can return components
- **Stored in arrays**: Components can be collected in arrays
- **Manipulated programmatically**: Components can be filtered, mapped, and transformed

### Careful with `key` and Render Order
When working with arrays of components, it's crucial to:
- **Provide stable keys**: Each component in an array needs a unique, stable key
- **Maintain render order**: The order of components in the array affects rendering
- **Handle dynamic updates**: Keys help React efficiently update the DOM
- **Avoid key conflicts**: Ensure keys are unique within the same array

## Deep Dive — Storing Components in Arrays

### Basic Array of Components
```tsx
const parts = [<Header key="h"/>, <Content key="c"/>, <Footer key="f"/>];
export function Page() { return <>{parts}</>; }

// Alternative syntax
const parts = [
  <Header key="header" />,
  <Content key="content" />,
  <Footer key="footer" />
];

export function Page() {
  return (
    <div>
      {parts}
    </div>
  );
}
```

### Dynamic Component Arrays
```tsx
function DynamicPage({ sections }: { sections: string[] }) {
  const components = sections.map((section, index) => {
    switch (section) {
      case 'header':
        return <Header key={`header-${index}`} />;
      case 'content':
        return <Content key={`content-${index}`} />;
      case 'footer':
        return <Footer key={`footer-${index}`} />;
      default:
        return <div key={`unknown-${index}`}>Unknown section: {section}</div>;
    }
  });
  
  return <>{components}</>;
}

// Usage
function App() {
  const pageSections = ['header', 'content', 'footer'];
  return <DynamicPage sections={pageSections} />;
}
```

### Advanced Array Patterns

#### 1. Component Factory Pattern
```tsx
interface ComponentConfig {
  type: string;
  props?: Record<string, any>;
  key: string;
}

function createComponent(config: ComponentConfig): React.ReactElement {
  const { type, props = {}, key } = config;
  
  switch (type) {
    case 'Header':
      return <Header key={key} {...props} />;
    case 'Content':
      return <Content key={key} {...props} />;
    case 'Footer':
      return <Footer key={key} {...props} />;
    case 'Sidebar':
      return <Sidebar key={key} {...props} />;
    default:
      return <div key={key}>Unknown component: {type}</div>;
  }
}

function ConfigurablePage({ configs }: { configs: ComponentConfig[] }) {
  const components = configs.map(createComponent);
  return <>{components}</>;
}

// Usage
function App() {
  const pageConfig = [
    { type: 'Header', key: 'header', props: { title: 'My App' } },
    { type: 'Sidebar', key: 'sidebar', props: { items: ['Home', 'About'] } },
    { type: 'Content', key: 'content', props: { children: 'Main content' } },
    { type: 'Footer', key: 'footer', props: { year: 2024 } }
  ];
  
  return <ConfigurablePage configs={pageConfig} />;
}
```

#### 2. Conditional Component Arrays
```tsx
function ConditionalPage({ showHeader, showSidebar, showFooter }: {
  showHeader: boolean;
  showSidebar: boolean;
  showFooter: boolean;
}) {
  const components = [];
  
  if (showHeader) {
    components.push(<Header key="header" />);
  }
  
  if (showSidebar) {
    components.push(<Sidebar key="sidebar" />);
  }
  
  components.push(<Content key="content" />);
  
  if (showFooter) {
    components.push(<Footer key="footer" />);
  }
  
  return <>{components}</>;
}

// Alternative approach with filter
function ConditionalPageAlt({ showHeader, showSidebar, showFooter }: {
  showHeader: boolean;
  showSidebar: boolean;
  showFooter: boolean;
}) {
  const allComponents = [
    { component: <Header key="header" />, condition: showHeader },
    { component: <Sidebar key="sidebar" />, condition: showSidebar },
    { component: <Content key="content" />, condition: true },
    { component: <Footer key="footer" />, condition: showFooter }
  ];
  
  const visibleComponents = allComponents
    .filter(({ condition }) => condition)
    .map(({ component }) => component);
  
  return <>{visibleComponents}</>;
}
```

#### 3. Component Composition with Arrays
```tsx
interface LayoutSection {
  id: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  order: number;
}

function ComposableLayout({ sections }: { sections: LayoutSection[] }) {
  const sortedSections = sections.sort((a, b) => a.order - b.order);
  
  const components = sortedSections.map(({ id, component: Component, props = {} }) => (
    <Component key={id} {...props} />
  ));
  
  return <>{components}</>;
}

// Usage
function App() {
  const layoutSections: LayoutSection[] = [
    { id: 'header', component: Header, props: { title: 'My App' }, order: 1 },
    { id: 'content', component: Content, props: { children: 'Main content' }, order: 3 },
    { id: 'footer', component: Footer, props: { year: 2024 }, order: 4 },
    { id: 'sidebar', component: Sidebar, props: { items: ['Home', 'About'] }, order: 2 }
  ];
  
  return <ComposableLayout sections={layoutSections} />;
}
```

### Key Management Strategies

#### 1. Stable Keys for Static Arrays
```tsx
// ✅ Good - stable keys for static components
const staticComponents = [
  <Header key="header" />,
  <Content key="content" />,
  <Footer key="footer" />
];

// ✅ Good - using meaningful keys
const navigationItems = [
  <NavItem key="home" href="/" label="Home" />,
  <NavItem key="about" href="/about" label="About" />,
  <NavItem key="contact" href="/contact" label="Contact" />
];
```

#### 2. Dynamic Keys for Dynamic Arrays
```tsx
// ✅ Good - using unique identifiers
function UserList({ users }: { users: User[] }) {
  const userComponents = users.map(user => (
    <UserCard key={user.id} user={user} />
  ));
  
  return <>{userComponents}</>;
}

// ✅ Good - using index when no unique ID available
function StepList({ steps }: { steps: string[] }) {
  const stepComponents = steps.map((step, index) => (
    <Step key={`step-${index}`} step={step} index={index} />
  ));
  
  return <>{stepComponents}</>;
}
```

#### 3. Key Generation Utilities
```tsx
function generateKey(prefix: string, index: number, data?: any): string {
  if (data && data.id) {
    return `${prefix}-${data.id}`;
  }
  return `${prefix}-${index}`;
}

function DynamicComponentList({ items, componentType }: {
  items: any[];
  componentType: string;
}) {
  const components = items.map((item, index) => {
    const key = generateKey(componentType, index, item);
    
    switch (componentType) {
      case 'user':
        return <UserCard key={key} user={item} />;
      case 'product':
        return <ProductCard key={key} product={item} />;
      case 'article':
        return <ArticleCard key={key} article={item} />;
      default:
        return <div key={key}>Unknown type: {componentType}</div>;
    }
  });
  
  return <>{components}</>;
}
```

### Performance Considerations

#### 1. Memoization for Expensive Components
```tsx
import { useMemo } from 'react';

function ExpensiveComponentList({ items }: { items: any[] }) {
  const components = useMemo(() => {
    return items.map((item, index) => (
      <ExpensiveComponent key={item.id} data={item} />
    ));
  }, [items]);
  
  return <>{components}</>;
}

// For individual component memoization
const MemoizedComponent = React.memo(function ExpensiveComponent({ data }: { data: any }) {
  // Expensive rendering logic
  return <div>{/* Complex component */}</div>;
});
```

#### 2. Virtualization for Large Lists
```tsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedComponentList({ items }: { items: any[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={100}
    >
      {Row}
    </List>
  );
}
```

### Advanced Patterns

#### 1. Component Registry Pattern
```tsx
interface ComponentRegistry {
  [key: string]: React.ComponentType<any>;
}

const componentRegistry: ComponentRegistry = {
  Header,
  Content,
  Footer,
  Sidebar,
  Navigation,
  Button,
  Card
};

function RegistryRenderer({ components }: { components: Array<{ type: string; props?: any; key: string }> }) {
  const renderedComponents = components.map(({ type, props = {}, key }) => {
    const Component = componentRegistry[type];
    
    if (!Component) {
      console.warn(`Component type "${type}" not found in registry`);
      return <div key={key}>Unknown component: {type}</div>;
    }
    
    return <Component key={key} {...props} />;
  });
  
  return <>{renderedComponents}</>;
}
```

#### 2. Higher-Order Component Arrays
```tsx
function withWrapper<T extends Record<string, any>>(
  WrapperComponent: React.ComponentType<any>
) {
  return function WrappedComponent(Component: React.ComponentType<T>) {
    return function Wrapped(props: T) {
      return (
        <WrapperComponent>
          <Component {...props} />
        </WrapperComponent>
      );
    };
  };
}

function createWrappedComponents(components: React.ComponentType<any>[]) {
  const withCard = withWrapper(Card);
  const withBorder = withWrapper(Border);
  
  return components.map((Component, index) => {
    const WrappedComponent = withCard(withBorder(Component));
    return <WrappedComponent key={`wrapped-${index}`} />;
  });
}
```

#### 3. Component Pipeline Pattern
```tsx
type ComponentTransformer = (component: React.ReactElement) => React.ReactElement;

function createComponentPipeline(transformers: ComponentTransformer[]) {
  return function transformComponent(component: React.ReactElement): React.ReactElement {
    return transformers.reduce((acc, transformer) => transformer(acc), component);
  };
}

function EnhancedComponentList({ components }: { components: React.ReactElement[] }) {
  const pipeline = createComponentPipeline([
    (comp) => React.cloneElement(comp, { className: `${comp.props.className || ''} enhanced` }),
    (comp) => React.cloneElement(comp, { 'data-enhanced': true }),
    (comp) => <div className="wrapper">{comp}</div>
  ]);
  
  const enhancedComponents = components.map(pipeline);
  
  return <>{enhancedComponents}</>;
}
```

### Testing Component Arrays

#### 1. Unit Testing
```tsx
import { render, screen } from '@testing-library/react';

describe('Component Arrays', () => {
  test('renders all components in array', () => {
    const components = [
      <Header key="header" />,
      <Content key="content" />,
      <Footer key="footer" />
    ];
    
    render(<>{components}</>);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  
  test('renders components in correct order', () => {
    const components = [
      <div key="first" data-testid="first">First</div>,
      <div key="second" data-testid="second">Second</div>,
      <div key="third" data-testid="third">Third</div>
    ];
    
    render(<>{components}</>);
    
    const elements = screen.getAllByTestId(/first|second|third/);
    expect(elements[0]).toHaveTextContent('First');
    expect(elements[1]).toHaveTextContent('Second');
    expect(elements[2]).toHaveTextContent('Third');
  });
});
```

#### 2. Integration Testing
```tsx
describe('Dynamic Component Arrays', () => {
  test('handles empty array', () => {
    render(<DynamicPage sections={[]} />);
    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
  });
  
  test('handles unknown section types', () => {
    render(<DynamicPage sections={['unknown']} />);
    expect(screen.getByText(/Unknown section/)).toBeInTheDocument();
  });
});
```

## Quick Checklist
- ✅ Provide keys for dynamic arrays
- ✅ Prefer functions returning elements for more control
- ✅ Use stable, unique keys for optimal performance
- ✅ Consider memoization for expensive component arrays
- ✅ Handle edge cases (empty arrays, unknown types)
- ✅ Use meaningful key prefixes for debugging
- ✅ Implement proper error handling for unknown components
- ✅ Consider virtualization for large lists
- ✅ Test component arrays thoroughly
- ✅ Document component array patterns and conventions
- ✅ Use TypeScript for type safety
- ✅ Consider performance implications of array operations
- ✅ Implement proper cleanup for dynamic components
- ✅ Use component registries for complex scenarios
- ✅ Handle conditional rendering in arrays
- ✅ Consider accessibility when rendering dynamic content