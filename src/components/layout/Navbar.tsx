'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { Home, BookOpen, Calendar, Newspaper, FileText, User, Moon, Sun, Info, Landmark, LogOut, LogIn, UserPlus, Menu, X, ImageIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react'
import Logo from '@/components/layout/Logo'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Book My Page', href: '/bookings', icon: Calendar },
  { name: 'News', href: '/news', icon: Newspaper },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Our Legacy', href: '/legacy', icon: Landmark },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0)
  }, [])

  useEffect(() => {
    setMounted(true)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const toggleDark = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const isActive = (path: string) => pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md'
    }`}>
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo positioned at leftmost corner */}
          <div className="flex-shrink-0">
            <div className="transform scale-100">
              <Logo />
            </div>
          </div>
          
          {/* Mobile menu button and All navigation components aligned to the right */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8 pr-2 sm:pr-4 lg:pr-6">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-md text-sm lg:text-base font-bold transition-all duration-200 hover:scale-105 whitespace-nowrap ${
                    isActive(link.href) 
                      ? 'text-orange-500 dark:text-orange-400' 
                      : 'text-gray-900 dark:text-gray-100 hover:text-orange-500 dark:hover:text-orange-400'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 dark:bg-orange-400 transform ${
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0'
                  } transition-transform duration-200`}></span>
                </Link>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={toggleDark}
                  className="p-2 rounded-full text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}

              {/* Authentication buttons */}
              {status === 'authenticated' ? (
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="inline-flex items-center px-3 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 transition-colors duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                  
                  {pathname !== '/register' && (
                    <Link 
                      href="/register" 
                      className="inline-flex items-center px-3 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <UserPlus className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Register</span>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-2">
              {navigation.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive(link.href)
                        ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                        : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}