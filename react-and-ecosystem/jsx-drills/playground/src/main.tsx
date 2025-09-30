import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/07-jsx-security/03-sanitization-and-trust/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
