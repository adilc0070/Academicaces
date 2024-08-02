import InstructorLayout from '../../components/InstructorsLayout'
import DashBoard from '../../components/DashBoard';
// import AdminDashboard from '../../components/AdminDashboard';
// import AlternativeAdminDashboard from '../../components/AlternativeAdminDashboard';

function HomePage() {
  return (
    <InstructorLayout>
      <DashBoard />
      {/* <AdminDashboard />
      <AlternativeAdminDashboard/> */}
    </InstructorLayout>
  )
}

export default HomePage
