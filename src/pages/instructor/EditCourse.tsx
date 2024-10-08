import { useLocation } from 'react-router-dom';
import InstructorLayout from '../../components/InstructorsLayout';
import CourseEdit from '../../components/CourseEdit';
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
