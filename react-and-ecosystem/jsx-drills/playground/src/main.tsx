import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Content from './exercises/08-advanced-jsx/02-layout-with-children/solution/Content'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Content/>
  </StrictMode>,
)
