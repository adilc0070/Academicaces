import { useState } from 'react';
import Buttons from "./Buttons";
import Logo from "./Logo";

function NavBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className='flex w-full justify-center items-center'>
                <div className='bg-sky-800 flex justify-between items-center w-[92%] h-20 mt-9 rounded-xl'>
                    <Logo />

                    <div className="flex items-center justify-end max-lg:hidden">
                        <div className=' hidden md:flex'>
                            {['Home', 'Features', 'Courses', 'Teachers', 'Pricing', 'Reviews'].map((title, index) => (
                                <p key={index} className='text-white mx-3 text-xl' onClick={() => console.log('clicked')}>
                                    {title}
                                </p>
                            ))}
                            <div className='flex y-6'>
                                {['SignIN', 'SignUP'].map((title, index) => <Buttons key={index} title={title} color={title === 'SignIN' ? '#00ABCC' : 'white'} />)}
                            </div>
                        </div>
                        <button
                            onClick={toggleMenu}
                            className="ml-9 focus:outline-none focus:bg-gray-700 rounded-md p-2"
                        >
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className='flex w-full justify-center items-center'>
                    <div className='bg-sky-800 flex justify-between items-center w-[92%] h-20 rounded-b-xl'>
                        {['Home', 'Features', 'Courses', 'Teachers', 'Pricing', 'Reviews'].map((title, index) => (
                            <p key={index} className='text-white mx-3 text-xl' onClick={() => console.log('clicked')}>
                                {title}
                            </p>
                        ))}
                        <div className='flex y-6'>
                            {['SignIN', 'SignUP'].map((title, index) => <Buttons key={index} title={title} color={title === 'SignIN' ? '#00ABCC' : 'white'} />)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavBar;
