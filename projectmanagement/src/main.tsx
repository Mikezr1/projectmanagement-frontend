import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './modals/ModalContext.tsx'
import Modal from "react-modal";
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

Modal.setAppElement('#root')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <App />
      </ModalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
