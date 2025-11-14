import { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import CustomModal from "./CustomModal.tsx"

type ModalSize = "small" | "medium" | "large";
type OverlayStyle = "light" | "dark";

interface ModalOptions {
    title?: string;
    footer?: ReactNode;
    size?: ModalSize;
    overlayStyle?: OverlayStyle;
    context?: ReactNode;
    isOpen?: boolean;
}

interface ModalContextValue {
    showModal: (options?: ModalOptions) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue>({
    showModal: () => {},
    hideModal: () => {}
});

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modal, setModal] = useState<ModalOptions | null>(null);

    const showModal = useCallback((options) => {
        setModal({
            isOpen: true,
            ...options
        });
    }, []);

    const hideModal = useCallback(() => {
        setModal(null);
    }, []);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
        {modal && (
            <CustomModal
            isOpen={modal.isOpen}
            onClose={hideModal}
            title={modal.title}
            footer={modal.footer}
            size={modal.size || "medium"}
            overlayStyle={modal.overlayStyle || "dark"}
            >
                {modal.context}
            </CustomModal>
        )}
        </ModalContext.Provider>
    ); 
}

export default ModalContext;