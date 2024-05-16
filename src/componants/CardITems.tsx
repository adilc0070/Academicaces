import React from 'react'

function CardITems() {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4 border p-3 font-medium border-gray-300">Selling Courses</div>
            <ul className='border-2 p-2'>
                <li className="mb-4">
                    <div>JavaScript Basic</div>
                    <div className="text-gray-600">$240.00</div>
                    <hr className='border-t border-dotted border-gray-300' />
                </li>
                <li className="mb-4">
                    <div>JavaScript</div>
                    <div className="text-gray-600">$650.00</div>
                    <hr className='border-t' />
                </li>
                <li className="mb-4">
                    <div>Node JS</div>
                    <div className="text-gray-600">$325.00</div>
                </li>
                <li>
                    <div>REACT JS</div>
                    <div className="text-gray-600">$170.00</div>
                </li>
            </ul>
        </div>
    )
}

export default CardITems
