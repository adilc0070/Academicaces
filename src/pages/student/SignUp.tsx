import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { signUpApi } from '../../services/student/api';
import OTPVerification from '../../componants/OTPVerification';

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [emailOTP, setEmailOTP] = useState<string>('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setEmail(value);
        if (!validateEmail(value)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setPassword(value);
        if (value.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setConfirmPassword(value);
        if (value !== password) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            const result = await signUpApi({ data: { userName, email, bio, password } });
            setEmailOTP(result.user?.email);
            setPage(1);
        } catch (err) {
            console.log(err);
        }
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
            {page === 0 ? (
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
                    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}></div>
                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-4xl font-semibold text-center mb-6">Sign Up</h2>
                        <p className="text-center text-gray-600 mb-6">Enter your details to create an account.</p>
                        <form onSubmit={handleSubmit}>
                            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                            <div className="mb-4">
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                                <input type="text" id="userName" name="userName" className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" value={userName} onChange={handleUserNameChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" value={email} onChange={handleEmailChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About Yourself</label>
                                <input type="text" id="bio" name="bio" className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" value={password} onChange={handlePasswordChange} />
                                    <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-gray-900" onClick={togglePasswordVisibility}>
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                    <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Sign Up</button>
                            <p className="text-center mt-4">Do you have an account? <Link to="/signIn" className="text-green-500 hover:underline">Sign In</Link></p>
                        </form>
                    </div>
                </div>
            ) : (
                <OTPVerification emailOTP={emailOTP} />
            )}
        </div>
    );
};

export default SignUp;
