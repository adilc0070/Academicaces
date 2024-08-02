import{ useState } from 'react';

const AssignmentItem = ({ assignment }:{assignment: { title: string; description: string; remarks: string; }}) => {
  const [remarks, setRemarks] = useState(assignment.remarks);

  const handleSaveRemarks = () => {
  
    console.log('Remarks saved:', remarks);
  };

  return (
    <div className="p-4 border border-gray-300 rounded mb-2">
      <h3 className="text-lg font-semibold">{assignment.title}</h3>
      <p className="mb-2">{assignment.description}</p>
      <textarea
        placeholder="Add remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={handleSaveRemarks}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Save Remarks
      </button>
    </div>
  );
};

export default AssignmentItem;
