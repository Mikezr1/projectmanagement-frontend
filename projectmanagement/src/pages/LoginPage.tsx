import { useEffect, useState } from 'react';
import { useAuthStore } from '../components/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState("alice@example.com");
    const [password, setPassword] = useState("password123");
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
                await login(email,password);
                console.log("Login succesful");
                navigate("/projects");
            } catch (err) {
                console.error("Login failed, " + err);
            }
        };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        //signup thingy here
    }
    
    return (
        <div>
            <div>
                <div className="" > //here can be a background image
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
                    <h1><a href="/resetpassword">Forgot Password?</a></h1>
                </div>
                // under here add collapsable sign up?
        
                <div>
                    //vales need to be changed
                    <h1>Sign up</h1>
                    <form onSubmit={handleSignupSubmit}>
                    <input type="text"
                        className=""
                        placeholder="enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                    //values need to be changes
                    <input type="password"
                        className=""
                        placeholder="enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        
                    <button type="submit">Sign up</button>
                    </form>

                </div>
            </div>
        </div>
    )
}