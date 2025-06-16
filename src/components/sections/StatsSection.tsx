'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, BookOpen, Clock } from 'lucide-react';

const stats = [
  {
    label: 'Years of Experience',
    value: 25,
    suffix: '+',
    icon: Clock,
    color: 'text-orange-500',
    iconBg: 'bg-orange-100',
  },
  {
    label: 'Students Passed Out',
    value: 20000,
    suffix: '+',
    icon: Users,
    color: 'text-orange-500',
    iconBg: 'bg-orange-100',
  },
  {
    label: 'Expert Faculties',
    value: 20,
    suffix: '+',
    icon: Award,
    color: 'text-orange-500',
    iconBg: 'bg-orange-100',
  },
  {
    label: 'Courses Offered',
    value: 30,
    suffix: '+',
    icon: BookOpen,
    color: 'text-orange-500',
    iconBg: 'bg-orange-100',
  },
];

function useCountUp(target: number, inView: boolean, duration = 1.5) {
  const [count, setCount] = useState(0);
  const start = 0;

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (target - start) + start));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={containerVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Milestones of Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating over two decades of empowering students and achieving educational excellence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, idx) => {
            const count = useCountUp(stat.value, inView);
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 group"
              >
                <div className={`p-5 rounded-full ${stat.iconBg} ${stat.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                  {count.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 