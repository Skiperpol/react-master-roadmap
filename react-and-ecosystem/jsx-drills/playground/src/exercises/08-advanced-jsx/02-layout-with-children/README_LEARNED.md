# What I Learned — Layout and Composition

## Overview
Layout components are the foundation of scalable React applications. They provide consistent structure, spacing, and organization while maintaining flexibility through composition. This lesson explores how to create reusable layout systems, separate concerns between layout and content, and build maintainable UI architectures.

## Details — Understanding

### Reusability Through Composition
Layout components enable reusability by:
- **Separating Structure from Content**: Layout defines the framework, content fills the slots
- **Consistent Design Systems**: Standardized spacing, typography, and component relationships
- **Flexible Content Areas**: Multiple content slots that can be filled with any React content
- **Responsive Behavior**: Layout components can handle responsive design consistently
- **Theme Integration**: Layout components can integrate with design systems and themes

### Separation of Layout from Content
This separation provides several benefits:
- **Maintainability**: Layout changes don't affect content logic
- **Testability**: Layout and content can be tested independently
- **Reusability**: Same layout can be used across different pages/features
- **Consistency**: Ensures uniform spacing and structure across the application
- **Performance**: Layout components can be optimized separately from content

## Deep Dive — Layout Components

### Basic Layout Component
```tsx
type LayoutProps = { header?: React.ReactNode; footer?: React.ReactNode; children: React.ReactNode };
export function Layout({ header, footer, children }: LayoutProps) {
  return (
    <div className="layout">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

// Usage
function App() {
  return (
    <Layout
      header={<h1>My Application</h1>}
      footer={<p>&copy; 2024 My Company</p>}
    >
      <h2>Welcome to our app</h2>
      <p>This is the main content area.</p>
    </Layout>
  );
}
```

### Advanced Layout Patterns

#### 1. Multi-Slot Layout
```tsx
interface AdvancedLayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

function AdvancedLayout({ header, sidebar, children, footer, className }: AdvancedLayoutProps) {
  return (
    <div className={`layout ${className || ''}`}>
      {header && <header className="layout__header">{header}</header>}
      <div className="layout__body">
        {sidebar && <aside className="layout__sidebar">{sidebar}</aside>}
        <main className="layout__main">{children}</main>
      </div>
      {footer && <footer className="layout__footer">{footer}</footer>}
    </div>
  );
}
```

#### 2. Responsive Layout
```tsx
interface ResponsiveLayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  breakpoint?: 'sm' | 'md' | 'lg';
}

function ResponsiveLayout({ header, sidebar, children, footer, breakpoint = 'md' }: ResponsiveLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className={`responsive-layout responsive-layout--${breakpoint}`}>
      {header && (
        <header className="responsive-layout__header">
          {header}
          {sidebar && (
            <button 
              className="sidebar-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
          )}
        </header>
      )}
      
      <div className="responsive-layout__body">
        {sidebar && (
          <aside className={`responsive-layout__sidebar ${isSidebarOpen ? 'open' : ''}`}>
            {sidebar}
          </aside>
        )}
        
        <main className="responsive-layout__main">
          {children}
        </main>
      </div>
      
      {footer && <footer className="responsive-layout__footer">{footer}</footer>}
    </div>
  );
}
```

#### 3. Grid-Based Layout
```tsx
interface GridLayoutProps {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  className?: string;
}

function GridLayout({ children, columns = 3, gap = '1rem', className }: GridLayoutProps) {
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap
  };
  
  return (
    <div className={`grid-layout ${className || ''}`} style={style}>
      {children}
    </div>
  );
}
```

#### 4. Flexbox Layout
```tsx
interface FlexLayoutProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  wrap?: boolean;
  gap?: string;
  className?: string;
}

function FlexLayout({ 
  children, 
  direction = 'row', 
  justify = 'flex-start', 
  align = 'stretch',
  wrap = false,
  gap = '0',
  className 
}: FlexLayoutProps) {
  const style = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: gap
  };
  
  return (
    <div className={`flex-layout ${className || ''}`} style={style}>
      {children}
    </div>
  );
}
```

## Quick Checklist
- ✅ Encapsulate structure in layout components
- ✅ Pass content via children/slots
- ✅ Separate layout concerns from content logic
- ✅ Use consistent spacing and typography
- ✅ Implement responsive design patterns
- ✅ Consider performance implications
- ✅ Test layout components thoroughly
- ✅ Use CSS modules or styled-components for styling
- ✅ Implement proper TypeScript types
- ✅ Create reusable layout patterns
- ✅ Handle edge cases (no header, no sidebar, etc.)
- ✅ Consider accessibility in layout design
- ✅ Document layout component APIs
- ✅ Use context for layout state management
- ✅ Implement proper error boundaries
- ✅ Consider SEO implications of layout structure