import { useQuery } from "@tanstack/react-query"
import type { ProjectSummaryDTO } from "../types/models"
import projectService from "../services/projectService"
import { useNavigate } from "react-router-dom"
import { logout, useAuthStore } from "../stores/authStore"

const ProjectListPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    
    const { data: projects, isLoading, isError, error } = useQuery<ProjectSummaryDTO[], Error>({
        queryKey: ['projects', user?.id],
        queryFn: () =>  projectService.getProjectsByUserId(user!.id),
        enabled: !!user.id
    });

    if (isLoading) return <div>Loading projects</div>

    if (isError) return <div>Error: { error?.message }</div>

    return (
        <div>
            <div>
                {/* Navbar */}
                <h1></h1>
            </div>
            <div>
                {/* Sidebar */}
                <h1></h1>
            </div>
            <div>
                {projects?.map(project => (
                    <div key={project.id}>
                        <b><h2>{project.title}</h2></b>
                        <ul>
                            {project.tasks?.map(task => (
                                <li key={task.id}>{task.title}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div>
                <button type="button" onClick={() => { logout() }}>Logout</button>
            </div>
        </div>
    )
}

export default ProjectListPage;