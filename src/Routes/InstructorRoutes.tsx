import { Route, Routes } from 'react-router-dom'
import { InstructorIsLoggedIn, InstructorIsLoggedOut } from '../componants/Protuctor'
import InstructorSignIn from '../pages/instructor/InstructorSignIn'
import InstructorSignUp from '../pages/instructor/InstructorSignUp'
import HomePage from '../pages/instructor/homePage'
import AddCourse from '../pages/instructor/AddCourse'

function InstructorRoutes() {
    return (
        <Routes>
            <Route path='' element={<InstructorIsLoggedOut />}>
                <Route path='/signIn' element={<InstructorSignIn />} />
                <Route path='/signUp' element={<InstructorSignUp />} />
            </Route>
            <Route path='/dashboard' element={<HomePage />} />
            <Route path='/managecourses' element={<AddCourse />} />
            <Route path='/' element={<InstructorIsLoggedIn />}>
            </Route>
        </Routes>
    )
}

export default InstructorRoutes
