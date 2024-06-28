import { Routes, Route } from 'react-router-dom';
import AdminSignIn from '../pages/admin/AdminSignIn';
import { AdminIsLoggedIn, AdminIsLoggedOut } from '../componants/Protuctor';
import AdminDashboard from '../pages/admin/AdminDashboard';
import StudentList from '../pages/admin/studentList';
import CategoryManagement from '../pages/admin/CategoryManagement';
import InstructorsList from '../pages/admin/InstructorList';
import Error400admin from '../pages/admin/Error400';
import CourseVerification from '../pages/admin/CourseVerification';



function AdminRoute() {
    return (
        <Routes>
            <Route path="" element={<AdminIsLoggedOut />} >
                <Route path="/signIn" element={<AdminSignIn />} />
            </Route>

            <Route path='/' element={<AdminIsLoggedIn />} >
                <Route path='/dashboard' element={<AdminDashboard />} />
                <Route path='/students' element={<StudentList />} />
                <Route path='/instructors' element={<InstructorsList />} />
                <Route path='/courses' element={<CourseVerification />} />
                <Route path='/categories' element={<CategoryManagement />} />
                
                <Route path='/*' element={<Error400admin />} />
            </Route>

        </Routes>
    );
}

export default AdminRoute;
