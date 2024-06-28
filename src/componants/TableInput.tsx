import React, { useEffect, useState } from 'react';
import { BiLock, BiLockOpen, BiEdit, BiTrash } from 'react-icons/bi';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { addCategoryApi, listCatogoriesApi, updateCategoryApi, toggleCategoryBlockApi, deleteCategoryApi } from '../services/admin/api';
import { toast } from 'sonner';

function TableInput({ title }: { title: string }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [inputVisible, setInputVisible] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    useEffect(() => {
        fetchCategories();
    }, [page,data]);

    const fetchCategories = async () => {
        const result = await listCatogoriesApi(page);
        setData(result.catogaries);
        setTotal(result.total);
    };

    const handleButtonClick = () => {
        setInputVisible(!inputVisible);
    };

    const validateInput = (inputValue: string, currentIndex = null) => {
        if (inputValue.trim() === '' || inputValue.length < 1) {
            setError('Input cannot be empty or just spaces');
            return false;
        }
        if (data.some((category, index) => category.name.toLowerCase() === inputValue.toLowerCase().trim() && index !== currentIndex)) {
            setError('Category name must be unique');
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateInput(value)) {
            await addCategoryApi({ value: value.trim() }).then((result) => {
                console.log(result);
                toast.success('Category added');
                
                setData([result.catogary, ...data]);
            });

            setValue('');
            setInputVisible(false);
        } else {
            setError('Failed to add category');
        }
    };

    const handleEditChange = (e) => {
        setEditingValue(e.target.value);
        validateInput(e.target.value, editingIndex);
    };

    const handleEditSubmit = async (index) => {
        if (validateInput(editingValue, index)) {
            confirmAlert({
                title: 'Confirm to edit',
                message: `Are you sure you want to edit the category to "${editingValue}"?`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            await updateCategoryApi(data[index]._id, { name: editingValue.trim() }).then((response) => {
                                const updatedData = [...data];
                                updatedData[index] = response;
                                setData(updatedData);
                                toast.success('Category updated');
                            }).catch((error) => {
                                toast.error('Failed to update category');
                                console.error(error);
                            });
                            setEditingIndex(null);
                            setEditingValue('');
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ]
            });
        } else {
            setError('Failed to update category');
        }
    };

    const handleBlockToggle = async (index) => {
        const category = data[index];
        confirmAlert({
            title: 'Confirm to block/unblock',
            message: `Are you sure you want to ${category.isBlock ? 'unblock' : 'block'} the category "${category.name}"?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await toggleCategoryBlockApi(category._id, !category.isBlock).then((response) => {
                            const updatedData = [...data];
                            updatedData[index] = response;
                            setData(updatedData);
                            toast.success(`Category ${category.isBlock ? 'unblocked' : 'blocked'}`);
                        }).catch((error) => {
                            toast.error(`Failed to ${category.isBlock ? 'unblock' : 'block'} category`);
                            console.error(error);
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const handleDelete = async (index) => {
        const category = data[index];
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure you want to delete the category "${category.name}"?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteCategoryApi(category._id).then(() => {
                            const updatedData = data.filter((_, i) => i !== index);
                            setData(updatedData);
                            toast.success('Category deleted');
                        }).catch((error) => {
                            toast.error('Failed to delete category');
                            console.error(error);
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const handlePageChange = (newPage) => {
        console.log('Page change triggered, new page:', newPage); // Debugging
        setPage(newPage);
    };

    
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="overflow-x-auto">
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
                        {inputVisible ? 'Close' : `New ${title.split(' ')[0]}`}
                    </button>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {`${title.split(' ')[0]} Name`}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No Of Course
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap" colSpan="4">
                                    No data
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingIndex === index ? (
                                            <input
                                                type="text"
                                                value={editingValue}
                                                onChange={handleEditChange}
                                                className="border p-2 rounded-lg border-gray-300 w-full"
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.noCoures}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-x-2">
                                            {editingIndex === index ? (
                                                <>
                                                    <button
                                                        className="text-green-500 hover:text-green-700"
                                                        onClick={() => handleEditSubmit(index)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => setEditingIndex(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="text-blue-500 hover:text-indigo-500 flex items-center"
                                                        onClick={() => {
                                                            setEditingIndex(index);
                                                            setEditingValue(item.name);
                                                        }}
                                                    >
                                                        <BiEdit className="mr-1" size={20} />
                                                        <span className="ml-1">Edit</span>
                                                    </button>
                                                    <button
                                                        className="text-blue-500 hover:text-indigo-500"
                                                        onClick={() => handleBlockToggle(index)}
                                                    >
                                                        {item.isBlock ? (
                                                            <span className="flex items-center text-green-500 hover:text-green-700">
                                                                <BiLockOpen className="mr-1" size={20} />
                                                                <span className="ml-1">Unblock</span>
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center text-red-500 hover:text-red-700">
                                                                <BiLock className="mr-1" size={20} />
                                                                <span className="ml-1">Block</span>
                                                            </span>
                                                        )}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className="text-red-500 hover:text-red-700"
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
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-gray-500 text-white p-2 rounded-lg"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="p-2 ">Page <strong>{`${page}`}</strong> {` of ${Math.ceil(total / 8)}`}</span>
                    <button
                        className="bg-gray-500 text-white p-2 rounded-lg"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === Math.ceil(total / 8)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TableInput;
