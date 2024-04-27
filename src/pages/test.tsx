import { BiArrowFromLeft } from "react-icons/bi";

function Test() {
  return (
    <div className="flex justify-center items-center mt-9">
      <div className="flex flex-row w-full max-w-screen-xl h-full bg-zinc-800 mt-9">

        <div className="flex-1 flex flex-row justify-center items-center bg-[#D0D7E1] w-full h-full">
          <div className="bg-red-400 w-full sm:w-[450px] md:w-[550px] h-[250px] mx-2 my-4 border-2 border-blue-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col mx-5">
                <h1 className="text-lg sm:text-2xl md:text-3xl text-white font-bold">Become an instructor</h1>
                <p className="text-xs sm:text-md md:text-lg text-white">Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.</p>
                <button className="h-[40px] sm:h-[45px] w-[120px] sm:w-[150px] text-red-700 rounded-lg py-1 px-3 text-sm sm:text-sm md:text-base m-3 bg-orange-100 flex items-center">
                  Start Teaching<BiArrowFromLeft className="ml-1" fontSize={'20px'} />
                </button>
              </div>
            </div>
            <img src="/src/assets/Become an instructor.png" className="w-full h-full object-cover z-0" alt="" />
          </div>

          <div className="bg-white mx-2 my-4 border-2 border-blue-600 p-4">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4">Your teaching & earning steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="text-xs sm:text-sm md:text-base font-medium">1. Apply to become instructor</p>
              </div>
              <div className="mb-4">
                <p className="text-xs sm:text-sm md:text-base font-medium">2. Build & edit your profile</p>
              </div>
              <div className="mb-4">
                <p className="text-xs sm:text-sm md:text-base font-medium">3. Create your new course</p>
              </div>
              <div className="mb-4">
                <p className="text-xs sm:text-sm md:text-base font-medium">4. Start teaching & earning</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Test;
