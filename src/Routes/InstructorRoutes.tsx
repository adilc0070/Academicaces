import { Route, Routes } from 'react-router-dom'
import { InstructorIsLoggedIn, InstructorIsLoggedOut } from '../componants/Protuctor'
import InstructorSignIn from '../pages/instructor/InstructorSignIn'
import InstructorSignUp from '../pages/instructor/InstructorSignUp'
import HomePage from '../pages/instructor/homePage'
import AddCourse from '../pages/instructor/AddCourse'
import Error404 from '../pages/instructor/Error404'
import CourseList from '../pages/instructor/courseList'
import EditCourse from '../pages/instructor/EditCourse'
import IndividualCourse from '../pages/instructor/IndividualCourse'

function InstructorRoutes() {
    return (
        <Routes>
            <Route path='/*' element={<Error404 />} />
            
            <Route path='' element={<InstructorIsLoggedOut />}>
                <Route path='/signIn' element={<InstructorSignIn />} />
                <Route path='/signUp' element={<InstructorSignUp />} />
            </Route>

            <Route path='/' element={<InstructorIsLoggedIn />}>
                <Route path='/dashboard' element={<HomePage />} />
                <Route path='/managecourses' element={<AddCourse />} />
                <Route path='/courses' element={<CourseList />} />
                <Route path='/edit-course' element={<EditCourse/>}/>
                <Route path='/individualCourse' element={<IndividualCourse/>}/>
            </Route>
        </Routes>
    )
}

export default InstructorRoutes
