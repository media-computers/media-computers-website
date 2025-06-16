'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Clock, Award } from 'lucide-react';

const courses = [
  {
    title: 'Web Development',
    description: 'Learn modern web development technologies including HTML, CSS, JavaScript, React, and Node.js.',
    image: '/images/web_devlopment.webp',
    duration: '3 months',
    level: 'Beginner to Advanced',
  },
  {
    title: 'Digital Marketing',
    description: 'Master digital marketing strategies including SEO, SEM, social media marketing, and content marketing.',
    image: '/images/Digital-Marketing_landing page.webp',
    duration: '2 months',
    level: 'All Levels',
  },
  {
    title: 'Graphic Design',
    description: 'Create stunning visual designs using industry-standard tools like Adobe Photoshop, Illustrator, and InDesign.',
    image: '/images/graphic_design_landing_page.webp',
    duration: '2 months',
    level: 'Beginner Friendly',
  },
];

export default function CoursesSection() {
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
        ? 'bg-gray-900' 
        : 'bg-white'
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Our Popular Courses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 text-left border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 group"
            >
              <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  {course.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <Link
            href="/courses"
            className="inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Courses
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 