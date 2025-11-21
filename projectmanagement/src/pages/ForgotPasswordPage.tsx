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
                className="border-1 border-white rounded p-2"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <input
                type="password"
                className="border-1 border-white rounded p-2"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value) }}
            />
            <input
                type="password"
                placeholder="Confirm password"
                className="border-1 border-white rounded p-2"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
            />
            <div className="pt-2">
                <button className="pr-2 mr-2 border-1 text-white p-2 rounded bg-black hover:bg-gray-200 hover:text-black" type="submit">Continue</button>
                <button className="pr-2 mr-2 border-1 text-white p-2 rounded bg-black hover:bg-gray-200 hover:text-black" type="submit" type="button" onClick={() => { navigate("/login") }}>Back</button>
            </div>
        </form>
    )
}

export default ForgotPasswordPage