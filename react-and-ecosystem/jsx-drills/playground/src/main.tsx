import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/08-advanced-jsx/01-card-children/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App title={"Title"}>Testing</App>
  </StrictMode>,
)
