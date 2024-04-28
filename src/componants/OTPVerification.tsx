import { useRef, useState } from 'react';

const OTPVerification = () => {
    const [otp, setOTP] = useState(['', '', '', '']);
    const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleChange = (index: number, value: string) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (value && index < 3) {
            refs[index + 1].current.focus();
        }
    };

    const handleKeyPress = (index: number, e) => {
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            refs[index - 1].current.focus();
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
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyPress={(e) => handleKeyPress(index, e)}
                        />
                    ))}
                </div>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">Submit OTP</button>
            </div>
        </div>
    );
};

export default OTPVerification;
