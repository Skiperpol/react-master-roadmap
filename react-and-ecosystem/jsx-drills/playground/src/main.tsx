import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/07-jsx-security/04-xss-anti-patterns/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
