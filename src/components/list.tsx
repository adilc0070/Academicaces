import { useState } from 'react'

function List() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-end lg:hidden">
        <button onClick={toggleMenu} className="focus:outline-none focus:bg-gray-700 rounded-md p-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>


      <div className={`lg:flex lg:items-center lg:w-auto w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
        {['Home', 'Features', 'Courses', 'Teachers', 'Pricing', 'Reviews'].map((title, index) => (
          <p key={index} className='text-black mx-3 text-xl' onClick={() => console.log('clicked')}>
            {title}
          </p>
        ))}
      </div>
    </div>
  )
}

export default List
