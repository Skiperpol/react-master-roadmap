# What I Learned — List of Objects


## Details — Understanding
- Why React requires `key`.
- Consequences of missing `key`.

## Deep Dive — Mapping objects to elements
- Map arrays to JSX for declarative lists; avoid mutating arrays during render.
- Without `key`, React logs a warning and reconciliation can become inefficient.

```tsx
type User = { id: string; name: string };
const users: User[] = [ { id: '1', name: 'Ada' }, { id: '2', name: 'Linus' } ];

export function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Quick checklist
- Use `map` to render arrays
- Prefer stable, unique IDs for `key`