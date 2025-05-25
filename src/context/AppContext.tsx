import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface HistoryItem {
  id: string;
  view: string;
  inputs: any;
  result: any;
  timestamp: string;
}

interface AppContextType {
  savedData: any;
  saveData: (key: string, data: any) => void;
  getData: (key: string) => any;
  history: HistoryItem[];
  addHistory: (entry: HistoryItem) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedData, setSavedData] = useState<Record<string, any>>({});
  // Initialize history from localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('rec_history') || '[]'); } catch { return []; }
  });

  const saveData = (key: string, data: any) => {
    setSavedData(prev => ({ ...prev, [key]: data }));
    
    // Also save to localStorage for persistence
    try {
      localStorage.setItem(`rec_calculator_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const getData = (key: string) => {
    // If we have it in state, return that
    if (savedData[key] !== undefined) {
      return savedData[key];
    }
    
    // Otherwise try to get from localStorage
    try {
      const storedData = localStorage.getItem(`rec_calculator_${key}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Update state for future access
        setSavedData(prev => ({ ...prev, [key]: parsedData }));
        return parsedData;
      }
    } catch (e) {
      console.error('Error retrieving from localStorage:', e);
    }
    
    return null;
  };

  const addHistory = (entry: HistoryItem) => {
    setHistory(prev => {
      const updated = [...prev, entry];
      try { localStorage.setItem('rec_history', JSON.stringify(updated)); } catch {};
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('rec_history');
  };

  return (
    <AppContext.Provider value={{ savedData, saveData, getData, history, addHistory, clearHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};