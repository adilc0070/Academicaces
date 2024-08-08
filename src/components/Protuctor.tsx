import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router-dom"

export function AdminIsLoggedIn() {

    const adminId = useSelector((state: RootState) => state?.admin?.email)
    const adminToken = localStorage.getItem('adminToken')

    return (
        Boolean(adminId) && Boolean(adminToken) ? <Outlet /> : <Navigate to='/admin/signIn' />
    )
}


export function AdminIsLoggedOut() {

    const adminId = useSelector((state: RootState) => state?.admin?.email)
    const adminToken = localStorage.getItem('adminToken')
    return (
        Boolean(adminId) && Boolean(adminToken)  ? <Navigate to='/admin/dashboard' /> : <Outlet />
    )
}


export function StudentIsLoggedIn() {

    const userId = useSelector((state: RootState) => state?.student?.email)
    const userToken = localStorage.getItem('studentToken')
    console.log('user logined aaan ');
    
    return (
        Boolean(userId) && Boolean(userToken) ? <Outlet /> : <Navigate to='/signIn' />
    )
}


export function StudentIsLoggedOut() {

    const userId = useSelector((state: RootState) => state?.student?.email)
    const userToken = localStorage.getItem('studentToken')
    console.log('user logined alla ');
    

    return (
        Boolean(userId) && Boolean(userToken) ? <Navigate to='/home' /> : <Outlet />
    )
}


export function InstructorIsLoggedIn() {

    const instructorId = useSelector((state: RootState) => state?.instructor?.email)
    const instructorToken = localStorage.getItem('instructorToken')

    return (
        (Boolean(instructorId) && Boolean(instructorToken)) ? <Outlet /> : <Navigate to='/instructor/signIn' />
    )
}


export function InstructorIsLoggedOut() {

    const instructorId = useSelector((state: RootState) => state?.instructor?.email)
    const instructorToken = localStorage.getItem('instructorToken')

    return (

        (Boolean(instructorId) && Boolean(instructorToken)) ? <Navigate to='/instructor/profile' /> : <Outlet />

    )
}