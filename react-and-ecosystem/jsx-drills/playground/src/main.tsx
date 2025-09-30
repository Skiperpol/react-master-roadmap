import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/06-lists-and-keys/03-index-as-key-experiment/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
