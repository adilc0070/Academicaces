import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { setInstructorLogOut } from "../store/slice/instructorSlice";
import { useDispatch, } from "react-redux";
const InstructorLayout = ({ children }:{children:React.ReactNode}): React.ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandle = () => {
    dispatch(setInstructorLogOut())
    localStorage.removeItem('instructorToken')
    navigate('/instructor/signIn')
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-800 text-white p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <div className="text-2xl font-bold mb-8">{(window.location.pathname).split('/')[2].toLocaleUpperCase() }</div>
        <nav>
          <ul>
            {[ 'Add-Course',"Add-Assignment",  "Message", 'Profile'].map((item, index) => (
              (window.location.pathname).includes(`/instructor/${item.toLowerCase()}`) ? <div key={index} className="block mb-4 bg-blue-950 drop-shadow-none rounded-3xl max-w-full max-h-full p-2 text-center">
                <li className=""><Link to={`/instructor/${item.toLowerCase()}`} className="font-bold  ">{item}</Link></li>
              </div> :
                <div key={index} className="mb-4 p-2 ">
                  <li ><Link to={`/instructor/${item.toLowerCase()}`} className="block">{item}</Link></li>
                </div>

            ))}
            <li onClick={() => logoutHandle()} className="mb-4"><p className="block"><CgLogOut className="inline-block mr-3" size={28} />Logout</p></li>
          </ul>
        </nav>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}


      <div className="flex-1 flex flex-col ">
        <header className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="text-xl font-bold">{(window.location.pathname).split('/')[2].toLocaleUpperCase() }</div>
        </header>

        <main className="flex-1 p-8 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;