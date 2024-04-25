import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';

type Item = {
  heading: string;
  description: string;
  imageName: string;
  bgColor: string;
  fontColor: string;
}

type CarouselProps = {
  items: Item[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className='relative flex justify-center items-center w-full h-[800px]'>
        <div className="flex justify-center items-center w-full h-full">
          <CircularProgress />
          
          <p className='mx-6 text-xl'>does not exist</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex justify-center w-full h-auto">
      <div className={`flex flex-row w-[92%] ${items[activeIndex].bgColor} ${items[activeIndex].fontColor} `} >
        <div className="flex-1 flex flex-col justify-center items-start">
          <h2 className="text-lg font-bold">{items[activeIndex].heading}</h2>
          <p className="text-sm">{items[activeIndex].description}</p>
        </div>
        <div className="flex-1 bg-red-200 rounded-xl">
          <img src={items[activeIndex].imageName} alt={items[activeIndex].heading} className=" h-auto object-cover w-full" style={{ width: '1004px', height: '600px' }} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
