import { useState } from 'react';
import Modal from 'react-modal';
import "../styles/custommodal.css";

function CustomModal({ 
  buttonText = "Open Modal",
  modalTitle = "Modal",
  children,
  onOpen,
  onClose,
  triggerButton,
  showCloseButton = true,
  size = "medium",
  overlayStyle = "dark",
  className = ""
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

export default CustomModal;