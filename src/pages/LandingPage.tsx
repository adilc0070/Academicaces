import { useEffect, useState } from "react";
import Carousel from "../componants/Carrosil";
import CourseList from "../componants/CourseList";
import IconCard from "../componants/IconCard";
import NavBar from "../componants/LandingNavBar";
import { listAllCoursesApi } from "../services/admin/api";
import { CircularProgress } from "@mui/material";
import InstructorInterFace from "../componants/InstructorInterFace";

function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllCoursesApi().then((result) => {
      setCourses(result.courses.slice(0, 4));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Carousel items={[
        {
          heading: 'Item 1',
          description: 'Description for item 1',
          imageName: 'src/assets/giovanni-gagliardi-fvT3t9iOaJI-unsplash.jpg',
          fontColor: 'text-white'
        },
        {
          heading: 'Item 2',
          description: 'Description for item 2',
          imageName: 'src/assets/mimi-thian-vdXMSiX-n6M-unsplash.jpg',
          fontColor: 'text-sky-900'
        },
        {
          heading: 'Item 3',
          description: 'Description for item 3',
          imageName: 'src/assets/woman-attending-online-class_23-2148854923.jpg',
          fontColor: 'text-black'
        },
      ]} />
      <IconCard />
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <CircularProgress />
        </div>
      ) : (
        <CourseList courses={courses} />
      )}
      <InstructorInterFace />
    </>
  );
}

export default LandingPage;
