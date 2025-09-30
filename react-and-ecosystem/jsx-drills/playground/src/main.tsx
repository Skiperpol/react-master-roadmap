import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/06-lists-and-keys/01-list-of-objects/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
