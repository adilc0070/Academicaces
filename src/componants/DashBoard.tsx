import React from 'react'
import CardITems from './CardITems';
import CardTable from './CardTable';

function DashBoard() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Welcome!</h1>
                </div>
                <div className="flex space-x-4">
                    <input type="text" className="border p-2" placeholder="Search..." />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Total Sales</div>
                    <div className="text-2xl font-bold">$163k</div>
                    <div className="text-green-500">↑8.9% Since last week</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Total Items</div>
                    <div className="text-2xl font-bold">815</div>
                    <div className="text-red-500">↓2.1% Since last week</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Average Sales</div>
                    <div className="text-2xl font-bold">$7.54M</div>
                    <div className="text-green-500">↑3.2% Since last week</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Order Delivery</div>
                    <div className="text-2xl font-bold">18.34%</div>
                    <div className="text-green-500">↑5.2% Since last week</div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="mb-4 border p-3 font-medium border-gray-300">Candidate Overview</div>
                <div className="h-64 bg-gray-200">[Chart]</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4 border p-3 font-medium border-gray-300">Instructors List</div>
                    <ul>
                        <li className="mb-4">
                            <div>Randy Matthews</div>
                            <div className="text-gray-600">Randy@gmail.com</div>
                        </li>
                        <li>
                            <div>Vernon Wood</div>
                            <div className="text-gray-600">Vernon@gmail.com</div>
                        </li>
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4 border p-3 font-medium border-gray-300">Selling Courses</div>
                    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
                        <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture"/>
                            <h2 className="text-center text-2xl font-semibold mt-3">John Doe</h2>
                            <p className="text-center text-gray-600 mt-1">Software Engineer</p>
                            <div className="flex justify-center mt-5">
                                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
                                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
                                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
                            </div>
                            <div className="mt-5">
                                <h3 className="text-xl font-semibold">Bio</h3>
                                <p className="text-gray-600 mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
                            </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4 border p-3 font-medium border-gray-300">Chat</div>
                    <div className="h-32 bg-gray-200">[Chat]</div>
                </div>

                <CardTable />

                <CardITems />
                <CardITems />
                <CardITems />
                <CardITems />

            </div>
        </div>
    );
};

export default DashBoard
