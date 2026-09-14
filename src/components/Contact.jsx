import { useState } from 'react';
import { API_BASE_URL } from '../api';

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');

  const isFormInvalid = !formData.name.trim() || !formData.email.trim() || !formData.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setServerMessage(data.message || 'Your message has been sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setServerMessage('Could not reach the server. Please make sure the backend is running.');
      setStatus('error');
    }
  };

  const inputClasses = `p-3 border rounded-lg w-full focus:outline-blue-600 ${
    darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'
  }`;

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Get In Touch</h2>
        <p className={`text-center mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fill in all fields to send a message.</p>

        {status === 'success' && (
          <p className="text-center mb-4 text-green-500 font-medium">{serverMessage}</p>
        )}
        {status === 'error' && (
          <p className="text-center mb-4 text-red-500 font-medium">{serverMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={inputClasses}
          />
          <button
            type="submit"
            disabled={isFormInvalid || status === 'submitting'}
            className={`py-3 px-6 font-medium rounded-lg transition-colors ${
              isFormInvalid || status === 'submitting'
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {status === 'submitting' ? 'Sending...' : isFormInvalid ? 'Fill All Fields to Send' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
