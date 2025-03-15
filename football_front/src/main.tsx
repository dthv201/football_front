import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext'; 

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="11628811755-3h5chkudcija2n54833e2kvrmbp1jvtg.apps.googleusercontent.com">
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
