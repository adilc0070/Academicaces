import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { instructorSignInApi } from '../../services/instructor/api';
import { useDispatch } from 'react-redux';
import { setInstructorDetails } from '../../store/slice/instructorSlice';
// import { GoogleLogin } from '@react-oauth/google';


const InstructorSignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|icloud)\.com$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Please enter a valid email address with Gmail, Yahoo, or iCloud domain.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setPassword(value);
        if (!validatePassword(value)) {
            setPasswordError('Password must be at least 8 characters long and include a number and a special character.');
        } else {
            setPasswordError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address with Gmail, Yahoo, or iCloud domain.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include a number and a special character.');
            return;
        }

        try {
            // API call to sign in the user
            await instructorSignInApi({ email, password }).then((result) => {
                if (result.statusCode === 200) {
                    toast.success('Signed in successfully.');
                    localStorage.setItem('instructorToken', result);
                    dispatch(setInstructorDetails(result.instructor));
                } else {
                    toast.error('Failed to sign in. Please check your email and password and try again.');
                }
            });
        } catch (error) {
            setSuccess('');
            setEmailError('Failed to sign in. Please check your email and password and try again.');
        }
    };
    // const handleGoogleSuccess = async (response) => {
    //     console.log('Google sign-in successful', response);
    //     // Handle successful sign-in, e.g., authenticate with your backend
    // };

    // const handleGoogleFailure = (error) => {
    //     console.error('Google sign-in failed', error);
    //     // Handle sign-in failure
    // };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
                {/* Left side with form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-koulen text-center text-blue-600">Academicaces</h2>
                    <p className="text-center text-gray-600 mt-4">Sign in to your account</p>
                    {(emailError || passwordError) && <p className="text-red-500 text-sm mt-1">{(emailError || passwordError)}</p>}
                    <div className="mt-6 align-middle">
                        <form onSubmit={handleSubmit}>
                            {/* <div className="mt-6">
                                <GoogleLogin
                                    clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
                                    onSuccess={handleGoogleSuccess}
                                    onFailure={handleGoogleFailure}
                                    render={({ onClick }) => (
                                        <button
                                            onClick={onClick}
                                            className="bg-white w-full text-gray-700 border-2 border-gray-300 rounded px-4 py-2 mt-4 hover:bg-gray-100 flex items-center justify-center"
                                        >
                                            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" className="w-4 h-4 mr-2" />
                                            Sign in with Google
                                        </button>
                                    )}
                                />
                            </div> */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`mt-1 p-2 block w-full border-2 rounded ${emailError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className={`mt-1 p-2 pr-10 block w-full border-2 rounded ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 text-gray-600 border-2 rounded-r focus:outline-none"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>


                                <p className="text-sm text-gray-600 mt-2" onClick={() => navigate('/instructor/forgotPassword')}>Forgot your password?</p>

                            </div>
                            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                            <button type="submit" className={`bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800 ${!email || !password ? 'opacity-50 cursor-not-allowed' : ''}`}>Sign In</button>
                            <p className='text-center mt-4'>Don't have an account? <Link to={"/instructor/signUp"} className="text-blue-500 hover:underline">Sign Up</Link></p>
                            <p className='text-center mt-4'>are you a student ?<Link to={"/signIn"} className="text-blue-500 hover:underline">Sign In</Link></p>
                        </form>
                    </div>
                </div>

                <div className="hidden md:block w-1/2 bg-blue-500 bg-transparent rounded-r-lg ">
                    <div className="h-full flex items-center justify-center p-8">
                        <img src="https://img.freepik.com/free-photo/female-african-american-speaker-giving-presentation-hall-university-workshop_155003-3580.jpg?t=st=1716007090~exp=1716010690~hmac=1c382da9dda4ce7da6b3a376fbb01b63059c8dd6d86abedcf470c30af4c29241&w=740" alt="Academicases image" className="object-cover h-full w-full rounded-r-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorSignIn;
