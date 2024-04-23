import Buttons from "./Buttons"

function NavBar() {
    return (
        <div className='flex w-full justify-center items-center'>
            <div className='bg-sky-800 flex justify-between items-center w-[92%] h-20 mt-9 rounded-xl'>
                <div className='logo flex items-center text-white'>
                    <div className='w-[100px] h-[100px] object-cover'>
                        <img src="/src/assets/white.png" alt="logo" />

                    </div>
                    <p className='max-sm:hidden text-3xl font-koulen'>Academicases</p>
                </div>
                <div className='menu flex w-auto'>
                    {['Home', 'Features', 'Courses', 'Teachers', 'Pricing', 'Reviews'].map((title, index) => <p onClick={() => console.log('clicked')} key={index} className='text-white mx-3 text-xl'>{title}</p>)}
                </div>
                <div className='btn flex w-auto py-2 ' >
                    {['SignIN', 'SignUP'].map((title, index) => <Buttons key={index} title={title} color={title === 'SignIN' ? '#00ABCC' : 'white'} />)}
                </div>
            </div>
        </div>
    )
}

export default NavBar
