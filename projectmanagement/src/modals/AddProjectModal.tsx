import AddProjectPage from "../pages/AddProjectPage";
import { useModal } from "./ModalContext";

export default function AddProjectModal() {
    const { showModal, hideModal, modal } = useModal();

    const openModal = () => {
        if (modal?.isOpen) return;
        const addProjectBody = <AddProjectPage />
        showModal({
            title: "Add Project",
            context: addProjectBody,
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
        });
    };

    return (
        <button onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >Add Project</button>
    );
}