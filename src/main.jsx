import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Router/router';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className="max-w-screen-xl mx-auto">
        <Toaster position="top-right" />
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {' '}
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HelmetProvider>
      </div>
    </AuthProvider>
  </StrictMode>
);
