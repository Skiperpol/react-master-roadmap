import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './exercises/05-functions-and-logic/02-greeting-props/solution/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App name='Dawid'/>
  </StrictMode>,
)
