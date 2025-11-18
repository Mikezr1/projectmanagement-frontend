import { useQuery } from "@tanstack/react-query"
import type { ProjectSummaryDTO } from "../types/models"
import projectService from "../services/projectService"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../components/useAuthStore"

const ProjectListPage = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    
    const { data: projects, isLoading, isError, error } = useQuery<ProjectSummaryDTO[], Error>({
        queryKey: ['projects', user?.id],
        queryFn: projectService.getAllProjects,
    })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error: { error?.message }</div>

    return (
        <div>
            <div>
                {/* Navbar */}
                <h1>b</h1>
            </div>
            <div>
                {/* Sidebar */}
                <h1>a</h1>
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
                <button type="button" onClick={() => {}}>Logout</button>
            </div>
        </div>
    )
}

export default ProjectListPage;