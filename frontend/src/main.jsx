import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/router/Router'
import { AuthProvider } from './context/AuthContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
