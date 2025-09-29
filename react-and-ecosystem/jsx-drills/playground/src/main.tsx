import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/02-expressions-and-interpolation/02-render-object/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
