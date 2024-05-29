import { useEffect, useState } from 'react';
import Logo from '../../componants/Logo';
import Test from '../../componants/Test';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminLogOut } from '../../store/slice/adminSlice';
import { blockStudentApi, listStudentsApi } from '../../services/admin/api';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../componants/AdminLayout';
import DashBoard from '../../componants/DashBoard';

function AdminDashboard() {
    
    return (
        <AdminLayout>
            <DashBoard/>
        </AdminLayout>
    );
}

export default AdminDashboard
