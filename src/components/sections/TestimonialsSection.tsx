'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Web Development Student',
    content: 'The web development course at Media Computers transformed my career. The practical approach and industry-relevant curriculum helped me land my dream job.',
    image: '/images/testimonials/rahul.webp',
  },
  {
    name: 'Priya Patel',
    role: 'Digital Marketing Graduate',
    content: 'The digital marketing course was comprehensive and up-to-date with the latest industry trends. The instructors were knowledgeable and supportive.',
    image: '/images/testimonials/priya.webp',
  },
  {
    name: 'Amit Kumar',
    role: 'Graphic Design Student',
    content: 'The graphic design course helped me develop my creative skills and build a strong portfolio. The hands-on projects were invaluable for my learning.',
    image: '/images/testimonials/amit.webp',
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
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Hear from our successful graduates about their learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-500 dark:text-orange-400">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 