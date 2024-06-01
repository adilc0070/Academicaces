import React, { useEffect, useState } from 'react'
import AdminLayout from '../../componants/AdminLayout'
import { blockStudentApi, listStudentsApi } from '../../services/admin/api';
import CardTable from '../../componants/CardTable';

function StudentList() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        listStudentsApi().then((result) => {
            setStudents(result.data)
        })

    }, [])
    let block=async (id,status)=>{
        console.log("id",id,"status",status);
        await blockStudentApi(id,status).then((result)=>{
            setStudents(result.user);
        })
        
    }
   
  return (
    <AdminLayout>
      <CardTable data={students} title={'Students'} block={block}/>
    </AdminLayout>
  )
}

export default StudentList
