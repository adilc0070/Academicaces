import React, { useState } from 'react';

const  DashBoardNavBar = ({ setCurrentView }: { setCurrentView: React.Dispatch<React.SetStateAction<string>> }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="text-xl font-semibold text-gray-800">
                            Welcome, Dond Tond
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => setCurrentView('Dashboard')} className="text-gray-800 hover:text-gray-600">Dashboard</button>
                        <button onClick={() => setCurrentView('Profile')} className="text-gray-800 hover:text-gray-600">My Profile</button>
                        <button onClick={() => setCurrentView('Messages')} className="text-gray-800 hover:text-gray-600">Messages</button>
                        <button onClick={() => setCurrentView('Courses')} className="text-gray-800 hover:text-gray-600">Enrolled Courses</button>
                        <a href="#" className="text-gray-800 hover:text-gray-600">Wishlist</a>
                        <a href="#" className="text-gray-800 hover:text-gray-600">Reviews</a>
                        <a href="#" className="text-gray-800 hover:text-gray-600">My Quiz Attempts</a>
                        <a href="#" className="text-gray-800 hover:text-gray-600">Assignments</a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 hover:text-gray-600 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => setCurrentView('Dashboard')} className="block text-gray-800 hover:text-gray-600">Dashboard</button>
                        <button onClick={() => setCurrentView('Profile')} className="block text-gray-800 hover:text-gray-600">My Profile</button>
                        <button onClick={() => setCurrentView('Messages')} className="block text-gray-800 hover:text-gray-600">Messages</button>
                        <button onClick={() => setCurrentView('Courses')} className="block text-gray-800 hover:text-gray-600">Enrolled Courses</button>
                        <a href="#" className="block text-gray-800 hover:text-gray-600">Wishlist</a>
                        <a href="#" className="block text-gray-800 hover:text-gray-600">Reviews</a>
                        <a href="#" className="block text-gray-800 hover:text-gray-600">My Quiz Attempts</a>
                        <a href="#" className="block text-gray-800 hover:text-gray-600">Assignments</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default DashBoardNavBar;
