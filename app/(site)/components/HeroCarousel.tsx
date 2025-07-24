'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ScrollButton } from './ScrollButton';

const images = [
  '/hero1.jpg',
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[75vh] overflow-hidden bg-black">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Fondo de carrusel ${index + 1}`}
          fill
          className={`
            absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-40' : 'opacity-0'}
          `}
          priority={index === 0}
        />
      ))}

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#43d3ff] mb-2">
                New 2025 Collection
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                View the World with
                <span className="text-[#43d3ff]"> Style</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore error, consectetur ipsa autem animi consequatur nam temporibus.
              </p>
              <div className="mt-8">
                <ScrollButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}