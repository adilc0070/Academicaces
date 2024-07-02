import { BiCertification, BiBookOpen, BiTrendingUp, BiHelpCircle, BiDollar } from 'react-icons/bi';
import { RiLiveLine } from 'react-icons/ri';
import { toast } from 'sonner';

function IconCard() {
    const title = "We're committed to providing you with a seamless and enriching learning experience. Here's what sets us apart:";
    const features = [
        { icon: BiCertification, title: "Certification", description: "Validate your skills and achievements with industry-recognized certificates upon course completion." },
        { icon: BiBookOpen, title: "Seamless Learning Experience", description: "Learn anytime, anywhere, on any device with our user-friendly platform." },
        { icon: BiTrendingUp, title: "Progress Tracking", description: "Monitor your progress and stay motivated as you work towards your learning goals." },
        { icon: BiHelpCircle, title: "Learning Assistance", description: "Get personalized support and guidance from class instructors through live chat." },
        { icon: RiLiveLine, title: "Live Classes", description: "Engage in real-time discussions and interactive learning experiences with expert instructors." },
        { icon: BiDollar, title: "Affordable Price", description: "Access high-quality education at affordable prices, making learning accessible to all." },
    ];

    return (
        <div className='flex justify-center mt-9'>
            <div className='w-[92%] bg-gray-100 p-8 rounded-lg shadow-md'>
                <div className="text-left mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                </div>
                <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="card bg-white p-6 rounded-lg shadow-lg hover:bg-sky-800 hover:text-white transition duration-300 transform hover:scale-105"
                            onClick={() => toast.success(feature.title)}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full bg-sky-800 text-white">
                                    <feature.icon style={{ fontSize: "40px" }} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                            <p className="text-center text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default IconCard;
