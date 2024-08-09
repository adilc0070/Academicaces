import { Routes, Route } from 'react-router-dom';
import AdminSignIn from '../pages/admin/AdminSignIn';
import { AdminIsLoggedIn, AdminIsLoggedOut } from '../components/Protuctor';
import AdminDashboard from '../pages/admin/AdminDashboard';
import StudentList from '../pages/admin/studentList';
import CategoryManagement from '../pages/admin/CategoryManagement';
import InstructorsList from '../pages/admin/InstructorList';
import Error400admin from '../pages/admin/Error400';
import CourseVerification from '../pages/admin/CourseVerification';



function AdminRoute() {
    return (
        <Routes>
            <Route path="/signIn" element={<AdminIsLoggedOut >
                <AdminSignIn />
            </AdminIsLoggedOut>} />
            <Route path='/dashboard' element={
                <AdminIsLoggedIn >
                    <AdminDashboard />
                </AdminIsLoggedIn>
            } />
            <Route path='/students' element={
                <AdminIsLoggedIn >
                    <StudentList />
                </AdminIsLoggedIn>
            } />
            <Route path='/instructors' element={
                <AdminIsLoggedIn >
                    <InstructorsList />
                </AdminIsLoggedIn>
            } />
            <Route path='/courses' element={
                <AdminIsLoggedIn >
                    <CourseVerification />
                </AdminIsLoggedIn>
            } />
            <Route path='/categories' element={
                <AdminIsLoggedIn >
                    <CategoryManagement />
                </AdminIsLoggedIn>
            } />

            <Route path='/*' element={
                <AdminIsLoggedIn >
                    <Error400admin />
                </AdminIsLoggedIn>
            } />

        </Routes>
    );
}

export default AdminRoute;
