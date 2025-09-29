import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/03-attributes-and-styles/02-inline-style-object/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
