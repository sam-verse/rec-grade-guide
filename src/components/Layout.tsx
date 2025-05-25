import React, { createContext, useContext } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from './Navbar';

interface UserContextType {
  isLoggedIn: boolean;
  userDetails: {
    name: string;
    department: string;
    yearOfStudy: string;
  };
  openLoginModal: () => void;
  currentTheme: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: () => void;
  onNavigate: (view: string) => void;
  currentTheme?: string;
  currentView?: string;
  userDetails: { name: string; department: string; yearOfStudy: string };
}

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn, onLogout, onLogin, onNavigate, currentTheme = 'blue', currentView, userDetails }) => {
  const { clearHistory } = useAppContext();
  // history persists until explicit logout

  const handleLogout = () => { clearHistory(); onLogout(); };

  // override theme to yellow if viewing history
  const effectiveTheme = currentView === 'history' ? 'yellow' : currentTheme;

  return (
    <UserContext.Provider value={{ isLoggedIn, userDetails, openLoginModal: onLogin, currentTheme: effectiveTheme }}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onLogin={onLogin}
          onNavigate={onNavigate}
          userDetails={userDetails}
          currentTheme={effectiveTheme}
        />
        <main className="pt-16">
          <div className="w-full p-0">
            {children}
          </div>
        </main>
        {/* App-managed UserDetailsModal places here */}
      </div>
    </UserContext.Provider>
  );
};

export default Layout;