import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/student/SignIn';
import SignUp from '../pages/student/SignUp';
import { StudentIsLoggedIn, StudentIsLoggedOut } from '../componants/Protuctor';
import HomePage from '../pages/student/HomePage';
import PageNotFound from '../pages/student/PageNotFound';
import CourseList from '../pages/student/CourseList';
import Meet from '../pages/student/Meet';
import SuccessPage from '../componants/SuccessPage';
import CancelPage from '../componants/CancelPage';
import MyCourse from '../pages/student/MyCourse';
import Course from '../pages/student/Course';

function UserRoute() {
    return (
        <Routes>
            <Route path='' element={<StudentIsLoggedOut />} >
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signUp" element={<SignUp />} />

            </Route>
            <Route path='/*' element={<PageNotFound />} />
            <Route path="/" element={<StudentIsLoggedIn />} >
                <Route path='/home' element={<HomePage />} />
                <Route path='/courses' element={<CourseList/>} />
                <Route path='/my-courses' element={<MyCourse/>} />
                <Route path='/course/:courseId' element={<Course/>} />
                <Route path='/meet' element={<Meet/>} />
                <Route path='/success' element={<SuccessPage />} />
                <Route path='/cancel' element={<CancelPage />} />
            </Route>
        </Routes>
    );
}

export default UserRoute;
