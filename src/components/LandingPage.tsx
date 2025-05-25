import React, { useEffect } from 'react';
import { RecLogo } from '../assets/RecLogo';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'REC Grade Guide';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md mx-auto text-center space-y-8 animate-fadeIn">
        <div className="flex justify-center">
          <RecLogo className="w-40 h-40" />
        </div>
        
        <h1 className="text-3xl font-bold text-blue-900 mt-6">
          Welcome to the REC Grade Guide!
        </h1>
        
        <p className="text-gray-600 mt-4">
          A simple tool to help Rajalakshmi Engineering College students calculate their academic requirements and performance.
        </p>
        
        <button
          onClick={onNavigate}
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;