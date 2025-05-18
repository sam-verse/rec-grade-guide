import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Toast } from './Toast';

interface QueriesPageProps {
  onBack: () => void;
}

const QueriesPage: React.FC<QueriesPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create URL-encoded form data
      const formDataObj = new URLSearchParams();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('query', formData.query);
      formDataObj.append('timestamp', new Date().toISOString());

      await fetch('https://script.google.com/macros/s/AKfycbxQVjXGjAf0Uur-NcpxX-RVVOgSlErfw0AyCKTowNuC1_LWjf0w377Mrkc5SdBk4rrL/exec', {
        method: 'POST',
        mode: 'no-cors', // This is important for Google Apps Script
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataObj.toString()
      });

      // Since mode is 'no-cors', we won't get a proper response
      // We'll assume success if no error was thrown
      setToastType('success');
      setToastMessage('Query submitted successfully!');
      setFormData({ name: '', email: '', query: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setToastType('error');
      setToastMessage('Failed to submit query. Please try again.');
    }
    setShowToast(true);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-2xl mx-auto mt-4">
        <button
          onClick={onBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Menu
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">
            Submit Your Query
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Query
              </label>
              <textarea
                required
                value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Query
            </button>
          </form>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
          type={toastType}
        />
      )}
    </div>
  );
};

export default QueriesPage;