import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignIn from '../pages/student/SignIn';
import SignUp from '../pages/student/SignUp';
import { StudentIsLoggedIn, StudentIsLoggedOut } from '../components/Protuctor';
import HomePage from '../pages/student/HomePage';
// import PageNotFound from '../pages/student/PageNotFound';
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

function UserRoute() {
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
                <Route path='' element={<StudentIsLoggedOut />} >
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/signUp" element={<SignUp />} />
                </Route>
                <Route path="/" element={<StudentIsLoggedIn />} >
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/courses' element={<CourseList />} />
                    <Route path='/assignments' element={<Assignments />} />
                    <Route path='/my-courses' element={<MyCourse />} />
                    <Route path='/purchases' element={<PurchaseHistory />} />
                    <Route path='/course/:courseId/' element={<Course />} />
                    <Route path='/meet' element={<Meet />} />
                    <Route path='/success' element={<SuccessPage />} />
                    <Route path='/cancel' element={<CancelPage />} />
                    <Route path='/message' element={<Chat />} />
                </Route>
                {/* <Route path='/*' element={<PageNotFound />} /> */}
            </Routes>
        </>
    );
}

export default UserRoute;
