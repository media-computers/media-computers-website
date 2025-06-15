'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/images/slider/1.webp',
  '/images/slider/2.webp',
  '/images/slider/3.webp',
  '/images/slider/4.webp',
  '/images/slider/5.webp',
  '/images/slider/6.webp',
  '/images/slider/7.webp',
];

export default function ImageSliderSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]); // Restart interval when slide changes

  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-gray-900 shadow-xl">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Slider Image"
            fill
            priority
            className="object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-center drop-shadow-lg mb-4">
              Media Computers
            </h1>
            <p className="text-lg md:text-xl text-center max-w-2xl">
              Your Gateway to Digital Excellence and Future-Ready Skills
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-white' : 'bg-white/50'} hover:bg-white transition-colors`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 