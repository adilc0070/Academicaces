import { Routes, Route } from 'react-router-dom';
import AdminSignIn from '../pages/admin/AdminSignIn';
import { AdminIsLoggedIn, AdminIsLoggedOut } from '../componants/Protuctor';
import AdminDashboard from '../pages/admin/AdminDashboard';

function AdminRoute() {
    return (
        <Routes>
            <Route path="" element={<AdminIsLoggedOut />} >
                <Route path="/signIn" element={<AdminSignIn />} />
            </Route>
            <Route path='/' element={<AdminIsLoggedIn />} >
                <Route path='/dashboard' element={<AdminDashboard/>} />
            </Route>

        </Routes>
    );
}

export default AdminRoute;
