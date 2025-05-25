import React, { useState, useEffect } from 'react';

// Extend the Window interface to include our custom callback
declare global {
  interface Window {
    [key: string]: (response: any) => void;
  }
}

// Helper function to handle navigation to queries
const goToQueries = (onNavigate: (view: string) => void, setShowAbout: (show: boolean) => void) => {
  setShowAbout(false); // Close the about popup
  onNavigate('queries'); // Navigate to queries page
};

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin?: () => void;
  onNavigate: (view: string) => void;
  userDetails: {
    name: string;
    department: string;
    yearOfStudy: string;
  };
  currentTheme?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn, 
  onLogout,
  onLogin,
  onNavigate,
  userDetails,
  currentTheme
}) => {
  const [showAbout, setShowAbout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    if (isLoggedIn) setIsMenuOpen(true);
  }, [isLoggedIn]);

  const getThemeColor = () => {
    // allow override via prop or fallback to department-based
    if (currentTheme) return currentTheme;
    if (!isLoggedIn || !userDetails.department) return 'blue';
    switch (userDetails.department.toLowerCase()) {
      case 'cse': return 'blue';
      case 'ece': return 'green';
      case 'eee': return 'purple';
      case 'mech': return 'orange';
      case 'civil': return 'red';
      default: return 'blue';
    }
  };

  const themeColor = getThemeColor();
  
  // Get theme color classes
  const getThemeClasses = () => {
    switch (themeColor) {
      case 'green':
        return {
          bg: 'bg-green-600 hover:bg-green-700',
          text: 'text-green-700',
          border: 'border-green-200',
          lightBg: 'bg-green-50',
          darkBg: 'bg-green-800',
          gradientFrom: 'from-green-900',
          gradientTo: 'to-green-800',
          ring: 'ring-green-500',
          hoverText: 'hover:text-green-900'
        };
      case 'purple':
        return {
          bg: 'bg-purple-600 hover:bg-purple-700',
          text: 'text-purple-700',
          border: 'border-purple-200',
          lightBg: 'bg-purple-50',
          darkBg: 'bg-purple-800',
          gradientFrom: 'from-purple-900',
          gradientTo: 'to-purple-800',
          ring: 'ring-purple-500',
          hoverText: 'hover:text-purple-900'
        };
      case 'orange':
        return {
          bg: 'bg-orange-600 hover:bg-orange-700',
          text: 'text-orange-700',
          border: 'border-orange-200',
          lightBg: 'bg-orange-50',
          darkBg: 'bg-orange-800',
          gradientFrom: 'from-orange-900',
          gradientTo: 'to-orange-800',
          ring: 'ring-orange-500',
          hoverText: 'hover:text-orange-900'
        };
      case 'red':
        return {
          bg: 'bg-red-600 hover:bg-red-700',
          text: 'text-red-700',
          border: 'border-red-200',
          lightBg: 'bg-red-50',
          darkBg: 'bg-red-800',
          gradientFrom: 'from-red-900',
          gradientTo: 'to-red-800',
          ring: 'ring-red-500',
          hoverText: 'hover:text-red-900'
        };
      default: // blue
        return {
          bg: 'bg-blue-600 hover:bg-blue-700',
          text: 'text-blue-700',
          border: 'border-blue-200',
          lightBg: 'bg-blue-50',
          darkBg: 'bg-blue-800',
          gradientFrom: 'from-blue-900',
          gradientTo: 'to-blue-800',
          ring: 'ring-blue-500',
          hoverText: 'hover:text-blue-900'
        };
    }
  };
  
  const themeClasses = getThemeClasses();

  // map numeric year to roman numerals
  const yearMap: Record<string, string> = { '1': 'I', '2': 'II', '3': 'III', '4': 'IV' };
  const formattedYear = yearMap[userDetails.yearOfStudy] || userDetails.yearOfStudy;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsMenuOpen(false);
    if (onLogin) {
      onLogin();
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  return (
    <nav className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 border-b-2 border-${themeColor}-500`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <span className={`text-xl font-bold text-${themeColor}-600`}>Grade Guide</span>
          </div>

          {/* Right side - Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className={`px-4 py-2 ${themeClasses.bg} text-white rounded-md transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl`}
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowAbout(true)}
                  className={`px-4 py-2 text-${themeColor}-600 hover:text-${themeColor}-900 transition-colors duration-200`}
                >
                  About
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); onNavigate('history'); }}
                  className={`px-4 py-2 text-${themeColor}-600 hover:text-${themeColor}-900 transition-colors duration-200`}
                >
                  History
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`group inline-flex items-center justify-center p-2 rounded-md text-${themeColor}-600 hover:text-${themeColor}-900 hover:bg-${themeColor}-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${themeColor}-500 transition-colors duration-200`}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                  className={`text-${themeColor}-600 group-hover:text-${themeColor}-900 transition-colors duration-200`}
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                  className={`text-${themeColor}-600 group-hover:text-${themeColor}-900 transition-colors duration-200`}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-white shadow-lg`}
        style={{ top: '4rem' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isLoggedIn && (
            <div className="px-3 py-2 border-b border-gray-200 flex justify-center">
              <div className={`bg-${themeColor}-100 text-${themeColor}-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm font-medium`}>
                <span>{userDetails.name.toUpperCase()}</span>
                <span className="font-bold">•</span>
                <span>{userDetails.department.toUpperCase()}</span>
                <span className="font-bold">•</span>
                <span>{formattedYear}</span>
              </div>
            </div>
          )}
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white ${themeClasses.bg} transition-colors duration-200`}
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowAbout(true);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium text-${themeColor}-600 hover:text-${themeColor}-900 hover:bg-${themeColor}-50 transition-colors duration-200`}
              >
                About
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); onNavigate('history'); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium text-${themeColor}-600 hover:text-${themeColor}-900 hover:bg-${themeColor}-50 transition-colors duration-200`}
              >
                History
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Enhanced About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className={`relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-auto max-h-[90vh] overflow-y-auto border-2 ${themeClasses.border} transform transition-all duration-300 scale-95 hover:scale-100`}>
            {/* Header */}
            <div className={`sticky top-0 bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} py-5 px-6 rounded-t-2xl flex justify-between items-center z-10`}>
              <h2 className="text-2xl md:text-4xl font-bold text-${themeColor}-600 flex items-center gap-2">
                {/* <span className="bg-${themeColor}-800/20 p-2 rounded-lg">📊</span> */}
                <span className="text-${themeColor} text-white">GradeGuide</span>
              </h2>
              <button
                onClick={() => setShowAbout(false)}
                className="text-${themeColor}-600 hover:bg-${themeColor}-50 p-2 rounded-full transition-colors duration-200"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-gray-600 text-center mb-8 text-lg">
                Your all-in-one academic companion for grade calculation, GPA tracking, and academic planning
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Feature 1 */}
                <div className={`bg-gradient-to-br from-white to-${themeColor}-50 rounded-xl p-6 border border-${themeColor}-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-xl bg-${themeColor}-100 flex items-center justify-center mb-4`}>
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">End-Sem Calculator</h3>
                  <p className="text-gray-600 text-sm mb-4">Calculate the marks needed in your final exams to achieve your target grade.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                      Current score analysis
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                      Target grade estimation
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                      Study planning
                    </li>
                  </ul>
                </div>

                {/* Feature 2 */}
                <div className={`bg-gradient-to-br from-white to-${themeColor}-50 rounded-xl p-6 border border-${themeColor}-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-xl bg-${themeColor}-100 flex items-center justify-center mb-4`}>
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">GPA Calculator</h3>
                  <p className="text-gray-600 text-sm mb-4">Track and calculate your semester GPA with our intuitive interface.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Course grade tracking
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Credit hour management
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Performance insights
                    </li>
                  </ul>
                </div>

                {/* Feature 3 */}
                <div className={`bg-gradient-to-br from-white to-${themeColor}-50 rounded-xl p-6 border border-${themeColor}-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-xl bg-${themeColor}-100 flex items-center justify-center mb-4`}>
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">CGPA Tracker</h3>
                  <p className="text-gray-600 text-sm mb-4">Monitor your academic progress across multiple semesters.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></span>
                      Semester-wise analysis
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></span>
                      Trend visualization
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></span>
                      Performance forecasting
                    </li>
                  </ul>
                </div>

                {/* Feature 4 */}
                <div className={`bg-gradient-to-br from-white to-${themeColor}-50 rounded-xl p-6 border border-${themeColor}-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-xl bg-${themeColor}-100 flex items-center justify-center mb-4`}>
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Support Center</h3>
                  <p className="text-gray-600 text-sm mb-4">Get help and support for all your academic queries.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                      24/7 Query Support
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                      Academic Resources
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                      Quick Response Time
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feedback & CTA Section */}
              <div className={`mt-10 p-8 rounded-xl bg-white ${themeClasses.border} shadow-lg`}>
                <div className="text-center mb-6">
                  <h6 className={`text-lg font-bold ${themeClasses.text} mb-2`}>We'd love your feedback!</h6>
                  <p className="text-gray-600 max-w-lg text-sm mx-auto">
                    Help us improve GradeGuide by sharing your experience
                  </p>
                </div>
                
                {/* Rating Section */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 text-center mb-3">How would you rate your experience?</p>
                  <div className="flex items-center justify-center space-x-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-3xl text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-center">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        goToQueries(onNavigate, setShowAbout);
                      }}
                      className={`px-6 py-3 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg ${themeClasses.bg}`}
                    >
                      Go to Queries
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => setShowAbout(false)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Skip for Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 