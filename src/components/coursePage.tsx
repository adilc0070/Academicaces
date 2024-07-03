import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { buyCourse, isEnrolled } from '../services/student/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CoursePage = ({ course }) => {
    const [courseId, setCourseId] = useState('');
    const [isEnrolledStatus, setIsEnrolledStatus] = useState(false);
    const [activeTab, setActiveTab] = useState('curriculum');
    const [activeChapterIndex, setActiveChapterIndex] = useState(null);
    const [activeLessonIndex, setActiveLessonIndex] = useState(null);
    const student = useSelector((state: RootState) => state.student.email);

    useEffect(() => {
        setCourseId(course?._id);
    }, [course]);

    useEffect(() => {
        if (student && courseId) {
            isEnrolled(student, courseId).then((response) => {
                setIsEnrolledStatus(response);
            });
        }
    }, [student, courseId]);

    const lessons = course?.chapters.map((val) => val.lessonsID.length).reduce((prev, curr) => prev + curr, 0);

    const toggleChapterAccordion = (index) => {
        setActiveChapterIndex(activeChapterIndex === index ? null : index);
        setActiveLessonIndex(null);
    };

    const toggleLessonAccordion = (index) => {
        setActiveLessonIndex(activeLessonIndex === index ? null : index);
    };

    const enroll = async (data) => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        try {
            const response = await buyCourse({ data: { courseId: data._id, price: data.price, image: data.thumbnail } });
            const { id: sessionId } = response.data.session;
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
                console.error('Stripe Checkout Error:', error);
            }
        } catch (error) {
            console.error('Server Error:', error);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'curriculum':
                return (
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
                        {course?.chapters.map((chapter, chapterIndex) => (
                            <div key={chapter._id} className="mb-4">
                                <button
                                    className="flex justify-between items-center w-full text-left p-2 border rounded"
                                    onClick={() => toggleChapterAccordion(chapterIndex)}
                                    disabled={!isEnrolledStatus && !chapter.isFree}
                                >
                                    <span className="text-gray-700">
                                        <strong>Chapter {chapterIndex + 1}:</strong> {chapter.name}
                                    </span>
                                    <span>
                                        {!isEnrolledStatus && !chapter.isFree ? <FaLock className="text-red-500" /> : (activeChapterIndex === chapterIndex ? '-' : '+')}
                                    </span>
                                </button>
                                {activeChapterIndex === chapterIndex && (isEnrolledStatus || chapter.isFree) && (
                                    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-lg shadow-sm">
                                        <p className="text-gray-800 font-semibold mb-2">
                                            <strong>Order:</strong> {chapter.order}
                                        </p>
                                        {chapter.lessonsID.length > 0 ? (
                                            <div>
                                                {chapter.lessonsID.map((lesson, lessonIndex) => (
                                                    <div key={lesson._id} className="mb-4">
                                                        <button
                                                            className="flex justify-between items-center w-full text-left p-3 border border-gray-300 bg-white rounded-lg hover:bg-gray-100 transition duration-150"
                                                            onClick={() => toggleLessonAccordion(lessonIndex)}
                                                        >
                                                            <span className="text-gray-800 font-medium">
                                                                <strong>Lesson {lessonIndex + 1}:</strong> {lesson.name}
                                                            </span>
                                                            <span className="text-gray-500">{activeLessonIndex === lessonIndex ? '-' : '+'}</span>
                                                        </button>
                                                        {activeLessonIndex === lessonIndex && (
                                                            <div className="p-3 border-t border-gray-300 bg-white rounded-b-lg">
                                                                {isEnrolledStatus || chapter.isFree ? (
                                                                    <>
                                                                        <p className="text-green-600 font-semibold mb-2">This lesson is free!</p>
                                                                        <p className="text-gray-800 mb-2">
                                                                            <strong>Description :</strong> {lesson.description}
                                                                        </p>
                                                                        <p className="text-gray-800 font-medium mb-2">
                                                                            <strong>Video:</strong>
                                                                        </p>
                                                                        <video className="w-full h-56 rounded mb-4 shadow-sm" controls>
                                                                            <source src={lesson.video[0]} type="video/mp4" />
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                        <p className="text-gray-800 font-medium mb-2">
                                                                            <strong>Files:</strong>
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2">
                                                                            {lesson.files && (
                                                                                <li className="text-gray-800">
                                                                                    <iframe
                                                                                        src={lesson.files}
                                                                                        className="w-full h-48 rounded border object-cover border-gray-300 shadow-sm"
                                                                                        rel="noopener noreferrer"
                                                                                    />
                                                                                </li>
                                                                            )}
                                                                        </ul>
                                                                    </>
                                                                ) : (
                                                                    <p className="text-red-500 font-semibold">Enroll to access this content</p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-800">No lessons available</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case 'description':
                return (
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Description</h2>
                        <p>{course?.subtitle}</p>
                    </div>
                );
            case 'instructor':
                return (
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Instructor Information</h2>
                        <p>{course?.instructor.bio}</p>
                        <p>Email: {course?.instructor.email}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Left Section */}
            <div className="flex-1">
                <div className="p-6 rounded-lg shadow-md mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-sky-600 text-white text-sm rounded">{course?.category?.name}</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">{course?.title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                        <span className="mr-2">{lessons} Lessons</span>
                        <span className="mr-2">|</span>
                        <span className="flex items-center">
                            <span className="mr-1">{course?.rating}</span>
                            <span>⭐</span>
                            <span>({course?.reviewsCount})</span>
                        </span>
                        <span className="mx-2">|</span>
                        <span>Last Update: {new Date(course?.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="border-b border-gray-200 mb-4"></div>
                    <div className="flex space-x-4">
                        <button
                            className={`py-2 px-4 ${activeTab === 'curriculum' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('curriculum')}
                        >
                            Curriculum
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === 'description' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === 'instructor' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('instructor')}
                        >
                            Instructor
                        </button>
                    </div>
                </div>
                {renderTabContent()}
            </div>
            {/* Right Section */}
            <div className="md:w-1/3 lg:w-1/4 md:ml-8 md:mt-6">
                <div className="p-6 rounded-lg shadow-md mb-6 flex flex-col items-center">
                    <img
                        src={course?.thumbnail}
                        alt="Course"
                        className="rounded-lg mb-4 w-full max-w-xs h-auto"
                    />
                    <div className="text-center mb-4">
                        <span className="text-gray-500 line-through ml-2">${course?.price + (course?.price / 10)}</span>
                        <span className="text-2xl font-bold text-purple-600">${course?.price}</span>
                        <span className="text-green-600 ml-2">{10}% OFF</span>
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                        {!isEnrolledStatus && <button onClick={() => enroll(course)} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">Enroll Now</button>}
                    </div>
                </div>

                <div className="p-6 rounded-lg shadow-md">
                    <ul className="text-gray-700 space-y-2">
                        <li><strong>Instructor:</strong> {course?.instructor.name}</li>
                        <li><strong>Chapters:</strong> {course?.chapters.length}</li>
                        <li><strong>Total Lessons:</strong> {lessons}</li>
                    </ul>
                </div>
                <div className="p-6 rounded-lg shadow-md mt-6 text-center">
                    <div className="mb-2">More inquiry about course:</div>
                    <div className="text-purple-600 text-lg font-bold">{course?.instructor.email}</div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
