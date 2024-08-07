import { useEffect, useState } from 'react';
import ShowCard from '../../components/ShowCard';
import { listBlockedCourses, listCourses, listVerifiedCourses } from '../../services/instructor/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CircularProgress } from '@mui/material';
import { Course } from '../../components/ShowCard';

function CourseList() {
    const instructor = useSelector((state: RootState) => state.instructor.email);
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [blockedCourses, setBlockedCourses] = useState<Course[]>([]);
    const [verifiedCourses, setVerifiedCourses] = useState<Course[]>([]);
    const [activeSection, setActiveSection] = useState('verified');
    const [loading, setLoading] = useState(false);

    const fetchCourses = async (section: string) => {
        setLoading(true);
        try {
            let coursesData;
            if (section === 'enrolled') {
                const enrolledData = await listCourses({ instructorId: instructor })                
                coursesData = enrolledData.courses;
            } else if (section === 'blocked') {
                const blockedData = await listBlockedCourses(instructor)
                coursesData = blockedData.courses;
            } else if (section === 'verified') {
                const verifiedData = await listVerifiedCourses(instructor)
                coursesData = verifiedData.courses;
            }

            // Transform data to match Course type
            const courses: Course[] = coursesData.map((course) => ({
                ...course,
                // Ensure required properties exist
                lessons: course.lessons || 0, // Default to 0 if not provided
            }));

            if (section === 'enrolled') setEnrolledCourses(courses);
            else if (section === 'blocked') setBlockedCourses(courses);
            else if (section === 'verified') setVerifiedCourses(courses);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        fetchCourses(section);
    };

    useEffect(() => {
        fetchCourses('verified');
    }, []);

    const renderCoursesSection = (title: string, courses: Course[]) => (
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
                            {courses.length > 0 ? courses.map((course) => (
                                <ShowCard
                                    key={course._id} // Use _id as key to ensure uniqueness
                                    title={course.title}
                                    description={course.subtitle}
                                    imageUrl={course.thumbnail}
                                    videos={course.triler}
                                    course={course}
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
