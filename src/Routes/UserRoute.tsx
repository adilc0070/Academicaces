import { Routes, Route } from 'react-router-dom';
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
                <Route path='/purchases' element={<PurchaseHistory/>} />
                <Route path='/course/:courseId/' element={<Course/>} />
                <Route path='/meet' element={<Meet/>} />
                <Route path='/success' element={<SuccessPage />} />
                <Route path='/cancel' element={<CancelPage />} />
                <Route path='/message' element={<Chat />} />
            </Route>
        </Routes>
    );
}

export default UserRoute;
