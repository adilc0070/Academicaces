import React from 'react';

const FreelancerCard = ({ freelancer }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-96 w-64">
      <div className="flex items-center mb-4">
        <img src={freelancer.image} alt={freelancer.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{freelancer.name}</h2>
          <p className="text-gray-600">{freelancer.location}</p>
          <span className="bg-green-200 text-green-700 px-2 py-1 rounded mt-2 inline-block">AVAILABLE</span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{freelancer.description}</p>
      <div className="flex flex-wrap mb-4">
        {freelancer.skills.map((skill, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 mr-2 mb-2">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 flex items-center">
          <i className="material-icons mr-1">folder</i>
          {freelancer.projects} Projects
        </p>
        <p className="text-gray-600 flex items-center">
          <i className="material-icons mr-1">attach_money</i>
          ${freelancer.rate}/hr
        </p>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">Invite for Job</button>
    </div>
  );
};

export default FreelancerCard;
