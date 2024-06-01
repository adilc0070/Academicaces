
import CourseCard from "./CourseCard";
import Error503 from "./Error400";
type Course = {
    id: number;
    title: string;
    description: string;
    category: string;
    rating: number;
    downloads: number;
    price: number;
    discountPrice: number;
    image: string;
};


function CourseList({ courses }: { courses: Course[] }) {
    return (
        <div className="flex justify-center h-[800px] my-9 select-none ">
            <div className="flex flex-col  justify-center items-center bg-[#D0D7E1] w-[92%] h-full">
                <div className="flex flex-col justify-center items-center w-full my-3 h-1/4">
                    <h1 className="text-5xl font-bold">Courses</h1>
                    <p className="text-3xl">These are our popular courses</p>
                </div>
                {courses.length > 0 ? (
                    <div className="courseList flex items-center w-full h-[50vh] overflow-x-scroll my-3 ">
                        {courses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                        ))}
                    </div>
                ) : (
                    <Error503/>
                )}
            </div>
        </div>
    );
}

export default CourseList;
