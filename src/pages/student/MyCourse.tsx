import { useEffect, useState } from 'react'
import StudentLayout from '../../components/StudentLayOut'
import CourseCardT1 from '../../components/CourseCardT1'
import { mycourses } from '../../services/student/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

function MyCourse() {
    const student = useSelector((state: RootState) => state.student.email)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        mycourses({ student }).then((result) => {
            setCourses(result.myCourse)
        })
    }, [])
    return (
        <StudentLayout>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.length > 0 ? courses.map((course, index) => (
                        < CourseCardT1 key={index} {...course} />
                    )) : (
                        <p>No courses found.</p>
                    )}
                </div>
            </div>
        </StudentLayout>
    )
}

export default MyCourse
