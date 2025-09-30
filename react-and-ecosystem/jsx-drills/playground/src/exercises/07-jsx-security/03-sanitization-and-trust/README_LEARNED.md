# What I Learned — Sanitization and Trust

## Overview
Sanitization is the process of cleaning and validating HTML content to remove potentially dangerous elements while preserving safe formatting. This lesson explores the threat model of web applications, the principle of least trust, and practical strategies for sanitizing untrusted content before rendering it in React applications.

## Details — Understanding

### Threat Model: Where Does Content Come From?
Understanding the source of content is crucial for determining the appropriate level of sanitization:

#### High-Risk Sources (Require Aggressive Sanitization)
- **User Input**: Comments, posts, messages, profile descriptions
- **File Uploads**: Images, documents, any user-uploaded content
- **URL Parameters**: Query strings, path parameters, hash fragments
- **Local Storage**: Browser storage that can be manipulated
- **Third-party APIs**: External services that may not be fully trusted
- **Social Media Feeds**: Content from social platforms
- **Email Content**: HTML emails from various sources

#### Medium-Risk Sources (Require Moderate Sanitization)
- **CMS Content**: Content from Content Management Systems
- **Database Content**: Stored content that may have been compromised
- **Configuration Files**: Settings that might be modified
- **Log Files**: System logs that could contain malicious content

#### Low-Risk Sources (Minimal Sanitization)
- **Static Content**: Pre-written, reviewed content
- **Server-generated Content**: Content created by your own application
- **Trusted Partners**: Content from verified, trusted sources

### Principle of Least Trust
The principle of least trust means:
- **Never Trust User Input**: Always assume user input is malicious until proven otherwise
- **Validate Everything**: Check data structure, format, and content
- **Sanitize by Default**: Clean content even from seemingly trusted sources
- **Defense in Depth**: Use multiple layers of protection
- **Fail Securely**: When in doubt, reject or heavily sanitize content

## Deep Dive — Sanitizing Untrusted HTML

### What is HTML Sanitization?
HTML sanitization is the process of:
- **Removing Dangerous Elements**: Stripping out `<script>`, `<iframe>`, `<object>` tags
- **Filtering Attributes**: Removing event handlers, JavaScript URLs, and dangerous attributes
- **Whitelisting Safe Content**: Allowing only approved tags and attributes
- **Encoding Special Characters**: Converting dangerous characters to safe representations

### Sanitization Libraries

#### DOMPurify (Recommended)
```tsx
import DOMPurify from 'dompurify';

// Basic sanitization
const cleanHtml = DOMPurify.sanitize(dirtyHtml);

// Advanced configuration
const cleanHtml = DOMPurify.sanitize(dirtyHtml, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['class', 'id'],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  FORBID_TAGS: ['script', 'object', 'embed', 'iframe'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
});
```

#### Sanitize-HTML
```tsx
import sanitizeHtml from 'sanitize-html';

const cleanHtml = sanitizeHtml(dirtyHtml, {
  allowedTags: ['p', 'br', 'strong', 'em'],
  allowedAttributes: {
    'p': ['class'],
    'strong': ['class']
  },
  disallowedTagsMode: 'discard'
});
```

#### XSS (Alternative)
```tsx
import xss from 'xss';

const cleanHtml = xss(dirtyHtml, {
  whiteList: {
    p: [],
    br: [],
    strong: [],
    em: []
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script']
});
```

### Server-side Sanitization
```tsx
// Server-side sanitization (Node.js example)
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Sanitize on server before sending to client
app.post('/api/content', (req, res) => {
  const { html } = req.body;
  const sanitized = purify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  });
  
  res.json({ sanitizedHtml: sanitized });
});
```

### Whitelist vs Blacklist Approach

#### Whitelist Approach (Recommended)
```tsx
// ✅ Good - whitelist approach
const allowedTags = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'];
const allowedAttributes = ['class'];

const sanitized = DOMPurify.sanitize(html, {
  ALLOWED_TAGS: allowedTags,
  ALLOWED_ATTR: allowedAttributes
});
```

#### Blacklist Approach (Not Recommended)
```tsx
// ❌ Avoid - blacklist approach (can miss new attack vectors)
const forbiddenTags = ['script', 'iframe', 'object', 'embed'];
// This approach is fragile and can miss new attack methods
```

## Advanced Sanitization Strategies

### Content-Specific Sanitization
```tsx
// Different sanitization rules for different content types
function sanitizeContent(content: string, type: 'comment' | 'article' | 'message') {
  const configs = {
    comment: {
      ALLOWED_TAGS: ['p', 'br'],
      ALLOWED_ATTR: []
    },
    article: {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['class']
    },
    message: {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
      ALLOWED_ATTR: []
    }
  };
  
  return DOMPurify.sanitize(content, configs[type]);
}
```

### Custom Sanitization Functions
```tsx
// Custom sanitization for specific use cases
function sanitizeMarkdown(html: string): string {
  // First sanitize with DOMPurify
  let sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  });
  
  // Additional custom cleaning
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  
  return sanitized;
}
```

### Sanitization with Validation
```tsx
// Combine sanitization with validation
function validateAndSanitize(content: string): { isValid: boolean; sanitized: string } {
  // First validate structure
  if (!content || typeof content !== 'string') {
    return { isValid: false, sanitized: '' };
  }
  
  // Check for obvious malicious patterns
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  if (maliciousPatterns.some(pattern => pattern.test(content))) {
    return { isValid: false, sanitized: '' };
  }
  
  // Sanitize the content
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  });
  
  return { isValid: true, sanitized };
}
```

## Implementation Patterns

### React Component with Sanitization
```tsx
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  allowedTags?: string[];
  allowedAttributes?: string[];
}

function SafeHtml({ html, allowedTags = [], allowedAttributes = [] }: SafeHtmlProps) {
  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allowedAttributes
    });
  }, [html, allowedTags, allowedAttributes]);
  
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}

// Usage
function Comment({ content }: { content: string }) {
  return (
    <SafeHtml 
      html={content} 
      allowedTags={['p', 'br']} 
      allowedAttributes={[]} 
    />
  );
}
```

### Sanitization Hook
```tsx
import { useMemo } from 'react';
import DOMPurify from 'dompurify';

function useSanitizedHtml(html: string, options?: DOMPurify.Config) {
  return useMemo(() => {
    return DOMPurify.sanitize(html, options);
  }, [html, options]);
}

// Usage in component
function UserContent({ content }: { content: string }) {
  const sanitized = useSanitizedHtml(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

## Testing Sanitization

### Unit Tests for Sanitization
```tsx
import DOMPurify from 'dompurify';

describe('HTML Sanitization', () => {
  const sanitize = (html: string) => DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  });
  
  test('removes script tags', () => {
    const malicious = '<p>Hello</p><script>alert("XSS")</script>';
    const sanitized = sanitize(malicious);
    expect(sanitized).toBe('<p>Hello</p>');
  });
  
  test('removes event handlers', () => {
    const malicious = '<p onclick="alert(\'XSS\')">Hello</p>';
    const sanitized = sanitize(malicious);
    expect(sanitized).toBe('<p>Hello</p>');
  });
  
  test('preserves allowed tags', () => {
    const content = '<p>Hello <strong>World</strong></p>';
    const sanitized = sanitize(content);
    expect(sanitized).toBe('<p>Hello <strong>World</strong></p>');
  });
});
```

### Integration Tests
```tsx
// Test with real malicious payloads
const testCases = [
  '<script>alert("XSS")</script>',
  '<img src="x" onerror="alert(\'XSS\')" />',
  '<iframe src="javascript:alert(\'XSS\')"></iframe>',
  '<style>body { background: url("javascript:alert(\'XSS\')") }</style>',
  '<a href="javascript:alert(\'XSS\')">Click me</a>'
];

testCases.forEach(maliciousHtml => {
  test(`sanitizes ${maliciousHtml}`, () => {
    const sanitized = DOMPurify.sanitize(maliciousHtml);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('javascript:');
    expect(sanitized).not.toContain('onerror');
  });
});
```

## Performance Considerations

### Sanitization Performance
```tsx
// Sanitization can be expensive for large content
// Consider caching or memoization
const sanitizedCache = new Map<string, string>();

function getSanitizedHtml(html: string): string {
  if (sanitizedCache.has(html)) {
    return sanitizedCache.get(html)!;
  }
  
  const sanitized = DOMPurify.sanitize(html);
  sanitizedCache.set(html, sanitized);
  return sanitized;
}

// Or use React's useMemo for component-level caching
function ExpensiveSanitization({ html }: { html: string }) {
  const sanitized = useMemo(() => {
    return DOMPurify.sanitize(html, complexConfig);
  }, [html]);
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

## Quick Checklist
- ✅ Treat external/user data as untrusted
- ✅ Sanitize before injecting; prefer plain text when possible
- ✅ Use a proven sanitization library like DOMPurify
- ✅ Implement whitelist approach, not blacklist
- ✅ Sanitize on both server and client side
- ✅ Test sanitization with malicious input
- ✅ Cache sanitized content when appropriate
- ✅ Document sanitization rules and policies
- ✅ Review and update sanitization rules regularly
- ✅ Use TypeScript for type safety
- ✅ Implement defense in depth
- ✅ Fail securely when sanitization fails
- ✅ Monitor for new attack vectors
- ✅ Keep sanitization libraries updated