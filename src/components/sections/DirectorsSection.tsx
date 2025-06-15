'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DirectorsSection() {
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
        : 'bg-gray-50'
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
            From the Director's Desk
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-xl border-8 border-black"
          >
            <Image
              src="/images/directors-desk.webp"
              alt="Director"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-300">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Welcome to Media Computers
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                For over 25 years, we have been at the forefront of computer education, empowering students with cutting-edge skills and knowledge. Our commitment to excellence and innovation has helped shape the careers of thousands of successful professionals.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                At Media Computers, we believe in providing not just education, but a complete learning experience that prepares you for the real world. Our expert faculty, state-of-the-art facilities, and industry-aligned curriculum ensure that you receive the best possible training.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-300">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center shadow-md transition-colors duration-300">
                    <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">MD</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Mr. Imtiyaz Sayed
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Managing Director, Media Computers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 