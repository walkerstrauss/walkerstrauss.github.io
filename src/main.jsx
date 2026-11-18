import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// A prerendered copy of the page may be in #root for crawlers; the app replaces it.
const root = document.getElementById('root')
root.removeAttribute('data-prerendered')
root.replaceChildren()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
