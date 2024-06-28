const Dashboard = () => {
    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-medium text-gray-700">27+</p>
                            <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-medium text-gray-700">8+</p>
                            <p className="text-sm font-medium text-gray-500">Active Courses</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-medium text-gray-700">12</p>
                            <p className="text-sm font-medium text-gray-500">Complete Courses</p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-8">Feedbacks</h2>
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full bg-white rounded-lg">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Course Name
                                    </th>
                                    <th className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Enrolled
                                    </th>
                                    <th className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">Javascript</td>
                                    <td className="py-2 px-4 border-b border-gray-200">1100</td>
                                    <td className="py-2 px-4 border-b border-gray-200">★★★★☆</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">PHP</td>
                                    <td className="py-2 px-4 border-b border-gray-200">700</td>
                                    <td className="py-2 px-4 border-b border-gray-200">★★★★★</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">HTML</td>
                                    <td className="py-2 px-4 border-b border-gray-200">1350</td>
                                    <td className="py-2 px-4 border-b border-gray-200">★★★★☆</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">Graphic</td>
                                    <td className="py-2 px-4 border-b border-gray-200">1266</td>
                                    <td className="py-2 px-4 border-b border-gray-200">★★★★★</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
