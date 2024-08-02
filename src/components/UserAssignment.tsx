import { useEffect, useState } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Define types for assignment and form values
interface Assignment {
  id: number;
  name: string;
  course: string;
  totalMarks: number;
  totalSubmit: number;
  remark: string;
}

interface FormValues {
  file: File | null;
}

const UserAssignment = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  setAssignments
  const formik = useFormik<FormValues>({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required('File is required'),
    }),
    onSubmit: (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      console.log(values);
      // handle file upload
      resetForm();
    },
  });

  useEffect(() => {
    // Fetch assignments or any other side effects
  }, []);

  const assignmentList: Assignment[] = [
    {
      id: 1,
      name: "Write a the 5",
      course: "Fundamentals",
      totalMarks: 80,
      totalSubmit: 2,
      remark: "Good job on the last assignment!",
    },
    // add more assignments here
  ];
  console.log(assignmentList);
  

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Assignment Name</th>
              <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Total Marks</th>
              <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Total Submit</th>
              <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Remark</th>
              <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="py-2 px-6 border-b border-gray-200">
                  {assignment.name}<br /><span className="text-sm text-gray-500">course: {assignment.course}</span>
                </td>
                <td className="py-2 px-6 border-b border-gray-200">{assignment.totalMarks}</td>
                <td className="py-2 px-6 border-b border-gray-200">{assignment.totalSubmit}</td>
                <td className="py-2 px-6 border-b border-gray-200">{assignment.remark}</td>
                <td className="py-2 px-6 border-b border-gray-200">
                  <button
                    onClick={() => setSelectedAssignment(assignment)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View & Upload
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Assignment for {selectedAssignment.name}</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">File</label>
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => formik.setFieldValue("file", event.currentTarget.files ? event.currentTarget.files[0] : null)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched.file && formik.errors.file ? (
                    <div className="text-red-500 text-xs">{formik.errors.file as string}</div> // Cast the error to string
                  ) : null}
                </div>
                <div className="mt-4">
                  <button type="button" onClick={() => setSelectedAssignment(null)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAssignment;
