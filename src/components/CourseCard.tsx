import { loadStripe } from '@stripe/stripe-js';
import { buyCourse, isEnrolled } from '../services/student/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';



const CourseCard = ({ _id, category, title, price, chapters, instructor, rating = 5, thumbnail }: { _id: string, category: { name: string }, title: string, price: number, chapters: { lessonsID: string[] }[], instructor: { name: string, thumbnail: string }, rating: number, thumbnail: string }) => {
  const [isEnrolledStatus, setIsEnrolledStatus] = useState(false);
  const lessons = chapters.map((val) => val.lessonsID.length).reduce((prev, curr) => prev + curr, 0);
  const navigate = useNavigate();
  const student = useSelector((state: RootState) => state.student.email)
  useEffect(() => {
    isEnrolled(student, _id).then((response) => {
      console.log('response from isEnrolled frontend', response);
      
      setIsEnrolledStatus(response);
    })
  },[])

  const enroll = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);    
    try {
      const response = await buyCourse({ courseId: _id, price, image: thumbnail });
      console.log('response from buyCourse api', response);
      
      const { id: sessionId } = response.session;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe Checkout Error:', error);
      }
    } catch (error) {
      console.error('Server Error:', error);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={thumbnail} alt={title} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="p-4">
        <span className="text-xs bg-red-500 text-white py-1 px-2 rounded-full">{category.name}</span>
        <h3 onClick={() => navigate(`/course/${_id}`)} className="mt-2 text-lg font-semibold">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="text-gray-700">
          <span className="line-through">₹{Math.round(price / 0.7)}</span> <span className="font-bold">₹{price}</span>

          </div>
          <div className="text-yellow-500">
            {Array.from({ length: rating }).map((_, index) => (
              <span key={index}>&#9733;</span>
            ))}
          </div>
        </div>
        <div className="mt-2 text-gray-500 text-sm">
          <span>{chapters.length} Chapters</span> <span>{lessons} Lessons</span>
        </div>
        <div className="mt-4 flex items-center">
          <img src={instructor.thumbnail ? instructor.thumbnail : `https://ui-avatars.com/api/?name=${instructor.name}&background=random`} alt={instructor.name} className="w-8 h-8 rounded-full" />
          <span className="ml-2">{instructor.name}</span>
        </div>
        {isEnrolledStatus ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Enrolled</button> : <button onClick={enroll} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Enroll Now</button>}
      </div>
    </div>
  );
};

export default CourseCard;
