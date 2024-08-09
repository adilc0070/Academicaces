import { Route, Routes, useLocation } from 'react-router-dom'
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


                <Route path='/signIn' element={
                    <InstructorIsLoggedOut >
                        <InstructorSignIn />
                    </InstructorIsLoggedOut>
                } />
                <Route path='/forgotPassword' element={
                    <InstructorIsLoggedOut >
                        <ForgotPassword />
                    </InstructorIsLoggedOut>
                } />
                <Route path='/signUp' element={
                    <InstructorIsLoggedOut >
                        <InstructorSignUp />
                    </InstructorIsLoggedOut>
                } />

                <Route path='/dashboard' element={
                    <InstructorIsLoggedIn >
                        <HomePage />
                    </InstructorIsLoggedIn>
                } />
                <Route path='/add-course' element={
                    <InstructorIsLoggedIn >
                        <AddCourse />
                    </InstructorIsLoggedIn>
                } />
                <Route path='/add-assignment' element={
                    <InstructorIsLoggedIn >
                        < AddAssignments />
                    </InstructorIsLoggedIn>
                } />
                <Route path='/edit-course' element={
                    <InstructorIsLoggedIn >
                        <EditCourse />
                    </InstructorIsLoggedIn>
                } />
                <Route path='/individualCourse' element={
                    <InstructorIsLoggedIn >
                        <IndividualCourse />
                    </InstructorIsLoggedIn>
                } />
                <Route path='/message' element={
                    <InstructorIsLoggedIn >
                        <Chat />
                    </InstructorIsLoggedIn>
                } />
                <Route path='/profile' element={
                    <InstructorIsLoggedIn >
                        <Settings />
                    </InstructorIsLoggedIn>
                } />

                <Route path='*' element={
                    <InstructorIsLoggedIn >
                        <Error404 />
                    </InstructorIsLoggedIn>
                } />
            </Routes>
        </>
    )
}

export default InstructorRoutes
