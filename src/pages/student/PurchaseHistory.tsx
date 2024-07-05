import { FC, useEffect, useState } from "react";
import StudentLayout from "../../components/StudentLayOut";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { mycourses } from "../../services/student/api";

const PurchaseHistory: FC = () => {
    const student = useSelector((state: RootState) => state.student.email)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        mycourses({ student }).then((result) => {
            setCourses(result.myCourse)
        })
    }, [])
    return (
        <StudentLayout>
            <div className="max-w-6xl mx-auto p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Purchase History</h1>
                    <p className="text-lg text-gray-600">
                        Review all your past course purchases below.
                    </p>
                </header>

                <section>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="w-1/4 py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Course</th>
                                        <th className="w-1/4 py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Instructor</th>
                                        <th className="w-1/4 py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Purchase Date</th>
                                        <th className="w-1/4 py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, index) => (
                                        <tr key={index}>
                                            <td className="w-1/4 py-4 px-4 border-b">
                                                <div className="flex items-center">
                                                    <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-lg mr-4 object-cover" />
                                                    <span className="text-gray-800 font-medium">{course.title}</span>
                                                </div>
                                            </td>
                                            <td className="w-1/4 py-4 px-4 border-b">{course.instructor.name}</td>
                                            <td className="w-1/4 py-4 px-4 border-b">{new Date(course.createdAt).toLocaleDateString()}</td>
                                            <td className="w-1/4 py-4 px-4 border-b">{course.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </StudentLayout>
    );
};

export default PurchaseHistory;
