
import { useParams } from 'react-router-dom'
import StudentLayout from '../../components/StudentLayOut'
import CoursePage from '../../components/coursePage'
import { useEffect, useState } from 'react';
import { getCourse } from '../../services/student/api';

function Course() {
    const { courseId } = useParams()
    const [course, setCourse] = useState(null)
;
    useEffect(() => {
        getCourse({ courseId }).then((result) => {
            setCourse(result.course)
        })
    },[])

    return (
        <StudentLayout>
            <CoursePage course={course} />
        </StudentLayout>
    )
}

export default Course
