import { useEffect, useState, ChangeEvent} from "react";
import { listCategoriesApi } from "../services/admin/api";
import { addCourseApi, CourseData } from "../services/instructor/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "sonner";
import { BiImageAdd, BiVideoPlus } from "react-icons/bi";
import CourseCurriculum from "./CourseCurriculum";

interface Category {
    _id: string;
    name: string;
    isBlock: boolean;
}

interface FormData {
    thumbnail: string | File | null;
    video: string | File | null;
    title: string;
    subtitle: string;
    category: string;
    topic: string;
    price: number;
    instructor: string;
}

interface FormErrors {
    title?: string;
    subtitle?: string;
    category?: string;
    topic?: string;
    price?: string;
    video?: string;
    thumbnail?: string;
}

const CourseAddingForm = () => {
    const instructor = useSelector((state: RootState) => state.instructor);
    const [categories, setCategories] = useState<Category[]>([]);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [id, setId] = useState<string>("");
    const [formData, setFormData] = useState<FormData>({
        thumbnail: null,
        video: null,
        title: "",
        subtitle: "",
        category: "",
        topic: "",
        price: 0,
        instructor: instructor.email
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        listCategoriesApi().then((result) => {
            setCategories(result.catogaries);
        });
    }, []);

    const setFileToBase = (file: File, callback: (result: string | null) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // Ensure that the result is a string before passing to the callback
            callback(reader.result as string | null);
        };
    };
    
    // Update the function usage to match the expected type
    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!validateFileType(file, ["image/png", "image/jpeg"])) {
                setFormErrors({ ...formErrors, thumbnail: "Invalid file type. Please upload PNG or JPEG." });
                return;
            }
            if (file.size > 6 * 1024 * 1024) {
                setFormErrors({ ...formErrors, thumbnail: "File size exceeds the limit. Maximum size is 6MB." });
                return;
            }
            setFileToBase(file, (result) => {
                setThumbnail(result);  // Now setThumbnail expects a string | null
            });
            setFormData({ ...formData, thumbnail: file });
        }
    };

    const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
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
    };

    const validateFileType = (file: File, allowedTypes: string[]): boolean => {
        return allowedTypes.includes(file.type);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name as keyof FormErrors]) {
            setFormErrors({ ...formErrors, [name as keyof FormErrors]: "" });
        }
    };

    const validateForm = (): boolean => {
        const errors: FormErrors = {};
        if (!formData.title.trim() || formData.title.length < 3) {
            errors.title = "Title is required and should be at least 3 characters long";
        }
        if (!formData.subtitle.trim() || formData.subtitle.length < 3) {
            errors.subtitle = "Subtitle is required and should be at least 3 characters long";
        }
        if (!formData.category) {
            errors.category = "Category is required";
        }
        if (!formData.topic.trim() || formData.topic.length < 3) {
            errors.topic = "Course topic is required and should be at least 3 characters long";
        }
        if (!formData.price || formData.price < 0) {
            errors.price = "Price is required";
        }
        if (!formData.video) {
            errors.video = "Trailer is required";
        }
        if (!formData.thumbnail) {
            errors.thumbnail = "Thumbnail is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const response = await addCourseApi(formData as CourseData);
                if (response.statusCode === 200) {
                    toast.success(response.message);
                    setId(response.course._id);
                    setPage(2);
                } else {
                    toast.error(response.error);
                }
            } catch (error) {
                toast.error("An error occurred while adding the course.");
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };
    

    return (
        <>
            {page === 1 ? (
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
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ml-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : <CourseCurriculum id={id} />}
        </>
    );
};

export default CourseAddingForm;
