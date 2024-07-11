import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router-dom"

export function AdminIsLoggedIn() {

    const adminId = useSelector((state: RootState) => state.admin.email)

    return (
        adminId ? <Outlet /> : <Navigate to='/admin/signIn' />
    )
}


export function AdminIsLoggedOut() {

    const adminId = useSelector((state: RootState) => state.admin.email)

    return (
        adminId ? <Navigate to='/admin/dashboard' /> : <Outlet />
    )
}


export function StudentIsLoggedIn() {

    const userId = useSelector((state: RootState) => state.student.email)
    const userTocken = localStorage.getItem('studentToken')
    return (
        userId && userTocken ? <Outlet /> : <Navigate to='/signIn' />
    )
}


export function StudentIsLoggedOut() {

    const userId = useSelector((state: RootState) => state.student.email)
    const userTocken = localStorage.getItem('studentToken')
    return (
        userId && userTocken ? <Navigate to='/home' /> : <Outlet />
    )
}


export function InstructorIsLoggedIn() {

    const instructorId = useSelector((state: RootState) => state.instructor.email)

    return (
        instructorId ? <Outlet /> : <Navigate to='/instructor/signIn' />
    )
}


export function InstructorIsLoggedOut() {

    const instructorId = useSelector((state: RootState) => state.instructor.email)

    return (

        instructorId ? <Navigate to='/instructor/dashboard' /> : <Outlet />

    )
}