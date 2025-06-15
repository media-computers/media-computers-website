import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Cache duration in milliseconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

interface CacheEntry {
  data: NewsArticle[];
  timestamp: number;
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

function isValidImageUrl(url: string | null): boolean {
  if (!url) return false;
  try {
    const parsedUrl = new URL(url);
    // Add more trusted domains as needed
    const trustedDomains = [
      'images.unsplash.com',
      'media.cnn.com',
      'media.npr.org',
      'static01.nyt.com',
      'www.reuters.com',
      'www.bloomberg.com',
      'www.bbc.com',
      'www.theguardian.com',
      'www.washingtonpost.com',
      'www.nytimes.com'
    ];
    return trustedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
  } catch {
    return false;
  }
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
    const response = await axios.get<NewsResponse>(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: category,
        apiKey: NEWS_API_KEY,
        pageSize: 10,
        language: 'en',
        sortBy: 'publishedAt',
      },
    });

    console.log('API Response:', response.data);
    
    if (response.data.status === 'error') {
      console.error('API Error:', response.data);
      return [];
    }

    if (!response.data.articles || response.data.articles.length === 0) {
      console.log('No articles found for category:', category);
      return [];
    }

    // Process articles to handle images
    const processedArticles = response.data.articles.map(article => ({
      ...article,
      urlToImage: isValidImageUrl(article.urlToImage) ? article.urlToImage : null
    }));

    // Cache the results
    setCachedData(cacheKey, processedArticles);
    return processedArticles;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.error('Invalid API key. Please check your NewsAPI key.');
      }
    } else {
      console.error('Error fetching news:', error);
    }
    return [];
  }
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  try {
    console.log('Searching news for query:', query);
    const response = await axios.get<NewsResponse>(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
        pageSize: 10,
        sortBy: 'publishedAt',
        language: 'en',
      },
    });

    console.log('Search Response:', response.data);
    
    if (response.data.status === 'error') {
      console.error('API Error:', response.data);
      return [];
    }

    if (!response.data.articles || response.data.articles.length === 0) {
      console.log('No articles found for query:', query);
      return [];
    }

    // Process articles to handle images
    return response.data.articles.map(article => ({
      ...article,
      urlToImage: isValidImageUrl(article.urlToImage) ? article.urlToImage : null
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.error('Invalid API key. Please check your NewsAPI key.');
      }
    } else {
      console.error('Error searching news:', error);
    }
    return [];
  }
} 