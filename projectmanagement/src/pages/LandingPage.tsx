import LoginModal from "../modals/LoginModal";

const LandingPage = () => {
  return (
    <div className="py-10 bg-black px-6 min-h-screen">
      <div className="grid grid-cols-2 gap-8">
        {/* Linker kolom */}
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-bold text-2xl text-white">
            Start managing your projects
          </h3>
          <p className="text-sm text-white">
            This application will help you manage your projects better than ever before.
          </p>

          {/* Login knop via LoginModal */}
          <LoginModal />
        </div>

        {/* Rechter kolom */}
        <div className="flex justify-center items-center">
          <div className="bg-[#636363] aspect-video w-full max-w-md flex justify-center items-center">
            <img src="null" alt="Image of finished product" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
