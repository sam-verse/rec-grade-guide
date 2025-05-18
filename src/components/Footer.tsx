import React from 'react';
import { Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="font-primary text-2xl font-bold mb-2">GradeGuide REC</h3>
            <p className="text-blue-200 text-sm">Your Academic Journey, Simplified</p>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> by
            </p>
            <p className="font-primary text-lg">Abraham Samuel E</p>
            <div className="flex space-x-4 mt-2">
              <a 
                href="https://www.linkedin.com/in/abraham-samuel-e/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:abrahamsamuel562004@gmail.com"
                className="hover:text-blue-300 transition-colors transform hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/abraham._.samuel/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-4"></div>
          
          <div className="text-center text-sm text-blue-200">
            <p>© {new Date().getFullYear()} GradeGuide REC</p>
            <p className="mt-1">Rajalakshmi Engineering College</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;