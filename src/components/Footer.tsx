import React, { useState } from 'react';
import { Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps { currentView: string; }

const Footer: React.FC<FooterProps> = ({ currentView }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const themeMap: Record<string, { footer: string; header: string; subText: string; divider: string }> = {
    gpa: { footer: 'from-green-900 to-green-900', header: 'bg-green-600', subText: 'text-green-200', divider: 'via-green-200' },
    cgpa: { footer: 'from-purple-900 to-purple-900', header: 'bg-purple-600', subText: 'text-purple-200', divider: 'via-purple-200' },
    queries: { footer: 'from-orange-900 to-orange-900', header: 'bg-orange-600', subText: 'text-orange-200', divider: 'via-orange-200' }
  };
  const { footer: footerGradient, header: headerBg, subText: subTextColor, divider: dividerColor } = themeMap[currentView] || { footer: 'from-blue-900 to-indigo-900', header: 'bg-blue-600', subText: 'text-blue-200', divider: 'via-blue-200' };

  return (
    <>
      <footer className={`bg-gradient-to-r ${footerGradient} text-white py-8 mt-auto`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <h3 className="font-primary text-2xl font-bold mb-2">GradeGuide REC</h3>
              <p className={`text-sm ${subTextColor}`}>Your Academic Journey, Simplified</p>
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

            <div className={`w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent ${dividerColor} to-transparent my-4`}></div>
            
            <div className={`text-center text-sm ${subTextColor}`}>
              <p> {new Date().getFullYear()} GradeGuide REC</p>
              <p className="mt-1">Rajalakshmi Engineering College</p>
              <div className="text-xs mt-2">
                <button onClick={() => setShowPrivacy(true)} className={`underline hover:text-white ${subTextColor}`}>Privacy Policy</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl ring-1 ring-gray-200 max-w-2xl w-full overflow-y-auto max-h-[80vh]">
            <div className={`flex justify-between items-center ${headerBg} px-6 py-4 rounded-t-xl`}>
              <h2 className="text-lg font-semibold text-white">Privacy Policy</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-white hover:text-gray-200">✕</button>
            </div>
            <div className="p-6 text-gray-800 text-sm space-y-6">
              <p>Welcome to GradeGuide REC’s Privacy Policy. Your trust is important to us, and we are committed to maintaining transparency about how this tool operates and handles any information you provide. Please read through this overview to understand what data is collected, how it is processed, and your rights as a user.</p>
              <p>This application is designed by a student for students of Rajalakshmi Engineering College. The only personal information collected and stored is your name and department, which are used exclusively for anonymous statistical research and future enhancements. No identifying markers such as roll numbers, email addresses, or contact details are retained.</p>
              <p>All computations performed by GradeGuide REC, including end-sem calculation, semester GPA, and CGPA tracking, occur entirely within your web browser. No calculation inputs or results are transmitted to or stored on remote servers, ensuring complete local privacy and control over your academic data.</p>
              <p>Any data you enter during a session exists only in your current browser instance. Upon closing or refreshing the page, all input values are cleared and no session history is preserved. We encourage users to treat the tool as ephemeral and save any important results offline if needed.</p>
              <p>Under no circumstances does GradeGuide REC sell, lease, or share your name and department data to third parties, advertisers, or external organizations. We do not employ tracking cookies, external analytics, or user profiling technologies beyond the minimal research scope outlined above.</p>
              <p>By using GradeGuide REC, you acknowledge and agree to this policy. If you have questions, suggestions, or concerns regarding your privacy, please reach out via the contact links in this footer. Thank you for choosing GradeGuide REC to support your academic journey.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;