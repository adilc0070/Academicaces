import React, { useRef, useState } from 'react';
import { otpSend } from '../services/student/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from "react-redux"
import { setStudentDetails } from "../store/slice/studentSlice"
import { instructorOtpSend } from '../services/instructor/api';
import { setInstructorDetails } from '../store/slice/instructorSlice';
const OTPVerification: React.FC = ({ emailOTP }: any) => {
    const [otp, setOTP] = useState<string[]>(['', '', '', '']);
    const [error, setError] = useState<string>('');
    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (index: number, value: string) => {
        // Validation: Only accept numbers
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);
            setError('');

            if (value && index < 3) {
                refs[index + 1].current?.focus();
            }
        } else {
            setError('Please enter numbers only');
        }
    };

    const handleKeyPress = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            refs[index - 1].current?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpString = otp.join('');

        if (otpString.length === 4) {
            console.log('Submitting OTP:', otpString);
            if (window.location.pathname.includes('instructor')) {

                await instructorOtpSend({ data: { otp: otpString, email: emailOTP } }).then((result) => {
                    console.log(" result ", result.user);
                    toast.success(result?.message);
                    dispatch(setInstructorDetails(result?.user))
                    navigate('/instructor/dashboard')
                    
                    // dispatch(setInstructorDetails(result?.instructor?.instructor))
                })

            } else {
                let ress = await otpSend({ data: { otp: otpString, email: emailOTP } }).then((result) => {

                    toast.success(result?.user?.message);
                    dispatch(setStudentDetails(result.user.userData))
                    navigate('/home')

                }).catch((err) => {
                    toast.error(err?.response?.data?.message);
                    console.log(err);
                })

            }
        } else {
            setError('Please fill all fields');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center bg-gray-200 rounded-3xl p-8 space-y-8">
                <h1 className="text-3xl font-bold">OTP Verification</h1>
                <p className="text-lg">We have sent the verification code to your email address</p>
                <div className="flex justify-center items-center space-x-4">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={refs[index]}
                            className="w-16 h-16 border-2 border-gray-300 rounded-lg text-center text-2xl"
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyPress={(e) => handleKeyPress(index, e)}
                        />
                    ))}
                </div>
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
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600" onClick={handleSubmit}>
                    Submit OTP
                </button>
            </div>
        </div>
    );
};

export default OTPVerification;
