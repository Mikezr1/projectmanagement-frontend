import { useModal } from "./ModalContext";

export default function LoginModal() {
    const { showModal, hideModal } = useModal();

    const openModal = () => {
        showModal({
            title: "Login Modal",
            context: {loginBody()},
            footer: <button onClick={hideModal}>Close</button>,
            size: "medium",
            overlayStyle: "dark"
    });
};

    const loginBody = () => {
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
    }
}