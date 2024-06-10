import { useEffect, useState } from "react";
import { listCatogoriesApi } from "../services/admin/api";
import { addCourseApi } from "../services/instructor/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "sonner";
import { BiImageAdd, BiVideoPlus } from "react-icons/bi";
import CourseCurriculum from "./CourseCurriculum";



const CourseAddingForm = () => {
    const instructor = useSelector((state: RootState) => state.instructor);
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [page, setPage] = useState(1);
    const [id, setId] = useState("");
    const [formData, setFormData] = useState({
        thumbnail: "",
        video: "",
        title: "",
        subtitle: "",
        category: "",
        topic: "",
        price: 0,
        instructor: instructor.email
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        listCatogoriesApi().then((result) => {
            console.log(result.catogaries);
            setCategories(result.catogaries);
        });
    }, []);

    const setFileToBase = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            callback(reader.result);
        };
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!validateFileType(file, ["image/png", "image/jpeg"])) {
                setFormErrors({ ...formErrors, thumbnail: "Invalid file type. Please upload PNG or JPEG." });
                return;
            }
            if (file.size > 6 * 1024 * 1024) {
                setFormErrors({ ...formErrors, thumbnail: "File size exceeds the limit. Maximum size is 6MB." });
                return;
            }
            setFileToBase(file, setThumbnail);
            setFormData({ ...formData, thumbnail: file });
        }
        console.log("thumbnail file", file);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!validateFileType(file, ["video/mp4"])) {
                setFormErrors({ ...formErrors, video: "Invalid file type. Please upload MP4." });
                return;
            }
            if (file.size > 8 * 1024 * 1024) {
                setFormErrors({ ...formErrors, video: "File size exceeds the limit. Maximum size is 8MB." });
                return;
            }
            setFileToBase(file, setVideoPreview);
            setFormData({ ...formData, video: file });
        }
        console.log("video file", file);
    };

    const validateFileType = (file, allowedTypes) => {
        return allowedTypes.includes(file.type);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) {
            errors.title = "Title is required";
        }
        if (!formData.subtitle.trim()) {
            errors.subtitle = "Subtitle is required";
        }
        if (!formData.category) {
            errors.category = "Category is required";
        }
        if (!formData.topic.trim()) {
            errors.topic = "Course topic is required";
        }
        if (!formData.price) {
            errors.price = "Price is required";
        }
        if (!formData.video) {
            errors.video = "trailer is required";
        }
        if (!formData.thumbnail) {
            errors.thumbnail = "thumbnail is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            let response = addCourseApi(formData).then((result) => {
                result.statusCode === 200 ? toast.success(result.message) : toast.error(result.error);
                console.log("result", result);
                setId(result.course._id);
                setPage(2);

            })
            toast.promise(response, {
                loading: "Adding course... Please wait",
                success: <b>Course added</b>,
            })

        }
    };

    return (
        <>
            {page === 1 ?
                (
                    <div className="bg-white shadow rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            {thumbnail ? (
                                                <img src={thumbnail} alt="Thumbnail" className="mx-auto h-48 w-48 object-cover" />
                                            ) : (
                                                <BiImageAdd className="mx-auto text-gray-400" size={40} fill="#e5e7eb" />

                                            )}
                                            <div className="text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>{formData.thumbnail ? "Change Image" : "Upload Image"}</span>
                                                    <input id="file-upload" onChange={handleThumbnailChange} name="file-upload" type="file" className="sr-only" />
                                                </label>
                                            </div>

                                            <p className="text-xs text-gray-500">PNG, JPG up to 6MB</p>
                                            {formErrors.thumbnail && <p className="text-red-500 text-xs mt-1">{formErrors.thumbnail}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course Trailer</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            {videoPreview ? (
                                                <video src={videoPreview} controls controlsList="nodownload" className="mx-auto h-48 w-48 object-cover"></video>
                                            ) : (
                                                <BiVideoPlus className="mx-auto text-gray-400" size={40} fill="#e5e7eb" />
                                            )}
                                            <div className="flex justify-center text-sm text-gray-600">
                                                <label htmlFor="video-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>{formData.video ? "Change Video" : "Upload Video"}</span>
                                                    <input id="video-upload" name="video-upload" type="file" className="sr-only" onChange={handleVideoChange} />
                                                </label>
                                            </div>

                                            <p className="text-xs text-gray-500">MP4 up to 8MB</p>
                                            {formErrors.video && <p className="text-red-500 text-xs mt-1">{formErrors.video}</p>}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                />
                                {formErrors.subtitle && <p className="text-red-500 text-xs mt-1">{formErrors.subtitle}</p>}
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Course Category</label>
                                <select
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {categories.filter((cat) => !cat.isBlock).map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700">Course Topic</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                    />
                                    {formErrors.topic && <p className="text-red-500 text-xs mt-1">{formErrors.topic}</p>}
                                </div>
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700">Course Price</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                    {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ml-2"
                                >
                                    Save & Next
                                </button>
                            </div>
                        </form>
                    </div>
                ) : <CourseCurriculum id={id} />

            }
        </>


    );
};

export default CourseAddingForm;
