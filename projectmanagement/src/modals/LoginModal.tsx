import { useModal } from "./ModalContext";

export default function LoginModal() {
    const { showModal, hideModal } = useModal();

    const openModal = () => {
        showModal({
            title: "Login Modal",
            context: {loginBody()},
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
    });
};

    const loginBody = () => {
        
    }
}