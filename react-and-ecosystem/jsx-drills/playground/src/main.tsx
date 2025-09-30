import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/08-advanced-jsx/04-jsx-as-argument/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
