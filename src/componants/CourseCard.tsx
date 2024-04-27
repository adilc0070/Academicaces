import { Button } from "@mui/material";
import { BsStarFill, BsDownload } from "react-icons/bs";

type Course = {
    title: string;
    description: string;
    category: string;
    rating: number;
    downloads: number;
    price: number;
    discountPrice: number;
    image: string;
};

function CourseCard({ course }: { course: Course }) {
    return (
        <div className="flex flex-row w-full h-full mx-5 border-2 border-[gray] rounded-2xl">
            <div className="flex-1 flex justify-center items-center w-[400px] object-cover  ">
                
                <img
                    src={`${course.image}`}
                    className="object-cover h-full rounded-xl border-r-4 border-red-900 rounded-r-2xl "
                    alt={course.title}
                />
            </div>
            <div className="flex-1 ">
                <div className="flex justify-between mx-4 mt-4">
                    <p className="text-sm">{course.category}</p>
                    <div className="bg-black flex justify-center items-center rounded-full text-yellow-500 text-center tracking-wide w-[80px]">
                        <BsStarFill /><p>{course.rating}</p>
                    </div>
                </div>
                <div className="w-[300px] mx-4 ">
                    <h2 className="text-2xl text-green-800 font-bold ">{course.title}</h2>
                    <p className="text-lg text-gray-800">{course.description}</p>
                    <div className="flex items-center">
                        <BsDownload fontSize={'25px'} cursor={'pointer'} /><p className="mx-2">{course.downloads}</p>
                    </div>
                    <div className="flex">
                        <h2 className="text-2xl text-gray-800 line-through font-bold ">₹{course.price}</h2>
                        <h2 className="text-2xl text-green-800 font-bold ">₹{course.discountPrice}</h2>
                    </div>
                    <div className="my-4">
                        <Button variant="contained" color="success">Add To Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
