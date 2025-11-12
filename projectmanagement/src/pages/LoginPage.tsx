



export default function LoginPage() {
    //needs userStates for email and password
    //also needs the actual login logic
    const handleSubmit = (e) => {
        e.preventDefault();
        //loging thingy here
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