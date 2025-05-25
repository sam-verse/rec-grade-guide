import React from 'react';

interface LoginButtonProps {
  isLoggedIn: boolean;
  onLogin: (isLoggedIn: boolean) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoggedIn, onLogin }) => {
  const handleClick = () => {
    onLogin(!isLoggedIn);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md text-white font-medium transition-all duration-200 ${
        isLoggedIn 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
};

export default LoginButton; 