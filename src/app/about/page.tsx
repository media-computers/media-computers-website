"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Image as ImageIcon, ArrowRight, Users, Video, Shield, Newspaper, Star, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function About() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-banner.webp"
            alt="About Us Banner"
            width={1920}
            height={400}
            className="w-full h-[400px] object-cover"
            priority
          />
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To empower students with cutting-edge computer education and skills that prepare them for the digital future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To be the leading computer education institute, known for excellence in teaching and student success.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Users,
              title: "Expert Faculty",
              description: "Learn from industry professionals with years of experience"
            },
            {
              icon: Video,
              title: "Live Classes",
              description: "Interactive sessions with real-time doubt clearing"
            },
            {
              icon: Shield,
              title: "Quality Education",
              description: "Comprehensive curriculum designed for success"
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <value.icon className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Find Us on the Map</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            <MapPin className="inline-block mr-2 h-5 w-5 text-orange-500" />
            Modern Complex, Kaktives Rd, near Channamma Circle,<br />
            Belagavi, Karnataka 590001
          </p>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=Modern%20Complex,%20Kaktives%20Rd,%20Khade%20Bazar,%20Raviwar%20Peth,%20Belagavi,%20Karnataka%20590001&z=16&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Media Computers Location"
            ></iframe>
          </div>
        </motion.div>

        {/* Company Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Valued Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            <div className="flex flex-col items-center p-4">
              <Image src="/images/media_fashion.webp" alt="Media Fashion Technology" width={150} height={150} className="h-auto max-w-full rounded-lg shadow-md" />
              <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">MEDIA FASHION TECHNOLOGY</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Image src="/images/prosoft.webp" alt="PROSFT E-SOLUTION" width={150} height={150} className="h-auto max-w-full rounded-lg shadow-md" />
              <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">PROSFT E-SOLUTION</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Image src="/images/dget.webp" alt="MEDIA ITI" width={150} height={150} className="h-auto max-w-full rounded-lg shadow-md" />
              <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">MEDIA ITI</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/courses"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 transition-colors duration-200"
          >
            Explore Our Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </main>
  )
} 