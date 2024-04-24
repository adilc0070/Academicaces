import { BiCertification, BiBookOpen, BiTrendingUp, BiHelpCircle, BiDollar } from 'react-icons/bi';
import{ RiLiveLine } from 'react-icons/ri'

function Test() {
    const features = [
        { icon: BiCertification, title: "Certification", description: "Validate your skills and achievements with industry-recognized certificates upon course completion." },
        { icon: BiBookOpen, title: "Seamless Learning Experience", description: "Learn anytime, anywhere, on any device with our user-friendly platform." },
        { icon: BiTrendingUp, title: "Progress Tracking", description: "Monitor your progress and stay motivated as you work towards your learning goals." },
        { icon: BiHelpCircle, title: "Learning Assistance", description: "Get personalized support and guidance from class instructors through live chat." },
        { icon: RiLiveLine , title: "Live Classes", description: "Engage in real-time discussions and interactive learning experiences with expert instructors." },
        { icon: BiDollar, title: "Affordable Price", description: "Access high-quality education at affordable prices, making learning accessible to all." },
    ];

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-cover bg-center">
            <div className="grid grid-cols-3 gap-9 items-center w-auto h-auto p-9 ">
                {features.map((feature, index) => (
                    <div key={index} className="card w-[300px] h-[250px] shadow-2xl border-4 rounded-2xl hover:bg-sky-800 text-black hover:text-white">
                        <div className="cardI flex justify-center items-center w-full h-2/4">
                            <div className="cardLogo flex justify-center items-center rounded-2xl bg-sky-800 w-[100px] h-[100px]">
                                <feature.icon style={{ fontSize: "50px" }} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <span className='text-lg font-koulen font-medium'>{feature.title}</span>
                        </div>
                        <div className="flex justify-center text-center">
                            <p className="text-content max-h-20 overflow-hidden break-words text-sm font-thin mx-2">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Test;
