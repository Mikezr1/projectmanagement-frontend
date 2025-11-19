import { useState } from 'react';
import Modal from 'react-modal';
import CustomModal from './CustomModal';

function LightModal({ 
  buttonText = "Light Modal",
  modalTitle = "Light Modal",
  children,
  onOpen,
  onClose,
  triggerButton,
  showCloseButton = true,
  size = "small", // small, medium, large, full
  overlayStyle = "light", // dark, light
  className = "LightModal" // Additional custom class
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true);
    if (onOpen) onOpen();
  }
  
  function closeModal() {
    setIsOpen(false);
    if (onClose) onClose();
  }
  
  return (
    <div>
      {triggerButton ? (
        <div onClick={openModal}>{triggerButton}</div>
      ) : (
        <button onClick={openModal}>{buttonText}</button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={modalTitle}
        overlayClassName={`custom-modal-overlay ${overlayStyle}`}
        className={`custom-modal-content ${size} ${className}`}
        closeTimeoutMS={200}
      >
        <div className="custom-modal-header">
          <h2>{modalTitle}</h2>
          {showCloseButton && (
            <button 
              onClick={closeModal} 
              className="custom-modal-close-button"
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="custom-modal-body">
          {children}
        </div>
      </Modal>
    </div>
  );
}

function App() {
  return (
    <>
      <LightModal 
        buttonText="Large Modal"
        modalTitle="Confirm"
        size="large"
      >
        <p>Are you sure you want to proceed?</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button>Cancel</button>
          <button style={{ backgroundColor: '#0c1116ff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>
            Confirm
          </button>
        </div>
      </LightModal>

      <br /><br />
    </>
  );
}

export default App;
