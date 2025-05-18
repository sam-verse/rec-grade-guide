import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MainMenu from './components/MainMenu';
import EndSemCalculator from './components/EndSemCalculator';
import GpaCalculator from './components/GpaCalculator';
import CgpaCalculator from './components/CgpaCalculator';
import QueriesPage from './components/QueriesPage';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  const navigateTo = (view: string) => {
    setCurrentView(view);
  };

  return (
    <AppProvider>
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
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;