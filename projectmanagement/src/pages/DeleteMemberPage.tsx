import { useState } from "react";
import projectService from "../services/projectService";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../modals/ModalContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface DeleteMemberPageProps {
    projectId: number;
}

const DeleteMemberPage = ({ projectId }: DeleteMemberPageProps) => {
    const user = useAuthStore((state) => state.user);
    const { hideModal } = useModal();
    const queryClient = useQueryClient();

    // State: lijst met geselecteerde member-ID's
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    // Query: fetch project data inclusief members
    const { data: project, isLoading, isError, error } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => projectService.getProject(projectId),
        enabled: !!user?.id,
    });

    const members = project?.users ?? [];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedMembers.length === 0) {
            alert("Select at least one member to delete.");
            return;
        }

        try {
            await projectService.deleteMembers(projectId, selectedMembers);

            queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });

            hideModal();
        } catch (err: any) {
            alert(err.response?.data || err.message);
        }
    };

    if (isLoading) return <p>Loading members...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="members">Project Members:</label>
                <select
                    id="members"
                    multiple
                    className="multiselect"
                    value={selectedMembers.map(String)}
                    onChange={(e) => {
                        const options = Array.from(e.target.selectedOptions);
                        setSelectedMembers(options.map(o => Number(o.value)));
                    }}
                >
                    {members.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.firstName} ({m.role})
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="px-2 mt-4 border-1 text-white p-2 rounded bg-black hover:bg-white hover:text-black"
            >
                Delete selected members
            </button>
        </form>
    );
};

export default DeleteMemberPage;
