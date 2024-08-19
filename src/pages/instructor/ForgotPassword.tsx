import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { forgotPasswordApi, resetPasswordApi } from '../../services/instructor/api'; // Assuming you have these APIs
import { useDispatch } from 'react-redux';
import { setInstructorDetails } from '../../store/slice/instructorSlice';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [otpError, setOtpError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [view, setView] = useState<boolean>(false)
    const dispatch = useDispatch();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._]+@(gmail|yahoo|icloud)\.com$/;
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

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setOtp(value);
        // You can add validation for OTP here if needed
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setNewPassword(value);
        if (!validatePassword(value)) {
            setPasswordError('Password must be at least 8 characters long and include a number and a special character.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value !== newPassword) {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSendOtp = async () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address with Gmail, Yahoo, or iCloud domain.');
            return;
        }

        try {
            // API call to send OTP to the email
            setView(true)
            await forgotPasswordApi({ email }).then((result) => {
                if (result.statusCode === 200) {
                    toast.success('OTP sent successfully.');
                } else {
                    toast.error(result.error);
                    setView(false)
                }
            });
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address with Gmail, Yahoo, or iCloud domain.');
            return;
        }
        

        try {
            await resetPasswordApi({ email, otp, newPassword }).then((result) => {
                if (result.statusCode === 200) {
                    toast.success('Password reset successfully.');
                    dispatch(setInstructorDetails(result?.result))
                } else {
                    toast.error('Failed to reset password. Please check your OTP and try again.');
                }
            });
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
                {/* Left side with form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-koulen text-center text-blue-600">Academicaces</h2>
                    <p className="text-center text-gray-600 mt-4">Forgot Password</p>
                    {(emailError || otpError || passwordError) && (
                        <p className="text-red-500 text-sm mt-1">
                            {emailError || otpError || passwordError}
                        </p>
                    )}
                    <div className="mt-6 align-middle">
                        <form onSubmit={handleSubmit}>
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
                                {!view && <button
                                    type="button"
                                    className="mt-1 block w-full text-center text-blue-600 hover:underline focus:outline-none"
                                    onClick={handleSendOtp}
                                >
                                    Send OTP
                                </button>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    className={`mt-1 p-2 block w-full border-2 rounded ${otpError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                    value={otp}
                                    onChange={handleOtpChange}
                                />
                                {view&&<button
                                    type="button"
                                    className="mt-1 block w-full text-center text-blue-600 hover:underline focus:outline-none"
                                onClick={handleSendOtp}
                                >
                                    Resend OTP
                                </button>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="newPassword"
                                        name="newPassword"
                                        className={`mt-1 p-2 pr-10 block w-full border-2 rounded ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 text-gray-600 border-2 rounded-r focus:outline-none"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`mt-1 p-2 block w-full border-2 rounded ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <button type="submit" className={`bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800 ${!email || !otp || !newPassword || !confirmPassword ? 'opacity-50 cursor-not-allowed' : ''}`}>Reset Password</button>
                            <p className='text-center mt-4'>Remember your password? <Link to={"/instructor/signIn"} className="text-blue-500 hover:underline">Sign In</Link></p>
                        </form>
                    </div>
                </div>

                <div className="hidden md:block w-1/2 bg-blue-500 bg-transparent rounded-r-lg ">
                    <div className="h-full flex items-center justify-center p-8">
                        <img src="https://img.freepik.com/free-photo/female-african-american-speaker-giving-presentation-hall-university-workshop_155003-3580.jpg?t=st=1716007090~exp=1716010690~hmac=1c382da9dda4ce7da6b3a376fbb01b63059c8dd6d86abedcf470c30af4c29241&w=740" alt="Academicaces image" className="object-cover h-full w-full rounded-r-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
