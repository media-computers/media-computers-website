"use client"

import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'

export default function BookingsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/booking-banner.webp"
            alt="Booking Banner"
            width={1920}
            height={400}
            className="w-full h-[400px] object-cover"
            priority
          />
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 space-y-8 backdrop-blur-lg border-t-4 border-b-4 border-transparent hover:border-blue-400 transition-all"
        >
          <ContactForm />
          </motion.div>
      </section>
    </main>
  )
} 