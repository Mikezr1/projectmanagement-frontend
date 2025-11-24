import { useState } from "react";
import { login } from "../stores/authStore.tsx";
import { useNavigate } from "react-router-dom";
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
            <div className="py-2">
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    id="email"
                    className="border-1 border-white rounded"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="pt-2 pb-4">
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    className="border-1 border-white rounded"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="pr-2 mr-2 border-1 text-white p-2 rounded bg-black hover:bg-gray-200 hover:text-black" type="submit">
                Login
            </button>
            <button
                type="button"
                className="pr-2 border-1 text-white p-2 rounded bg-black hover:bg-white hover:text-black"
                onClick={() => {
                    setEmail("")
                    setPassword("")
                }} >
                Reset
            </button>
            <div className="flex py-2">
                <ForgotPasswordModal />
            </div>
            {/* <button className="flex" type="button" onClick={() => {
                hideModal();
                // navigate("/")
            }}
            >Back</button> */}
            {/* <div className="text-left">
            <Link to="/forgot-password">Forgot password?</Link>
            </div> */}
        </form>
    )
}

export default LoginForm;