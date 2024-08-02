import React from 'react';
import { BiLock, BiLockOpen } from 'react-icons/bi';

interface CourseData {
  title: string;
  subtitle: string;
  instructor: { name: string };
  category: { name: string };
  chapters: []; // Use any[] or a more specific type if available
  createdAt: string;
  price: string;
  verified: boolean;
  _id: string;
}

interface StudentData {
  userName: string;
  email: string;
  bio: string;
  verified: boolean;
  _id: string;
}

interface UserData {
  name: string;
  email: string;
  verified: boolean;
  _id: string;
}

interface CardTableProps {
  data: CourseData[] | StudentData[] | UserData[];
  title: string;
  block: (id: string, verified: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CardTable: React.FC<CardTableProps> = ({ data, title, block, currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="overflow-x-auto">
        <div className="mb-4 border p-3 font-medium border-gray-300">{title}</div>
        <table className="w-full min-w-full border-collapse text-blueGray-700 border-2">
          <thead className="bg-blueGray-50">
            <tr>
              {title === "Course" ? (
                <>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Subtitle</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Instructor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Chapters</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">CreatedAt</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Status</th>
                </>
              ) : title === "Students" ? (
                <>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Bio</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Status</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blueGray-500">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t">
                {title === "Course" ? (
                  <>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as CourseData).title}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as CourseData).subtitle}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as CourseData).instructor.name}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as CourseData).category.name}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as CourseData).chapters.length}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as CourseData).createdAt.split("T")[0]}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as CourseData).price}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">
                      <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500">
                        {(item as CourseData).verified ? <BiLockOpen fontSize={'20px'} color='green' onClick={() => block((item as CourseData)._id, (item as CourseData).verified)} /> : <BiLock fontSize={'20px'} color='red' onClick={() => block((item as CourseData)._id, (item as CourseData).verified)} />}
                      </button>
                    </td>
                  </>
                ) : title === "Students" ? (
                  <>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as StudentData).userName}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as StudentData).email}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as StudentData).bio}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">
                      <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500">
                        {(item as StudentData).verified ? <BiLock fontSize={'20px'} color='red' onClick={() => block((item as StudentData)._id, (item as StudentData).verified)} /> : <BiLockOpen fontSize={'20px'} color='green' onClick={() => block((item as StudentData)._id, (item as StudentData).verified)} />}
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as UserData).name}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">{(item as UserData).email}</td>
                    <td className="px-4 py-2 text-sm text-blueGray-600">
                      <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500">
                        {(item as UserData).verified ? <BiLock fontSize={'20px'} color='red' onClick={() => block((item as UserData)._id, (item as UserData).verified)} /> : <BiLockOpen fontSize={'20px'} color='green' onClick={() => block((item as UserData)._id, (item as UserData).verified)} />}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded-lg text-sm text-blueGray-700">Previous</button>
          <span className="text-sm text-blueGray-700">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded-lg text-sm text-blueGray-700">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CardTable;
