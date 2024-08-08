import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserRoute from './Routes/UserRoute';
import AdminRoute from './Routes/AdminRoute';
import { Toaster } from 'sonner'
import InstructorRoutes from './Routes/InstructorRoutes';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <>
      <Toaster richColors position='top-right' closeButton />
      <Routes>

        <Route path="" element={<LandingPage />} />
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path='/instructor/*' element={<InstructorRoutes />} />
      </Routes>
    </>
  );
}

export default App;
