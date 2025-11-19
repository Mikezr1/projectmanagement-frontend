import { useState } from "react";
import { login } from "../stores/authStore.tsx";
import type { UserLoginRequestDTO } from "../types/models";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";
import { setAuthToken } from "../authToken.ts";

const LoginForm = () => {
    const [email, setEmail] = useState("alice@example.com");
    const [password, setPassword] = useState("password123");
    const navigate = useNavigate();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { user } = await userService.loginUser(
                email.trim().toLowerCase(),
                password.trim()
            );
            
            login(user);
            // setAuthToken(token);
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
            <button type="button" onClick={() => navigate("/")}>Back</button>
        </form>
    )
}

export default LoginForm;