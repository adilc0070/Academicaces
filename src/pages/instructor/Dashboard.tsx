import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchData } from "../../utils/api";


const Dashboard = () => {
    const [data, setData] = useState({
        userDetails: {}, // initially an empty object
        myCourses: [], // initially an empty array
        blockedCourses: [], // initially an empty array
        verifiedCourses: [], // initially an empty array
    });

    const instructor = useSelector((state: RootState) => state.instructor.email);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData(instructor);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, [instructor]);

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-medium text-gray-700">{data.myCourses.length}</p>
                            <p className="text-sm font-medium text-gray-500">Published Courses</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-medium text-gray-700">{data.verifiedCourses.length}</p>
                            <p className="text-sm font-medium text-gray-500">Active Courses</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-medium text-gray-700">{data.blockedCourses.length}</p>
                            <p className="text-sm font-medium text-gray-500">Blocked Courses</p>
                        </div>
                    </div>

                    {/* User Details Section */}
                    <h2 className="text-2xl font-semibold text-gray-800 mt-8">User Details</h2>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                        <div className="flex items-center">
                            <img
                                src={data.userDetails.profilePicture || `https://ui-avatars.com/api/?name=${data.userDetails.name}&background=random`}
                                alt="Profile"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{data.userDetails.name}</h3>
                                <p className="text-sm text-gray-600">{data.userDetails.email}</p>
                                {/* Add other user details fields as needed */}
                            </div>
                        </div>
                    </div>

                    {/* My Courses Section */}
                    <h2 className="text-2xl font-semibold text-gray-800 mt-8">My Courses</h2>
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
                                        Chapters
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.myCourses.map((course) => (
                                    <tr key={course._id}>
                                        <td className="py-2 px-4 border-b border-gray-200">{course.title}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{course.enrolledStudents.length}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{course.chapters.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
