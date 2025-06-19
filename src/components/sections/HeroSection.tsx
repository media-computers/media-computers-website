import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/courses');
  };

  // Countdown logic
  const calculateTimeLeft = () => {
    const now = new Date();
    const EPOCH_START = new Date('2024-01-01T00:00:00Z').getTime(); // Fixed epoch for consistent 4-day cycles (adjust as needed)
    const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds

    const msSinceEpoch = now.getTime() - EPOCH_START;
    const currentCycleIndex = Math.floor(msSinceEpoch / FOUR_DAYS_MS);

    let targetTime = EPOCH_START + (currentCycleIndex + 1) * FOUR_DAYS_MS;

    // If the current time is past the calculated target (e.g., if a new cycle just started but current time is still before its midnight start)
    // This ensures the target time is always in the future and aligned to the next midnight 4-day boundary.
    while (targetTime < now.getTime()) {
      targetTime += FOUR_DAYS_MS;
    }

    const difference = targetTime - now.getTime();

    let timeLeft: { days?: number; hours?: number; minutes?: number; seconds?: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    // Type check for timeLeft[interval] to ensure it's a number before comparison
    const value = timeLeft[interval as keyof typeof timeLeft];
    if (typeof value === 'undefined' || value === null) {
      return;
    }

    timerComponents.push(
      <div className="text-center" key={interval}>
        <div className="text-5xl font-extrabold text-gray-900 dark:text-white">
          {value < 10 ? `0${value}` : value}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {interval.charAt(0).toUpperCase() + interval.slice(1)}
        </div>
      </div>
    );
  });

  return (
    <section className="relative bg-white dark:bg-gray-900 min-h-screen flex items-center py-20 lg:py-0 overflow-hidden transition-colors duration-200">
      {/* Background shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-10 left-1/4 w-32 h-32 bg-yellow-200 dark:bg-yellow-800 rounded-full mix-blend-multiply filter blur-3xl opacity-60 z-0 transition-colors duration-200"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-20 right-1/4 w-48 h-48 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-60 z-0 transition-colors duration-200"
      ></motion.div>
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
              className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight transition-colors duration-200 transform-gpu translate-z-10 rotate-x-2 rotate-y-1 hover:rotate-x-1 hover:rotate-y-0"
            >
              <span
                style={{ fontFamily: 'Futura XBlk BT' }}
                className="block text-[#CC0000] dark:text-red-500 text-7xl md:text-8xl lg:text-[10rem] transition-colors duration-200"
              >
                MEDIA
              </span>
              <span className="block font-['Arial'] font-bold tracking-[0.2em] text-gray-900 dark:text-white text-3xl md:text-4xl">COMPUTER EDUCATION</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-colors duration-200 transform-gpu translate-z-8 rotate-x-1 rotate-y-0.5 hover:rotate-x-0 hover:rotate-y-0"
            >
              From Learners to Trailblazers—Master Tech, Lead the Future
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-md text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 transition-colors duration-200 flex items-center justify-center lg:justify-start transform-gpu translate-z-6 rotate-x-0.5 rotate-y-0.2 hover:rotate-x-0 hover:rotate-y-0"
            >
              <Calendar className="h-5 w-5 mr-2 text-orange-500" />
              Next Batch Enrollment
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6 mt-8 transform-gpu translate-z-12 rotate-x-3 rotate-y-1.5 hover:rotate-x-1 hover:rotate-y-0.5 shadow-lg rounded-xl p-4 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm transition-all duration-300"
            >
              {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </motion.div>

            {/* Search Form */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 transform-gpu translate-z-10 rotate-x-2 rotate-y-1 hover:rotate-x-1 hover:rotate-y-0 shadow-md rounded-full bg-white/5 dark:bg-gray-800/10 backdrop-blur-sm transition-all duration-300">
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

            {/* Original CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6 transform-gpu translate-z-8 rotate-x-1.5 rotate-y-0.8 hover:rotate-x-0.5 hover:rotate-y-0.2">
              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-3 bg-orange-500 dark:bg-orange-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 text-center transform-gpu hover:scale-105"
              >
                More Courses
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 border-2 border-orange-500 dark:border-orange-600 rounded-full font-bold text-lg shadow-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300 text-center transform-gpu hover:scale-105"
              >
                Enquire For More
              </Link>
            </motion.div>
          </motion.div>
          {/* Right Content - Stretched Main Image Frame */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative flex items-center justify-center w-full h-96 lg:h-full lg:min-h-[600px]"
          >
            <motion.div
              variants={itemVariants}
              className="relative w-full mx-auto lg:mx-0 perspective-[1500px]"
            >
              <div className="relative w-full h-[600px] lg:h-[750px] transform-gpu transition-all duration-500 rotate-y-5 rotate-x-3 -translate-z-100 transform-origin-center hover:scale-[1.03] hover:rotate-y-2 hover:rotate-x-1 shadow-[0_50px_100px_-30px_rgba(8,_112,_184,_0.5)] dark:shadow-[0_50px_100px_-30px_rgba(8,_112,_184,_0.25)] rounded-2xl overflow-hidden border-8 border-orange-500">
              <Image
                  src="/images/hero_section_background.JPG"
                  alt="Media Computers Hero Section"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 