import { Route, Routes, useLocation } from 'react-router-dom'
import { InstructorIsLoggedIn, InstructorIsLoggedOut } from '../components/Protuctor'
import InstructorSignIn from '../pages/instructor/InstructorSignIn'
import InstructorSignUp from '../pages/instructor/InstructorSignUp'
import HomePage from '../pages/instructor/homePage'
import AddCourse from '../pages/instructor/AddCourse'
// import Error404 from '../pages/instructor/Error404'
import EditCourse from '../pages/instructor/EditCourse'
import IndividualCourse from '../pages/instructor/IndividualCourse'
import ForgotPassword from '../pages/instructor/ForgotPassword'
import Settings from '../pages/instructor/Settings'
import Chat from '../pages/instructor/Chat'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import AddAssignments from '../pages/instructor/AddAssignment'


function InstructorRoutes() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {loading && <Loader />}
            <Routes>

                <Route path='' element={<InstructorIsLoggedOut />}>
                    <Route path='/signIn' element={<InstructorSignIn />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/signUp' element={<InstructorSignUp />} />
                </Route>

                <Route path='/' element={<InstructorIsLoggedIn />}>
                    <Route path='/dashboard' element={<HomePage />} />
                    <Route path='/add-course' element={<AddCourse />} />
                    <Route path='/add-assignment' element={< AddAssignments />} />
                    <Route path='/edit-course' element={<EditCourse />} />
                    <Route path='/individualCourse' element={<IndividualCourse />} />
                    <Route path='/message' element={<Chat />} />
                    <Route path='/profile' element={<Settings />}>
                        <Route path='/profile/individualCourse' element={<IndividualCourse />} />

                    </Route>
                </Route>
                {/* <Route path='*' element={<Error404 />} /> */}
            </Routes>
        </>
    )
}

export default InstructorRoutes
