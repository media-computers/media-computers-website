'use client';

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Newspaper, Youtube } from 'lucide-react'

const courses = [
  { name: 'Basic Computer Course', href: '/courses#basic' },
  { name: 'Advanced Computer Course', href: '/courses#advanced' },
  { name: 'Programming Courses', href: '/courses#programming' },
  { name: 'Web Development', href: '/courses#web' },
  { name: 'Digital Marketing', href: '/courses#digital' },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100090095628094&sk=about', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/media_computer_education?igsh=MXg1YXU3MTB1Y3hwMw==', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@mediaandskills', icon: Youtube },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:divide-x-2 md:divide-gray-700">
          {/* About */}
          <div className="md:pr-8">
            <h3 className="text-lg font-semibold mb-4 text-white">About Media Computers</h3>
            <p className="text-gray-400">
              Empowering students with quality computer education since 1998. We provide comprehensive training in various computer courses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8 lg:pr-8">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-orange-500 transition-colors duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-orange-500 transition-colors duration-200">
                  News
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/legacy" className="hover:text-orange-500 transition-colors duration-200">
                  Our Legacy
                  </Link>
                </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:pl-8 lg:pr-8">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-12 w-12 text-orange-500 mt-1" />
                <span>
                  Modern Complex, Kaktives Rd, Khade Bazar, Raviwar Peth,<br />
                  Belagavi, Karnataka 590001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <div>
                  <a href="tel:+918313564508" className="hover:text-orange-500 transition-colors duration-200">831 356 4508</a><br />
                  <a href="tel:+918313135228" className="hover:text-orange-500 transition-colors duration-200">831 313 5228</a><br />
                  <a href="tel:+917676027907" className="hover:text-orange-500 transition-colors duration-200">7676027907</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-12 w-12 text-orange-500" />
                <a href="mailto:media1.comin@gmail.com" className="hover:text-orange-500 transition-colors duration-200">
                  media1.comin@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div className="md:pl-8">
            <h3 className="text-lg font-semibold mb-4 text-white">Our Courses</h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="hover:text-orange-500 transition-colors duration-200"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Media Computers. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 