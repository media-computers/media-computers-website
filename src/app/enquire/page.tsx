"use client"

import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function EnquirePage() {
  return (
    <Suspense>
      <EnquirePageInner />
    </Suspense>
  )
}

function EnquirePageInner() {
  const searchParams = useSearchParams()
  // const signupSuccess = searchParams.get('signupSuccess') === '1'
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Enquire Now
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Have questions? We'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur-lg border-t-4 border-b-4 border-transparent hover:border-blue-400 transition-all"
        >
          <ContactForm />
        </motion.div>
      </section>
    </main>
  )
} 