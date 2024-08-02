// OTPVerification.tsx

import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { otpSend } from '../services/student/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setStudentDetails } from '../store/slice/studentSlice';
import { setInstructorDetails } from '../store/slice/instructorSlice';
import { instructorOtpSend } from '../services/instructor/api';

interface OTPVerificationProps {
    emailOTP: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ emailOTP }) => {
    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            otp0: '',
            otp1: '',
            otp2: '',
            otp3: ''
        },
        validationSchema: Yup.object({
            otp0: Yup.string().required('Required').matches(/^\d$/, 'Must be a digit'),
            otp1: Yup.string().required('Required').matches(/^\d$/, 'Must be a digit'),
            otp2: Yup.string().required('Required').matches(/^\d$/, 'Must be a digit'),
            otp3: Yup.string().required('Required').matches(/^\d$/, 'Must be a digit')
        }),
        onSubmit: async (values) => {
            const otpString = Object.values(values).join('');

            if (window.location.pathname.includes('instructor')) {
                try {
                    const result = await instructorOtpSend({ otp: otpString, email: emailOTP });
                    toast.success(result?.message);
                    dispatch(setInstructorDetails(result?.user));
                    navigate('/instructor/dashboard');
                } catch (err) {
                    toast.error(err?.response?.data?.message);
                    console.log(err);
                }
            } else {
                try {
                    const result = await otpSend({ data:{otp: otpString, email: emailOTP} });
                    toast.success(result?.user?.message);
                    dispatch(setStudentDetails(result.user.userData));
                    navigate('/home');
                } catch (err) {
                    toast.error(err?.response?.data?.message);
                    console.log(err);
                }
            }
        }
    });

    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            formik.setFieldValue(`otp${index}`, value);
            formik.setFieldTouched(`otp${index}`, true, false);

            if (value && index < 3) {
                refs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyPress = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && !formik.values[`otp${index}`]) {
            refs[index - 1].current?.focus();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center bg-gray-200 rounded-3xl p-8 space-y-8">
                <h1 className="text-3xl font-bold">OTP Verification</h1>
                <p className="text-lg">We have sent the verification code to your email address</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex justify-center items-center space-x-4">
                        {[0, 1, 2, 3].map((index) => (
                            <input
                                key={index}
                                ref={refs[index]}
                                className="w-16 h-16 border-2 border-gray-300 rounded-lg text-center text-2xl"
                                type="text"
                                maxLength={1}
                                value={formik.values[`otp${index}`]}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyPress={(e) => handleKeyPress(index, e)}
                                onBlur={formik.handleBlur}
                            />
                        ))}
                    </div>
                    {formik.errors.otp0 && formik.touched.otp0 ||
                        formik.errors.otp1 && formik.touched.otp1 ||
                        formik.errors.otp2 && formik.touched.otp2 ||
                        formik.errors.otp3 && formik.touched.otp3 ? (
                        <div className="text-red-500 text-sm mt-2">{formik.errors.otp0 || formik.errors.otp1 || formik.errors.otp2 || formik.errors.otp3}</div>
                    ) : null}
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-4" type="submit">
                        Submit OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTPVerification;
