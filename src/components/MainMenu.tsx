import React from 'react';
import { ChevronRight, Calculator, Award, BarChart3, MessageSquare } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const menuOptions = [
    {
      id: 'endSem',
      title: 'End Sem Mark Calculator 📊',
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
      title: 'Got Questions ? Ask Away! 💭',
      subtitle: 'We got your back, fam',
      icon: <MessageSquare className="w-7 h-7 text-orange-500" />,
      color: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-800'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-center text-blue-900 mb-8">
          Welcome to Grade Guide! <br></br><span className='text-xl font-semibold'>Let's crush those grades!💪</span>
        </h2>
        
        <div className="space-y-4">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onNavigate(option.id)}
              className={`w-full flex items-center justify-between p-5 rounded-lg shadow-sm ${option.color} transition-all duration-300 ease-in-out transform hover:shadow-md hover:translate-x-1`}
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