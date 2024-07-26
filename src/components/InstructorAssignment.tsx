import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addAssigment, listAssignments, listCourses } from '../services/instructor/api';


const InstructorAssignment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const instructor = useSelector((state: RootState) => state.instructor.email);
    const [assignments,setAssignments] = useState([]);

    useEffect(() => {
        listCourses(instructor).then((res) => {
            setCourses(res.courses);
        });
        listAssignments(instructor).then((res) => {
            console.log(" result from assignments", res);
            setAssignments(res.assignments);            
        })
    }, [instructor]);

    const formik = useFormik({
      initialValues: {
          course: '',
          assignmentName: '',
          instructions: '',
          file: null,
      },
      validationSchema: Yup.object({
          course: Yup.string().required('Course is required'),
          assignmentName: Yup.string().required('Assignment name is required'),
          instructions: Yup.string().required('Instructions are required'),
          file: Yup.mixed().required('File is required'),
      }),
      onSubmit: (values) => {
          const formData = new FormData();
          formData.append('course', values.course);
          formData.append('assignmentName', values.assignmentName);
          formData.append('instructions', values.instructions);
          formData.append('file', values.file);

          addAssigment(instructor, formData).then((res) => {
              console.log(res);
              setIsModalOpen(false);
          });
      },
  });

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Assignments</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add New Assignment
                </button>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Assignment Name</th>
                            <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Course</th>
                            {/* <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Actions</th> */}
                            <th className="py-2 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment) => (
                            <tr key={assignment._id}>
                                <td className="py-2 px-6 border-b border-gray-200">{assignment.name}</td>
                                <td className="py-2 px-6 border-b border-gray-200">{assignment.courseId.title}</td>
                                {/* <td className="py-2 px-6 border-b border-gray-200">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                </td> */}
                                <td className="py-2 px-6 border-b border-gray-200">{assignment.createdAt.split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Assignment</h3>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700">Course</label>
                                    <select
                                        name="course"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.course}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="" label="Select course" />
                                        {courses.map(course => (
                                            <option key={course._id} value={course?._id}>{course?.title}</option>
                                        ))}
                                    </select>
                                    {formik.touched.course && formik.errors.course ? (
                                        <div className="text-red-500 text-xs">{formik.errors.course}</div>
                                    ) : null}
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700">Assignment Name</label>
                                    <input
                                        type="text"
                                        name="assignmentName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.assignmentName}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {formik.touched.assignmentName && formik.errors.assignmentName ? (
                                        <div className="text-red-500 text-xs">{formik.errors.assignmentName}</div>
                                    ) : null}
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700">Instructions</label>
                                    <textarea
                                        name="instructions"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instructions}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {formik.touched.instructions && formik.errors.instructions ? (
                                        <div className="text-red-500 text-xs">{formik.errors.instructions}</div>
                                    ) : null}
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700">File</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={(event) => formik.setFieldValue("file", event.currentTarget.files[0])}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {formik.touched.file && formik.errors.file ? (
                                        <div className="text-red-500 text-xs">{formik.errors.file}</div>
                                    ) : null}
                                </div>
                                <div className="mt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Save
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

export default InstructorAssignment;
