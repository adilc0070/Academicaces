import React, { useState } from 'react';

const CourseCurriculum = () => {
    const [sections, setSections] = useState([
        { id: 1, name: 'Section 01', lectures: [{ id: 1, name: 'Lecture name' }] }
    ]);
    const [dropdowns, setDropdowns] = useState({});

    const addSection = () => {
        const newSection = { id: sections.length + 1, name: `Section ${sections.length + 1}`, lectures: [] };
        setSections([...sections, newSection]);
    };

    const addLecture = (sectionId) => {
        const newLecture = { id: sections.find(section => section.id === sectionId).lectures.length + 1, name: 'Lecture name' };
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

    const toggleDropdown = (sectionId, lectureId) => {
        const key = `${sectionId}-${lectureId}`;
        setDropdowns(prevDropdowns => ({
            ...prevDropdowns,
            [key]: !prevDropdowns[key]
        }));
    };

    return (
        <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
            {sections.map(section => (
                <div key={section.id} className="border rounded-lg mt-8">
                    <div className="border-b p-4 flex justify-between items-center">
                        <span className="font-semibold">{section.name}</span>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => addLecture(section.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue--700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <button onClick={() => deleteSection(section.id)} className="p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        {section.lectures.map(lecture => (
                            <div key={lecture.id} className="border-b p-4 flex justify-between items-center">
                                <span className="pl-2">{lecture.name}</span>
                                <div className="relative">
                                    <button onClick={() => toggleDropdown(section.id, lecture.id)} className="p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        Contents
                                        <svg className="w-5 h-5 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {dropdowns[`${section.id}-${lecture.id}`] && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Video</a>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Attach File</a>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Lecture Notes</a>
                                        </div>
                                    )}
                                    <button onClick={() => deleteLecture(section.id, lecture.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
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
                <button onClick={()=>{}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ml-2">
                    Submit
                </button>
            </div>

        </div>
        
    );
};

export default CourseCurriculum;
