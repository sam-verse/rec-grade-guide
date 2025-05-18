import React, { useState } from 'react';
import { ArrowLeft, Plus, X, MoreVertical } from 'lucide-react';
import { calculateGradePoint, calculateGPA } from '../utils/calculationUtils';
import { Toast } from './Toast';
import { Subject } from '../types';
import ResultsPopup from './ResultsPopup';

interface GpaCalculatorProps {
  onBack: () => void;
}

const GpaCalculator: React.FC<GpaCalculatorProps> = ({ onBack }) => {
  const [subjects, setSubjects] = useState<Subject[]>([{ 
    id: Date.now(),
    name: '', 
    internal1: '', 
    internal2: '', 
    assignment: '', 
    courseType: 'theory', 
    credit: '',
    endSem: '',
    practicalMark: '',
    isNPTEL: false,
    isFullLab: false,
    totalMark: null,
    grade: '',
    gradePoint: null
  }]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [gpaResult, setGpaResult] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const addSubject = () => {
    setSubjects([...subjects, { 
      id: Date.now(),
      name: '', 
      internal1: '', 
      internal2: '', 
      assignment: '', 
      courseType: 'theory', 
      credit: '',
      endSem: '',
      practicalMark: '',
      isNPTEL: false,
      isFullLab: false,
      totalMark: null,
      grade: '',
      gradePoint: null
    }]);
  };

  const updateSubjectType = (id: number, type: string) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        switch (type) {
          case 'theory':
            return { ...subject, courseType: 'theory', isNPTEL: false, isFullLab: false };
          case 'nptel':
            return { ...subject, courseType: 'nptel', isNPTEL: true, isFullLab: false };
          case 'fullLab':
            return { ...subject, courseType: 'fullLab', isNPTEL: false, isFullLab: true };
          case 'theoryCumLab':
            return { ...subject, courseType: 'theoryCumLab', isNPTEL: false, isFullLab: false };
          default:
            return subject;
        }
      }
      return subject;
    }));
  };

  const removeSubject = (id: number) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    } else {
      setToastMessage('At least one subject is required');
      setShowToast(true);
    }
  };

  const updateSubject = (id: number, field: string, value: string) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const calculateResults = () => {
    // Validate inputs
    const isValid = subjects.every(subject => {
      if (subject.isNPTEL) {
        return subject.name && subject.internal1 && subject.credit;
      }
      if (subject.isFullLab) {
        return subject.name && subject.internal1 && subject.endSem && subject.credit;
      }
      const basicFields = subject.name && subject.internal1 && subject.internal2 && subject.assignment && subject.credit && subject.endSem;
      if (subject.courseType === 'theoryCumLab') {
        return basicFields && subject.practicalMark;
      }
      return basicFields;
    });

    if (!isValid) {
      setToastMessage('Please fill all required fields for all subjects');
      setShowToast(true);
      return;
    }

    // Calculate total marks, grades and grade points for each subject
    const calculatedSubjects = subjects.map(subject => {
      let totalMark: number;

      if (subject.isNPTEL) {
        // For NPTEL, just use the direct mark
        totalMark = parseFloat(subject.internal1);
      } else if (subject.isFullLab) {
        // For Lab course, combine internal (25) and end practical (75)
        const internalPractical = parseFloat(subject.internal1);
        const endPractical = parseFloat(subject.endSem);
        totalMark = internalPractical + endPractical;
      } else {
        // For regular theory/theory-cum-lab courses
        const internal1 = parseFloat(subject.internal1);
        const internal2 = parseFloat(subject.internal2);
        const assignment = parseFloat(subject.assignment);
        const endSem = parseFloat(subject.endSem || '0');
        const practicalMark = subject.practicalMark ? parseFloat(subject.practicalMark) : undefined;
        
        const x = internal1 + internal2 + assignment;
        if (subject.courseType === 'theory') {
          totalMark = (x/5) + (endSem * 0.6);
        } else {
          // Theory cum Lab
          totalMark = (x/8) + (practicalMark! / 2) + (endSem * 0.5);
        }
      }
      
      const grade = determineGrade(totalMark);
      const gradePoint = calculateGradePoint(grade);
      
      return {
        ...subject,
        totalMark,
        grade,
        gradePoint
      };
    });

    setSubjects(calculatedSubjects);
    
    // Calculate GPA
    const gpa = calculateGPA(calculatedSubjects);
    setGpaResult(gpa);
    setShowResults(true);
  };

  const determineGrade = (totalMark: number): string => {
    if (totalMark >= 91) return 'O';
    if (totalMark >= 81) return 'A+';
    if (totalMark >= 71) return 'A';
    if (totalMark >= 61) return 'B+';
    if (totalMark >= 51) return 'B';
    return 'U';
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-xl mx-auto mt-4">
      <button
          onClick={onBack}
          className="flex items-center bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg text-green-600 hover:text-green-800 mb-6 transition-all duration-200 border border-green-100 hover:border-green-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-medium">Back to Menu</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Semester GPA Calculator
          </h2>

          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div 
                key={subject.id} 
                className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Subject {index + 1}
                    </h3>
                    <button
                      onClick={() => removeSubject(subject.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                        className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter subject name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject Credit
                        </label>
                        <input
                          type="number"
                          value={subject.credit}
                          onChange={(e) => updateSubject(subject.id, 'credit', e.target.value)}
                          min="1"
                          max="5"
                          className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course Type
                        </label>
                        <select
                          value={subject.courseType}
                          onChange={(e) => updateSubjectType(subject.id, e.target.value)}
                          className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="theory">Theory</option>
                          <option value="theoryCumLab">Theory cum Lab</option>
                          <option value="nptel">NPTEL Course</option>
                          <option value="fullLab">Lab Course</option>
                        </select>
                      </div>
                    </div>

                    {subject.isNPTEL ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NPTEL Mark (out of 100)
                        </label>
                        <input
                          type="number"
                          value={subject.internal1}
                          onChange={(e) => updateSubject(subject.id, 'internal1', e.target.value)}
                          min="0"
                          max="100"
                          className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    ) : subject.isFullLab ? (
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Internal Practical (out of 25)
                          </label>
                          <input
                            type="number"
                            value={subject.internal1}
                            onChange={(e) => updateSubject(subject.id, 'internal1', e.target.value)}
                            min="0"
                            max="25"
                            className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Practical (out of 75)
                          </label>
                          <input
                            type="number"
                            value={subject.endSem}
                            onChange={(e) => updateSubject(subject.id, 'endSem', e.target.value)}
                            min="0"
                            max="75"
                            className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CAT 1 (out of 75)
                            </label>
                            <input
                              type="number"
                              value={subject.internal1}
                              onChange={(e) => updateSubject(subject.id, 'internal1', e.target.value)}
                              min="0"
                              max="75"
                              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CAT 2 (out of 75)
                            </label>
                            <input
                              type="number"
                              value={subject.internal2}
                              onChange={(e) => updateSubject(subject.id, 'internal2', e.target.value)}
                              min="0"
                              max="75"
                              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Assignment (out of 50)
                            </label>
                            <input
                              type="number"
                              value={subject.assignment}
                              onChange={(e) => updateSubject(subject.id, 'assignment', e.target.value)}
                              min="0"
                              max="50"
                              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Sem Mark (out of 100)
                            </label>
                            <input
                              type="number"
                              value={subject.endSem}
                              onChange={(e) => updateSubject(subject.id, 'endSem', e.target.value)}
                              min="0"
                              max="100"
                              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>

                        {subject.courseType === 'theoryCumLab' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Practical Mark (out of 50)
                            </label>
                            <input
                              type="number"
                              value={subject.practicalMark}
                              onChange={(e) => updateSubject(subject.id, 'practicalMark', e.target.value)}
                              min="0"
                              max="50"
                              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700 bg-green-50 p-4 rounded-lg border border-green-100">
                      Course Type: {subject.isNPTEL ? 'NPTEL Course' : subject.isFullLab ? 'Lab Course' : subject.courseType === 'theory' ? 'Theory' : 'Theory cum Lab'}
                    </p>
                  </div>

                  {subject.totalMark !== null && (
                    <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Total Mark</p>
                          <p className="text-xl font-semibold text-green-700">{subject.totalMark.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Grade</p>
                          <p className={`text-xl font-semibold ${subject.grade === 'FAIL' ? 'text-red-600' : 'text-green-700'}`}>
                            {subject.grade}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Grade Point</p>
                          <p className="text-xl font-semibold text-green-700">{subject.gradePoint}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={addSubject}
              className="w-full bg-white text-green-600 py-3 px-4 rounded-lg hover:bg-green-50 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 font-medium"
            >
              <div className="flex items-center justify-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Subject
              </div>
            </button>

            <button
              onClick={calculateResults}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 font-medium"
            >
              Calculate GPA
            </button>
          </div>

          {gpaResult !== null && (
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 text-center">
              <h3 className="text-2xl font-bold text-green-900 mb-3">
                Your Semester GPA
              </h3>
              <p className="text-4xl font-bold text-green-700">
                {gpaResult.toFixed(2)}
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

      {showResults && gpaResult !== null && (
        <ResultsPopup
          subjects={subjects}
          gpa={gpaResult}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default GpaCalculator;