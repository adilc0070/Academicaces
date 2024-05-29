import React, { useEffect, useState } from 'react';
import { BiLock, BiLockOpen } from 'react-icons/bi';
import { addCategoryApi, listCatogoriesApi } from '../services/admin/api';

function TableInput({ title }) {
    const [data, setData] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        console.log("data", data);

        listCatogoriesApi().then((result) => {

            console.log(result.catogaries);
            setData(result.catogaries)    // setData(result.)
        })
    }, [])

    const handleButtonClick = () => {
        setInputVisible(!inputVisible);
    };

    const validateInput = (inputValue) => {
        if (inputValue.trim() === '' || inputValue.length < 1) {
            setError('Input cannot be empty');
            return false;
        }
        setError('');
        return true;
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setValue(value);
        validateInput(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInput(value)) {

            await addCategoryApi({ value }).then((response) => {
                console.log("asdasddasweqcxzdfqwsaedqweasda,", response);
                setData(response.catogary)
            })

            setValue('');
            setInputVisible(false);
        } else {
            console.error('Error adding category:', error);
            setError('Failed to add category');

        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="block w-full overflow-x-auto">
                <div className="mb-4 border p-3 font-medium border-gray-300">{title}</div>

                <div className="mb-4 flex justify-end">
                    {inputVisible && (
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="border p-2 rounded-lg mr-2"
                                placeholder={`Enter ${title} name`}
                                onChange={handleChange}
                                value={value}
                                name='category'
                            />
                            <button
                                className="bg-green-500 text-white p-2 rounded-lg"
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                        </div>
                    )}
                    <button
                        className="bg-blue-500 text-white p-2 rounded-lg"
                        onClick={handleButtonClick}
                    >
                        {inputVisible ? 'Close' : `New ${title}`}
                    </button>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <table className="items-center w-full border-collapse text-blueGray-700 border-2">
                    <thead className="thead-light">
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                {`${title} Name`}
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                No Of Course
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                Action
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    No data
                                </th>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                        {item.name}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {item.noCoures}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <div className="flex items-center gap-x-6">
                                            {/* <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                <div>
                                                    <BiLock fontSize={'20px'} onClick={() => { }} />
                                                    <BiLockOpen fontSize={'20px'} onClick={() => { }} />
                                                </div>
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableInput;
