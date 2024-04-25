// import { BiStar } from "react-icons/bi"
import { Button } from "@mui/material"
import { BsStarFill, BsDownload } from "react-icons/bs"

function Test() {
    return (
        <div className="relative flex bg-slate-100 justify-center w-full h-[600px] rounded-2xl my-10">
            <div className={`flex flex-row w-[700px] h-[80%]`} >
                <div className="flex-1 flex flex-col justify-center items-start">
                    <img src="src/assets/giovanni-gagliardi-fvT3t9iOaJI-unsplash.jpg" className=" h-auto object-cover w-full rounded" style={{ width: '800px', height: '600px' }} />
                </div>
                <div className="flex-1 rounded-xl border-2 border-cyan-800">
                    <div className="flex justify-between mx-2 mt-4">
                        <p className=" text-sm">catogery name</p>
                        <div className="bg-black flex justify-center items-center rounded-full text-yellow-500 text-center tracking-wide w-[80px] ">
                            <BsStarFill /><p>{'4.5'}</p>
                        </div>
                    </div>
                    <div className="w-[300px]">
                        <h2 className="mx-4 text-2xl text-green-800 font-bold ">{'title'}</h2>
                        <div className="flex justify-left text-left text-2xl  max-lg:text-lg ">
                            <p className="text-content overflow-hidden break-words">{'sasadd dd dddd dd asd s a sad as dd ddd dd dd dddddddddddddddddddddddddddddddd'}</p>
                        </div>
                        <div className="flex rounded-full text-left tracking-wide mx-2 text-gray-800">
                            <BsDownload fontSize={'25px'} cursor={'pointer'} /><p className="mx-2">{'45k Downloads'}</p>
                        </div>
                        <div className="flex">
                            <h2 className="mx-4 text-2xl text-gray-800 line-through font-bold ">₹{'mrp'}</h2>
                            <h2 className="mx-4 text-2xl text-green-800 font-bold ">₹{'our price'}</h2>
                        </div>
                        <div className="mx-2 my-4">
                            <Button className="mx-2 border-collapse border-red-950" variant="contained" color="success">Add To Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test
