import { useState } from 'react';
import Logo from './Logo';

const AdminLayout = ({ children }: { children: React.ReactNode })=> {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-800 text-white p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                <div ><Logo /></div>
                <nav>
                    <ul>
                        {
                            ["Instructors",'Students',"Categories", "Earning","Message","Settings",].map((item, index) => (
                                <li key={index} className="mb-4"><a href="#" className="block">{item}</a></li>
                            ))
                        }
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
                    <div className="text-xl font-bold">Dashboard</div>
                </header>

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout


