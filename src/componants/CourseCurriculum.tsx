import { useState } from 'react';
import { curriculumApi } from '../services/instructor/api';
import { BiPencil, BiPlusCircle, BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CourseCurriculum = ({ id }) => {
    const [sections, setSections] = useState([
        { id: 1, name: 'Section 1', isFree: false, lectures: [{ id: 1, name: 'Lesson name', video: '', notes: '', file: '', description: '' }] }
    ]);

    const [modal, setModal] = useState({ sectionId: null, lectureId: null });
    const [formData, setFormData] = useState({ name: '', video: '', notes: '', file: '', description: '' });
    const [errors, setErrors] = useState({});
    const [sectionEditModal, setSectionEditModal] = useState({ isOpen: false, sectionId: null, sectionName: '', isFree: false });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const generateUniqueId = (arr) => arr.length ? Math.max(...arr.map(item => item.id)) + 1 : 1;

    const addSection = () => {
        const newSection = { id: generateUniqueId(sections), name: `Section ${sections.length + 1}`, isFree: false, lectures: [] };
        setSections([...sections, newSection]);
    };

    const addLecture = (sectionId) => {
        const updatedSections = sections.map(section => {
            if (section.id === sectionId) {
                const newLecture = { id: generateUniqueId(section.lectures), name: 'Lesson name', video: '', notes: '', file: '', description: '' };
                return { ...section, lectures: [...section.lectures, newLecture] };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const deleteSection = (sectionId) => {
        setSections(sections.filter(section => section.id !== sectionId));
    };

    const deleteLecture = (sectionId, lectureId) => {
        setSections(sections.map(section => {
            if (section.id === sectionId) {
                return { ...section, lectures: section.lectures.filter(lecture => lecture.id !== lectureId) };
            }
            return section;
        }));
    };

    const openModal = (sectionId, lectureId) => {
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
        setFormData({ name: lecture.name, video: lecture.video, notes: lecture.notes, file: lecture.file, description: lecture.description });
        setModal({ sectionId, lectureId });
    };

    const closeModal = () => {
        setModal({ sectionId: null, lectureId: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Lecture name is required";
        if (!formData.description) tempErrors.description = "Description is required";
        if (!formData.notes) tempErrors.notes = "Lecture notes are required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const saveModalData = () => {
        if (!validateForm()) return;
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
    };

    const getFileName = (file) => file ? file.name : 'No file selected';

    const submitForm = async () => {
        setLoading(true);
        try {
            await curriculumApi(id, sections).then((response) => {
                console.log(response);
                
                if(response.statusCode === 200){
                    toast.success(response.message);
                    navigate('/instructor/profile');
                }else{
                    toast.error(response.error);
                }
            })
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form', error);
        }
        setLoading(false);
    };

    const openSectionEditModal = (sectionId, sectionName) => {
        const section = sections.find(section => section.id === sectionId);
        if (!section) {
            console.error(`Section with id ${sectionId} not found`);
            return;
        }
        setSectionEditModal({ isOpen: true, sectionId, sectionName, isFree: section.isFree });
    };

    const handleSectionNameChange = (e) => {
        setSectionEditModal({ ...sectionEditModal, sectionName: e.target.value });
    };

    const handleSectionPremiumChange = (e) => {
        setSectionEditModal({ ...sectionEditModal, isFree: e.target.checked });
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
                            <span className={`font-semibold ${section.isFree ? 'text-red-500' : 'text-green-500'}`}>{section.isFree ? 'Free' : 'Paid'} Chapter</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => openSectionEditModal(section.id, section.name)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">
                                <BiPencil fontSize={'20px'} />
                            </button>
                            <button onClick={() => addLecture(section.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                                <BiPlusCircle fontSize={'20px'} />
                            </button>
                            <button onClick={() => deleteSection(section.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2">
                                <BiTrash fontSize={'20px'} />
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        {section.lectures.map(lecture => (
                            <div key={lecture.id} className="border-b p-4">
                                <div className="flex justify-between items-center">
                                    <span className="pl-2">{lecture.name}</span>
                                    <div className="relative flex">
                                        <button onClick={() => openModal(section.id, lecture.id)} className="p-2 flex bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            Edit
                                            <BiPencil fontSize={'20px'} />
                                        </button>
                                        <button onClick={() => deleteLecture(section.id, lecture.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2">
                                            <BiTrash fontSize={'20px'} />
                                        </button>
                                    </div>
                                </div>
                                <p className='mt-2 break-words max-w-4xl'><strong>Description:</strong> {lecture.description || 'No description provided'}</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold">Preview:</h4>
                                    <p className='max-w-4xl break-words'><strong>Video:</strong> {getFileName(lecture.video)}</p>
                                    <p className='max-w-4xl break-words'><strong>Notes:</strong> {lecture.notes || 'No notes provided'}</p>
                                    <p className='max-w-4xl break-words'><strong>File:</strong> {getFileName(lecture.file)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="p-4">
                <button onClick={addSection} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Add Section
                </button>
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ml-2">
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>

            {modal.sectionId !== null && modal.lectureId !== null && (
                <EditModal formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} saveModalData={saveModalData} closeModal={closeModal} errors={errors} />
            )}

            {sectionEditModal.isOpen && (
                <SectionEditModal sectionEditModal={sectionEditModal} handleSectionNameChange={handleSectionNameChange} handleSectionPremiumChange={handleSectionPremiumChange} saveSectionName={saveSectionName} setSectionEditModal={setSectionEditModal} />
            )}
        </div>
    );
};

const EditModal = ({ formData, handleInputChange, handleFileChange, saveModalData, closeModal, errors }) => (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Content</h3>
            <div className="mb-4">
                <label className="block text-gray-700">Lecture Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
                {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Lecture Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
                {errors.notes && <p className="text-red-500">{errors.notes}</p>}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className="mb-4">
                    <label className="block text-gray-700">Upload Video</label>
                    <input type="file" name="video" onChange={handleFileChange} className="w-full p-2 border rounded mt-1" />
                    {errors.video && <p className="text-red-500">{errors.video}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Attach File</label>
                    <input type="file" name="file" onChange={handleFileChange} className="w-full p-2 border rounded mt-1" />
                    {errors.file && <p className="text-red-500">{errors.file}</p>}
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                    Cancel
                </button>
                <button onClick={saveModalData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
            </div>
        </div>
    </div>
);

const SectionEditModal = ({ sectionEditModal, handleSectionNameChange, handleSectionPremiumChange, saveSectionName, setSectionEditModal }) => (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Chapter Name</h3>
            <div className="mb-4">
                <label className="block text-gray-700">Chapter Name</label>
                <input type="text" value={sectionEditModal.sectionName} onChange={handleSectionNameChange} className="w-full p-2 border rounded mt-1" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Chapter free or paid?</label>
                <input type="checkbox" checked={sectionEditModal.isFree} onChange={handleSectionPremiumChange} className="w-full p-2 border rounded mt-1" />
            </div>
            <div className="flex justify-end">
                <button onClick={() => setSectionEditModal({ isOpen: false, sectionId: null, sectionName: '', isFree: false })} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                    Cancel
                </button>
                <button onClick={saveSectionName} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
            </div>
        </div>
    </div>
);

export default CourseCurriculum;
