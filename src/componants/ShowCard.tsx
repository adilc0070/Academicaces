import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowCard({ title, description, imageUrl, videos, course }) {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalOpen && !event.target.closest('.modal-content')) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [modalOpen]);

    const handleEditClick = () => {
        navigate('/instructor/edit-course', { state: { course } });
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="mb-4">
                    <button onClick={() => setModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2">View Details</button>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="modal-content bg-white p-8 max-w-lg mx-auto rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">{title}</h2>
                        <p className="text-gray-600 mb-4">{description}</p>
                        <div className="mb-4">
                            <iframe
                                className="w-full h-48"
                                src={videos}  
                                title={title}
                                allowFullScreen
                            />
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2">Edit</button>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowCard;
