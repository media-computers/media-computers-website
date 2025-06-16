'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Web Development Student',
    content: 'The web development course at Media Computers transformed my career. The practical approach and industry-relevant curriculum helped me land my dream job.',
  },
  {
    name: 'Priya Patel',
    role: 'Digital Marketing Graduate',
    content: 'The digital marketing course was comprehensive and up-to-date with the latest industry trends. The instructors were knowledgeable and supportive.',
  },
  {
    name: 'Amit Kumar',
    role: 'Graphic Design Student',
    content: 'The graphic design course helped me develop my creative skills and build a strong portfolio. The hands-on projects were invaluable for my learning.',
  },
];

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <section className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-white'
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
            What Our Students Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Hear from our successful graduates about their learning journey and career growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 group"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 dark:text-orange-400"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 