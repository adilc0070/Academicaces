import React, { useEffect, useState } from 'react';
import { BiLock, BiLockOpen, BiEdit, BiTrash } from 'react-icons/bi';
import { addCategoryApi, listCatogoriesApi, updateCategoryApi, toggleCategoryBlockApi, deleteCategoryApi } from '../services/admin/api';

function TableInput({ title }) {
    const [data, setData] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    useEffect(() => {
        listCatogoriesApi().then((result) => {
            setData(result.catogaries);
        });
    }, []);

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
                setData(response.catogary);
            });

            setValue('');
            setInputVisible(false);
        } else {
            setError('Failed to add category');
        }
    };

    const handleEditChange = (e) => {
        setEditingValue(e.target.value);
    };

    const handleEditSubmit = async (index) => {
        if (validateInput(editingValue)) {
            await updateCategoryApi(data[index]._id, { name: editingValue }).then((response) => {
                console.log('response', response);
                const updatedData = [...data];
                updatedData[index] = response;                
                setData(response);
            });
            setEditingIndex(null);
            setEditingValue('');
        } else {
            setError('Failed to update category');
        }
    };

    const handleBlockToggle = async (index) => {
        const category = data[index];
        await toggleCategoryBlockApi(category.id, !category.blocked).then((response) => {
            const updatedData = [...data];
            updatedData[index] = response.catogary;
            setData(updatedData);
        });
    };

    const handleDelete = async (index) => {
        const category = data[index];
        // console.log('category', category);
        await deleteCategoryApi(category._id).then(() => {
            const updatedData = data.filter((_, i) => i !== index);
            setData(updatedData);
        });
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
                                name="category"
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
                <table className="items-center w-full border-collapse text-blueGray-900 si-2">
                    <thead className="thead-light">
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                {`${title} Name`}
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                No Of Course
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                Action
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left">
                                    No data
                                </th>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left">
                                        {editingIndex === index ? (
                                            <input
                                                type="text"
                                                value={editingValue}
                                                onChange={handleEditChange}
                                                className="border p-2 rounded-lg border-gray-300 w-64 text-red-700 text-lg"
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                        {item.noCoures}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                        <div className="flex justify-between items-center w-10 gap-x-6">
                                            {editingIndex === index ? (
                                                <button
                                                    className="text-green-500 transition-colors duration-200 hover:text-green-700 focus:outline-none"
                                                    onClick={() => handleEditSubmit(index)}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none flex items-center"
                                                onClick={() => {
                                                    setEditingIndex(index);
                                                    setEditingValue(item.name);
                                                }}
                                            >
                                                <BiEdit className="mr-1" size={20} />
                                                <span className="ml-1">Edit</span>
                                            </button>
                                            
                                            )}
                                            {/* <button
                                                className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                                onClick={() => handleBlockToggle(index)}
                                            >
                                                {item.verified ? (
                                                    <BiLockOpen fontSize={'20px'} />
                                                ) : (
                                                    <BiLock fontSize={'20px'} />
                                                )}
                                            </button> */}
                                        </div>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                        <button
                                            className="text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <BiTrash fontSize={'20px'} />
                                        </button>
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
