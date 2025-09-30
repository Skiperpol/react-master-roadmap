# What I Learned — `dangerouslySetInnerHTML`

## Overview
`dangerouslySetInnerHTML` is React's escape hatch for injecting raw HTML into the DOM. Despite its ominous name, it's a legitimate tool when used correctly, but it completely bypasses React's built-in XSS protection. This lesson explores when and how to use it safely, along with the critical security considerations.

## Details — Understanding

### XSS Risks and Attack Vectors
- **Complete Bypass**: `dangerouslySetInnerHTML` completely bypasses React's automatic escaping
- **Script Execution**: Malicious JavaScript can execute if injected HTML contains `<script>` tags
- **Event Handler Injection**: `onclick`, `onload`, and other event handlers can be injected
- **CSS Injection**: Malicious CSS can be injected through `<style>` tags or `style` attributes
- **Data Exfiltration**: Injected scripts can steal cookies, tokens, and other sensitive data

### When This Tool Makes Sense
- **Rich Text Editors**: Rendering content from WYSIWYG editors like TinyMCE or CKEditor
- **Markdown Rendering**: Converting Markdown to HTML for display
- **Email Templates**: Rendering HTML email content
- **Documentation**: Displaying formatted documentation or help content
- **Third-party Widgets**: Embedding trusted third-party content
- **Legacy Content**: Migrating existing HTML content to React

### Using Trusted Content Sources
- **Server-side Sanitization**: Content sanitized on the server before reaching the client
- **Whitelisted Content**: Content from known, trusted sources with strict validation
- **Static Content**: Pre-written, reviewed HTML content that never changes
- **CMS Content**: Content from a Content Management System with proper access controls

## Deep Dive — Use with Extreme Caution

### How `dangerouslySetInnerHTML` Works
```tsx
// Basic usage - bypasses React's escaping
<div dangerouslySetInnerHTML={{ __html: safeHtml }} />

// The __html property is required - this is intentional
// React requires this explicit naming to make the danger obvious
```

### Security Implications
- **No Automatic Escaping**: HTML is rendered exactly as provided
- **Script Execution**: Any JavaScript in the HTML will execute
- **Event Handler Execution**: Event handlers will be attached and functional
- **CSS Injection**: Styles can be injected and affect the page
- **DOM Manipulation**: Injected scripts can modify the DOM and React state

### Attack Examples
```tsx
// ❌ Extremely dangerous - XSS attack
const maliciousHtml = '<script>alert("XSS Attack!")</script>';
return <div dangerouslySetInnerHTML={{ __html: maliciousHtml }} />;

// ❌ Still dangerous - event handler injection
const maliciousHtml = '<img src="x" onerror="alert(\'XSS\')" />';
return <div dangerouslySetInnerHTML={{ __html: maliciousHtml }} />;

// ❌ CSS injection attack
const maliciousHtml = '<style>body { background: url("javascript:alert(\'XSS\')") }</style>';
return <div dangerouslySetInnerHTML={{ __html: maliciousHtml }} />;
```

## Advanced Security Considerations

### Content Security Policy (CSP)
```tsx
// CSP can help mitigate some risks
// Add to HTML head:
// <meta http-equiv="Content-Security-Policy" content="script-src 'self'; style-src 'self' 'unsafe-inline';">
```

### Sanitization Libraries
```tsx
import DOMPurify from 'dompurify';

// Sanitize HTML before injection
const sanitizedHtml = DOMPurify.sanitize(userHtml, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
  ALLOWED_ATTR: ['class']
});

return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
```

### Server-side Sanitization
```tsx
// Content should be sanitized on the server before reaching the client
const serverSanitizedContent = await fetch('/api/sanitized-content');
const { html } = await serverSanitizedContent.json();

// Still validate on client side as defense in depth
const clientSanitized = DOMPurify.sanitize(html);
return <div dangerouslySetInnerHTML={{ __html: clientSanitized }} />;
```

## Best Practices

### Before Using `dangerouslySetInnerHTML`
1. **Ask if it's necessary**: Can you achieve the same result with regular JSX?
2. **Verify the source**: Is the content from a trusted, controlled source?
3. **Sanitize the content**: Use a proven sanitization library
4. **Review the content**: Manually review any content that will be injected
5. **Test with malicious input**: Verify your sanitization works

### Safe Usage Patterns
```tsx
// ✅ Safe - using a sanitization library
import DOMPurify from 'dompurify';

function SafeHtmlRenderer({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

// ✅ Safe - trusted static content
const trustedHtml = '<p>This is <strong>trusted</strong> content.</p>';
return <div dangerouslySetInnerHTML={{ __html: trustedHtml }} />;
```

### Alternative Approaches
```tsx
// ✅ Better - use JSX instead of HTML strings
function RichText({ content }: { content: string }) {
  // Parse and convert to JSX instead of injecting HTML
  const jsxContent = parseMarkdownToJSX(content);
  return <div>{jsxContent}</div>;
}

// ✅ Better - use a dedicated rich text component
import { RichText } from '@atlaskit/rich-text';
return <RichText text={content} />;
```

## Common Mistakes and Anti-patterns

### Direct User Input
```tsx
// ❌ Never do this - direct user input
const userComment = getUserComment();
return <div dangerouslySetInnerHTML={{ __html: userComment }} />;
```

### Unsanitized Third-party Content
```tsx
// ❌ Dangerous - third-party content without sanitization
const thirdPartyHtml = await fetchThirdPartyContent();
return <div dangerouslySetInnerHTML={{ __html: thirdPartyHtml }} />;
```

### Mixing Escaped and Unescaped Content
```tsx
// ❌ Confusing and potentially dangerous
return (
  <div>
    <p>{escapedContent}</p>
    <div dangerouslySetInnerHTML={{ __html: unescapedContent }} />
  </div>
);
```

## Testing and Validation

### Security Testing
```tsx
// Test with malicious input
const testCases = [
  '<script>alert("XSS")</script>',
  '<img src="x" onerror="alert(\'XSS\')" />',
  '<iframe src="javascript:alert(\'XSS\')"></iframe>',
  '<style>body { background: url("javascript:alert(\'XSS\')") }</style>'
];

testCases.forEach(maliciousHtml => {
  // Verify sanitization removes dangerous content
  const sanitized = DOMPurify.sanitize(maliciousHtml);
  expect(sanitized).not.toContain('<script>');
  expect(sanitized).not.toContain('onerror');
});
```

### Content Validation
```tsx
// Validate content structure before rendering
function validateHtmlContent(html: string): boolean {
  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script/i,
    /on\w+\s*=/i,
    /javascript:/i,
    /<iframe/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(html));
}
```

## Quick Checklist
- ✅ Avoid unless you must render preformatted HTML
- ✅ Sanitize or whitelist content before injecting
- ✅ Use a proven sanitization library like DOMPurify
- ✅ Validate content source and trustworthiness
- ✅ Test with malicious input to verify protection
- ✅ Consider alternative approaches using JSX
- ✅ Document why `dangerouslySetInnerHTML` is necessary
- ✅ Review and audit any code using this feature
- ✅ Implement Content Security Policy (CSP)
- ✅ Use TypeScript for type safety
- ✅ Never use with direct user input
- ✅ Keep sanitization libraries updated