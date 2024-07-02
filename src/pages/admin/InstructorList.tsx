import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { blockStudentApi, listInstructorsApi} from '../../services/admin/api';
import CardTable from '../../components/CardTable';

function InstructorsList() {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        listInstructorsApi().then((result) => {
            setInstructors(result.data)
        })
    }, [])
    let block=async (id,status)=>{
        console.log("id",id,"status",status);
        await blockStudentApi(id,status)
        
    }
   
  return (
    <AdminLayout>
      <CardTable data={instructors} title={'Instructors'} block={block}/>
    </AdminLayout>
  )
}

export default InstructorsList
