import { createContext, useContext, useState, useCallback} from "react";
import CustomModal from "../CustomModal.tsx"

const ModalContext = createContext();

export function ModalProvider( { children }) {
    const [modal, setModal] = useState(null);

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

export function useModal () {
        return useContext(ModalContext);
}