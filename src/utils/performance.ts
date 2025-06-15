import { useEffect } from 'react';

// Image optimization settings
export const imageLoader = {
  quality: 75,
  format: 'webp',
  loading: 'lazy',
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
};

// Lazy loading hook
export function useLazyLoad(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function executedFunction(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Preload images
export function preloadImages(imageUrls: string[]) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Preload fonts
export function preloadFonts(fontUrls: string[]) {
  fontUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Cache API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function cachedFetch(url: string, options?: RequestInit) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(url, options);
  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

// Optimize scroll performance
export function optimizeScroll(callback: () => void) {
  let ticking = false;

  return function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
}

// Optimize resize performance
export function optimizeResize(callback: () => void) {
  let timeout: NodeJS.Timeout;
  
  return function onResize() {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 100);
  };
} 