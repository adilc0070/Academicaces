import React, { useRef, useState } from 'react';

const OTPVerification: React.FC = () => {
    const [otp, setOTP] = useState<string[]>(['', '', '', '']);
    const [error, setError] = useState<string>('');
    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

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

    const handleSubmit = () => {
        const otpString = otp.join('');
        // Validation: Check if OTP is complete (all fields filled)
        if (otpString.length === 4) {
            // Handle OTP submission
            console.log('Submitting OTP:', otpString);
        } else {
            // Handle incomplete OTP
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600" onClick={handleSubmit}>
                    Submit OTP
                </button>
            </div>
        </div>
    );
};

export default OTPVerification;
