import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/04-fragments-and-root/03-nesting-and-map/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
