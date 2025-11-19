import { Link } from "react-router-dom";

export default function GoToProject({ projectId, task}) { 
    return (
        <div className="flex items-center gap-2">
            <Link to={`/projects/${projectId}`}
            className="hover:underline">
                {task.project.title}
            </Link>

            <span>{'>'}</span>

            <span>{task.title}</span>
        </div>
    )
}