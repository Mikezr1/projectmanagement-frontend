import AddTaskPage from "../pages/AddTaskPage";
import { useModal } from "./ModalContext";

interface AddTaskModalProps {
    projectId: number,
}

export default function AddProjectModal({ projectId }: AddTaskModalProps) {
    const { showModal, hideModal, modal } = useModal();

    const openModal = () => {
        if (modal?.isOpen) return;
        showModal({
            title: "Add Project",
            context: <AddTaskPage projectId={projectId}/>,
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
        });
    };

    return (
        <button onClick={openModal}
        className="border border-white px-4 py-2 hover:bg-white hover:text-black flex flex-col gap-2 mt-2"
        >Add Task</button>
    );
}