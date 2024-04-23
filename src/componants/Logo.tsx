function Logo() {
    return (
        <div className='logo flex items-center text-white'>
            <div className='w-[100px] h-[100px] object-cover'>
                <img src="/src/assets/white.png" alt="logo" />

            </div>
            <p className='max-sm:hidden text-3xl font-koulen'>Academicases</p>
        </div>
    )
}

export default Logo
