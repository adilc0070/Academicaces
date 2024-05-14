import { useState } from 'react';
import Logo from './Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Test from './Test';

function DashboardLayout() {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    let student = useSelector((state: RootState) => state.student);
    return (
        <section>
            <nav className="bg-blue-900 border-gray-200 w-full">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                    <>
                        <Logo />
                        <button
                            onClick={toggleSidebar}
                            aria-controls="cta-button-sidebar"
                            type="button"
                            className=" items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                    </>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">

                        {
                            !student.email ?
                                (
                                    <>

                                        <a href="/user/signIn" className="text-gray-200 hover:text-white focus:text-white dark:text-gray-400">Login</a>
                                        <a href="#" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</a>
                                    </>
                                ) :
                                (
                                    <>

                                        <a href="/user/signOut" className="text-gray-200 hover:text-white focus:text-white dark:text-gray-400">Logout</a>
                                    </>
                                )

                        }
                    </div>
                    <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1   'block' : 'hidden'}`}>
                        <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                            <li>
                                <div className="relative">
                                    <button
                                        onClick={toggleProfileDropdown}
                                        className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-300 border-b border-gray-200 md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        aria-expanded={isProfileDropdownOpen ? "true" : "false"}
                                        aria-controls="profile-dropdown"
                                    >
                                        <div className="flex items-center">
                                            <img src="/path/to/profile-image.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
                                            <span className="ml-2">{student?.userName || 'Profile'}</span>
                                        </div>
                                        <svg className={`w-2.5 h-2.5 ms-3 transform ${isProfileDropdownOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                    <div
                                        id="profile-dropdown"
                                        className={`absolute z-10 grid ${isProfileDropdownOpen ? 'grid' : 'hidden'} w-auto text-sm bg-[#1C84EE] border border-gray-200 rounded-lg shadow-md`}
                                    >
                                        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Profile</a>
                                        <a href="" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Logout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='flex w-screen h-auto'>

                <div className="flex ">


                    <aside
                        id="cta-button-sidebar"
                        className={`bottom-0 left-0 w-64 h-screen transition-transform  ${isSidebarOpen ? '' : '-translate-x-full sm:translate-x-0'}`}
                        aria-label="Sidebar"
                    >
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
                            <ul className="space-y-2 font-medium">
                                {['Home', 'About', 'Services', 'Pricing', 'Contact'].map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 21"
                                            >
                                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"></path>
                                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"></path>
                                            </svg>
                                            <span className="ms-3">{item}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div
                                id="dropdown-cta"
                                className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
                                role="alert"
                            >
                                <div className="flex items-center mb-3">
                                    <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                                        Notifications
                                    </span>
                                    <button
                                        type="button"
                                        className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                                        data-dismiss-target="#dropdown-cta"
                                        aria-label="Close"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg
                                            className="w-2.5 h-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <p className="mb-3 w-[200px] text-sm text-blue-800 dark:text-blue-400 break-words">
                                    dasdsdsadsasdasdasdadasdsdsadsasdasdasdadasdsdsadsasdasdasdadasdsdsadsasdasdasdadasdsdsadsasdasdasdadasdsdsadsasdasdasdadasdsdsadsasdasdasdadasdsdsadsasdasdasda
                                </p>
                                <a
                                    className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                    href="#"
                                >links

                                </a>
                            </div>
                        </div>
                    </aside>


                    <div className='p-4 shadow-md'>
                        <Test />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardLayout;
