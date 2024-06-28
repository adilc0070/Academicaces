function Logo() {
    return (
        <span className='logo flex items-center text-white '>
            <div className=' object-cover w-[100px] h-[100px]'>
                <img src="/src/assets/white.png" alt="logo" />
            </div>
            <p className='max-sm:hidden text-3xl font-koulen'>Academicases</p>
        </span>
    )
}

export default Logo



function Verified({title}) {
    return (
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <h2 className="text-sm font-normal">{title}</h2>
        </div>
    )
}

function Blocked({title}) {
    return (
        <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <h2 className="text-sm font-normal">{title}</h2>
        </div>
    )
}

function Pending({title}) {
    return (
        <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <h2 className="text-sm font-normal">{title}</h2>
        </div>
    )
}


export { Verified, Blocked, Pending }
