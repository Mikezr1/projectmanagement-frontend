import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import { useModal } from "./ModalContext";

export default function ForgotPasswordModal() {
    const { showModal, hideModal, modal } = useModal();

    const openModal = () => {
        if (modal?.isOpen) hideModal();;
        const forgotPasswordBody = <ForgotPasswordPage />
        showModal({
            title: "Forgot Password?",
            context: forgotPasswordBody,
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark",
            replaceExisting: true
        });
    };

    return (
        <span
      onClick={openModal}
      className="text-blue-600 hover:underline cursor-pointer"
    >
      Forgot password?
    </span>
    );
}