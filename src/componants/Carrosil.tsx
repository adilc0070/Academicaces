import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';

type Item = {
  heading: string;
  description: string;
  imageName: string;
};

type CarouselProps = {
  items: Item[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className='flex justify-center items-center w-full h-[800px]'>
        <div className="flex flex-col justify-center items-center">
          <CircularProgress />
          <p className='mt-4 text-xl'>No items available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-auto mt-9">
      <div className="flex flex-col lg:flex-row w-[92%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-start p-8">
          <h2 className="text-4xl font-bold mb-4">{items[activeIndex].heading}</h2>
          <p className="text-lg mb-4">{items[activeIndex].description}</p>
          <div className="bg-gray-200 p-2 rounded-full">
            <span className="text-gray-600">Slide {activeIndex + 1} of {items.length}</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center bg-gray-100">
          <img 
            src={items[activeIndex].imageName} 
            alt={items[activeIndex].heading} 
            className="w-full h-full max-h-[500px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
