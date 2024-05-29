import React from 'react'
import { BiLock, BiLockOpen } from 'react-icons/bi'

function CardTable({ data, title, block }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow ">
            <div className="block w-full overflow-x-auto ">
                <div className="mb-4 border p-3 font-medium border-gray-300">{title}</div>
                <table className="items-center w-full border-collapse text-blueGray-700 border-2">
                    <thead className="thead-light">
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                {`${title} Name`}
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                email
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    {item.userName}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {item.email}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {item.bio}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center gap-x-6">
                                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                            {item.verified ? <BiLock fontSize={'20px'} onClick={() => block(item._id, item.verified)} /> : <BiLockOpen fontSize={'20px'} onClick={() => block(item._id, item.verified)} />}

                                        </button>
                                    </div>
                                </td>

                                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center">
                                        <span className="mr-2">{item}</span>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                                <div
                                                    style={{ width: '60%' }}
                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </td> */}

                            </tr>
                        ))}

                        


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CardTable
