import React, { useState, useEffect } from 'react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin?: () => void;
  onQueries?: () => void;
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
  onQueries,
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

  const handleQueries = () => {
    setIsMenuOpen(false);
    if (onQueries) {
      onQueries();
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
                className={`px-4 py-2 bg-${themeColor}-600 text-white rounded-md transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:bg-${themeColor}-700`}
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
                  onClick={handleQueries}
                  className={`px-4 py-2 text-${themeColor}-600 hover:text-${themeColor}-900 transition-colors duration-200`}
                >
                  Queries
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
              className={`inline-flex items-center justify-center p-2 rounded-md text-${themeColor}-600 hover:text-${themeColor}-900 hover:bg-${themeColor}-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${themeColor}-500`}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-${themeColor}-600 hover:bg-${themeColor}-700`}
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
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium text-${themeColor}-600 hover:text-${themeColor}-900 hover:bg-${themeColor}-50`}
              >
                About
              </button>
              <button
                onClick={handleQueries}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium text-${themeColor}-600 hover:text-${themeColor}-900 hover:bg-${themeColor}-50`}
              >
                Queries
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className={`relative bg-${themeColor}-50 rounded-xl shadow-2xl max-w-3xl w-full mx-auto max-h-[90vh] overflow-y-auto border border-${themeColor}-200`}>
            <div className={`flex justify-between items-center sticky top-0 bg-${themeColor}-600 py-4 px-6 rounded-t-xl`}> 
              <h2 className="text-2xl font-bold text-white">About Grade Calculation</h2>
              <button
                onClick={() => setShowAbout(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-6 text-${themeColor}-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className={`text-xl font-semibold text-${themeColor}-800 mb-4`}>Calculation Techniques</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Assign grade points to each course</li>
                      <li>Multiply grade points by credit hours</li>
                      <li>Sum products and divide by total credits</li>
                    </ul>
                  </div>
                </section>
                <section>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className={`text-xl font-semibold text-${themeColor}-800 mb-4`}>Cumulative GPA (CGPA)</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Average of semester GPAs</li>
                      <li>Weighted by credits per semester</li>
                    </ul>
                  </div>
                </section>
                <section>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className={`text-xl font-semibold text-${themeColor}-800 mb-4`}>Grade Distribution</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>A:</strong> 90-100%</li>
                      <li><strong>B:</strong> 80-89%</li>
                      <li><strong>C:</strong> 70-79%</li>
                      <li><strong>D:</strong> 60-69%</li>
                      <li><strong>F:</strong> Below 60%</li>
                    </ul>
                  </div>
                </section>
                <section>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className={`text-xl font-semibold text-${themeColor}-800 mb-4`}>Backlog Calculation</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Courses with F are backlogs</li>
                      <li>Must be cleared in subsequent semesters</li>
                      <li>Affects CGPA calculation</li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 