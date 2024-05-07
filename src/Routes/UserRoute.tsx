import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/student/SignIn';
import SignUp from '../pages/student/SignUp';
// import OTPVerification from '../componants/OTPVerification';
import Test from '../pages/Test';
import { StudentIsLoggedIn, StudentIsLoggedOut } from '../componants/Protuctor';

function UserRoute() {
    return (
        <Routes>
            <Route path='' element={<StudentIsLoggedOut/>} >
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                {/* <Route path="/otp/:_id" element={<OTPVerification />} /> */}
                {/* <Route path="/helloworld" element={<Test />} /> */}
            </Route>
            <Route path="/" element={<StudentIsLoggedIn/>} >
                <Route path="/home" element={<Test />} />
            </Route>
        </Routes>
    );
}

export default UserRoute;
