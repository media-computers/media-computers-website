"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { courseCategories, type Course } from '@/data/courses'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Flatten all courses for 'All' view
  const allCourses: Course[] = courseCategories.flatMap(cat => cat.courses)

  const filteredCourses: Course[] = selectedCategory === 'All'
    ? allCourses
    : courseCategories.find(cat => cat.name === selectedCategory)?.courses || []

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Courses</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            className={`px-4 py-2 rounded-full font-semibold border transition-colors ${
              selectedCategory === 'All' 
                ? 'bg-primary text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-primary'
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {courseCategories.map(cat => (
            <button
              key={cat.name}
              className={`px-4 py-2 rounded-full font-semibold border transition-colors ${
                selectedCategory === cat.name 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-primary'
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span className="mr-2">{cat.icon}</span>{cat.name}
            </button>
          ))}
          </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary"
              onClick={() => setSelectedCourse(course)}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{course.icon}</span>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{course.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary" size="sm">{course.duration}</Badge>
                  <Badge variant="info" size="sm">
                    {course.level}
                  </Badge>
                </div>
                </div>
              <div className="flex justify-between items-center">
                <Link href="/enquire">
                  <Button variant="outline" size="sm">Enquire</Button>
                  </Link>
                <Button onClick={() => setSelectedCourse(course)} size="sm">More Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course Details Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.name}
      >
        {selectedCourse && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCourse.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedCourse.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedCourse.category}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
              <p className="text-gray-600 dark:text-gray-300">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Duration</h4>
                <p className="text-gray-600 dark:text-gray-300">{selectedCourse.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Level</h4>
                <Badge variant="info" size="sm">
                  {selectedCourse.level}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Prerequisites</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {selectedCourse.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Syllabus</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {selectedCourse.syllabus.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Career Opportunities</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {selectedCourse.careerOpportunities.map((career, index) => (
                  <li key={index}>{career}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {selectedCourse.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link href="/enquire">
                <Button>Enquire Now</Button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
} 