import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { CommentCreateDTO } from "../types/models";
import API_URL from "../services/commentService";
import useStore from "../components/useStore";

interface CommentCreate {
    setComment: (id: number) => void;
    // userId: number;
    projectId: number;
}

const CommentCreate = ({ setComment, projectId }: CommentCreate) => {

    const user = useStore();
    const [comment, setState] = useState({ content: '', description: '', taskId: 0, userId: user.id })
    const queryClient = useQueryClient();

    const createComment = useMutation({
        mutationFn: async (comment: CommentCreateDTO) => {
            const response = await fetch(`${API_URL}/comments/${projectId}/${user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            })
            if (!response.ok) throw new Error('failed to create comment');
            return response.json();
        },
        onSuccess: () => {
            setState({ content: '', description: '', taskId: 0, userId: user.id });
            queryClient.invalidateQueries({ queryKey: ['topic', projectId] });
            console.log("succes")
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        createComment.mutate(comment);
        console.log("Submitted " + comment.content);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState({ ...comment, [name]: value });
    }

    return (
        <>
            <h3>plaats een comment</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="content">Inhoud:</label>
                    <input type="text" id="content" name="content" value={comment.content} onChange={handleChange} />
                </div>
                <button type="submit" disabled={createComment.isPending}>plaats comment</button>
                <button onClick={() => setComment(0)}> return</button>
            </form> 
        </>
    )
}

export default CommentCreate;
