import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { enroll } from '../services/student/api';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const buy = async (course: string | null, Id: string | null, student: string) => {
    await enroll({ courseId: course, hash: Id, email: student }).then((result) => {
        console.log(' result from enroll api', result);
    })
}

const SuccessPage = () => {
    const student = useSelector((state: RootState) => state.student.email)
    const query = useQuery();

    useEffect(() => {
        const course = query.get('course');
        const Id = query.get('courseId');
        buy(course, Id, student);

        setTimeout(() => {
            // window.location.href = '/';
        }, 3000);

    }, [query, student]);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center mb-6"
                >
                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">Thank you for enrolling in our course. You can now access all the course materials.</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white py-2 px-4 rounded transition duration-300"
                >
                    <Link to="/home">Go to Dashboard</Link>
                </motion.button>
            </div>
        </div>
    );
}

export default SuccessPage;
