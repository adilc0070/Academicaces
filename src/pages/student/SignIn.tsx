import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { signInApi } from '../../services/student/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setStudentDetails } from '../../store/slice/studentSlice';
import { toast } from 'sonner';

const SignIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const student = useSelector((state: RootState) => state.student);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._]+@(gmail|yahoo|icloud)\.com$/;
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
        const formData: FormData = new FormData(e.currentTarget);
        const email: string = formData.get('email') as string;
        const password: string = formData.get('password') as string;
        const rememberMe: boolean = formData.get('rememberMe') === 'on';

        if (!email || !password) {
            toast.error('Please fill out all fields');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address with Gmail, Yahoo, or iCloud domain');
            return;
        }

        if (!password.trim()) {
            toast.error('Password cannot be empty');
            return;
        }

        try {
            const result = await signInApi({ data: { email, password, rememberMe } });
            dispatch(setStudentDetails(result.user.userData));
            navigate('/user/home');
        } catch (error) {
            toast.error('Failed to sign in. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex max-w-4xl w-full">
                <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}></div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-4xl font-bold text-center mb-4">Welcome</h2>
                    <p className="text-center text-gray-600 mb-6">Enter your email and password to access your account.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password" name="password" className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={handlePasswordChange} />
                                <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white rounded-r focus:outline-none" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <input type="checkbox" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign In</button>
                        <p className="text-center mt-4">Don’t have an account? <Link to="/signUp" className="text-blue-500 hover:underline">Sign Up</Link></p>
                        <p className="text-center mt-4">Instructor? <Link to="/instructor/signIn" className="text-blue-500 hover:underline">Sign In here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
