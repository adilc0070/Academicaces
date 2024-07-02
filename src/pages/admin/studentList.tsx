import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { blockStudentApi, listStudentsApi } from '../../services/admin/api';
import CardTable from '../../components/CardTable';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        listStudentsApi(currentPage, 10).then((result) => {
            setStudents(result.data);
            setTotalPages(Math.ceil(result.total / 10)); // Set limit to 3
        });
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const block = async (id, status) => {
        console.log("id", id, "status", status);
        await blockStudentApi(id, status).then((result) => {
            // Update the students state to reflect the changes
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student._id === id ? { ...student, verified: !status } : student
                )
            );
        });
    };

    return (
        <AdminLayout>
            <CardTable
                data={students}
                title={'Students'}
                block={block}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </AdminLayout>
    );
}

export default StudentList;
