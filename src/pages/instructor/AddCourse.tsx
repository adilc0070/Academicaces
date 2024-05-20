import React from 'react'
import InstructorLayout from '../../componants/InstructorsLayout'
import CourseAddingForm from '../../componants/CourseAddingForm'
import CourseCurriculum from '../../componants/CourseCurriculum'

function AddCourse() {
    return (
        <InstructorLayout>
            {/* <CourseAddingForm /> */}
            <CourseCurriculum />
        </InstructorLayout>
    )
}

export default AddCourse
