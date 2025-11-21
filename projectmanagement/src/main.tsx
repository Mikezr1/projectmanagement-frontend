import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './modals/ModalContext.tsx'
import Modal from "react-modal";
import { BrowserRouter } from 'react-router-dom'


Modal.setAppElement('#root')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>
)
