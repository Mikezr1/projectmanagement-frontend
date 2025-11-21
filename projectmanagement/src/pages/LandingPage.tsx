import LoginModal from "../modals/LoginModal";

const LandingPage = () => {

    return (
        <div className="min-h-screen bg-gray-700 flex items-center justify-center">
        <div className="py-10 bg-black rounded flex align-center m-6">
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col align-left pl-8 gap-4">
                    <h3 className="text-bold text-2xl text-white">Start managing your projects</h3>
                    <p className="text-sm text-white">
                        This application will help you manage your projects better then ever before.
                    </p>
                    <LoginModal />
                </div>
                <div>
                    <div className="aspect-video flex justify-center items-center pr-8">
                        <img
                            src="src/assets/landingpage-image.png"
                            alt="Image of finished product"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>


    )
}

export default LandingPage;