"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const LegacyPage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-16 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} sm:text-5xl md:text-6xl transition-colors duration-200`}>
            Our <span className="text-blue-600 dark:text-blue-400">Legacy</span>
          </h1>
          <p className={`mt-4 text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto transition-colors duration-200`}>
            Celebrating our journey of excellence and innovation in education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg transition-colors duration-200`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Our History</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
              Founded in 1998, Media Computers has been at the forefront of computer education
              for over two decades. We've grown from a small training center to a premier
              institution, touching thousands of lives through quality education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg transition-colors duration-200`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Our Achievements</h2>
            <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-2 transition-colors duration-200`}>
              <li>• 20,000+ successful graduates</li>
              <li>• 25+ years of excellence</li>
              <li>• Industry-recognized certifications</li>
              <li>• Strong placement record</li>
              <li>• Modern infrastructure</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg mt-8 transition-colors duration-200`}
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Our Journey</h2>
          <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            <p>
              From our humble beginnings to becoming a leading computer education institute,
              our journey has been marked by continuous growth and innovation. We've adapted
              to changing technologies while maintaining our commitment to quality education.
            </p>
            <p>
              Our success is built on the foundation of experienced faculty, updated curriculum,
              and a student-centric approach to learning. We take pride in our alumni who have
              gone on to achieve great success in their careers.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegacyPage; 