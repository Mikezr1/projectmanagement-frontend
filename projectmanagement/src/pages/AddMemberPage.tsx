import { useState } from "react"
import projectService from "../services/projectService";
import userService from "../services/userService";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../modals/ModalContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface User {
    id: number,
    firstName: string,
    role: "DEVELOPER" | "CUSTOMER" | "PROJECT_LEADER"
}

interface AddMemberPageProps {
    projectId: number,
}

const AddMemberPage = ({ projectId}: AddMemberPageProps) => {
    const user = useAuthStore((state) => state.user);
    // const { projectId } = useParams<{ projectId: string }>();
    // const projectIdNum = Number(projectId);

    const [selectedDevelopers, setSelectedDevelopers] = useState<number[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

    const { hideModal } = useModal();
    const queryClient = useQueryClient();

    const { data: users, isLoading, isError, error } = useQuery<User[], Error>({
            queryKey: ["users"],
            queryFn: () => userService.getAllUsers(),
            enabled: !!user?.id,
        });
    
    const developers = users?.filter(u => u.role === "DEVELOPER") ?? [];
    const customers = users?.filter(u => u.role === "CUSTOMER") ?? [];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // if (!projectIdNum) {
        //     alert("Project ID is missing!");
        //     return;
        // }

        if (!selectedCustomer) {
            alert("Please select a customer");
            return;
        }

        try {
            await projectService.addMembers(projectId, selectedDevelopers, selectedCustomer);
            queryClient.invalidateQueries({
                // queryKey: ["project", String(projectId)],
                queryKey: ["project", projectId],
            });
            hideModal();
        } catch (error: any) {
            alert(error.response?.data || error.message);
        }
    }

    if (isLoading) return <p>Loading users...</p>;
    
    if (isError) return <p>Error loading users: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* <label htmlFor="developers">Developers: </label> */}
                <select
                    // id="developers"'
                    name="select"
                    className='multiselect'
                    multiple
                    value={selectedDevelopers.map(String)}
                    onChange={(e) => {
                        const options = Array.from(e.target.selectedOptions);
                        setSelectedDevelopers(options.map(opt => Number(opt.value)));
                    }}
                    // className="w-full border p-2 rounded"
                    >
                        {developers.map(dev => (
                            <option key={dev.id} value={dev.id}>{dev.firstName}</option>
                        ))}
                </select>
            </div>
            <div>
                <label htmlFor="customer">Customer: </label>
                <select
                    id="customer"
                    value={selectedCustomer ?? ""}
                    onChange={(e) => setSelectedCustomer(Number(e.target.value)
                    )}>
                        <option value="" disabled>Select a Customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>{c.firstName}</option>
                        ))}
                    </select>
            </div>
            <button type="submit">Add members</button>
        </form>
    )
}

export default AddMemberPage