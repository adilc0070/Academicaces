
import { useEffect, useState } from 'react';
import InstructorLayout from '../../componants/InstructorsLayout'
import CardTable from '../../componants/CardTable';
import { blockStudentApi, listStudentsApi } from '../../services/admin/api';

function HomePage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    listStudentsApi().then((result) => {
      setStudents(result.data)
    })

  }, [])
  let block=async (id,status)=>{
    console.log("id",id,"status",status);
    await blockStudentApi(id,status)
    
}
  return (
    <InstructorLayout>
      {/* <DashBoard /> */}
      <CardTable data={students} title={'Students'} block={block}/>
    </InstructorLayout>
  )
}

export default HomePage
