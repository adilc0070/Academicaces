import { useEffect, useState } from 'react';
import { listStudentsApi, listInstructorsApi, listCategoriesApi, listAllCoursesApi } from '../services/admin/api';
import BarChart from './d3dta';
import PieChart from './PieChart';

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const studentsData = await listStudentsApi();
                setStudents(studentsData.data);

                const instructorsData = await listInstructorsApi();
                setInstructors(instructorsData.data);

                const categoriesData = await listCategoriesApi();
                setCategories(categoriesData.catogaries);

                const coursesData = await listAllCoursesApi();
                setCourses(coursesData.courses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const categoryData = categories.map(category => ({
        label: category.name,
        value: category.noCoures
    }));

    return (
        <div className="p-4">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Welcome!</h1>
                </div>
                <div className="mt-4 lg:mt-0">
                    <input type="text" className="border p-2 rounded" placeholder="Search..." />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Total Students</div>
                    <div className="text-2xl font-bold">{students.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Total Instructors</div>
                    <div className="text-2xl font-bold">{instructors.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Total Categories</div>
                    <div className="text-2xl font-bold">{categories.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>Total Courses</div>
                    <div className="text-2xl font-bold">{courses.length}</div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-[500px]">
                    <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
                    <BarChart data={categoryData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-[500px]">
                    <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
                    <PieChart data={categoryData} />
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4 border p-3 font-medium border-gray-300">Instructors List</div>
                    <ul>
                        {instructors.map(instructor => (
                            <li key={instructor._id} className="mb-4">
                                <div>{instructor.name}</div>
                                <div className="text-gray-600">{instructor.email}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4 border p-3 font-medium border-gray-300">Students List</div>
                    <ul>
                        {students.map(student => (
                            <li key={student._id} className="mb-4">
                                <div>{student.name}</div>
                                <div className="text-gray-600">{student.email}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4 border p-3 font-medium border-gray-300">Categories List</div>
                    <ul>
                        {categories.map(category => (
                            <li key={category._id} className="mb-4">
                                <div>{category.name}</div>
                                <div className="text-gray-600">{category.noCoures} courses</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
