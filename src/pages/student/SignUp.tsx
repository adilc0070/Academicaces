import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { signUpApi } from '../../services/student/api';
import OTPVerification from '../../componants/OTPVerification';

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [emailOTP, setEmailOTP] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            bio: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('User Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            bio: Yup.string(),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Confirm Password is required')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const result = await signUpApi({ data: values })
                setEmailOTP(result.user?.email);
                setPage(1);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
            {page === 0 ? (
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
                    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}></div>
                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-4xl font-semibold text-center mb-6">Sign Up</h2>
                        <p className="text-center text-gray-600 mb-6">Enter your details to create an account.</p>
                        <form onSubmit={formik.handleSubmit}>
                            {formik.errors.userName && formik.touched.userName && <div className="text-red-500 text-sm mb-4">{formik.errors.userName}</div>}
                            <div className="mb-4">
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.errors.email && formik.touched.email && <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About Yourself</label>
                                <input
                                    type="text"
                                    id="bio"
                                    name="bio"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.password && formik.touched.password && <div className="text-red-500 text-sm mb-4">{formik.errors.password}</div>}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-gray-900" onClick={togglePasswordVisibility}>
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                            </div>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="text-red-500 text-sm mb-4">{formik.errors.confirmPassword}</div>}
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button type="button" className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-gray-900" onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                {loading ? "Loading..." : "Sign Up"}
                            </button>
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
