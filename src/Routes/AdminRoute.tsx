import { Routes, Route } from 'react-router-dom';
import AdminSignIn from '../pages/admin/AdminSignIn';
import { AdminIsLoggedOut } from '../componants/Protuctor';

function AdminRoute() {
    return (
        <Routes>
            <Route path="/" element={<AdminIsLoggedOut />} >
                <Route path="/admin/signIn" element={<AdminSignIn />} />
            </Route>

        </Routes>
    );
}

export default AdminRoute;
