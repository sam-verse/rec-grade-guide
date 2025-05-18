import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, InfoIcon } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  onClose, 
  type = 'info',
  duration = 3000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <InfoIcon className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fadeIn">
      <div className={`flex items-center p-4 rounded-lg shadow-lg border ${bgColors[type]}`}>
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div className={`mr-3 ${textColors[type]}`}>
          {message}
        </div>
        <button 
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};