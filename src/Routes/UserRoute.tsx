import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignIn from '../pages/student/SignIn';
import SignUp from '../pages/student/SignUp';
import { StudentIsLoggedIn, StudentIsLoggedOut } from '../components/Protuctor';
import HomePage from '../pages/student/HomePage';
import PageNotFound from '../pages/student/PageNotFound';
import CourseList from '../pages/student/CourseList';
import Meet from '../pages/student/Meet';
import SuccessPage from '../components/SuccessPage';
import CancelPage from '../components/CancelPage';
import MyCourse from '../pages/student/MyCourse';
import Course from '../pages/student/Course';
import Chat from '../pages/student/Chat';
import PurchaseHistory from '../pages/student/PurchaseHistory';
import Loader from '../components/Loader';
import Assignments from '../pages/student/Assignments';
import LandingPage from '../pages/LandingPage';

function UserRoute() {
    console.log('user route');

    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {loading && <Loader />}
            <Routes>
                <Route path="" element={<LandingPage />} />
                <Route path='/signIn' element={<StudentIsLoggedOut>
                    <SignIn />
                </StudentIsLoggedOut>} />
                <Route path='/signUp' element={<StudentIsLoggedOut>
                    <SignUp />
                </StudentIsLoggedOut>} />

                <Route path='/home' element={<StudentIsLoggedIn>
                    <HomePage />
                </StudentIsLoggedIn>} />
                <Route path='/courses' element={<StudentIsLoggedIn>
                    <CourseList />
                </StudentIsLoggedIn>} />
                <Route path='/assignments' element={<StudentIsLoggedIn>
                    <Assignments />
                </StudentIsLoggedIn>} />
                <Route path='/my-courses' element={<StudentIsLoggedIn>
                    <MyCourse />
                </StudentIsLoggedIn>} />
                <Route path='/purchases' element={<StudentIsLoggedIn>
                    <PurchaseHistory />
                </StudentIsLoggedIn>} />
                <Route path='/course/:courseId' element={<StudentIsLoggedIn>
                    <Course />
                </StudentIsLoggedIn>} />
                <Route path='/meet' element={<StudentIsLoggedIn>
                    <Meet />
                </StudentIsLoggedIn>} />
                <Route path='/success' element={<StudentIsLoggedIn>
                    <SuccessPage />
                </StudentIsLoggedIn>} />
                <Route path='/cancel' element={<StudentIsLoggedIn>
                    <CancelPage />
                </StudentIsLoggedIn>} />
                <Route path='/message' element={<StudentIsLoggedIn>
                    <Chat />
                </StudentIsLoggedIn>} />
                <Route path='/*' element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default UserRoute;
