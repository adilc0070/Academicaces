import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/student/SignIn';
import SignUp from '../pages/student/SignUp';
import { StudentIsLoggedIn, StudentIsLoggedOut } from '../componants/Protuctor';
import HomePage from '../pages/student/HomePage';


function UserRoute() {
    return (
        <Routes>
            <Route path='' element={<StudentIsLoggedOut />} >
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />

            </Route>
            <Route path="/" element={<StudentIsLoggedIn />} >
                <Route path='/home' element={<HomePage />} />
                
            </Route>
        </Routes>
    );
}

export default UserRoute;
