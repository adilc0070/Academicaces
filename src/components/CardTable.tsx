import { BiLock, BiLockOpen } from 'react-icons/bi'

function CardTable({ data, title, block, currentPage, totalPages, onPageChange }:{data:string[],title:string,block:any,currentPage:number,totalPages:number,onPageChange:any}) {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="block w-full overflow-x-auto">
                <div className="mb-4 border p-3 font-medium border-gray-300">{title}</div>
                <table className="items-center w-full min-w-full border-collapse text-blueGray-700 border-2">
                    <thead className="thead-light">
                        <tr>
                            {title === "Course" ? (
                                <>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Title</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Subtitle</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Instructor</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Category</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Chapters</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>CreatedAt</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Price</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Status</th>
                                </>
                            ) : (title === "Students" ? (
                                <>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Name</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Email</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Bio</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Status</th>
                                </>
                            ) : (
                                <>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Name</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Email</th>
                                    <th className='px-4 md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm md:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>Status</th>
                                </>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {title === "Course" ? (
                                    <>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.title}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.subtitle}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.instructor.name}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.category.name}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.chapters.length}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.createdAt.split("T")[0]}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.price}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">
                                            <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                {item.verified ? <BiLockOpen fontSize={'20px'} color='green' onClick={() => block(item._id, item.verified)} /> : <BiLock fontSize={'20px'} color='red' onClick={() => block(item._id, item.verified)} />}
                                            </button>
                                        </td>
                                    </>
                                ) : (title === "Students" ? (
                                    <>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.userName}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.email}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.bio}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">
                                            <div className="flex items-center gap-x-6">
                                                <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    {item.verified ? <BiLock fontSize={'20px'} color='red' onClick={() => block(item._id, item.verified)} /> : <BiLockOpen fontSize={'20px'} color='green' onClick={() => block(item._id, item.verified)} />}
                                                </button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.name}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">{item.email}</td>
                                        <td className="border-t-0 px-4 md:px-6 align-middle border-l-0 border-r-0 text-xs md:text-md whitespace-nowrap p-4">
                                            <div className="flex items-center gap-x-6">
                                                <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    {item.verified ? <BiLock fontSize={'20px'} color='red' onClick={() => block(item._id, item.verified)} /> : <BiLockOpen fontSize={'20px'} color='green' onClick={() => block(item._id, item.verified)} />}

                                                </button>
                                            </div>
                                        </td>
                                    </>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded-lg">Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded-lg">Next</button>
                </div>
            </div>
        </div>
    )
}

export default CardTable;
