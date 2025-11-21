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
        className="border border-white px-4 py-2 hover:bg-white hover:text-black"
        >Add Members</button>
    );
}