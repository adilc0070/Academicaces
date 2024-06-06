import React from 'react';
import { useLocation } from 'react-router-dom';
import InstructorLayout from '../../componants/InstructorsLayout'; 
import CourseEdit from '../../componants/CourseEdit'; 
function EditCourse() {
    const location = useLocation();
    const course = location.state?.course;

    console.log("Course data received:", course);

    if (!course) {
        return <div>No course data available</div>;
    }

    return (
        <InstructorLayout>
            <CourseEdit course={course} />
        </InstructorLayout>
    );
}

export default EditCourse;
