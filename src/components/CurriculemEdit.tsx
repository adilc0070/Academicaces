// src/components/CourseEdit.tsx
import React, { useState } from 'react';
import { updateCourseApi } from '../services/instructor/api';
import { BiPencil, BiPlusCircle, BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Define the types
type Course = {
    _id: string;
    chapters: Chapter[];
};

export type Chapter = {
    _id: string;
    name: string;
    isFree: boolean;
    order: number;
    lessonsID: Lesson[];
};

type Lesson = {
    _id: string;
    name: string;
    video?: File[];
    notes: string;
    files?: File[];
    description: string;
    order?: number;
};

type Section = {
    id: string; // Ensure id is a string
    name: string;
    isFree: boolean;
    lectures: Lecture[];
    order: number;
};

type Lecture = {
    id: string; // Ensure id is a string
    name: string;
    video: File | string;
    notes: string;
    file: File | string;
    description: string;
    order: number;
};

type Errors = {
    name?: string;
    description?: string;
    [key: string]: string | undefined;
};

const CurriculumEdit = ({ course }: { course: Course }) => {
    
    const [sections, setSections] = useState<Section[]>(course.chapters.map(chapter => ({
        id: chapter._id,
        name: chapter.name,
        isFree: chapter.isFree,
        order: chapter.order,
        lectures: chapter.lessonsID.map(lesson => ({
            id: lesson._id,
            name: lesson.name,
            video: lesson.video ? lesson.video[0] : '',
            notes: lesson.notes,
            file: lesson.files ? lesson.files[0] : '',
            description: lesson.description,
            order: lesson.order || 0,
        }))
    })));
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<{ sectionId: string | null, lectureId: string | null }>({ sectionId: null, lectureId: null });
    const [formData, setFormData] = useState<{ name: string; video: File | string; notes: string; file: File | string; description: string; order: number }>({
        name: '',
        video: '',
        notes: '',
        file: '',
        description: '',
        order: 0
    });
    const [errors, setErrors] = useState<Errors>({});
    const [sectionEditModal, setSectionEditModal] = useState<{ isOpen: boolean; sectionId: string | null; sectionName: string; isFree: boolean }>({
        isOpen: false,
        sectionId: null,
        sectionName: '',
        isFree: false
    });
    const navigate = useNavigate();

    const generateUniqueId = () => {
        const allIds = sections.flatMap(section => [section.id, ...section.lectures.map(lecture => lecture.id)]);
        const maxId = allIds.length ? Math.max(...allIds.map(id => parseInt(id, 10))) : 0;
        return (maxId + 1).toString();
    };

    const addSection = () => {
        const newSection: Section = { id: generateUniqueId(), name: `Section ${sections.length + 1}`, isFree: false, lectures: [], order: sections.length + 1 };
        setSections([...sections, newSection]);
    };

    const addLecture = (sectionId: string) => {
        const updatedSections = sections.map(section => {
            if (section.id === sectionId) {
                const newLecture: Lecture = { id: generateUniqueId(), name: 'Lesson name', video: '', notes: '', file: '', description: '', order: section.lectures.length + 1 };
                return { ...section, lectures: [...section.lectures, newLecture] };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const deleteSection = (sectionId: string) => {
        setSections(sections.filter(section => section.id !== sectionId));
    };

    const deleteLecture = (sectionId: string, lectureId: string) => {
        setSections(sections.map(section => {
            if (section.id === sectionId) {
                return { ...section, lectures: section.lectures.filter(lecture => lecture.id !== lectureId) };
            }
            return section;
        }));
    };

    const openModal = (sectionId: string, lectureId: string) => {
        const section = sections.find(section => section.id === sectionId);
        if (!section) {
            console.error(`Section with id ${sectionId} not found`);
            return;
        }
        const lecture = section.lectures.find(lecture => lecture.id === lectureId);
        if (!lecture) {
            console.error(`Lecture with id ${lectureId} not found in section ${sectionId}`);
            return;
        }
        setFormData({
            name: lecture.name,
            video: lecture.video,
            notes: lecture.notes,
            file: lecture.file,
            description: lecture.description,
            order: lecture.order
        });
        setModal({ sectionId, lectureId });
    };

    const closeModal = () => {
        setModal({ sectionId: null, lectureId: null });
        setErrors({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        if (errors[name as keyof Errors]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prevFormData => ({ ...prevFormData, [name]: files[0] }));
            if (errors[name as keyof Errors]) {
                setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: Errors = {};

        if (!formData.name) {
            newErrors.name = 'Lecture name is required';
            valid = false;
        }
        if (!formData.description) {
            newErrors.description = 'Description is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const saveModalData = () => {
        if (validateForm()) {
            setSections(sections.map(section => {
                if (section.id === modal.sectionId) {
                    return {
                        ...section,
                        lectures: section.lectures.map(lecture => lecture.id === modal.lectureId ? { ...lecture, ...formData } : lecture)
                    };
                }
                return section;
            }));
            closeModal();
        }
    };

    const getFileName = (file: File | string) => typeof file === 'string' ? 'No file selected' : file.name;
    console.log(getFileName);
    
    const submitForm = async () => {
        try {
            setLoading(true);
            const response = await updateCourseApi(course._id, sections);
            toast.success(response.message);
            navigate(`/instructor/courses`);
        } catch (error) {
            console.error('Error submitting form', error);
        } finally {
            setLoading(false);
        }
    };

    const openSectionEditModal = (sectionId: string, sectionName: string) => {
        const section = sections.find(section => section.id === sectionId);
        if (!section) {
            console.error(`Section with id ${sectionId} not found`);
            return;
        }
        setSectionEditModal({ isOpen: true, sectionId, sectionName, isFree: section.isFree });
    };

    const handleSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSectionEditModal(prev => ({ ...prev, sectionName: e.target.value }));
    };

    const handleSectionPremiumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSectionEditModal(prev => ({ ...prev, isFree: e.target.checked }));
    };

    const saveSectionName = () => {
        setSections(sections.map(section => {
            if (section.id === sectionEditModal.sectionId) {
                return { ...section, name: sectionEditModal.sectionName, isFree: sectionEditModal.isFree };
            }
            return section;
        }));
        setSectionEditModal({ isOpen: false, sectionId: null, sectionName: '', isFree: false });
    };

    return (
        <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
            {sections.map(section => (
                <div key={section.id} className="border rounded-lg mt-8">
                    <div className="border-b p-4 flex justify-between items-center">
                        <div className='flex items-center space-x-9'>
                            <span className="font-semibold">{section.name}</span>
                            <span className={`font-semibold ${section.isFree ? 'text-green-500' : 'text-red-500'}`}>{section.isFree ? 'Free' : 'Paid'}</span>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => openSectionEditModal(section.id, section.name)} className="text-blue-500">
                                <BiPencil />
                            </button>
                            <button onClick={() => addLecture(section.id)} className="text-green-500">
                                <BiPlusCircle />
                            </button>
                            <button onClick={() => deleteSection(section.id)} className="text-red-500">
                                <BiTrash />
                            </button>
                        </div>
                    </div>
                    <div>
                        {section.lectures.map(lecture => (
                            <div key={lecture.id} className="border-b p-4 flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">{lecture.name}</span>
                                    <p className="text-sm text-gray-600">{lecture.description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => openModal(section.id, lecture.id)} className="text-blue-500">
                                        <BiPencil />
                                    </button>
                                    <button onClick={() => deleteLecture(section.id, lecture.id)} className="text-red-500">
                                        <BiTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={addSection} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">Add Section</button>
            <button onClick={submitForm} disabled={loading} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                {loading ? 'Saving...' : 'Save Changes'}
            </button>

            {/* Section Edit Modal */}
            {sectionEditModal.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Edit Section</h3>
                        <input
                            type="text"
                            value={sectionEditModal.sectionName}
                            onChange={handleSectionNameChange}
                            placeholder="Section name"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sectionEditModal.isFree}
                                onChange={handleSectionPremiumChange}
                                className="mr-2"
                            />
                            Free
                        </label>
                        <button onClick={saveSectionName} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                            Save
                        </button>
                        <button onClick={() => setSectionEditModal({ ...sectionEditModal, isOpen: false })} className="text-red-500 mt-2">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Lecture Modal */}
            {modal.sectionId && modal.lectureId && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Edit Lecture</h3>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Lecture name"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="file"
                            name="video"
                            onChange={handleFileChange}
                            className="mb-4"
                        />
                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            className="mb-4"
                        />
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Lecture notes"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Lecture description"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleInputChange}
                            placeholder="Order"
                            className="border p-2 rounded w-full mb-4"
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                        <button onClick={saveModalData} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                            Save
                        </button>
                        <button onClick={closeModal} className="text-red-500 mt-2">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurriculumEdit;
