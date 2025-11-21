/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-11-12 11:21:22.
import "./CustomModal.css";
import Modal from "react-modal";


interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  overlayStyle?: 'dark' | 'light';
  children: React.ReactNode;
}

export default function CustomModal({
    isOpen,
    onClose,
    title,
    footer,
    size = 'medium',
    overlayStyle = 'dark',
    children
}: CustomModalProps) {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName={`custom-modal-overlay ${overlayStyle}`}
        className={`custom-modal-content ${size}`}
        closeTimeoutMS={0}
        style={{
          content: {
            background: 'black',
            color: 'white',
            borderRadius: '12px',
            padding: '1.25rem'
          },
          overlay: {
            // optioneel: extra overlay inline styles
          }
        }}
        >
            <div className="custom-modal-header flex justify-between items-center border-b pb-2">
        {title && <h2 className="text-xl font-bold">{title}</h2>}
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-xl font-bold hover:text-red-500"
        >
          ×
        </button>
      </div>

            <div className='custom-modal-body mt-4'>{children}</div>

            {footer && <div className="custom-modal-footer mt-4 flex justify-end gap-2">{footer}</div>}
        </Modal>
    );
}