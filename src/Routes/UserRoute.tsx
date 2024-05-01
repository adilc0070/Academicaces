import { Routes, Route } from 'react-router-dom';
import SignIn from '../componants/SignIn';
import SignUp from '../componants/SignUp';

function UserRoute() {
    return (
        <Routes>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
    );
}

export default UserRoute;
