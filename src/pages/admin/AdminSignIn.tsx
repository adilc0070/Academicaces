import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { adminSignInApi } from '../../services/admin/api';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAdminDetails } from '../../store/slice/adminSlice';

const AdminSignIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|icloud)\.com$/;
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
        const datas: FormData = new FormData(e.currentTarget)
        const em = datas.get('email')
        const p  = datas.get('password')
        if (!em || !p) {
            toast.error('Please fill out all fields')
            return
        }
        if (!validateEmail(em as string)) {
            toast.error('Please enter a valid email address with Gmail, Yahoo, or iCloud domain')
            return
        }

        if (typeof p === 'string' && !p.trim()) {
            toast.error('Password cannot be empty')
            return
        }

        await adminSignInApi({ email: em as string, password: p as string }).then((result) => {
            // console.log('result', result?.admin.admin);

            if (result?.statusCode === 200) {
                // console.log(result.admin.admin);

                toast.success("Login successful")
                dispatch(setAdminDetails(result.admin.admin))

            } else if (result.statusCode === 400) {
                toast.error("Invalid credentials")
            }
        }).catch((err) => {
            toast.error('admin not found : ', err);
        })
    };

    return (
        <div className="gradient-bg h-screen flex items-center justify-center">
            <div className="w-[1008px]  bg-white md:border-2 md: border-black border-2 rounded-lg flex justify-center">
                <div className="w-[500px] p-8  border-black border-2 rounded-lg">
                    <h2 className="text-5xl text-center font-bold mb-4">Welcome</h2>
                    <p className="text-gray-600 text-center text-md font-medium mb-8">Enter your email and password to access your account.</p>
                    <form onSubmit={handleSubmit}>
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
                        <div className="">
                            <div className="mb-4">
                                <Link to="#" className="text-sm text-blue-500 hover:underline">Forget Password?</Link>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button type="submit" className="bg-black w-full text-white px-4 py-2 border-2 rounded hover:bg-gray-800">Sign In</button>


                    </form>
                </div>
                <div className="w-[812px] max-md:hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}>
                </div>
            </div>
        </div>
    );
}

export default AdminSignIn;
