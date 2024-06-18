import CourseCard from "./CourseCard";


function CourseList({ courses }: { courses: any[] }) {
    return (
        <div className="flex justify-center h-auto my-9 select-none">
            <div className="flex flex-col justify-center items-center bg-[#F5F7FA] p-2 w-[92%] h-full rounded-lg shadow-lg">
                <div className="flex flex-col justify-center items-center w-full my-3 h-1/4">
                    <h1 className="text-5xl font-bold text-gray-900">Courses</h1>
                    <p className="text-3xl text-gray-600">These are our popular courses</p>
                </div>
                {courses.length > 0 && (
                    <div className="courseList flex items-center w-full h-auto overflow-x-auto py-4 space-x-4">
                        {courses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseList;
