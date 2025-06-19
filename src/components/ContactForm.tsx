'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Add phone validation
  const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate phone number
    if (!isValidPhone(formData.Phone)) {
      setLoading(false);
      setError('Please enter a valid phone number (numbers only, 10-15 digits).');
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sheetName: 'CONTACTS',
          data: {
            Name: formData.Name,
            Email: formData.Email,
            Phone: formData.Phone,
            Message: formData.Message,
            Date: new Date().toISOString()
          }
        }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setSuccess(true);
      setFormData({
        Name: '',
        Email: '',
        Phone: '',
        Message: '',
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputStyles = "mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 transition-colors duration-200";
  const labelStyles = "block text-sm font-bold text-gray-700 dark:text-white mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="Name" className={labelStyles}>
          Name
        </label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
          className={inputStyles}
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="Email" className={labelStyles}>
          Email
        </label>
        <input
          type="email"
          id="Email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
          className={inputStyles}
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="Phone" className={labelStyles}>
          Phone
        </label>
        <input
          type="tel"
          id="Phone"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10,15}"
          inputMode="numeric"
          className={inputStyles}
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label htmlFor="Message" className={labelStyles}>
          Message
        </label>
        <textarea
          id="Message"
          name="Message"
          value={formData.Message}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputStyles} resize-none`}
          placeholder="Enter your message"
        />
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-md">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-md font-bold text-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
} 