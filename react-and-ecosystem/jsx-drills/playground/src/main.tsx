import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/08-advanced-jsx/03-array-of-components/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
