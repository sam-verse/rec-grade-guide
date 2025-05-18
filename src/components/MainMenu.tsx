import React from 'react';
import { ChevronRight, Calculator, Award, BarChart3, MessageSquare } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const menuOptions = [
    {
      id: 'endSem',
      title: '1 - Calculate End Sem Mark with Internals',
      subtitle: 'For a single subject',
      icon: <Calculator className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      id: 'gpa',
      title: '2 - Calculate Semester GPA',
      subtitle: 'Approximation of GPA for this semester',
      icon: <Award className="w-6 h-6 text-green-500" />,
      color: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-800'
    },
    {
      id: 'cgpa',
      title: '3 - Calculate CGPA',
      subtitle: 'Based on all semester GPAs',
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
      color: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-800'
    },
    {
      id: 'queries',
      title: '4 - Submit a Query',
      subtitle: 'Have questions? Ask us!',
      icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
      color: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-800'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
          Welcome to the <br></br>Grade Guide Calculator
        </h2>
        
        <div className="space-y-4">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onNavigate(option.id)}
              className={`w-full flex items-center justify-between p-5 rounded-lg shadow-sm ${option.color} transition-all duration-300 ease-in-out transform hover:shadow-md hover:translate-x-1`}
            >
              <div className="flex items-center">
                <div className="mr-4">
                  {option.icon}
                </div>
                <div className="text-left">
                  <h3 className={`font-semibold ${option.textColor}`}>{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.subtitle}</p>
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