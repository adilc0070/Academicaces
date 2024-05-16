import { Route, Routes } from 'react-router-dom'
import { InstructorIsLoggedIn, InstructorIsLoggedOut } from '../componants/Protuctor'
import InstructorSignIn from '../pages/instructor/InstructorSignIn'
import InstructorSignUp from '../pages/instructor/InstructorSignUp'

function InstructorRoutes() {
    return (
        <Routes>
            <Route path='' element={<InstructorIsLoggedOut />}>
                <Route path='/signIn' element={<InstructorSignIn />} />
                <Route path='/signUp' element={<InstructorSignUp />} />
            </Route>
            <Route path='/' element={<InstructorIsLoggedIn />}>

            </Route>
        </Routes>
    )
}

export default InstructorRoutes
