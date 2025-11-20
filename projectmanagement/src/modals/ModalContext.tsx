import { createContext, useState, useCallback, useContext } from "react";
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
    showModal: (options: ModalOptions) => void;
    hideModal: () => void;
    modal: ModalOptions | null;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ModalOptions | null>(null);

    const showModal = useCallback((options : ModalOptions) => {
        if (modal?.isOpen) return;
        setModal({
            isOpen: true,
            ...options
        });
    }, [modal]);

    const hideModal = useCallback(() => {
        setModal(null);
    }, []);

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modal }}>
            {children}
        {modal && (
            <CustomModal
            isOpen={!!modal.isOpen}
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

export const useModal = (): ModalContextValue => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
};