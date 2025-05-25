import React from 'react';
import { ChevronRight, Calculator, Award, BarChart3, MessageSquare } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const menuOptions = [
    {
      id: 'endSem',
      title: 'Calculate EndSem Mark  📊',
      subtitle: 'Check what you need to score for that grade',
      icon: <Calculator className="w-7 h-7 text-blue-500" />,
      color: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      id: 'gpa',
      title: 'Semester GPA Checker 🎯',
      subtitle: 'See where you stand this sem',
      icon: <Award className="w-7 h-7 text-green-500" />,
      color: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-800'
    },
    {
      id: 'cgpa',
      title: 'Overall CGPA Tracker 📈',
      subtitle: 'Your academic journey so far',
      icon: <BarChart3 className="w-7 h-7 text-purple-500" />,
      color: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-800'
    },
    {
      id: 'queries',
      title: 'Queries? Ask Away! 💭',
      subtitle: 'Slide into the inbox with your questions.',
      icon: <MessageSquare className="w-7 h-7 text-orange-500" />,
      color: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-800'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-5xl px-4 py-16 lg:py-24 transform -translate-y-12">
        <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-center text-blue-900 mb-6 font-bold">
          Welcome to Grade Guide! <br></br><span className='text-xl font-semibold'>Let's crush those grades!💪</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onNavigate(option.id)}
              className={`max-w-xs w-full flex items-center justify-between p-4 sm:p-6 rounded-lg shadow-lg ${option.color} transition-none md:transition-transform duration-300 ease-out md:hover:shadow-2xl md:hover:scale-105 ${option.id === 'queries' ? 'lg:col-start-2' : ''}`}
            >
              <div className="flex items-center">
                <div className="mr-5">
                  {option.icon}
                </div>
                <div className="text-left">
                  <h3 className={`text-base font-semibold ${option.textColor}`}>{option.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{option.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;