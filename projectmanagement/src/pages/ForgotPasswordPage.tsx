import { useState } from "react"
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await userService.resetPassword(email, newPassword, confirmPassword);
            alert("Password updated!");
            navigate("/login");
        } catch (error: any) {
            alert(error.response?.data || error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Forgot password?</h2>
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value)}}
            />
            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value)}}
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value)}}
            />
            <button type="submit">Continue</button>
            <button type="button" onClick={() => { navigate("/login") }}>Back</button>
        </form>
    )
}

export default ForgotPasswordPage