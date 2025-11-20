/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-11-12 11:21:22.
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
        >
            <div className="custom-modal-header">
                {title && <h2>{title}</h2>}
                <button onClick={onClose} aria-label='Close'>X</button>
            </div>

            <div className='custom-modal-body'>{children}</div>

            {footer && <div className='custom-modal-footer'>{footer}</div>}
        </Modal>
    );
}