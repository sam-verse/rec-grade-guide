import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { calculateCGPA } from '../utils/calculationUtils';
import { Toast } from './Toast';
import { Semester } from '../types';
import UserDetailsModal from './UserDetailsModal';
import { useAppContext } from '../context/AppContext';

interface CgpaCalculatorProps {
  onBack: () => void;
}

const CgpaCalculator: React.FC<CgpaCalculatorProps> = ({ onBack }) => {
  const { addHistory } = useAppContext();
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(true);
  const [userDetails, setUserDetails] = useState<{ name: string; year: string; department: string } | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([{ 
    id: Date.now(),
    semesterNumber: 1,
    gpa: '',
    credits: ''
  }]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cgpaResult, setCgpaResult] = useState<number | null>(null);

  useEffect(() => {
    const savedDetails = localStorage.getItem('userDetails');
    if (savedDetails) {
      const d = JSON.parse(savedDetails);
      setUserDetails({ name: d.name, department: d.department, year: d.yearOfStudy });
      setShowUserDetailsModal(false);
    }
  }, []);

  const handleUserDetailsSubmit = (details: { name: string; department: string; yearOfStudy: string }) => {
    setUserDetails({ name: details.name, department: details.department, year: details.yearOfStudy });
    setShowUserDetailsModal(false);
    // Save to localStorage
    localStorage.setItem('userDetails', JSON.stringify(details));
  };

  // map numeric year to Roman numerals
  const yearMap: Record<string, string> = { '1': 'I', '2': 'II', '3': 'III', '4': 'IV' };
  const formattedYear = userDetails ? yearMap[userDetails.year] || userDetails.year : '';

  // If modal is open, render only the modal
  if (showUserDetailsModal) {
    return (
      <UserDetailsModal
        isOpen={true}
        onClose={() => {
          setShowUserDetailsModal(false);
        }}
        onSubmit={handleUserDetailsSubmit}
        theme="purple"
      />
    );
  }

  const addSemester = () => {
    setSemesters([...semesters, { 
      id: Date.now(),
      semesterNumber: semesters.length + 1,
      gpa: '',
      credits: ''
    }]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      const newSemesters = semesters.filter(semester => semester.id !== id);
      // Update semester numbers
      newSemesters.forEach((semester, index) => {
        semester.semesterNumber = index + 1;
      });
      setSemesters(newSemesters);
    } else {
      setToastMessage('At least one semester is required');
      setShowToast(true);
    }
  };

  const updateSemester = (id: number, field: string, value: string) => {
    setSemesters(semesters.map(semester => 
      semester.id === id ? { ...semester, [field]: value } : semester
    ));
  };

  const calculateResults = () => {
    // Validate inputs
    const isValid = semesters.every(semester => 
      semester.gpa && semester.credits
    );

    if (!isValid) {
      setToastMessage('Please fill all fields for all semesters');
      setShowToast(true);
      return;
    }

    // Validate GPA range
    const validGpa = semesters.every(semester => {
      const gpa = parseFloat(semester.gpa);
      return gpa >= 0 && gpa <= 10;
    });

    if (!validGpa) {
      setToastMessage('GPA must be between 0 and 10');
      setShowToast(true);
      return;
    }

    // Calculate CGPA
    const cgpa = calculateCGPA(semesters);
    setCgpaResult(cgpa);
    // record history entry for CGPA
    addHistory({
      id: Date.now().toString(),
      view: 'cgpa',
      inputs: semesters,
      result: cgpa,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-2xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg text-purple-600 hover:text-purple-800 transition-all duration-200 border border-purple-100 hover:border-purple-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Menu</span>
          </button>
          {/* {userDetails && (
            <div className="flex items-center">
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm font-medium">
                <span>{userDetails.name.toUpperCase()}</span>
                <span className="font-bold">•</span>
                <span>{userDetails.department.toUpperCase()}</span>
                <span className="font-bold">•</span>
                <span>{formattedYear}</span>
              </div>
            </div>
          )} */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">
            CGPA Calculator
          </h2>

          <div className="space-y-4">
            {semesters.map((semester) => (
              <div key={semester.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Semester {semester.semesterNumber}
                  </h3>
                  <button
                    onClick={() => removeSemester(semester.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      GPA
                    </label>
                    <input
                      type="number"
                      value={semester.gpa}
                      onChange={(e) => updateSemester(semester.id, 'gpa', e.target.value)}
                      step="0.01"
                      min="0"
                      max="10"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="0.00 - 10.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Credits
                    </label>
                    <input
                      type="number"
                      value={semester.credits}
                      onChange={(e) => updateSemester(semester.id, 'credits', e.target.value)}
                      min="1"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g. 24"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

            <div className="mt-6 flex flex-row gap-4 justify-center">
                <button
                onClick={addSemester}
                className="flex items-center justify-center bg-white text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 border-2 border-purple-600 font-medium text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 w-auto"
                >
                <Plus className="w-4 h-4 mr-1" />
                Add Semester
                </button>

                <button
                onClick={calculateResults}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 font-medium text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 w-auto"
                >
                Calculate CGPA
                </button>
            </div>

          {cgpaResult !== null && (
            <div className="mt-6 p-6 bg-purple-50 rounded-lg border border-purple-200 text-center">
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                Your Cumulative GPA (CGPA)
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {cgpaResult.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
          type="error" 
        />
      )}
    </div>
  );
};

export default CgpaCalculator;