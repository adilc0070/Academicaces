import { useEffect, useState } from "react";
import { listCatogoriesApi } from "../services/admin/api";
import { addCourseApi } from "../services/instructor/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const CourseAddingForm = () => {
    const instructor = useSelector((state: RootState) => state.instructor);
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null); // Initialize as null
    // const [video, setVideo] = useState("");
    const [formData, setFormData] = useState({
        thumbnail: "",
        video: "",
        title: "",
        subtitle: "",
        category: "",
        topic: "",
        instructor: instructor.email
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        listCatogoriesApi().then((result) => {
            console.log(result.catogaries);
            setCategories(result.catogaries);
        });
    }, []);

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setThumbnail(reader.result);
        }
    }

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileToBase(file);
            setFormData({ ...formData, thumbnail: file });
        }
        console.log("thumbnail file", file);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error message when user starts typing in the input field
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
        // if (!formData.video.trim()) {
        //     errors.video = 'Video is required'
        // }
        // if (!formData.thumbnail.trim()) {
        //     errors.thumbnail = 'Thumbnail is required'
        // }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Form data is valid, submit it to the server
            addCourseApi(formData);
            console.log("Form data:", formData);
            // Add API call to submit data here
        }
    };

    return (
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
                                        <path d="M28 8H14a2 2 0 00-2 2v28h28V16L28 8z" fill="#e5e7eb"></path>
                                    </svg>
                                )}
                                <div className="text-sm text-gray-600">
                                    
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload Image</span>
                                        <input id="file-upload" onChange={handleThumbnailChange} name="file-upload" type="file" className="sr-only" />
                                    </label>
                                </div>
                                <div className="flex text-sm text-gray-600">
                                    
                                    <label htmlFor="file-delete" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                                        <span>Delete Image</span>
                                        <input id="file-delete" onClick={()=>{setThumbnail(null)}} name="file-delete" type="button" className="sr-only" />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 6MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Trailer</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" fill="#e5e7eb"></path>
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="video-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload Video</span>
                                        <input id="video-upload" name="video-upload" type="file" className="sr-only" />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">MP4 up to 8MB</p>
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
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                </div>
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
    );
};

export default CourseAddingForm;
