import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/01-jsx-basics/01-h1-element/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
