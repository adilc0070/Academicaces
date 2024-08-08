import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { signInApi } from '../../services/student/api';
import { useDispatch} from 'react-redux';
import { setStudentDetails } from '../../store/slice/studentSlice';
import { toast } from 'sonner';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignIn: React.FC = () => {
    console.log('SignIn page is rendered');
    
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .matches(/^[a-zA-Z0-9._]+@(gmail|yahoo|icloud)\.com$/, 'Please enter a valid email address with Gmail, Yahoo, or iCloud domain.')
            .required('Email is required'),
        password: Yup.string()
            .trim()
            .required('Password is required')
    });

    const handleSubmit = async (values: { email: string; password: string; rememberMe: boolean }) => {
        const { email, password, rememberMe } = values;

        try {
            const result = await signInApi({ data: { email, password, rememberMe } });
            localStorage.setItem('studentToken', result.user?.token);
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
                    <Formik
                        initialValues={{ email: '', password: '', rememberMe: false }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white rounded-r focus:outline-none" onClick={togglePasswordVisibility}>
                                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            id="rememberMe"
                                            name="rememberMe"
                                            checked={values.rememberMe}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                        />
                                        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign In</button>
                                <p className="text-center mt-4">Don’t have an account? <Link to="/signUp" className="text-blue-500 hover:underline">Sign Up</Link></p>
                                <p className="text-center mt-4">Instructor? <Link to="/instructor/signIn" className="text-blue-500 hover:underline">Sign In here</Link></p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
