import { Button } from "@mui/material";
import { BiBookOpen } from "react-icons/bi";
import { BsStarFill, BsDownload } from "react-icons/bs";

type Course = {
    title: string;
    subtitle: string;
    category: {
        name: string
    };
    instructor: {
        name: string
    };
    topic: string;
    chapters: [];
    price: number;
    thumbnail: string;
    enrolledStudents: [];
    verified: boolean
};

function CourseCard({ course }: { course: Course }) {
    return (
        <div className="flex flex-col w-full max-w-md mx-auto bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
                <img
                    src={course.thumbnail}
                    className="object-cover w-full h-64"
                    alt={course.title}
                />
                {course.verified && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black rounded-full px-3 py-1 flex items-center">
                        <BsStarFill className="mr-1" /><span>Verified</span>
                    </div>
                )}
            </div>
            <div className="p-6 bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">{course.category.name}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-2">{course.title}</h2>
                <h3 className="text-lg text-gray-300 mt-1">Instructor: {course.instructor.name}</h3>
                <p className="text-sm text-gray-400 mt-2">{course.subtitle}</p>
                <p className="text-sm text-gray-400 mt-1">{course.topic}</p>
                <div className="flex items-center mt-4 text-gray-400">
                    <BsDownload />
                    <span className="ml-2">{course.enrolledStudents.length} Downloads</span>
                    <BiBookOpen className="ml-6" />
                    <span className="ml-2">{course.chapters.length} Lessons</span>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-xl text-red-500 line-through">₹{course.price + 400}</span>
                    <span className="text-2xl text-green-400 font-bold ml-4">₹{course.price}</span>
                </div>
                <Button variant="contained" color="primary" className="w-full mt-4">Enroll Now</Button>
            </div>
        </div>
    );
}

export default CourseCard;
