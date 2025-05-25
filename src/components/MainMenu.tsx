import React from 'react';
import { ChevronRight, Calculator, Award, BarChart3, MessageSquare, BookOpen } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const menuOptions = [
    {
      id: 'endSem',
      title: 'Calculate EndSem Mark  📊',
      subtitle: 'Check what you need to score for that grade',
      icon: <Calculator className="w-7 h-7 text-blue-500 transition-colors duration-200 group-hover:text-blue-700" />,
      color: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      id: 'gpa',
      title: 'Semester GPA Checker 🎯',
      subtitle: 'See where you stand this sem',
      icon: <Award className="w-7 h-7 text-green-500 transition-colors duration-200 group-hover:text-green-700" />,
      color: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-800'
    },
    {
      id: 'cgpa',
      title: 'Overall CGPA Tracker 📈',
      subtitle: 'Your academic journey so far',
      icon: <BarChart3 className="w-7 h-7 text-purple-500 transition-colors duration-200 group-hover:text-purple-700" />,
      color: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-800'
    },
    {
      id: 'queries',
      title: 'Queries? Ask Away! 💭',
      subtitle: 'Slide into the inbox with your questions.',
      icon: <MessageSquare className="w-7 h-7 text-orange-500 transition-colors duration-200 group-hover:text-orange-700" />,
      color: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      id: 'history',
      title: 'Calculation History 📜',
      subtitle: 'View your past calculations',
      icon: <BookOpen className="w-7 h-7 text-yellow-500 transition-colors duration-200 group-hover:text-yellow-700" />,
      color: 'bg-yellow-50 hover:bg-yellow-100',
      textColor: 'text-yellow-800'
    }
  ];

  return (
    <div className="min-h-screen flex items-start pt-8 sm:items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-20 xl:py-28">
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-10 lg:mb-16 xl:mb-20">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight">
            Welcome to Grade Guide!
          </h2>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-blue-800 font-medium">
            Let's crush those grades! 💪
          </p>
        </div>
        
        {/* Main grid container */}
        <div className="max-w-6xl mx-auto">
          {/* First row: first 3 options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            {menuOptions.slice(0,3).map((option, index) => (
              <div key={option.id} className="flex justify-center">
                <button
                  onClick={() => onNavigate(option.id)}
                  className={`w-full max-w-md lg:max-w-none lg:w-full flex items-center justify-between p-5 sm:p-6 lg:p-7 rounded-xl shadow-lg ${option.color} transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] group`}
                >
                  <div className="flex items-center">
                    <div className="mr-4 lg:mr-5">
                      {React.cloneElement(option.icon, {
                        className: `${option.icon.props.className} transform group-hover:scale-110 transition-transform duration-300`
                      })}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-base lg:text-lg font-semibold ${option.textColor} leading-tight`}>
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-sm lg:text-[0.9375rem] mt-1.5 leading-snug">
                        {option.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            ))}
          </div>
          
          {/* Second row: last 2 options - centered */}
          <div className="mt-6 sm:mt-8 lg:mt-10 xl:mt-12 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 w-full max-w-4xl">
              {menuOptions.slice(3).map(option => (
                <button
                  key={option.id}
                  onClick={() => onNavigate(option.id)}
                  className={`w-full flex items-center justify-between p-5 sm:p-6 lg:p-7 rounded-xl shadow-lg ${option.color} transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] group`}
                >
                  <div className="flex items-center">
                    <div className="mr-4 lg:mr-5">
                      {React.cloneElement(option.icon, {
                        className: `${option.icon.props.className} transform group-hover:scale-110 transition-transform duration-300`
                      })}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-base lg:text-lg font-semibold ${option.textColor} leading-tight`}>
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-sm lg:text-[0.9375rem] mt-1.5 leading-snug">
                        {option.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;