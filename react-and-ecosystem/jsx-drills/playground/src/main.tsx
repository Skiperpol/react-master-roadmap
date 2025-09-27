import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/01-jsx-basics/04-expressions-in-braces/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
