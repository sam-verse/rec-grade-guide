import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import UserDetailsModal from './components/UserDetailsModal';
import LandingPage from './components/LandingPage';
import MainMenu from './components/MainMenu';
import EndSemCalculator from './components/EndSemCalculator';
import GpaCalculator from './components/GpaCalculator';
import CgpaCalculator from './components/CgpaCalculator';
import QueriesPage from './components/QueriesPage';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [userDetails, setUserDetails] = useState({
    name: '',
    department: '',
    yearOfStudy: ''
  });

  const getThemeForView = (view: string) => {
    switch (view) {
      case 'endSem':
        return 'blue';
      case 'gpa':
        return 'green';
      case 'cgpa':
        return 'purple';
      case 'queries':
        return 'orange';
      default:
        return 'blue';
    }
  };

  const navigateTo = (view: string) => {
    // Check if user needs to login for the first three options
    if (!isLoggedIn && ['endSem', 'gpa', 'cgpa'].includes(view)) {
      // update theme for requested view before showing login
      setCurrentTheme(getThemeForView(view));
      setIsModalOpen(true);
      // Store the intended view to navigate to after login
      localStorage.setItem('pendingView', view);
    } else {
      setCurrentView(view);
      setCurrentTheme(getThemeForView(view));
    }
  };

  const handleLoginSuccess = (details: { name: string; department: string; yearOfStudy: string }) => {
    setIsLoggedIn(true);
    setUserDetails(details);
    setIsModalOpen(false);
    // Store in localStorage
    localStorage.setItem('userSession', 'true');
    localStorage.setItem('userDetails', JSON.stringify(details));
    
    // Navigate to pending view or default to main menu
    const pendingView = localStorage.getItem('pendingView');
    if (pendingView) {
      setCurrentView(pendingView);
      setCurrentTheme(getThemeForView(pendingView));
      localStorage.removeItem('pendingView');
    } else {
      setCurrentView('menu');
      setCurrentTheme(getThemeForView('menu'));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsModalOpen(false);
    setUserDetails({
      name: '',
      department: '',
      yearOfStudy: ''
    });
    // Clear localStorage
    localStorage.removeItem('userSession');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('pendingView');
  };

  // Restore session and user details from localStorage on mount
  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session === 'true') {
      const stored = localStorage.getItem('userDetails');
      if (stored) {
        const d = JSON.parse(stored);
        setIsLoggedIn(true);
        setUserDetails({ name: d.name, department: d.department, yearOfStudy: d.yearOfStudy });
        setCurrentView('menu');
      }
    }
  }, []);

  return (
    <AppProvider>
      <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={() => setIsModalOpen(true)} onQueries={() => navigateTo('queries')} currentTheme={currentTheme} userDetails={userDetails}>
        <div className="app-container">
          <main className="content">
            {currentView === 'landing' && (
              <LandingPage onNavigate={() => navigateTo('menu')} />
            )}
            
            {currentView === 'menu' && (
              <MainMenu onNavigate={navigateTo} />
            )}
            
            {currentView === 'endSem' && (
              <EndSemCalculator onBack={() => navigateTo('menu')} />
            )}
            
            {currentView === 'gpa' && (
              <GpaCalculator onBack={() => navigateTo('menu')} />
            )}
            
            {currentView === 'cgpa' && (
              <CgpaCalculator onBack={() => navigateTo('menu')} />
            )}

            {currentView === 'queries' && (
              <QueriesPage onBack={() => navigateTo('menu')} />
            )}
          </main>
          <Footer currentView={currentView} />
        </div>

        <UserDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          theme={currentTheme}
        />
      </Layout>
    </AppProvider>
  );
};

export default App;