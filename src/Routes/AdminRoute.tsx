import { Routes, Route } from 'react-router-dom';
import AdminSignIn from '../pages/admin/AdminSignIn';

function AdminRoute() {
    return (
        <Routes>
            <Route path="/admin/signIn" element={<AdminSignIn />} />
            {/* <Route path="/admin/dash" element={<Dash />} /> */}
        </Routes>
    );
}

export default AdminRoute;
