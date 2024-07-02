import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout'
import CardTable from '../../components/CardTable';
import { listAllCoursesApi, verifieCourseApi, } from '../../services/admin/api';
import { toast } from 'sonner';

function CourseVerification() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        listAllCoursesApi().then((result) => {
            setCourses(result.courses);
            setTotalPages(Math.ceil(result.total / 10));
        });
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const block = async (id, status) => {
        await verifieCourseApi(id, status).then((result) => {
            toast.success(result.message);
            setCourses((prevCourse): any =>
                prevCourse.map((course) =>
                    course._id === id ? { ...course, verified: !status } : course
                )
            );
        }).catch((error) => {
            toast.error(error);
        });
    };

    return (
        <AdminLayout>
            <CardTable
                data={courses}
                title={'Course'}
                block={block}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </AdminLayout>
    );
}

export default CourseVerification
