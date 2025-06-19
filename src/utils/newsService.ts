import axios from 'axios';

const GNEWS_API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || '';
const GNEWS_API_BASE_URL = 'https://gnews.io/api/v4';

// Cache duration in milliseconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

interface CacheEntry {
  data: NewsArticle[];
  timestamp: number;
}

export interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

function getCacheKey(category: string): string {
  return `news_${category.toLowerCase()}`;
}

function getCachedData(key: string): CacheEntry | null {
  if (typeof window === 'undefined') return null;
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const data = JSON.parse(cached) as CacheEntry;
    if (Date.now() - data.timestamp < CACHE_DURATION) {
      return data;
    }
    localStorage.removeItem(key);
    return null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function setCachedData(key: string, data: NewsArticle[]): void {
  if (typeof window === 'undefined') return;
  const cacheEntry: CacheEntry = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
}

export async function fetchLatestNews(category: string = 'technology'): Promise<NewsArticle[]> {
  const cacheKey = getCacheKey(category);
  // Check cache first
  const cached = getCachedData(cacheKey);
  if (cached) {
    console.log('Returning cached news for:', category);
    return cached.data;
  }
  try {
    console.log('Fetching fresh news for category:', category);
    const response = await axios.get(`${GNEWS_API_BASE_URL}/search`, {
      params: {
        q: category,
        token: GNEWS_API_KEY,
        lang: 'en',
        max: 10,
      },
    });
    const articles = response.data.articles || [];
    setCachedData(cacheKey, articles);
    return articles;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Error fetching news:', error);
    }
    return [];
  }
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  try {
    console.log('Searching news for query:', query);
    const response = await axios.get(`${GNEWS_API_BASE_URL}/search`, {
      params: {
        q: query,
        token: GNEWS_API_KEY,
        lang: 'en',
        max: 10,
      },
    });
    return response.data.articles || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Error searching news:', error);
    }
    return [];
  }
} 