import { useEffect, useState, lazy, Suspense } from "react";
import { listCourses } from "../services/student/api";
import NavBar from "../components/LandingNavBar";
import Footer from "../components/Footer";

const Carousel = lazy(() => import("../components/Carrosil"));
const IconCard = lazy(() => import("../components/IconCard"));
const InstructorInterFace = lazy(() => import("../components/InstructorInterFace"));
const CoursesList = lazy(() => import("../components/CoursesList"));

function LandingPage() {
  const [courses, setCourses] = useState([]);

  async function fetchCourses() {
    try {
      const result = await listCourses({ category: '', sort: -1, search: '', page: 1, limit: 3 });
      setCourses(result.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <NavBar />
      <main className="bg-gray-100">
        <section className="hero-section">
          <Suspense fallback={
            <div className="flex justify-center items-center">
              <div className="text-center">
                Loading Carousel...
              </div>
            </div>
          }>
            <Carousel items={[
              {
                heading: 'Engaging eLearning Content',
                description: 'Crafting compelling eLearning content that captivates learners and fosters skill development.',
                imageName: '/assets/giovanni-gagliardi-fvT3t9iOaJI-unsplash.jpg',
              },
              {
                heading: 'Interactive Learning Experiences',
                description: 'Explore the power of interactive learning experiences that drive student engagement and knowledge retention.',
                imageName: '/assets/mimi-thian-vdXMSiX-n6M-unsplash.jpg',
              },
              {
                heading: 'Flexible Digital Learning',
                description: 'Discover the benefits of flexible digital learning that adapts to diverse learning styles and preferences.',
                imageName: '/assets/woman-attending-online-class_23-2148854923.jpg',
              },
            ]} />
          </Suspense>
        </section>
        <section className="feature-icons p-4">
          <Suspense fallback={
            <div>
              Loading IconCard...
            </div>
          }>
            <IconCard />
          </Suspense>
        </section>
        <section className="popular-courses p-4 bg-white">
          <Suspense fallback={
            <div className="flex justify-center items-center">
              <div className="text-center">
                Loading CoursesList...
              </div>
            </div>
          }>
            <h2 className="text-2xl text-center font-bold mb-4">Popular Courses</h2>
            <p className="text-gray-600 mb-4 text-center">Explore our popular courses</p>
            <CoursesList courses={courses} />
          </Suspense>
        </section>
        <section className="instructor-interface p-4 bg-gray-100">
          <Suspense fallback={<div>Loading Instructor Interface...</div>}>
            <InstructorInterFace />
          </Suspense>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default LandingPage;
