import { useState } from "react";
import { login } from "../stores/authStore.tsx";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { useModal } from "../modals/ModalContext.tsx";
import ForgotPasswordModal from "../modals/ForgotPasswordModal.tsx";

const LoginForm = () => {
    const [email, setEmail] = useState("alice@example.com");
    const [password, setPassword] = useState("password123");
    const navigate = useNavigate();
    const { hideModal } = useModal();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user = await userService.loginUser(email.trim().toLowerCase(), password.trim());
            
            login(user);
            alert("Welcome " + user.firstName + "!");
            navigate("/projects");
        } catch (error) {
            alert("Invalid email or password!");
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="email">Email: </label>
                <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            <button
            type="button"
            onClick={() => {
                setEmail("")
                setPassword("")
            }} >
            Reset
            </button>
            <button type="button" onClick={() => {
                hideModal();
                navigate("/")
            }}
            >Back</button>
            <ForgotPasswordModal />
            {/* <div className="text-left">
            <Link to="/forgot-password">Forgot password?</Link>
            </div> */}
        </form>
    )
}

export default LoginForm;