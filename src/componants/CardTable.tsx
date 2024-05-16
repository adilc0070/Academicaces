import React from 'react'

function CardTable() {
    return (
        <div className="bg-white p-4 rounded-lg shadow ">
            <div className="block w-full overflow-x-auto ">
            <div className="mb-4 border p-3 font-medium border-gray-300">Selling Courses</div>
                <table className="items-center w-full border-collapse text-blueGray-700 border-2">
                    <thead className="thead-light">
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Referral
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Visitors
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                Facebook
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                1,480
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">60%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                            <div
                                                style={{ width: '60%' }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                Facebook
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                5,480
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">0%</span>
                                    <div className="relative w-full">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                                            <div
                                                style={{ width: '0%' }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CardTable
