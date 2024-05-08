import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { signInApi } from '../../services/student/api'

const AdminSignIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|icloud)\.com$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setEmail(value);

        if (!validateEmail(value)) {
            setError('Please enter a valid email address with Gmail, Yahoo, or iCloud domain.');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setPassword(value);

        if (!value.trim()) {
            setError('Password cannot be empty.');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const datas: FormData = new FormData(e.currentTarget)
        const em: string | null = datas.get('email')
        const p: string | null = datas.get('password')
        const rem: boolean = datas.get('rememberMe') === 'on';

       
    };

    return (
        <div className="gradient-bg h-screen flex items-center justify-center">
            <div className="w-[1008px]  bg-white md:border-2 md: border-black border-2 rounded-lg flex justify-center">
                <div className="w-[500px] p-8  border-black border-2 rounded-lg">
                    <h2 className="text-5xl text-center font-bold mb-4">Welcome</h2>
                    <p className="text-gray-600 text-center text-md font-medium mb-8">Enter your email and password to access your account.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password" name="password" className="mt-1 p-2 pr-10 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value={password} onChange={handlePasswordChange} />
                                <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white border-2 rounded-r focus:outline-none" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center mb-4">
                                <input type="checkbox" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 border-2 rounded" />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Remember me</label>
                            </div>
                            <div className="mb-4">
                                <a href="#" className="text-sm text-blue-500 hover:underline">Forget Password?</a>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button type="submit" className="bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800">Sign In</button>
                        <p className='text-center mt-4'>Don’t have an account? <Link to={"/user/signUp"} className="text-blue-500 hover:underline">Sign Up</Link></p>
                        <div className="mt-4 flex items-center justify-center">
                            <hr className="w-1/4 border-gray-400" />
                            <p className="mx-2 text-sm text-gray-500 text-center">Or continue with email</p>
                            <hr className="w-1/4 border-gray-400" />
                        </div>
                        <button type="button" className="mt-4 bg-white w-full text-black px-4 py-2 border-2 rounded hover:bg-gray-100 flex items-center justify-center">
                            <img src="/src/assets/google-icon.png" alt="Google Icon" className="h-5 w-5" />
                            <span className="mr-2">Sign In with Google</span>
                        </button>
                    </form>
                </div>
                <div className="w-[812px] max-md:hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}>
                </div>
            </div>
        </div>
    );
}

export default AdminSignIn;
