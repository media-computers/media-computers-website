'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function VideoGallerySection() {
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

  const videos = [
    {
      id: 'Myv4w_0wrWk',
      title: 'Media Computers Video 1'
    },
    {
      id: 'Z8Ry8ohHZ78',
      title: 'Media Computers Video 2'
    },
    {
      id: 'MnRNRpPIW-8',
      title: 'Media Computers Video 3'
    },
    {
      id: '3dtATuCN6iA',
      title: 'Media Computers Video 4'
    }
  ];

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
            Video Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Watch our latest videos showcasing our facilities, courses, and student success stories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg border-4 border-black"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* YouTube Link */}
        <div className="text-center mt-8">
          <a
            href="https://youtube.com/@mediaandskills?si=U-BWqngSmq97Z7SX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.615 3.184c-1.791-.186-5.834-.186-5.834-.186h-.033c-3.992.008-5.834.186-5.834.186C2.693 3.391 2.051 4.254 2.002 5.485c-.027 1.25-.027 2.502-.027 3.754v3.504c0 1.252 0 2.504.027 3.754.049 1.23.691 2.093 1.948 2.298 1.791.186 5.834.186 5.834.186h.033s.991-.002 2.378-.016c1.233-.014 2.298-.024 3.456-.034 1.157-.01 2.203-.018 3.197-.03.799-.008 1.48-.03 2.096-.062 1.257-.052 1.949-.915 1.998-2.146.027-1.25.027-2.502.027-3.754v-3.504c0-1.252 0-2.504-.027-3.754-.049-1.23-.691-2.093-1.948-2.298zM9.545 14.869V8.673l5.064 3.102-5.064 3.102z" />
            </svg>
            More Videos on YouTube
          </a>
        </div>
      </div>
    </section>
  );
} 