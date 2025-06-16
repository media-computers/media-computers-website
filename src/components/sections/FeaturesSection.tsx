'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';

const features = [
  {
    title: 'Expert Faculty',
    description: 'Learn from industry professionals with years of experience in their respective fields.',
    icon: GraduationCap,
    color: 'text-orange-500 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  },
  {
    title: 'Industry-Ready Skills',
    description: 'Get hands-on training with the latest tools and technologies used in the industry.',
    icon: Briefcase,
    color: 'text-orange-500 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  },
  {
    title: 'Placement Support',
    description: '100% placement assistance with tie-ups with leading companies in the industry.',
    icon: Users,
    color: 'text-orange-500 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  },
  {
    title: 'Flexible Timing',
    description: 'Choose from morning, afternoon, or evening batches to suit your schedule.',
    icon: Clock,
    color: 'text-orange-500 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  },
  {
    title: 'Certified Courses',
    description: 'Get industry-recognized certificates upon successful completion of courses.',
    icon: Award,
    color: 'text-orange-500 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  },
  {
    title: 'Updated Curriculum',
    description: 'Stay ahead with our regularly updated curriculum aligned with industry standards.',
    icon: BookOpen,
    color: 'text-orange-500 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  }
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
            Discover the core values and advantages that set Media Computers apart in education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 text-center group relative overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 ${feature.hoverColor}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className={`p-5 rounded-full ${feature.iconBg} ${feature.color} mb-6 mx-auto w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 dark:bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 