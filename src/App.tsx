import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserRoute from './Routes/UserRoute';
import AdminRoute from './Routes/AdminRoute';
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Toaster richColors position='top-right' closeButton />
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/user/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </>
  );
}

export default App;
