import { useState } from 'react';
import { FaHamburger } from "@react-icons/all-files/fa/FaHamburger";
import { Link } from 'react-router-dom';
import Logo from "./Logo"; // Make sure to import your Logo component

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-sky-700 to-blue-800 w-full z-20 top-0 start-0 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <Logo />
        </Link>
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            className="bg-white text-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
          >
            <Link to="/signIn">Open an Account</Link>
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <FaHamburger />
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 text-white font-medium border border-gray-100 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 bg-gradient-to-r from-blue-800 to-blue-800 md:bg-transparent">
            {['Home', 'Courses', 'Instructor'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="block hover:bg-blue-700 hover:rounded-lg py-2 px-3 transition-all duration-300 md:hover:bg-transparent md:hover:text-sky-300 md:p-0">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
