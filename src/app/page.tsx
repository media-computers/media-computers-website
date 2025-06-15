"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Video, Shield, Newspaper, Star, ChevronDown, BookOpen, Calendar, FileText, Info, Landmark, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, Suspense } from 'react'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import CoursesSection from '@/components/sections/CoursesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsSection from '@/components/sections/StatsSection'
import DirectorsSection from '@/components/sections/DirectorsSection'
import Footer from '@/components/layout/Footer'

const featureCards = [
  {
    title: 'Courses',
    description: 'Explore our comprehensive computer courses',
    icon: BookOpen,
    href: '/courses',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Book My Page',
    description: 'Schedule your computer service appointment',
    icon: Calendar,
    href: '/bookings',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Blog',
    description: 'Read our latest articles and tutorials',
    icon: FileText,
    href: '/blog',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'News',
    description: 'Stay updated with tech news and updates',
    icon: Newspaper,
    href: '/news',
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'About Us',
    description: 'Learn more about Media Computers',
    icon: Info,
    href: '/about',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    title: 'Our Legacy',
    description: 'Discover our journey and achievements',
    icon: Landmark,
    href: '/legacy',
    color: 'from-indigo-500 to-indigo-600'
  }
]

// Why Choose Us Cards Data
const whyChooseUsCards = [
  {
    title: 'Expert Faculty',
    description: 'Learn from industry professionals with years of experience',
    icon: '👨‍🏫',
    color: 'from-blue-500 to-blue-300',
  },
  {
    title: 'Live Classes',
    description: 'Interactive sessions with real-time doubt clearing',
    icon: '🎥',
    color: 'from-green-500 to-teal-400',
  },
  {
    title: 'Placement Support',
    description: 'Comprehensive placement assistance and career guidance',
    icon: '💼',
    color: 'from-purple-500 to-indigo-400',
  },
  {
    title: 'Updated Curriculum',
    description: 'Industry-aligned courses with latest technologies',
    icon: '📚',
    color: 'from-pink-500 to-red-400',
  },
]

// Featured Courses Data
const featuredCourses = [
  {
    id: 'ai-tools',
    title: 'AI Tools',
    category: 'AI & Digital Tools',
    level: 'Intermediate',
    duration: '10 weeks',
    price: '₹28,000',
    rating: 5,
    overview: 'Master the latest AI tools and technologies for business and personal productivity.',
    image: '/images/main_img.webp',
  },
  {
    id: 'python',
    title: 'Python Programming',
    category: 'Programming Languages',
    level: 'Beginner',
    duration: '8 weeks',
    price: '₹18,000',
    rating: 5,
    overview: 'Learn Python programming with focus on data science and web development.',
    image: '/images/main_img.webp',
  },
  {
    id: 'html-css',
    title: 'HTML & CSS',
    category: 'Web Development',
    level: 'Beginner',
    duration: '6 weeks',
    price: '₹15,000',
    rating: 5,
    overview: 'Master web development fundamentals with HTML5 and CSS3.',
    image: '/images/main_img.webp',
  },
]

// Testimonials Data
const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Python Developer',
    image: '/images/main_img.webp',
    text: 'The Python course was comprehensive and well-structured. The instructors were knowledgeable and supportive throughout the learning journey.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Digital Marketer',
    image: '/images/main_img.webp',
    text: 'The digital marketing course helped me transition into a new career. The practical projects and industry insights were invaluable.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Web Developer',
    image: '/images/main_img.webp',
    text: 'The web development courses provided a strong foundation. I was able to build my portfolio and land my dream job.',
    rating: 5,
  },
]

const blogPosts = [
  {
    title: 'The Future of Web Development',
    excerpt: 'Exploring upcoming trends and technologies in web development',
    date: 'March 15, 2024',
  },
  {
    title: 'Getting Started with Python',
    excerpt: 'A beginner-friendly guide to Python programming',
    date: 'March 10, 2024',
  },
  {
    title: 'Data Science Career Path',
    excerpt: 'How to build a successful career in data science',
    date: 'March 5, 2024',
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Global animated background gradient - will be fixed and cover the whole page */}
      
      {/* Content wrapper with smooth transitions */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
      <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
      <FeaturesSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
      <DirectorsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
      <StatsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CoursesSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
      <TestimonialsSection />
        </motion.div>

      <Footer />
      </div>
    </main>
  );
} 

// Helper component for animating numbers
interface FigureCardProps {
  targetValue: number;
  text: string;
  prefix?: string;
  suffix?: string;
}

const FigureCard: React.FC<FigureCardProps> = ({ targetValue, text, prefix = '', suffix = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      setDisplayValue(0); // Reset the value when coming into view
      const duration = 2000; // 2 seconds
      const steps = 60; // 60fps
      const increment = targetValue / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), targetValue);
        setDisplayValue(current);

        if (step >= steps) {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [inView, targetValue]);

  return (
        <motion.div
      ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {prefix}{displayValue}{suffix}
                </div>
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">{text}</div>
              </motion.div>
  );
}; 