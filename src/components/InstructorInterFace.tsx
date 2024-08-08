import { BiArrowFromLeft } from "react-icons/bi";

function InstructorInterFace() {
  return (
    <div className="flex justify-center items-center mt-9">
      <div className="flex flex-row w-full max-w-screen-xl h-full bg-zinc-400 mt-9 rounded-lg shadow-lg overflow-hidden p-6">

        {/* Left Section */}
        <div className="flex-1 flex justify-center items-center rounded-lg mr-4">
          <div className="relative w-full h-[250px] sm:w-[450px] md:w-[550px] border-2 border-blue-600 rounded-lg overflow-hidden shadow-lg">
            <img src="/assets/photo1.png" className="w-full h-full object-cover" alt="Become an instructor" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="flex flex-col items-center text-center text-white p-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Become an Instructor</h1>
                <p className="text-sm sm:text-lg md:text-xl mb-4">Instructors from around the world teach millions of students on Academicaces. We provide the tools and skills to teach what you love.</p>
                <button className="bg-orange-500 text-white rounded-lg py-2 px-4 flex items-center hover:bg-orange-600 transition">
                  <a href="/instructor/signIn" className="flex items-center">
                    Start Teaching
                    <BiArrowFromLeft className="ml-2" fontSize={'20px'} />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center items-center bg-white p-6 rounded-lg ml-4">
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">Your Teaching & Earning Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div className="flex items-center">
                <span className="text-lg font-medium">1.</span>
                <p className="ml-2 text-base sm:text-lg md:text-xl">Apply to become instructor</p>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium">2.</span>
                <p className="ml-2 text-base sm:text-lg md:text-xl">Build & edit your profile</p>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium">3.</span>
                <p className="ml-2 text-base sm:text-lg md:text-xl">Create your new course</p>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium">4.</span>
                <p className="ml-2 text-base sm:text-lg md:text-xl">Start teaching & earning</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default InstructorInterFace;
