"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import VideoGallerySection from '@/components/sections/VideoGallerySection'

// Define the list of image paths for the gallery
const galleryImages = [
  '/images/image_galley/1.webp',
  '/images/image_galley/2.webp',
  '/images/image_galley/3.webp',
  '/images/image_galley/4.webp',
  '/images/image_galley/5.webp',
  '/images/image_galley/6.jpg',
  '/images/image_galley/7.webp',
  '/images/image_galley/9.webp',
  '/images/image_galley/10.webp',
  '/images/image_galley/11.webp',
  '/images/image_galley/12.webp',
  '/images/image_galley/13.webp',
  '/images/image_galley/14.webp',
  '/images/image_galley/15.webp',
  '/images/image_galley/16.webp',
  '/images/image_galley/17.webp',
  '/images/image_galley/18.webp',
  '/images/image_galley/20.webp',
  // '/images/image_galley/group_photo.webp', // Excluding for now, can be added if needed later
];

export default function GalleryPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [displayedImageCount, setDisplayedImageCount] = useState(9); // Start with 9 images
  const imagesPerPage = 9; // Number of images to load per click

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadMoreImages = () => {
    setDisplayedImageCount(prevCount => Math.min(prevCount + imagesPerPage, galleryImages.length));
  };

  return (
    <main className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Background Gradient Effect - Matching Hero Section */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-100 dark:from-orange-900/20 to-transparent opacity-50 z-0 transition-colors duration-200"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gray-100 dark:bg-gray-800/20 to-transparent opacity-50 z-0 transition-colors duration-200"></div>
      
      {/* Existing Background shapes/elements for creativity */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-orange-200 dark:bg-orange-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-purple-200 dark:bg-purple-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <Link
          href="/about"
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to About Us
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-gray-900 dark:text-white relative z-10">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-purple-500 rounded-lg filter blur-lg opacity-20 transform scale-105 transition-all duration-300"></span>
              <span className="relative">Our Digital Showcase</span>
            </span>
          </h2>
          
          {/* Photo Gallery */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Photo Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Header Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-lg overflow-hidden shadow-xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800 col-span-full" // col-span-full to span 3 columns
              >
                <Image
                  src="/images/image_galley/group_photo.webp"
                  alt="Gallery Header"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300"
                />
              </motion.div>

              {galleryImages.slice(0, displayedImageCount).map((imagePath, index) => (
                <motion.div
                  key={imagePath}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.02 }} // Faster duration and smaller delay
                  viewport={{ once: true }}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <Image
                    src={imagePath}
                    alt={`Photo ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
            {/* Load More Button */}
            {displayedImageCount < galleryImages.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreImages}
                  className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  Load More Images
                </button>
              </div>
            )}

            {/* Social Media Links */}
            <div className="text-center mt-8 flex justify-center space-x-4">
              <Link
                href="https://www.instagram.com/media_computer_education?igsh=MXg1YXU3MTB1Y3hwMw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.0006 2.00283C15.932 2.00283 16.4428 2.01633 18.0664 2.08333C19.6706 2.15283 20.677 2.47633 21.3654 2.75083C22.0628 3.03333 22.5694 3.44783 22.9514 3.82933C23.3328 4.21133 23.649 4.71733 23.9314 5.41483C24.2059 6.10333 24.2985 7.10983 24.3674 8.71433C24.4344 10.3378 24.4484 10.8488 24.4484 12.0003C24.4484 13.1518 24.4344 13.6628 24.3674 15.2863C24.2985 16.8903 24.2059 17.8968 23.9314 18.5853C23.649 19.2828 23.3328 19.7893 22.9514 20.1708C22.5694 20.5523 22.0628 20.8683 21.3654 21.1508C20.677 21.4253 19.6706 21.5183 18.0664 21.5873C16.4428 21.6543 15.932 21.6678 12.0006 21.6678C8.06883 21.6678 7.55783 21.6543 5.93433 21.5873C4.32983 21.5183 3.32333 21.4253 2.63508 21.1508C1.93758 20.8683 1.43158 20.5523 1.04958 20.1708C0.667583 19.7893 0.350916 19.2828 0.0684163 18.5853C-0.205917 17.8968 -0.298834 16.8903 -0.367751 15.2863C-0.434667 13.6628 -0.448167 13.1518 -0.448167 12.0003C-0.448167 10.8488 -0.434667 10.3378 -0.367751 8.71433C-0.298834 7.10983 -0.205917 6.10333 0.0684163 5.41483C0.350916 4.71733 0.667583 4.21133 1.04958 3.82933C1.43158 3.44783 1.93758 3.03333 2.63508 2.75083C3.32333 2.47633 4.32983 2.15283 5.93433 2.08333C7.55783 2.01633 8.06883 2.00283 12.0006 2.00283ZM12.0006 4.38283C8.10658 4.38283 7.79041 4.39633 6.17708 4.46083C4.78658 4.51933 3.96783 4.78033 3.49041 4.96633C2.86317 5.21541 2.36541 5.64283 1.95158 6.05675C1.53758 6.47067 1.11025 6.96841 0.861083 7.59575C0.675083 8.07291 0.413751 8.89167 0.355251 10.2822C0.290751 11.8955 0.277251 12.2117 0.277251 16.0969C0.277251 19.9909 0.290751 20.3069 0.355251 21.9198C0.413751 23.3102 0.675083 24.129 0.861083 24.6062C1.11025 25.2334 1.53758 25.7312 1.95158 26.1451C2.36541 26.559 2.86317 26.9015 3.49041 27.1505C3.96783 27.3364 4.78658 27.5977 6.17708 27.6563C7.79041 27.7208 8.10658 27.7342 12.0006 27.7342C15.932 27.7342 16.4428 27.7208 18.0664 27.6563C19.6706 27.5977 20.677 27.3364 21.3654 27.062C22.0628 26.7794 22.5694 26.3654 22.9514 25.9839C23.3328 25.6024 23.649 25.0963 23.9314 24.3989C24.2059 23.7104 24.2985 22.7039 24.3674 21.0994C24.4344 19.4759 24.4484 18.9649 24.4484 15.0332C24.4484 11.1013 24.4344 10.5904 24.3674 8.96683C24.2985 7.36233 24.2059 6.35583 23.9314 5.66733C23.649 4.97908 23.3328 4.47283 22.9514 4.09091C22.5694 3.70933 22.0628 3.39325 21.3654 3.10983C20.677 2.83533 19.6706 2.74283 18.0664 2.67383C16.4428 2.60683 15.932 2.59333 12.0006 2.59333C8.10658 2.59333 7.79041 2.60683 6.17708 2.67383C4.78658 2.73233 3.96783 2.99367 3.49041 3.17958C2.86317 3.42875 2.36541 3.85617 1.95158 4.27008C1.53758 4.684 1.11025 5.18175 0.861083 5.80908C0.675083 6.28625 0.413751 7.105 0.355251 8.49541C0.290751 10.1087 0.277251 10.4249 0.277251 12.0003C0.277251 13.5756 0.290751 13.8918 0.355251 15.5051C0.413751 16.8955 0.675083 17.7142 0.861083 18.1914C1.11025 18.8187 1.53758 19.3165 1.95158 19.7304C2.36541 20.1443 2.86317 20.4678 3.49041 20.717C3.96783 20.903 4.78658 21.1643 6.17708 21.2229C7.79041 21.2874 8.10658 21.3009 12.0006 21.3009C15.8946 21.3009 16.2099 21.2874 17.8236 21.2229C19.2139 21.1643 20.0327 20.903 20.5097 20.717C21.137 20.4678 21.6348 20.1443 22.0487 19.7304C22.4626 19.3165 22.8052 18.8187 23.0542 18.1914C23.2402 17.7142 23.5016 16.8955 23.5601 15.5051C23.6246 13.8918 23.6381 13.5756 23.6381 12.0003C23.6381 10.4249 23.6246 10.1087 23.5601 8.49541C23.5016 7.105 23.2402 6.28625 23.0542 5.80908C22.8052 5.18175 22.4626 4.684 22.0487 4.27008C21.6348 3.85617 21.137 3.42875 20.5097 3.17958C20.0327 2.99367 19.2139 2.73233 17.8236 2.67383C16.2099 2.60683 15.8946 2.59333 12.0006 2.59333ZM12.0006 7.73483C9.17658 7.73483 6.87725 10.0342 6.87725 12.8583C6.87725 15.6824 9.17658 17.9818 12.0006 17.9818C14.8247 17.9818 17.1241 15.6824 17.1241 12.8583C17.1241 10.0342 14.8247 7.73483 12.0006 7.73483ZM12.0006 9.85833C13.6749 9.85833 15.0006 11.1841 15.0006 12.8583C15.0006 14.5326 13.6749 15.8583 12.0006 15.8583C10.3264 15.8583 9.00064 14.5326 9.00064 12.8583C9.00064 11.1841 10.3264 9.85833 12.0006 9.85833ZM19.2896 4.66283C18.6624 4.66283 18.1563 5.16891 18.1563 5.79633C18.1563 6.42375 18.6624 6.92983 19.2896 6.92983C19.9171 6.92983 20.4231 6.42375 20.4231 5.79633C20.4231 5.16891 19.9171 4.66283 19.2896 4.66283Z" clipRule="evenodd" />
                </svg>
                More Photos on Instagram
              </Link>
              {/* Facebook Link */}
              <Link
                href="https://www.facebook.com/profile.php?id=100090095628094&sk=about"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22.0006 12.0003C22.0006 6.47764 17.5233 2.00033 12.0006 2.00033C6.47792 2.00033 2.00061 6.47764 2.00061 12.0003C2.00061 17.0264 5.72758 21.1345 10.5841 21.8893V14.1863H7.86475V12.0003H10.5841V10.2222C10.5841 7.55933 12.1953 6.09633 14.6543 6.09633C15.8202 6.09633 16.9022 6.19533 17.2063 6.23933V8.69733H15.807C14.4759 8.69733 14.2185 9.30933 14.2185 10.2453V12.0003H17.0006L16.5647 14.1863H14.2185V21.8893C19.075 21.1345 22.802 17.0264 22.802 12.0003H22.0006Z" clipRule="evenodd" />
                </svg>
                More Photos on Facebook
              </Link>
            </div>
          </div>

          {/* Video Gallery */}
          <VideoGallerySection />
        </motion.div>
      </div>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-500 dark:bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 z-50 animate-bounce-slow"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l7.5-7.5 7.5 7.5M12 21V4.5" />
          </svg>
        </button>
      )}
    </main>
  )
} 