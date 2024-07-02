import Logo from "./Logo";

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <Logo />
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h2 className="text-xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-400">We provide the tools and skills to teach what you love. Join us and start teaching today.</p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                        <ul>
                            <li className="mb-2"><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                            <li className="mb-2"><a href="/courses" className="text-gray-400 hover:text-white">Courses</a></li>
                            <li className="mb-2"><a href="/instructors" className="text-gray-400 hover:text-white">Instructors</a></li>
                            <li className="mb-2"><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-400">123 Learning Street<br />Education City, ED 12345<br />Phone: (123) 456-7890<br />Email: info@education.com</p>
                    </div>
                </div>
                <div className="text-center pt-6 border-t border-gray-700">
                    <p className="text-gray-400">&copy; Copyright 2024 Academicaces. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
