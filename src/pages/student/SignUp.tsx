import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUpApi } from '../../services/student/api';
import OTPVerification from '../../components/OTPVerification';

// Helper component for input fields with optional visibility toggle
const InputField: React.FC<{
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  label: string;
  showToggle?: boolean;
  showPassword?: boolean;
  toggleVisibility?: () => void;
  error?: string;
}> = ({ id, name, type, value, onChange, onBlur, label, showToggle, showPassword, toggleVisibility, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type={showToggle ? (showPassword ? "text" : "password") : type}
        id={id}
        name={name}
        className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {showToggle && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-gray-900"
          onClick={toggleVisibility}
        >
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </button>
      )}
    </div>
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
);

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
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await signUpApi({ data: values });
        setEmailOTP(result.user?.email || '');
        setPage(1);
      } catch (err) {
        console.error('Sign up error:', err);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      {page === 0 ? (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
          <div
            className="hidden md:block w-1/2 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}
          />
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-4xl font-semibold text-center mb-6">Sign Up</h2>
            <p className="text-center text-gray-600 mb-6">Enter your details to create an account.</p>
            <form onSubmit={formik.handleSubmit}>
              <InputField
                id="userName"
                name="userName"
                type="text"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="User Name"
                error={formik.touched.userName ? formik.errors.userName : ''}
              />
              <InputField
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Email"
                error={formik.touched.email ? formik.errors.email : ''}
              />
              <InputField
                id="bio"
                name="bio"
                type="text"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="About Yourself"
              />
              <InputField
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Password"
                showToggle
                showPassword={showPassword}
                toggleVisibility={togglePasswordVisibility}
                error={formik.touched.password ? formik.errors.password : ''}
              />
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Confirm Password"
                showToggle
                showPassword={showConfirmPassword}
                toggleVisibility={toggleConfirmPasswordVisibility}
                error={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
              />
              <button
                type="submit"
                className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              <p className="text-center mt-4">
                Do you have an account? <Link to="/signIn" className="text-green-500 hover:underline">Sign In</Link>
              </p>
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
