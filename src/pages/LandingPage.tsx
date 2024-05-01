import Carrosil from "../componants/Carrosil"
import CourseList from "../componants/CourseList"
import IconCard from "../componants/IconCard"
import InstructorInterFace from "../componants/InstructorInterFace"
import NavBar from "../componants/LandingNavBar"

function LandingPage() {
  return (
    <>
      <NavBar />
      <Carrosil items={[{
        heading: 'Item 1',
        description: 'Description for item 1',
        imageName: 'src/assets/giovanni-gagliardi-fvT3t9iOaJI-unsplash.jpg',
        bgColor: 'bg-sky-800',
        fontColor: 'text-white'
      },
      {
        heading: 'Item 2',
        description: 'Description for item 2',
        imageName: 'src/assets/mimi-thian-vdXMSiX-n6M-unsplash.jpg',
        bgColor: 'bg-sky-900',
        fontColor: 'text-sky-'
      },
      {
        heading: 'Item 3',
        description: 'Description for item 3',
        imageName: 'src/assets/woman-attending-online-class_23-2148854923.jpg',
        bgColor: 'bg-red-800',
        fontColor: ''
      },]} />
      <IconCard/>
      <CourseList courses={[
        { id: 1, title: 'Java Script  Basics', description: 'This Course is aim to learn the basics of java script ', price: 9000, image: 'https://picsum.photos/900', rating: 4.5, category: 'Category 1', downloads: 100, discountPrice: 8 },
        { id: 2, title: 'Course 2', description: 'Description 2', price: 20, image: 'https://picsum.photos/200', rating: 4.0, category: 'Category 2', downloads: 200, discountPrice: 16 },
        { id: 3, title: 'Course 3', description: 'Description 3', price: 30, image: 'https://picsum.photos/300', rating: 4.5, category: 'Category 3', downloads: 300, discountPrice: 24 },
        { id: 4, title: 'Course 4', description: 'Description 4', price: 40, image: 'https://picsum.photos/400', rating: 4.5, category: 'Category 4', downloads: 400, discountPrice: 32 }
      ]} />
      <InstructorInterFace/>

    </>

  )
}

export default LandingPage
