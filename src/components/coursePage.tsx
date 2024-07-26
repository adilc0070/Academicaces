import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { buyCourse, getAssignment, isEnrolled, listReviews, postReply, postReview } from '../services/student/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CoursePage = ({ course }) => {
    const [courseId, setCourseId] = useState('');
    const [isEnrolledStatus, setIsEnrolledStatus] = useState(false);
    const [activeTab, setActiveTab] = useState('curriculum');
    const [activeChapterIndex, setActiveChapterIndex] = useState(null);
    const [activeLessonIndex, setActiveLessonIndex] = useState(null);
    const [reviews, setReviews] = useState([]);
    const student = useSelector((state: RootState) => state.student.email);
    const [assignments, setAssignments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFileUrl, setCurrentFileUrl] = useState('');

    useEffect(() => {
        setCourseId(course?._id);
    }, [course]);

    useEffect(() => {
        if (courseId) {
            listReviews(courseId).then((result) => {
                setReviews(result.data.review);
                console.log('Reviews:', result);
            });
        }
    }, [courseId, activeTab]);

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

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async () => {
        const response = await postReview({ data: { id: student, rating, feedback, courseId } });
        console.log(response);
    };
    const [reply, setReply] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };

    const handleReplySubmit = async (reviewId) => {
        const response = await postReply({ reviewId, comment: reply, studentId: student });
        console.log('Reply submitted:', response);
        setReply('');
        setReplyingTo(null);
        listReviews(courseId).then((result) => {
            console.log('Reviews:', result);

            setReviews(result.data.review);
        });
    };
    const renderReviewsTab = () => (
        <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li key={review._id} className="border p-4 rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                                <img
                                    src={review?.studentID?.profilePhoto ? review?.studentID?.profilePhoto : `https://ui-avatars.com/api/?name=${review.studentID.userName}&background=random`}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <span className="font-semibold">{review?.studentID?.userName}</span>
                                <span className="ml-2 text-yellow-500">
                                    {Array(review?.rating).fill('⭐').join('')}
                                </span>
                            </div>
                            <p className="text-gray-700">{review?.comment}</p>
                            {review.replies && review.replies.length > 0 && (
                                <ul className="pl-8 mt-4 space-y-2">
                                    {review.replies.map((reply) => (
                                        <li key={reply._id} className="border p-3 rounded-lg shadow-sm">
                                            <div className="flex items-center mb-2">
                                                <img
                                                    src={reply?.studentID?.profilePhoto ? reply?.studentID?.profilePhoto : `https://ui-avatars.com/api/?name=${reply.studentID.userName}&background=random`}
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-full mr-4"
                                                />
                                                <span className="font-semibold">{reply?.studentID?.userName}</span>
                                            </div>
                                            <p className="text-gray-700">{reply.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                onClick={() => setReplyingTo(review._id)}
                                className="text-blue-500 hover:underline"
                            >
                                Reply
                            </button>
                            {replyingTo === review._id && (
                                <div className="mt-4">
                                    <textarea
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Write a reply..."
                                        value={reply}
                                        onChange={handleReplyChange}
                                    />
                                    <button
                                        onClick={() => handleReplySubmit(review._id)}
                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        Submit Reply
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );

    useEffect(() => {
        getAssignment(courseId).then((result) => {
            setAssignments(result.assignment);
        })
    }, [courseId]);
    const handleDownload = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        const filename = fileUrl.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };


    const Modal = ({ isOpen, onClose, fileUrl }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-4xl w-full h-full">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                    >
                        close
                    </button>
                    <iframe
                        src={fileUrl}
                        title="Assignment Content"
                        className="w-full h-96"

                    />
                </div>
            </div>
        );
    };


    const renderAssignmentsTab = () => {

        const openModal = (fileUrl) => {
            setCurrentFileUrl(fileUrl);
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
            setCurrentFileUrl('');
        };

        return (
            <div className="p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
                {assignments.length > 0 ? (
                    <ul className="space-y-4">
                        {assignments.map((assignment) => (
                            <li key={assignment._id} className="border p-4 rounded-lg shadow-sm">
                                <div className="mb-2">
                                    <span className="font-semibold">{assignment.name}</span>
                                </div>
                                <p className="text-gray-700 mb-2">{assignment.instructions}</p>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleDownload(assignment.file)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Download
                                    </button>
                                    <button
                                        onClick={() => openModal(assignment.file)}
                                        className="text-green-500 hover:underline"
                                    >
                                        View
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No assignments available.</p>
                )}

                {/* Render the Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    fileUrl={currentFileUrl}
                />
            </div>
        );
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
                                                                        {isEnrolledStatus && lesson.files && (
                                                                            <a
                                                                                href={lesson.files}
                                                                                download
                                                                                className="text-blue-600 hover:underline"
                                                                            >
                                                                                Download Files
                                                                            </a>
                                                                        )}
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
            case 'reviews':
                return renderReviewsTab();
            case 'assignments':
                return renderAssignmentsTab();
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
                        <span className="px-3 py-1 bg-sky-200 text-sky-800 rounded-lg font-semibold">{course?.category.name}</span>
                        <span className="px-3 py-1 bg-red-200 text-red-800 rounded-lg font-semibold">{course?.level}</span>
                    </div>
                    <h2 className="text-3xl font-semibold mb-4">{course?.name}</h2>
                    <div className="flex items-center text-gray-700 mb-4">
                        <span className="flex items-center">
                            <span className="mr-1">{course?.rating}</span>
                            <span>⭐</span>
                            <span>({reviews.length} reviews)</span>
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
                        <button
                            className={`py-2 px-4 ${activeTab === 'reviews' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === 'assignments' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('assignments')}
                        >
                            Assignments
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
                        <span className="text-gray-500 line-through ml-2">₹{course?.price + (course?.price / 10)}</span>
                        <span className="text-2xl font-bold text-purple-600">₹{course?.price}</span>
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
                {isEnrolledStatus && (
                    <div className="max-w-sm mx-auto p-6 rounded-lg shadow-lg mt-6 bg-white">
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Rate this Course</h2>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600">We value your feedback. Please take a moment to rate the course.</p>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className={`w-8 h-8 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        onClick={() => handleRatingChange(star)}
                                    >
                                        <path d="M12 .587l3.668 7.568L24 9.423l-6 5.853L19.335 24 12 19.897 4.665 24 6 15.276 0 9.423l8.332-1.268z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <textarea
                                className="w-full p-2 border rounded-md"
                                placeholder="Leave your feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700"
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursePage;
