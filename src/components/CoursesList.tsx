import React from 'react';
import CourseCard from './CourseCard';

const CoursesList = ({ courses }) => {

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? courses.map((course, index) => (
          <CourseCard key={index} {...course} />


        )) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesList;
