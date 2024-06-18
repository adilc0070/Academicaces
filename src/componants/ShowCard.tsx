import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blocked, Verified } from './Logo';
import { deleteCourseApi } from '../services/instructor/api';
import { toast } from 'sonner';

function ShowCard({ title, description, imageUrl, course }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeChapterIndex, setActiveChapterIndex] = useState(null);
    const [activeLessonIndex, setActiveLessonIndex] = useState(null);
    const navigate = useNavigate();
    console.log('course', course);
    
    useEffect(() => {   
        const handleOutsideClick = (event) => {
            if (modalOpen && !event.target.closest('.modal-content')) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [modalOpen]);

    const handleEditClick = () => {
        navigate('/instructor/edit-course', { state: { course } });
    };
    const handleDeleteClick = () => {
        setModalOpen(false);
        deleteCourseApi(course._id,course.isBlock).then((result) => {
            console.log(result);
            toast.success(result.message);
            navigate('/instructor/courses'); 
        })
    };

    const toggleChapterAccordion = (index) => {
        setActiveChapterIndex(activeChapterIndex === index ? null : index);
    };

    const toggleLessonAccordion = (index) => {
        setActiveLessonIndex(activeLessonIndex === index ? null : index);
    };

    return (
        <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">{course.category.name}</span>
                    {course.isBlocked ? (
                        <button className="text-gray-400 hover:text-gray-600">
                            <Blocked />
                        </button>
                    ) : (
                        <button onClick={handleEditClick} className="text-gray-400 hover:text-gray-600">
                            <Verified />
                        </button>
                    )}
                </div>
                <h2 className="text-xl font-semibold my-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                        <span className="block">{course.lessons} Lesson</span>
                        <span className="block">{course.instructor.name}</span>
                    </div>
                    <div className="text-xl font-bold text-green-500">${course.price}</div>
                </div>
                <div className="mt-4">
                    <button onClick={() => setModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full">View Details</button>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full overflow-y-auto max-h-full modal-content max-md:max-w-xs">
                        <div className="flex flex-col lg:flex-row">
                            <img
                                className="lg:w-1/3 w-full object-cover rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg"
                                src={course.thumbnail}
                                alt={course.title}
                            />
                            <div className="p-6 lg:w-2/3">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h2>
                                <p className="text-lg font-semibold text-gray-600 mb-4">{course.subtitle}</p>
                                <p className="text-gray-700 mb-2"><strong>Category:</strong> {course.category.name}</p>
                                <p className="text-gray-700 mb-2"><strong>Instructor:</strong> {course.instructor.name}</p>
                                <p className="text-gray-700 mb-2"><strong>Price:</strong> ${course.price}</p>
                                <p className="text-gray-700 mb-2"><strong>Created At:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700 mb-4"><strong>Verified:</strong> {course.verified ? 'Yes' : 'No'}</p>

                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Chapters</h3>
                                    {course.chapters.map((chapter, chapterIndex) => (
                                        <div key={chapter._id} className="mb-2">
                                            <button
                                                className="flex justify-between items-center w-full text-left p-2 border rounded"
                                                onClick={() => toggleChapterAccordion(chapterIndex)}
                                            >
                                                <span className="text-gray-700"><strong>Chapter {chapterIndex + 1}:</strong> {chapter.name}</span>
                                                <span>{activeChapterIndex === chapterIndex ? '-' : '+'}</span>
                                            </button>
                                            {activeChapterIndex === chapterIndex && (
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
                                                                            <p className='text-gray-800 mb-2'>
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
                                                                                            className="w-full h-48 rounded border  object-cover border-gray-300 shadow-sm"
                                                                                            rel="noopener noreferrer"
                                                                                        />
                                                                                    </li>
                                                                                )}
                                                                            </ul>
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

                                <div className="border-t border-gray-200 pt-4">
                                    <iframe
                                        className="w-full h-48 rounded"
                                        src={course.triler}
                                        title={course.title}
                                        allowFullScreen
                                    />
                                </div>

                                <div className="flex justify-end mt-4 space-x-2">
                                    <button
                                        onClick={handleEditClick}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-200 ease-in-out"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        id='delete-course'
                                        // Uncomment and define handleDeleteClick to enable delete functionality
                                        onClick={handleDeleteClick}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-200 ease-in-out"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowCard;
