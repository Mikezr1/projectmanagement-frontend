import { Link } from "react-router-dom";

export default function GoToProject({ projectId, task}) { 
    return (
        <div className="text-sm mb-4 text-gray flex items-center gap-2">
            <Link className="text-white" to="/projects">Projects</Link>
                        <span>{">"}</span>
            <Link to={`/projects/${projectId}`}
            className="hover:underline text-white">
                {task.project.title}
            </Link>

            <span>{'>'}</span>

            <span>{task.title}</span>
        </div>
    )
}