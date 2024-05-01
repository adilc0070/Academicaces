import { Routes, Route } from 'react-router-dom';
import SignIn from '../componants/SignIn';
import SignUp from '../componants/SignUp';

function AdminRoute() {
    return (
        <Routes>
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            <Route path="/admin/signIn" element={<SignIn />} />
            <Route path="/admin/signUp" element={<SignUp />} />
        </Routes>
    );
}

export default AdminRoute;
