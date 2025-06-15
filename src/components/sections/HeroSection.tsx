'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const images = [
  '/images/slider/1.webp',
  '/images/slider/2.webp',
  '/images/slider/3.webp',
  '/images/slider/4.webp',
  '/images/slider/5.webp',
  '/images/slider/6.jpg',
  '/images/slider/7.webp',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Stagger animation for children
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      damping: 10, 
      stiffness: 100 
    }
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    x: 0, 
    transition: { 
      type: "spring", 
      damping: 15, 
      stiffness: 100, 
      delay: 0.3 
    }
  },
};

const blobVariants = {
  animate: {
    x: ["-10%", "10%", "-10%"],
    y: ["10%", "-10%", "10%"],
    rotate: [0, 360],
    transition: { 
      x: { repeat: Infinity, duration: 8, ease: "easeInOut" },
      y: { repeat: Infinity, duration: 10, ease: "easeInOut" },
      rotate: { repeat: Infinity, duration: 15, ease: "linear" },
    },
  },
};

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Changed to 3 seconds for faster transition
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/courses');
  };

  return (
    <section className="relative bg-white dark:bg-gray-900 min-h-screen flex items-center py-20 lg:py-0 overflow-hidden transition-colors duration-200">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-100 dark:from-orange-900/20 to-transparent opacity-50 z-0 transition-colors duration-200"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-gray-100 dark:from-gray-800/20 to-transparent opacity-50 z-0 transition-colors duration-200"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:min-h-screen">
          {/* Left Content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center lg:text-left space-y-8"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight transition-colors duration-200"
            >
              <span className="block font-['Futura Custom'] font-black text-[#CC0000] dark:text-red-500 text-7xl md:text-8xl lg:text-[10rem] transition-colors duration-200">MEDIA</span>
              <span className="block font-['Arial'] font-bold tracking-[0.2em] text-gray-900 dark:text-white text-3xl md:text-4xl">COMPUTER EDUCATION</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-colors duration-200"
            >
              Join Media Computers to master cutting-edge technology and transform your career with our expert-led courses and comprehensive education programs.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
              <form onSubmit={handleSearch} className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="SEARCH COURSES"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-24 py-4 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-full font-semibold shadow-md hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300"
                >
                  SEARCH
                </button>
              </form>
            </motion.div>

            {/* Two CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">
              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-3 bg-orange-500 dark:bg-orange-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 text-center"
              >
                More Courses
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 border-2 border-orange-500 dark:border-orange-600 rounded-full font-bold text-lg shadow-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300 text-center"
              >
                Enquire For More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Image with Abstract Shapes */}
          <motion.div
            ref={ref}
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative flex items-center justify-center h-96 lg:h-full"
          >
            {/* Blue Wave Shape */}
            <motion.div
              variants={blobVariants}
              animate="animate"
              className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 transition-colors duration-200"
            ></motion.div>
            {/* Yellow Wave Shape */}
            <motion.div
              variants={blobVariants}
              animate="animate"
              className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-200 dark:bg-yellow-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 transition-colors duration-200"
            ></motion.div>
            {/* Main Image - Slider */}
            <motion.div 
              key={currentSlide} // Key helps Motion to re-render and animate on slide change
              initial={{ opacity: 0, scale: 0.98 }} // Slightly smaller scale for subtle entry
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }} // Exit with a subtle scale out
              transition={{ duration: 0.8, ease: "easeOut" }} // Longer duration for smoother fade
              className="relative w-full h-full max-w-lg lg:max-w-none aspect-[3/4] lg:aspect-auto rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <Image
                src={images[currentSlide]}
                alt={`Hero Slide ${currentSlide + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 