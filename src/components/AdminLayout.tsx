import { useState } from 'react';
import Logo from './Logo';
import { setAdminLogOut } from '../store/slice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CgLogOut } from 'react-icons/cg';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(setAdminLogOut())
        localStorage.removeItem('adminToken')
        window.location.reload();
        navigate('/admin/dashboard');
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-800 text-white p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                <div ><Logo /></div>
                <nav>
                    <ul>
                        {
                            ["Dashboard", "Instructors", 'Courses', 'Students', "Categories", "Earning",].map((item, index) => (
                                (window.location.pathname).includes(`/admin/${item.toLowerCase()}`) ? <div onClick={() => navigate(`/admin/${item.toLowerCase()}`)} key={index} className="block mb-4 bg-sky-950 drop-shadow-none rounded-3xl max-w-full max-h-full p-2 text-center">
                                    <li className=""><p className="font-bold ">{item}</p></li>
                                </div> :
                                    <div key={index} onClick={() => navigate(`/admin/${item.toLowerCase()}`)} className="mb-4 p-2 ">
                                        <li ><p className="block">{item}</p></li>
                                    </div>
                            ))
                        }
                        <li onClick={() => handleLogOut()} className="mb-4"><p className="block"><CgLogOut className="inline-block mr-3" size={28} />Logout</p></li>
                    </ul>
                </nav>
            </aside>

            {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}


            <div className="flex-1 flex flex-col ">
                <header className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <div className="text-xl font-bold">{(window.location.pathname).split('/')[2].toLocaleUpperCase()}</div>
                </header>

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout


