import { useEffect, useState } from 'react';
import ShowCard from '../../componants/ShowCard';
import { listBlockedCourses, listCourses, listVerifiedCourses } from '../../services/instructor/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CircularProgress } from '@mui/material';

function CourseList() {
    const instructor = useSelector((state: RootState) => state.instructor.email);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [blockedCourses, setBlockedCourses] = useState([]);
    const [verifiedCourses, setVerifiedCourses] = useState([]);
    const [activeSection, setActiveSection] = useState('verified');
    const [loading, setLoading] = useState(false);

    const fetchCourses = async (section) => {
        setLoading(true);
        try {
            if (section === 'enrolled') {
                const enrolledData = await listCourses(instructor);
                setEnrolledCourses(enrolledData.courses);
            } else if (section === 'blocked') {
                const blockedData = await listBlockedCourses(instructor);
                setBlockedCourses(blockedData.courses);
            } else if (section === 'verified') {
                const verifiedData = await listVerifiedCourses(instructor);
                setVerifiedCourses(verifiedData.courses);
            }
        } catch (error) {
            console.error("Error fetching courses: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        fetchCourses(section);
    };
    useEffect(() => {
        fetchCourses('verified');
    }, [])

    const renderCoursesSection = (title, courses) => (
        <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-[400px]">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                            {courses.length > 0 ? courses.map((course, index) => (
                                <ShowCard
                                    key={index}
                                    title={course.title}
                                    description={course.subtitle}
                                    imageUrl={course.thumbnail}
                                    videos={course.triler}
                                    course={course}  // Pass the entire course object
                                />
                            )) : (
                                <p>No courses found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-center space-x-4 py-4">
                <button
                    className={`px-4 py-2 rounded ${activeSection === 'verified' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                    onClick={() => handleSectionChange('verified')}
                >
                    Verified Courses
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeSection === 'enrolled' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                    onClick={() => handleSectionChange('enrolled')}
                >
                    All Courses
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeSection === 'blocked' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                    onClick={() => handleSectionChange('blocked')}
                >
                    Blocked Courses
                </button>
            </div>

            {activeSection === 'verified' && renderCoursesSection("Verified Courses", verifiedCourses)}
            {activeSection === 'enrolled' && renderCoursesSection("All Courses", enrolledCourses)}
            {activeSection === 'blocked' && renderCoursesSection("Blocked Courses", blockedCourses)}
        </div>
    );
}

export default CourseList;
