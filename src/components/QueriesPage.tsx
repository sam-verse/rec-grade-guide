import React, { useState } from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
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
      const formDataObj = new URLSearchParams();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('query', formData.query);
      formDataObj.append('timestamp', new Date().toISOString());

      await fetch('https://script.google.com/macros/s/AKfycbxQVjXGjAf0Uur-NcpxX-RVVOgSlErfw0AyCKTowNuC1_LWjf0w377Mrkc5SdBk4rrL/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataObj.toString()
      });

      setToastType('success');
      setToastMessage('Your message has been sent! ✨');
      setFormData({ name: '', email: '', query: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setToastType('error');
      setToastMessage('Something went wrong. Try again? 🫶');
    }
    setShowToast(true);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-2xl mx-auto mt-4">
        <button
          onClick={onBack}
          className="flex items-center bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg text-orange-600 hover:text-orange-800 mb-6 transition-all duration-200 border border-orange-100 hover:border-orange-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-medium">Back to Menu</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Drop Your Question
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="What should we call you?"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Drop your email here"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's on your mind?
              </label>
              <textarea
                required
                value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                placeholder="Spill the tea... ☕"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 transition duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5" />
              Send it! 🚀
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