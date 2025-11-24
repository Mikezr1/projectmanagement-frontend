import LoginModal from "../modals/LoginModal";
import { useModal } from "../modals/ModalContext";
import SignUpModal from "../modals/SignUpModal";

const LandingPage = () => {
    const { showModal } = useModal();

    return (
        <div className="min-h-screen flex flex-col bg-black">
            {/* Navbar */}
             <div className="bg-blue-950 p-4">
                <div className="bg-black rounded p-4 flex items-center justify-between py-5">
                    <div className="flex items-center gap-8">
                        <h1 className="text-white text-xl font-bold">Projectmanager Pro</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() =>
                        showModal({
                        context: <SignUpModal isOpen={true} onClose={() => {}} />,
                        })}>Sign Up
                        </button>
                    </div>
                </div>
            </div>
        <div className="py-10 bg-black rounded flex items-center">
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