import { useState } from 'react';
import { GrFavorite } from 'react-icons/gr';

const CoursePage = () => {
    const [activeTab, setActiveTab] = useState('curriculum');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'curriculum':
                return (
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Intro Course content</h2>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span>Video: Lorem ipsum dolor sit amet.</span>
                                <span>22 minutes</span>
                            </div>
                            <button className="text-purple-600">Preview</button>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span>Video: Lorem ipsum dolor sit amet.</span>
                                <span>05 minutes</span>
                            </div>
                            <button className="text-purple-600">Preview</button>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span>Video: Lorem ipsum dolor sit amet.</span>
                                <span>10 minutes</span>
                            </div>
                            <button className="text-purple-600">Preview</button>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span>Video: Lorem ipsum dolor sit amet.</span>
                                <span>15 minutes</span>
                            </div>
                            <button className="text-purple-600">Preview</button>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span>Lesson 03 Exam:</span>
                                <span>20 Ques</span>
                            </div>
                        </div>
                    </div>
                );
            case 'description':
                return (
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Experience Description</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium, dolor tellus aliquet nunc, vitae ultricies erat elit eu lacus. Vestibulum non justo consectetur, cursus ante, tincidunt sapien. Nulla quis diam sit amet turpis interdum accumsan quis nec enim. Vivamus faucibus ex sed nibh egestas elementum. Mauris et bibendum dui. Aenean consequat pulvinar luctus.</p>
                        <p>We have covered many special events such as fireworks, fairs, parades, races, walks, awards ceremonies, fashion shows, sporting events, and even a memorial service.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium, dolor tellus aliquet nunc, vitae ultricies erat elit eu lacus. Vestibulum non justo consectetur, cursus ante, tincidunt sapien. Nulla quis diam sit amet turpis interdum accumsan quis nec enim. Vivamus faucibus ex sed nibh egestas elementum. Mauris et bibendum dui. Aenean consequat pulvinar luctus.</p>
                    </div>
                );
            case 'reviews':
                return (
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                        <div className="flex items-center mb-4">
                            <span className="text-5xl font-bold text-purple-600">5.0</span>
                            <div className="ml-4 flex-1">
                                <div className="flex items-center">
                                    <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                                    <span className="text-gray-600 ml-2">(17 Reviews)</span>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <div className="flex items-center">
                                        <span className="text-gray-600 mr-2">5</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-pink-500 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                        <span className="text-gray-600 ml-2">10</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <span className="text-gray-600 mr-2">4</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-pink-500 rounded-full" style={{ width: '50%' }}></div>
                                        </div>
                                        <span className="text-gray-600 ml-2">5</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <span className="text-gray-600 mr-2">3</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-pink-500 rounded-full" style={{ width: '30%' }}></div>
                                        </div>
                                        <span className="text-gray-600 ml-2">2</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <span className="text-gray-600 mr-2">2</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-pink-500 rounded-full" style={{ width: '20%' }}></div>
                                        </div>
                                        <span className="text-gray-600 ml-2">2</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <span className="text-gray-600 mr-2">1</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-pink-500 rounded-full" style={{ width: '10%' }}></div>
                                        </div>
                                        <span className="text-gray-600 ml-2">1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Customer Reviews</h3>
                            {Array(3).fill().map((_, index) => (
                                <div key={index} className="flex items-start mb-4">
                                    <img src="https://via.placeholder.com/50" alt="Reviewer" className="rounded-full mr-4" />
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <span className="text-gray-800 font-semibold">Adam Smit</span>
                                            <span className="text-gray-500 ml-2">September 2, 2024</span>
                                        </div>
                                        <div className="text-yellow-500">★ ★ ★ ★ ★</div>
                                        <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doloribus, omnis fugit corporis iste magnam ratione.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
                            <div className="flex items-center mb-4">
                                <span className="text-gray-800 font-semibold mr-2">Your Ratings:</span>
                                <div className="text-yellow-500">★ ★ ★ ★ ★</div>
                            </div>
                            <textarea className="w-full p-2 border rounded mb-4" rows="4" placeholder="Type your comments..."></textarea>
                            <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Submit</button>
                        </div>
                    </div>

                );
            case 'instructor':
                return (
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Instructor Information</h2>
                        <p>Details about the instructor...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row ">
            {/* Left Section */}
            <div className="flex-1">
                <div className="p-6 rounded-lg shadow-md mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-sky-600 text-white text-sm rounded">Featured</span>
                        <span className="px-3 py-1 bg-pink-600 text-white text-sm rounded">Ux Design</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Making Music with Other People</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                        <span className="mr-2">23 Lessons</span>
                        <span className="mr-2">|</span>
                        <span className="flex items-center">
                            <span className="mr-1">4.5</span>
                            <span>⭐</span>
                            <span>(44)</span>
                        </span>
                        <span className="mx-2">|</span>
                        <span>Last Update: Sep 29, 2024</span>
                    </div>
                    <div className="border-b border-gray-200 mb-4"></div>
                    <div className="flex space-x-4">
                        <button
                            className={`py-2 px-4 ${activeTab === 'curriculum' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('curriculum')}
                        >
                            Curriculum
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === 'description' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === 'reviews' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === 'instructor' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} rounded transition`}
                            onClick={() => setActiveTab('instructor')}
                        >
                            Instructor
                        </button>
                    </div>
                </div>
                {renderTabContent()}
            </div>
            {/* Right Section */}
            <div className="md:w-1/3 lg:w-1/4 md:ml-8 md:mt-6">
                <div className="p-6 rounded-lg shadow-md mb-6 flex flex-col items-center">
                    <img
                        src="https://via.placeholder.com/300"
                        alt="Course"
                        className="rounded-lg mb-4 w-full max-w-xs h-auto"
                    />
                    <div className="text-center mb-4">
                        <span className="text-2xl font-bold text-purple-600">$32.00</span>
                        <span className="text-gray-500 line-through ml-2">$67.00</span>
                        <span className="text-green-600 ml-2">68% OFF</span>
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                        <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"><GrFavorite fontSize={"20px"} /></button>
                        <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">Enroll Now</button>
                    </div>
                    <div className="text-center text-gray-500">45-Days Money-Back Guarantee</div>
                </div>


                <div className="p-6 rounded-lg shadow-md">
                    <ul className="text-gray-700 space-y-2">
                        <li><strong>Instructor:</strong> D. William</li>
                        <li><strong>Start Date:</strong> 05 Dec 2024</li>
                        <li><strong>Total Duration:</strong> 08hr 32Min</li>
                        <li><strong>Enrolled:</strong> 100</li>
                        <li><strong>Lectures:</strong> 30</li>
                        <li><strong>Skill Level:</strong> Basic</li>
                        <li><strong>Language:</strong> Spanish</li>
                        <li><strong>Quiz:</strong> Yes</li>
                        <li><strong>Certificate:</strong> Yes</li>
                    </ul>
                </div>
                <div className="p-6 rounded-lg shadow-md mt-6 text-center">
                    <div className="mb-2">More inquiry about course:</div>
                    <div className="text-purple-600 text-lg font-bold">+47 333 78 901</div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
