import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className="py-10 bg-black px-6">
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col align-left py-2 gap-4">
                    <h3 className="text-bold text-2xl text-white">Start managing your projects</h3>
                    <p className="text-sm text-white" >This application will help you manage your projects better then ever before.</p>
                    <button className="text-white border-radius 10px" type="button" onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
                <div>
                    <div className="bg-[#636363] aspect-video">
                        <img src="null" alt="Image of finished product" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;