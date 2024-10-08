import { useEffect, useState, useCallback } from 'react';
import { throttle } from 'lodash';
import StudentLayout from '../../components/StudentLayOut';
import CoursesList from '../../components/CoursesList';
import {  listCategoriesApi } from '../../services/admin/api';
import { listCourses } from '../../services/student/api';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formdata, setFormData] = useState<{ category: string; sort: number; search: string; page: number; limit: number; }>({
        category: '',
        sort: 1,
        search: '',
        page: 1,
        limit: 4,
    });
    const [totalCourses, setTotalCourses] = useState(0);

    // Define the function to fetch courses from the API
    const fetchCourses = () => {
        listCourses(formdata).then((result) => {
            setCourses(result.courses);
            setTotalCourses(result.total); // Assuming the API returns the total number of courses
        });
    };

    // Create a throttled version of fetchCourses
    const throttledFetchCourses = useCallback(
        throttle(() => {
            fetchCourses();
        }, 500), // 300ms interval for throttling
        [formdata] // Dependency on formdata, so it will update the throttle function when formdata changes
    );

    // Call the throttledFetchCourses whenever formdata changes
    useEffect(() => {
        throttledFetchCourses();
        // Cleanup the throttle function when the component unmounts
        return throttledFetchCourses.cancel;
    }, [throttledFetchCourses]);

    // Fetch categories on initial render
    useEffect(() => {
        listCategoriesApi().then((result) => {
            setCategories(result.catogaries);
        });
    }, []);

    // Handle search button click
    const handleSearch = () => {
        setFormData({ ...formdata, page: 1 }); // Reset to the first page when searching
    };

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle next page button click
    const handleNextPage = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            page: prevFormData.page + 1,
        }));
    };

    // Handle previous page button click
    const handlePreviousPage = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            page: Math.max(prevFormData.page - 1, 1),
        }));
    };

    return (
        <StudentLayout>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 space-y-4 lg:space-y-0">
                <div className="w-full lg:w-auto">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <p className="text-gray-500">All courses</p>
                    <p className="text-gray-500">Showing {formdata.page}-{formdata.page * formdata.limit} of {totalCourses} courses</p>
                </div>
                <div className="w-full lg:w-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                    <select
                        name="sort"
                        className="border p-2 w-full lg:w-auto"
                        value={formdata.sort}
                        onChange={handleChange}
                    >
                        <option value="1">Sort by relevance</option>
                        <option value="1">Price: low to high</option>
                        <option value="-1">Price: high to low</option>
                    </select>
                    <select
                        name="category"
                        className="border p-2 w-full lg:w-auto"
                        value={formdata.category}
                        onChange={handleChange}
                    >
                        <option value="">Filter by category</option>
                        {categories && categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="search"
                        className="border p-2 w-full lg:w-auto"
                        placeholder="Search..."
                        value={formdata.search}
                        onChange={handleChange}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full lg:w-auto"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <CoursesList courses={courses} />

            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-gray-500">Showing {(formdata.page - 1) * formdata.limit + 1}-{Math.min(formdata.page * formdata.limit, totalCourses)} of {totalCourses} courses</p>
                </div>
                <div className="flex space-x-4">
                    <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${formdata.page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePreviousPage}
                        disabled={formdata.page === 1}
                    >
                        Previous
                    </button>
                    <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${formdata.page * formdata.limit >= totalCourses ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={formdata.page * formdata.limit >= totalCourses}
                    >
                        Next
                    </button>
                </div>
            </div>
        </StudentLayout>
    );
}

export default CourseList;
