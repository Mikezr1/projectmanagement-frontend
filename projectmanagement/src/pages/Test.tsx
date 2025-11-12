import { useModal } from "../components/navigation/ModalContext";

export default function Test() {
    const { showModal, hideModal } = useModal();

    const openTestModal = () => {
        showModal({
            title: "Test Modal",
            context: <div>This is a test modal content.</div>,
            footer: <button onClick={hideModal}>Close</button>,
            size: "small",
            overlayStyle: "light"
        });
    };

    return <button onClick={openTestModal}>open</button>
}