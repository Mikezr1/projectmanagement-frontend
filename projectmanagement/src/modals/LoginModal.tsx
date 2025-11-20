import LoginForm from "../pages/LoginPage_Odemian";
import { useModal } from "./ModalContext";

export default function LoginModal() {
    const { showModal, hideModal, modal } = useModal();

    const openModal = () => {
        if (modal?.isOpen) return;
        const loginBody = <LoginForm />
        showModal({
            title: "Login",
            context: loginBody,
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
        });
    };

    return (
        <button onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >Login</button>
    );
}