import { useState } from 'react';
import { curriculumApi } from '../services/instructor/api';
import { BiPencil, BiPlusCircle, BiTrash } from 'react-icons/bi';

const CourseCurriculum = () => {
    const [sections, setSections] = useState([
        { id: 1, name: 'Section 1', lectures: [{ id: 1, name: 'Lecture name', video: '', notes: '', file: '',description:'' }] }
    ]);

    const [modal, setModal] = useState({ sectionId: null, lectureId: null });
    const [formData, setFormData] = useState({ name: '', video: '', notes: '', file: '', description: '' });
    const [sectionEditModal, setSectionEditModal] = useState({ isOpen: false, sectionId: null, sectionName: '' });



    const addSection = () => {
        const newSection = { id: sections.length + 1, name: `Section ${sections.length + 1}`, lectures: [] };
        setSections([...sections, newSection]);
    };

    const addLecture = (sectionId) => {
        const newLecture = { id: sections.find(section => section.id === sectionId).lectures.length + 1, name: 'Lecture name', video: '', notes: '', file: '',description:'' };
        const updatedSections = sections.map(section => {
            if (section.id === sectionId) {
                return { ...section, lectures: [...section.lectures, newLecture] };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const deleteSection = (sectionId) => {
        const updatedSections = sections.filter(section => section.id !== sectionId);
        setSections(updatedSections);
    };

    const deleteLecture = (sectionId, lectureId) => {
        const updatedSections = sections.map(section => {
            if (section.id === sectionId) {
                const updatedLectures = section.lectures.filter(lecture => lecture.id !== lectureId);
                return { ...section, lectures: updatedLectures };
            }
            return section;
        });
        setSections(updatedSections);
    };



    const openModal = (sectionId, lectureId) => {
        const lecture = sections.find(section => section.id === sectionId).lectures.find(lecture => lecture.id === lectureId);
        setFormData({ name: lecture.name, video: lecture.video, notes: lecture.notes, file: lecture.file ,description:lecture.description});
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
    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const saveModalData = () => {
        const updatedSections = sections.map(section => {
            if (section.id === modal.sectionId) {
                return {
                    ...section,
                    lectures: section.lectures.map(lecture => {
                        if (lecture.id === modal.lectureId) {
                            return { ...lecture, ...formData };
                        }
                        return lecture;
                    })
                };
            }
            return section;
        });
        setSections(updatedSections);
        closeModal();
    };

    const getFileName = (file) => {
        return file ? file.name : 'No file selected';
    };

    const submitForm = async () => {
        console.log('submit form', formData);
        let data = await curriculumApi('dsasda', sections);
    };

    const openSectionEditModal = (sectionId, sectionName) => {
        setSectionEditModal({ isOpen: true, sectionId, sectionName });
    };

    const handleSectionNameChange = (e) => {
        setSectionEditModal({ ...sectionEditModal, sectionName: e.target.value });
    };

    const saveSectionName = () => {
        const updatedSections = sections.map(section => {
            if (section.id === sectionEditModal.sectionId) {
                return { ...section, name: sectionEditModal.sectionName };
            }
            return section;
        });
        setSections(updatedSections);
        setSectionEditModal({ isOpen: false, sectionId: null, sectionName: '' });
    };

    return (
        <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
            {sections.map(section => (
                <div key={section.id} className="border rounded-lg mt-8">
                    <div className="border-b p-4 flex justify-between items-center">
                        <span className="font-semibold">{section.name}</span>
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
                                    <p><strong>Description:</strong> {lecture.description}</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold">Preview:</h4>
                                    <p><strong>Video:</strong> {getFileName(lecture.video)}</p>
                                    <p><strong>Notes:</strong> {lecture.notes ? lecture.notes : 'No notes provided'}</p>
                                    <p><strong>File:</strong> {getFileName(lecture.file)}</p>
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
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    Previous
                </button>
                <button onClick={() => submitForm()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ml-2">
                    Submit
                </button>
            </div>

            {modal.sectionId !== null && modal.lectureId !== null && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Edit Content</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700">Lecture Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Lecture Notes</label>
                            <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className="mb-4">
                                <label className="block text-gray-700">Upload Video

                                    <input type="file" name="video" onChange={handleFileChange} className="w-full p-2 border rounded mt-1" />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Attach File</label>
                                <input type="file" name="file" onChange={handleFileChange} className="w-full p-2 border rounded mt-1" />
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
            )}

            {sectionEditModal.isOpen && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Edit Section Name</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700">Section Name</label>
                            <input type="text" value={sectionEditModal.sectionName} onChange={handleSectionNameChange} className="w-full p-2 border rounded mt-1" />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setSectionEditModal({ isOpen: false, sectionId: null, sectionName: '' })} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                                Cancel
                            </button>
                            <button onClick={saveSectionName} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseCurriculum;
