# What I Learned — XSS Anti-Patterns

## Overview
Cross-Site Scripting (XSS) attacks are one of the most common web security vulnerabilities. This lesson explores common anti-patterns that lead to XSS vulnerabilities in React applications, provides examples of dangerous code patterns, and offers secure alternatives. Understanding these anti-patterns is crucial for building secure web applications.

## Details — Understanding

### Examples of XSS Vectors in UI
XSS attacks can occur through various vectors in web applications:

#### Reflected XSS (Non-Persistent)
- **URL Parameters**: Malicious scripts injected through query strings
- **Form Input**: User input that's immediately reflected back
- **Search Results**: Search terms that are displayed without sanitization
- **Error Messages**: Error messages that include user input

#### Stored XSS (Persistent)
- **User Comments**: Malicious scripts stored in database and displayed to other users
- **Profile Information**: User profiles containing malicious content
- **Forum Posts**: Posts that contain executable scripts
- **File Uploads**: Uploaded files with malicious content

#### DOM-based XSS
- **Client-side Routing**: URL fragments that modify the DOM
- **Local Storage**: Malicious data stored in browser storage
- **Session Storage**: Session data containing executable scripts
- **Hash Parameters**: URL hash values that affect page behavior

### Security Checklist for Working with HTML
- **Input Validation**: Validate all user input on both client and server
- **Output Encoding**: Encode output based on the context (HTML, URL, JavaScript)
- **Content Security Policy**: Implement CSP headers to prevent script execution
- **Sanitization**: Use proven sanitization libraries for HTML content
- **Least Privilege**: Only allow necessary HTML tags and attributes
- **Regular Updates**: Keep all dependencies and libraries updated

## Deep Dive — Common Pitfalls

### 1. Concatenating Untrusted Strings into HTML
```tsx
// ❌ Dangerous - direct string concatenation
function UserProfile({ username }: { username: string }) {
  const html = `<div class="profile">Welcome, ${username}!</div>`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ Safe - let React escape the content
function UserProfile({ username }: { username: string }) {
  return <div className="profile">Welcome, {username}!</div>;
}

// ✅ Safe - sanitize before injection
function UserProfile({ username }: { username: string }) {
  const sanitized = DOMPurify.sanitize(`<div class="profile">Welcome, ${username}!</div>`);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

### 2. Trusting Query Parameters Without Validation
```tsx
// ❌ Dangerous - trusting URL parameters
function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // This is dangerous if query contains malicious content
  return <div dangerouslySetInnerHTML={{ __html: `<h1>Results for: ${query}</h1>` }} />;
}

// ✅ Safe - escape the content
function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  return <h1>Results for: {query}</h1>;
}

// ✅ Safe - validate and sanitize
function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Validate query format
  if (!/^[a-zA-Z0-9\s]+$/.test(query)) {
    return <h1>Invalid search query</h1>;
  }
  
  return <h1>Results for: {query}</h1>;
}
```

### 3. Trusting localStorage Without Validation
```tsx
// ❌ Dangerous - trusting localStorage
function UserSettings() {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('userSettings');
    return stored ? JSON.parse(stored) : {};
  });
  
  // Dangerous if settings contain malicious HTML
  return <div dangerouslySetInnerHTML={{ __html: settings.welcomeMessage }} />;
}

// ✅ Safe - validate localStorage data
function UserSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('userSettings');
      if (!stored) return {};
      
      const parsed = JSON.parse(stored);
      // Validate the structure
      if (typeof parsed.welcomeMessage === 'string') {
        return { welcomeMessage: parsed.welcomeMessage };
      }
      return {};
    } catch {
      return {};
    }
  });
  
  return <div>{settings.welcomeMessage}</div>;
}
```

### 4. Inline Event Handlers from Data
```tsx
// ❌ Dangerous - event handlers from data
function DynamicButton({ onClick }: { onClick: string }) {
  const html = `<button onclick="${onClick}">Click me</button>`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ Safe - use React event handlers
function DynamicButton({ onButtonClick }: { onButtonClick: () => void }) {
  return <button onClick={onButtonClick}>Click me</button>;
}

// ✅ Safe - validate and sanitize event handlers
function DynamicButton({ onClick }: { onClick: string }) {
  // Only allow specific, safe functions
  const allowedFunctions = ['handleSave', 'handleCancel', 'handleSubmit'];
  
  if (!allowedFunctions.includes(onClick)) {
    return <button disabled>Invalid action</button>;
  }
  
  return <button onClick={() => window[onClick]?.()}>Click me</button>;
}
```

### 5. Trusting External APIs Without Validation
```tsx
// ❌ Dangerous - trusting external API responses
function NewsArticle({ articleId }: { articleId: string }) {
  const [article, setArticle] = useState(null);
  
  useEffect(() => {
    fetch(`/api/articles/${articleId}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [articleId]);
  
  // Dangerous if article.content contains malicious HTML
  return article ? <div dangerouslySetInnerHTML={{ __html: article.content }} /> : null;
}

// ✅ Safe - sanitize API responses
function NewsArticle({ articleId }: { articleId: string }) {
  const [article, setArticle] = useState(null);
  
  useEffect(() => {
    fetch(`/api/articles/${articleId}`)
      .then(res => res.json())
      .then(data => {
        // Sanitize the content
        const sanitizedContent = DOMPurify.sanitize(data.content, {
          ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3'],
          ALLOWED_ATTR: []
        });
        setArticle({ ...data, content: sanitizedContent });
      });
  }, [articleId]);
  
  return article ? <div dangerouslySetInnerHTML={{ __html: article.content }} /> : null;
}
```

## Quick Checklist
- ✅ Escape by default; avoid HTML injection
- ✅ Sanitize or avoid `dangerouslySetInnerHTML`
- ✅ Validate and encode external inputs
- ✅ Never use `eval()` or `Function()` constructor
- ✅ Validate URLs before using them
- ✅ Sanitize CSS before injection
- ✅ Validate JSON structure before parsing
- ✅ Implement Content Security Policy
- ✅ Test with malicious input regularly
- ✅ Keep dependencies updated
- ✅ Use TypeScript for type safety
- ✅ Implement input validation on both client and server
- ✅ Use proven sanitization libraries
- ✅ Review code for XSS vulnerabilities
- ✅ Educate team about XSS risks
- ✅ Monitor for new attack vectors