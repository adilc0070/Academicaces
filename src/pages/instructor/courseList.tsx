import React, { useEffect, useState } from 'react';
import InstructorLayout from '../../componants/InstructorsLayout'; 
import ShowCard from '../../componants/ShowCard'; 
import { listCourses } from '../../services/instructor/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function CourseList() {
    const instructor = useSelector((state: RootState) => state.instructor.email);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await listCourses(instructor);
                console.log(coursesData)
                setCourses(coursesData.courses);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };

        fetchCourses();
    }, [instructor]);

    return (
        <InstructorLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
        </InstructorLayout>
    );
}

export default CourseList;
