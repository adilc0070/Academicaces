import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';

function Test() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    return (

        <div className="gradient-bg h-screen flex items-center justify-center">
            <div className="w-[1008px]  bg-white md:border-2 md: border-black border-2 rounded-lg flex justify-center">
                <div className="w-[500px] p-8  border-black border-2 rounded-lg">
                    <h2 className="text-5xl text-center font-bold mb-4">Welcome</h2>
                    <p className="text-gray-600 text-center text-md font-medium mb-8">Enter your email and password to access your account.</p>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="UserName" className="block text-sm font-medium text-gray-700">User Name</label>
                            <input type="text" id="UserName" name="UserName" className="mt-1 p-2 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password" name="password" className="mt-1 p-2 pr-10 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                                <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white border-2 rounded-r focus:outline-none" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" className="mt-1 p-2 pr-10 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                                <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white border-2 rounded-r focus:outline-none" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-4 flex-col">
                            <button type="submit" className="bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800">Sign Up</button>
                            <p className='text-center mt-4'>Do you have an account? <a href="#" className="text-blue-500 hover:underline">Sign In</a></p>
                        </div>
                        

                    </form>
                </div>
                <div className="w-[812px] max-md:hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}>
                </div>
            </div>
        </div>
    );
}

export default Test
