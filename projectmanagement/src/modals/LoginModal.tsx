import useModal from "./ModalContext";
import { useState, type FormEvent } from "react";

export default function LoginModal() {
    const { showModal, hideModal } = useModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginBody = () => {
        function handleSubmit(event: FormEvent<HTMLFormElement>): void {
            event.preventDefault();
            // TODO: Implement login logic
        }

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    className=""
                    placeholder="enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input type="password"
                    className=""
                    placeholder="enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        );
    };

    const openModal = () => {
        showModal({
            title: "Login Modal",
            context: loginBody(),
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
        });
    };

    return <button onClick={openModal}>Open Login</button>;
}