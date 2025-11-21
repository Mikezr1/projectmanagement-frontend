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
        // <div className="flex flex-col gap-2 mt-2">
        <button onClick={openModal}
        className="border border-white px-4 py-2 hover:bg-white hover:text-black flex flex-col gap-2 mt-2"
        >Add Project</button>
        // </div>
    );
}