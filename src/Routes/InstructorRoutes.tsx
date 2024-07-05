import { Route, Routes } from 'react-router-dom'
import { InstructorIsLoggedIn, InstructorIsLoggedOut } from '../components/Protuctor'
import InstructorSignIn from '../pages/instructor/InstructorSignIn'
import InstructorSignUp from '../pages/instructor/InstructorSignUp'
import HomePage from '../pages/instructor/homePage'
import AddCourse from '../pages/instructor/AddCourse'
import Error404 from '../pages/instructor/Error404'
import EditCourse from '../pages/instructor/EditCourse'
import IndividualCourse from '../pages/instructor/IndividualCourse'
import ForgotPassword from '../pages/instructor/ForgotPassword'
import Settings from '../pages/instructor/Settings'
import Chat from '../pages/instructor/Chat'


function InstructorRoutes() {
    return (
        <Routes>
            <Route path='/*' element={<Error404 />} />

            <Route path='' element={<InstructorIsLoggedOut />}>
                <Route path='/signIn' element={<InstructorSignIn />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/signUp' element={<InstructorSignUp />} />
            </Route>

            <Route path='/' element={<InstructorIsLoggedIn />}>
                <Route path='/dashboard' element={<HomePage />} />
                <Route path='/add-course' element={<AddCourse />} />
                <Route path='/edit-course' element={<EditCourse />} />
                <Route path='/individualCourse' element={<IndividualCourse />} />
                <Route path='/message' element={<Chat/>} />
                <Route path='/profile' element={<Settings />}>
                    <Route path='/profile/individualCourse' element={<IndividualCourse />} />

                </Route>
            </Route>
        </Routes>
    )
}

export default InstructorRoutes
