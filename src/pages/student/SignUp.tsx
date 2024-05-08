import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { signUpApi } from '../../services/student/api'
import OTPVerification from '../../componants/OTPVerification'; 
// import { useDispatch } from 'react-redux';
// import { setStudentDetails } from '../../store/slice/studentSlice';

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState(0)
    const [emailOTP, setEmailOTP] = useState('')
    // let dispatch = useDispatch();


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
        
        await signUpApi({ data: { userName: userName, email: email, bio: bio, password: password } }).then((result) => {
            setEmailOTP(result.user?.email)
            setPage(1)
        }).catch((err) => {
            console.log(err);
        });
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="gradient-bg h-screen flex items-center justify-center">
            {page == 0 ? (<div className="w-[1008px] bg-white md:border-2 md:border-black border-2 rounded-lg flex justify-center">
                <div className="w-[500px] p-8 border-black border-2 rounded-lg">
                    <h2 className="text-5xl text-center font-bold mb-4">Welcome</h2>
                    <p className="text-gray-600 text-center text-md font-medium mb-8">Enter your details to create an account.</p>
                    <form onSubmit={handleSubmit}>
                        {
                            error &&
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 dark:border-red-800" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium"></span>{error}
                                </div>
                            </div>
                        }
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                            <input type="text" id="userName" name="userName" className="mt-1 p-2 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value={userName} onChange={handleUserNameChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About Your Self</label>
                            <input type="text" id="bio" name="bio" className="mt-1 p-2 block w-full border-2 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value={bio} onChange={(e) => setBio(e.target.value)} />
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
                        <button type="submit" className="bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800">Sign Up</button>
                        <p className='text-center mt-4'>Do you have an account? <Link to="/user/signIn" className="text-blue-500 hover:underline">Sign In</Link></p>
                    </form>
                </div>
                <div className="w-[812px] max-md:hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}>
                </div>
            </div>) :
                <OTPVerification emailOTP={emailOTP} />
            }
        </div>
    );
}

export default SignUp;
