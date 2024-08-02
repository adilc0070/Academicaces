import { useEffect, useState } from 'react';
import StudentLayout from '../../components/StudentLayOut';
import { listAllCoursesApi } from '../../services/admin/api';

function HomePage() {
    const [featuredCourses, setFeaturedCourses] = useState([]);
    useEffect(() => {
        async function fetchFeaturedCourses() {
            await listAllCoursesApi().then((result) => {
                setFeaturedCourses(result.courses?.slice(0, 3));
            })
        }
        fetchFeaturedCourses();
    }, [])

    const testimonials = [
        {
            name: "John Doe",
            feedback: "This platform has transformed the way I learn. The courses are well-structured and the instructors are very knowledgeable.",
            image: "https://picsum.photos/200/300",
        },
        {
            name: "Jane Smith",
            feedback: "I love the flexibility of learning at my own pace. The community is also very supportive and engaging.",
            image: "https://picsum.photos/200/300",
        },
        // Add more testimonials as needed
    ];
    console.log(testimonials);
    

    return (
        <StudentLayout>
            <div className="bg-gray-100">
                {/* Hero Section */}
                <section className="bg-blue-800 text-white py-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h1 className="text-5xl font-extrabold mb-4">Discover Your Next Course</h1>
                        <p className="text-xl mb-8">
                            Find the best courses to boost your knowledge and skills, taught by industry experts.
                        </p>
                        <a href="/courses" className="bg-white text-blue-800 py-3 px-6 rounded-lg text-lg font-semibold">Browse Courses</a>
                    </div>
                </section>

                {/* Featured Courses Section */}
                <section className="max-w-6xl mx-auto py-12 px-6">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Featured Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCourses.map((course, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                                <p className="text-gray-600 mb-4">{course.subtitle}</p>
                                <p onClick={() => window.location.href = `/course/${course._id}`} className="text-blue-600 hover:underline">View Course</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                {/* <section className="bg-gray-200 py-12">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">What Our Students Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                    <p className="text-gray-600 mb-4">"{testimonial.feedback}"</p>
                                    <div className="flex items-center">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Call to Action Section */}
                <section className="bg-blue-800 text-white py-12">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-semibold mb-4">Join Thousands of Learners Today</h2>
                        <p className="text-xl mb-8">
                            Enroll in our courses and start learning new skills right away.
                        </p>
                        <a href="/signUp" className="bg-white text-blue-800 py-3 px-6 rounded-lg text-lg font-semibold">Get Started</a>
                    </div>
                </section>
            </div>
        </StudentLayout>
    );
}

export default HomePage
