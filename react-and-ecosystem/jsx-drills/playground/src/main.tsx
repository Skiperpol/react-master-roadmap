import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/05-functions-and-logic/03-formatDate-helper/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App date={new Date("2025-09-30T00:00:00")} />
  </StrictMode>,
)
