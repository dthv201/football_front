import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'


createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="11628811755-3h5chkudcija2n54833e2kvrmbp1jvtg.apps.googleusercontent.com">
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>
)
