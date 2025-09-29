import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/02-expressions-and-interpolation/01-list-map/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
