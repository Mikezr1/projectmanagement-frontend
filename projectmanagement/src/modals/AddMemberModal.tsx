import AddMemberPage from "../pages/AddMemberPage";
import { useModal } from "./ModalContext";

interface AddMemberModalProps {
    projectId: number,
}

export default function AddMemberModal({ projectId }: AddMemberModalProps) {
    const { showModal, hideModal, modal } = useModal();

    const openModal = () => {
        if (modal?.isOpen) return;
        showModal({
            title: "Add Member(s)",
            context: <AddMemberPage projectId={projectId}/>,
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
        });
    };

    return (
        <button onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >Add Members</button>
    );
}