import DeleteMemberPage from "../pages/DeleteMemberPage";
import { useModal } from "./ModalContext";

interface DeleteMemberModalProps {
    projectId: number,
}

export default function DeleteMemberModal({ projectId }: DeleteMemberModalProps) {
    const { showModal, hideModal, modal } = useModal();

    const openModal = () => {
        if (modal?.isOpen) return;
        showModal({
            title: "Delete Member(s)",
            context: <DeleteMemberPage projectId={projectId}/>,
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
        });
    };

    return (
        <button onClick={openModal}
        className="border border-white px-4 my-2 py-2 hover:bg-white hover:text-black"
        >Delete Members</button>
    );
}