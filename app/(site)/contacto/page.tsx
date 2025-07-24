'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactoPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="content-page bg-white">
      <div className="max-w-4xl mx-auto px-8 sm:px-12 md:px-16 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Contact
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Got a question? Send us a message and we'll be in touch soon!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#43d3ff] focus:border-[#43d3ff]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#43d3ff] focus:border-[#43d3ff]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#43d3ff] focus:border-[#43d3ff]"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#43d3ff] text-black font-bold py-3 px-6 rounded-md hover:bg-[#00bfff] transition-colors disabled:bg-gray-400"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        {status === 'success' && (
          <p className="text-center mt-4 text-green-600">Message sent successfully! Thanks for contacting us.</p>
        )}
        {status === 'error' && (
          <p className="text-center mt-4 text-red-600">Something went wrong sending your message. Please try again.</p>
        )}
      </div>
    </div>
  );
}