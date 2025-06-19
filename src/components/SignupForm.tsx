'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CheckCircle2, XCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const MIN_PASSWORD_LENGTH = 8;

export default function SignupFormWrapper() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loadingAfterSignup, setLoadingAfterSignup] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupPrompt = searchParams.get('signupPrompt') === '1';
  const enquirePrompt = searchParams.get('enquire') === '1';
  const redirectPath = searchParams.get('redirect');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error && data.error.toLowerCase().includes('already exists')) {
          setError('Email already exists');
        } else {
          setError(data.error || 'Something went wrong');
        }
        return;
      }

      // Wait 4 seconds before attempting sign-in to allow Google Sheets to update
      setLoadingAfterSignup(true);
      await new Promise(resolve => setTimeout(resolve, 4000));
      setLoadingAfterSignup(false);

      // Auto sign-in after successful signup
      const signInResult = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      console.log('SignIn result:', signInResult);
      if (signInResult && signInResult.ok) {
        if (redirectPath) {
          if (redirectPath.startsWith('/enquire')) {
            // Preserve any existing query params and add signupSuccess=1
            const url = new URL(redirectPath, window.location.origin);
            url.searchParams.set('signupSuccess', '1');
            router.push(url.pathname + url.search);
          } else {
            router.push(redirectPath);
          }
        } else {
          router.push('/');
        }
        return; // Do not setSuccess(true) here
      } else {
        setError('Account created, but automatic sign-in failed. Please log in manually.');
        setSuccess(true); // Only show success if sign-in fails
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {signupPrompt && (
        <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-700 px-4 py-3 rounded-md mb-4">
          Signup first
        </div>
      )}
      {loadingAfterSignup && (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-blue-600 font-semibold">Creating your account...</span>
        </div>
      )}
      {!loadingAfterSignup && success ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-lg text-center"
        >
          <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-1">Registration Successful!</h3>
          <p>You can now log in with your credentials.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your password"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Must be at least {MIN_PASSWORD_LENGTH} characters long
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              <p>{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      )}
    </div>
  );
} 