import { useEffect, useState } from "react";
import { listCatogoriesApi } from "../services/admin/api";
import { editCourseApi } from "../services/instructor/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "sonner";
import CurriculumEdit from "./CurriculemEdit";
import { useNavigate } from "react-router-dom";
const CourseEdit = ({ course }) => {
    const instructor = useSelector((state: RootState) => state.instructor);
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(course?.thumbnail || null);
    const [videoPreview, setVideoPreview] = useState(course?.triler || null);

    const [formData, setFormData] = useState({
        thumbnail: course?.thumbnail || "",
        video: course?.triler || "",
        title: course?.title || "",
        subtitle: course?.subtitle || "",
        category: course?.category._id || {},
        topic: course?.topic || "",
        price: course?.price || 0,
        instructor: instructor.email
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
            setFileToBase(file, setThumbnail);
            setFormData({ ...formData, thumbnail: file });
        }
        console.log("thumbnail file", file);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileToBase(file, setVideoPreview);
            setFormData({ ...formData, video: file });
        }
        console.log("video file", file);
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
            setLoading(true);
            editCourseApi(course._id, formData).then((result) => {
                console.log(result);
                toast.success('Course updated');
                setLoading(false);
                navigate('/instructor/courses')
            })
            console.log("Form data:", formData);
        }
    };

    return (
        <>
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
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8h-8v12H8v8h12v12h8v-12h12v-8H28V8z" />
                                        </svg>
                                    )}
                                    <div className="flex text-sm text-gray-600">
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
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8h-8v12H8v8h12v12h8v-12h12v-8H28V8z" />
                                        </svg>
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
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Topic</label>
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
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading? "cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Curriculum Editing Section */}
            <div className="bg-white shadow rounded-lg p-8 mt-8">
                <h2 className="text-2xl font-bold mb-6">Curriculum</h2>
                <CurriculumEdit course={course} />
            </div>
        </>
    );
};

export default CourseEdit;
