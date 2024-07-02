import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { instructorSignUpApi } from '../../services/instructor/api';
import { toast } from 'sonner';
import OTPVerification from '../../components/OTPVerification';

const InstructorSignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [bioError, setBioError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [emailOTP, setEmailOTP] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|icloud)\.com$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setName(value);
        if (!value.trim()) {
            setNameError('Name is required.');
        } else {
            setNameError('');
        }
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
    const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setBio(value);
        if (value.length < 10) {
            setBioError('Please enter about 10 characters of your self.');
        } else {
            setBioError('');
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

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess('');

        if (!name.trim()) {
            setNameError('Name is required.');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address with Gmail, Yahoo, or iCloud domain.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include a number and a special character.');
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }
        if (bio.length < 10) {
            setBioError('Please enter about 10 characters of your self.');
            return;
        }

        try {
            setLoading(true);
            // API call to sign up the user
            await instructorSignUpApi({ data: { userName: name, email: email, bio: bio, password: password } }).then((result) => {
                console.log(result.user);

                if (result.status) {
                    toast.success('Account created successfully. Please check your email to verify your account.');
                    setEmailOTP(result.user?.email);
                    setPage(1);
                } else {
                    toast.error(result.error);
                }

            });
            setLoading(false);
        } catch (error) {
            setSuccess('asdsadasd');
            setNameError('Failed to create account. Please try again later.');
        }
    };

    return (
        <>

            {page === 0 ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
                        {/* Left side with form */}
                        <div className="w-full md:w-1/2 p-8">
                            <h2 className="text-3xl font-koulen text-center text-blue-600">Academicaces</h2>
                            <p className="text-center text-gray-600 mt-4">Create your account</p>
                            {(nameError || emailError || bioError || passwordError || confirmPasswordError) && <p className="text-red-500 text-sm mt-1">{(nameError || emailError || bioError || passwordError || confirmPasswordError)}</p>}
                            <div className="mt-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`mt-1 p-2 block w-full border-2 rounded ${nameError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                            value={name}
                                            onChange={handleNameChange}
                                        />

                                    </div>
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
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About Your self</label>
                                        <input
                                            type="text"
                                            id="bio"
                                            name="bio"
                                            className={`mt-1 p-2 block w-full border-2 rounded ${bioError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                            value={bio}
                                            onChange={handleBioChange}
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

                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className={`mt-1 p-2 pr-10 block w-full border-2 rounded ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 text-gray-600 border-2 rounded-r focus:outline-none"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                            </button>
                                        </div>

                                    </div>
                                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                                    <button type="submit" className={`bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800 ${!name || !email || !password || !confirmPassword ? 'opacity-50 cursor-not-allowed' : ''}`}>{loading ? 'Loading...' : 'Sign Up'}</button>
                                    <p className='text-center mt-4'>Already have an account? <Link to={"/instructor/signIn"} className="text-blue-500 hover:underline">Sign In</Link></p>
                                </form>
                            </div>
                        </div>
                        {/* Right side with image */}
                        <div className="hidden md:block w-1/2 bg-blue-500 bg-transparent rounded-r-lg ">
                            <div className="h-full flex items-center justify-center p-8">
                                <img src="https://img.freepik.com/free-photo/female-african-american-speaker-giving-presentation-hall-university-workshop_155003-3580.jpg?t=st=1716007090~exp=1716010690~hmac=1c382da9dda4ce7da6b3a376fbb01b63059c8dd6d86abedcf470c30af4c29241&w=740" alt="Academicases image" className="object-cover h-full w-full rounded-r-lg" />
                            </div>
                        </div>
                    </div>
                </div>) : (
                <OTPVerification emailOTP={emailOTP} />
            )}
        </>
    )
}

export default InstructorSignUp;
