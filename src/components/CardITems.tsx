

function CardITems({ data }:{data:{id:number}}) {

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4 border p-3 font-medium border-gray-300">{'Selling Courses'}</div>
            <ul className='border-2 p-2'>
                {data && data.map((item) => (

                    <li key={item.id} className="mb-4">
                        <div>{item.name}</div>
                        <div className="text-gray-600">{item.email}</div>
                        <hr className='border-t border-dotted border-gray-300' />
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default CardITems
