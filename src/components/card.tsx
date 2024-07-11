import { FaFolder, FaDollarSign, FaGithub, FaLinkedin } from 'react-icons/fa'; // Import additional icons for professional touch

const FreelancerCard = () => {
  const freelancer = {
    image: 'https://via.placeholder.com/150',
    name: 'John Doe',
    location: 'New York, NY',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    skills: ['JavaScript', 'React', 'Node.js'],
    projects: 5,
    rate: 1000,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  };

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col h-full max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center mb-4">
        <img
          src={freelancer.image}
          alt={freelancer.name}
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-gray-800">{freelancer.name}</h2>
          <p className="text-gray-600 text-sm">{freelancer.location}</p>
          <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-medium rounded-full mt-2 inline-block">
            AVAILABLE
          </span>
        </div>
      </div>
      <p className="text-gray-700 mb-4 text-sm">{freelancer.description}</p>
      <div className="flex flex-wrap mb-4">
        {freelancer.skills.map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2 text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <p className="flex items-center">
          <FaFolder className="mr-1" />
          {freelancer.projects} Projects
        </p>
        <p className="flex items-center">
          <FaDollarSign className="mr-1" />
          ${freelancer.rate}/hr
        </p>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <a href={freelancer.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <FaGithub size={24} />
        </a>
        <a href={freelancer.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <FaLinkedin size={24} />
        </a>
      </div>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
        Invite for Job
      </button>
    </div>
  );
};

export default FreelancerCard;
