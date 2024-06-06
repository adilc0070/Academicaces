import React, { useEffect, useState } from "react";
import { listCatogoriesApi } from "../services/admin/api";
import { addCourseApi } from "../services/instructor/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "sonner";

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
        category: course?.category || "",
        topic: course?.topic || "",
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
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addCourseApi(formData).then((result) => {
                toast.success(result.message);
            })
            console.log("Form data:", formData);
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
                                        <path d="M28 8h-8v12H8v8h12v12h8v-12h12v-8H28V8z" />
                                    </svg>
                                )}
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="thumbnail" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="thumbnail" name="thumbnail" type="file" className="sr-only" onChange={handleThumbnailChange} />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Intro Video</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {videoPreview ? (
                                    <video src={videoPreview} controls className="mx-auto h-48 w-48 object-cover" />
                                ) : (
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8h-8v12H8v8h12v12h8v-12h12v-8H28V8z" />
                                    </svg>
                                )}
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="video" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="video" name="video" type="file" className="sr-only" onChange={handleVideoChange} />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">MP4 up to 50MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Subtitle</label>
                        <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        {formErrors.subtitle && <p className="text-red-500 text-xs mt-1">{formErrors.subtitle}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Topic</label>
                        <input type="text" name="topic" value={formData.topic} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        {formErrors.topic && <p className="text-red-500 text-xs mt-1">{formErrors.topic}</p>}
                    </div>
                </div>
                <div className="mt-8">
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseEdit;
