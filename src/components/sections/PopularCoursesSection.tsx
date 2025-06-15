'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const courses = [
  {
    title: 'Web Development',
    description: 'Learn modern web development with HTML, CSS, JavaScript, and popular frameworks.',
    duration: '3 months',
    level: 'Beginner to Advanced',
    price: '₹15,000',
    href: '/courses/web-development'
  },
  {
    title: 'Digital Marketing',
    description: 'Master digital marketing strategies, SEO, social media, and content marketing.',
    duration: '2 months',
    level: 'All Levels',
    price: '₹12,000',
    href: '/courses/digital-marketing'
  },
  {
    title: 'Graphic Design',
    description: 'Create stunning visuals with industry-standard design tools and techniques.',
    duration: '2 months',
    level: 'Beginner to Intermediate',
    price: '₹10,000',
    href: '/courses/graphic-design'
  }
];

export default function PopularCoursesSection() {
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
    <section className={`py-20 relative overflow-hidden ${
      isDark 
        ? 'bg-gray-950' 
        : 'bg-gray-50'
    } transition-colors duration-300`}>
      {/* This div was removed to simplify background layering */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
            Popular Courses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative z-10 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-orange-500 to-purple-500 dark:from-orange-400 dark:to-purple-400" />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      <span className="font-medium">Duration:</span>
                      <span className="ml-2">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      <span className="font-medium">Level:</span>
                      <span className="ml-2">{course.level}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      <span className="font-medium">Price:</span>
                      <span className="ml-2 font-semibold text-orange-500 dark:text-orange-400">{course.price}</span>
                    </div>
                  </div>

                  <Link
                    href={course.href}
                    className="inline-flex items-center font-medium text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            View All Courses
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
} 