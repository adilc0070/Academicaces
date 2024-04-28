import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setUserName(value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setEmail(value);

        // Validation: Check if email is valid
        if (!validateEmail(value)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setPassword(value);

        // Validation: Check if password meets criteria
        if (value.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setConfirmPassword(value);

        // Validation: Check if passwords match
        if (value !== password) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Validation: Check if all fields are filled
        if (!userName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('Please fill out all fields.');
            return;
        }

        // Your form submission logic here
        console.log('Form submitted:', { userName, email, password, confirmPassword });
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="gradient-bg h-screen flex items-center justify-center">
            <div className="w-[1008px] bg-white md:border-2 md:border-black border-2 rounded-lg flex justify-center">
                <div className="w-[500px] p-8 border-black border-2 rounded-lg">
                    <h2 className="text-5xl text-center font-bold mb-4">Welcome</h2>
                    <p className="text-gray-600 text-center text-md font-medium mb-8">Enter your details to create an account.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                            <input type="text" id="userName" name="userName" className="mt-1 p-2 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value={userName} onChange={handleUserNameChange} />
                        </div>
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
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" className="mt-1 p-2 pr-10 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white border-2 rounded-r focus:outline-none" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button type="submit" className="bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800">Sign Up</button>
                        <p className='text-center mt-4'>Do you have an account? <a href="#" className="text-blue-500 hover:underline">Sign In</a></p>
                    </form>
                </div>
                <div className="w-[812px] max-md:hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
