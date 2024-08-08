import React, { useState } from 'react';

interface AssignmentItemProps {
    assignment: {
        _id: number;
        name: string;
        courseId: {
            _id: number;
            title: string;
        };
        createdAt: string;
        totalMarks: number;
        totalSubmit: number;
        remark: string;
    };
    saveRemarks: (id: number, remarks: string) => void;
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({ assignment, saveRemarks }) => {
    const [remarks, setRemarks] = useState(assignment.remark);

    const handleSave = () => {
        saveRemarks(assignment._id, remarks);
        console.log('Remarks saved:', remarks);
    };

    return (
        <div className="assignment-item">
            <h3>{assignment.name}</h3>
            <p>Course: {assignment.courseId.title}</p>
            <p>Created At: {new Date(assignment.createdAt).toLocaleDateString()}</p>
            <p>Total Marks: {assignment.totalMarks}</p>
            <p>Total Submits: {assignment.totalSubmit}</p>
            <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                Save Remarks
            </button>
        </div>
    );
};

export default AssignmentItem;
