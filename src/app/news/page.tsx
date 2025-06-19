"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { fetchLatestNews, searchNews, NewsArticle } from '@/utils/newsService'
import Image from 'next/image'

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('technology')
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadNews()
  }, [selectedCategory])

  const loadNews = async () => {
    setIsLoading(true)
    try {
      const news = await fetchLatestNews(selectedCategory)
      setArticles(news)
    } catch (error) {
      console.error('Error loading news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      loadNews()
      return
    }
    setIsLoading(true)
    try {
      const results = await searchNews(searchQuery)
      setArticles(results)
    } catch (error) {
      console.error('Error searching news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/news-banner.webp"
            alt="News Banner"
            width={1920}
            height={400}
            className="w-full h-[400px] object-cover"
            priority
          />
        </div>
      </section>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-colors duration-200"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-colors duration-200"
          >
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading news...</p>
            </div>
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.url} className="group h-[300px] [perspective:1000px]">
                <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front of card */}
                  <div className="absolute inset-0 rounded-xl shadow-2xl [backface-visibility:hidden] bg-white dark:bg-gray-800 p-6 flex flex-col justify-between border-2 border-gray-200 dark:border-gray-700">
                    {article.image && (
                      <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                        {article.source.name}
                      </span>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 rounded-xl shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="h-full flex flex-col justify-between">
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-6">
                        {article.description}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full py-3 bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 