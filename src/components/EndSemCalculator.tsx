import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { calculateInternalMark, calculateRequiredEndSemMark } from '../utils/calculationUtils';
import { Toast } from './Toast';
import UserDetailsModal from './UserDetailsModal';

interface EndSemCalculatorProps {
  onBack: () => void;
}

const EndSemCalculator: React.FC<EndSemCalculatorProps> = ({ onBack }) => {
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(true);
  const [userDetails, setUserDetails] = useState<{ name: string; year: string; department: string } | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [internal1, setInternal1] = useState('');
  const [internal2, setInternal2] = useState('');
  const [internal3, setInternal3] = useState('');
  const [assignment, setAssignment] = useState('');
  const [courseType, setCourseType] = useState('theory');
  const [internalMark, setInternalMark] = useState<number | null>(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [requiredMark, setRequiredMark] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [step, setStep] = useState(1);
  const [practicalMark, setPracticalMark] = useState('');
  const [nptelMark, setNptelMark] = useState('');
  const [labInternal, setLabInternal] = useState('');
  const [labExternal, setLabExternal] = useState('');
  const [isGradeCalculated, setIsGradeCalculated] = useState(false);
  const [displayedGrade, setDisplayedGrade] = useState('');
  const [displayedRequiredMark, setDisplayedRequiredMark] = useState<number | null>(null);
  const [nptelAssignment1, setNptelAssignment1] = useState('');
  const [nptelAssignment2, setNptelAssignment2] = useState('');
  const [nptelAssignment3, setNptelAssignment3] = useState('');
  const [nptelAssignment4, setNptelAssignment4] = useState('');
  const [nptelAssignment5, setNptelAssignment5] = useState('');
  const [nptelAssignment6, setNptelAssignment6] = useState('');
  const [nptelAssignment7, setNptelAssignment7] = useState('');
  const [nptelAssignment8, setNptelAssignment8] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // map numeric year to Roman numerals for display
  const yearMap: Record<string, string> = { '1': 'I', '2': 'II', '3': 'III', '4': 'IV' };
  const formattedYear = userDetails ? yearMap[userDetails.year] || userDetails.year : '';

  useEffect(() => {
    // Check if user details exist in localStorage
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
    // After user details are submitted, set the course type
    if (selectedOption) {
      setCourseType(selectedOption);
      setSelectedOption(null);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (!userDetails) {
      setSelectedOption(option);
      setShowUserDetailsModal(true);
    } else {
      setCourseType(option);
    }
  };

  const handleCalculateInternal = () => {
    if (!userDetails) {
      setShowUserDetailsModal(true);
      return;
    }

    if (!subjectName) {
      setToastMessage('Please enter subject name');
      setShowToast(true);
      return;
    }

    switch (courseType) {
      case 'theory':
        if (!internal1 || !internal2 || !internal3 || !assignment) {
          setToastMessage('Please fill all required fields');
          setShowToast(true);
          return;
        }
        const int1 = parseFloat(internal1);
        const int2 = parseFloat(internal2);
        const int3 = parseFloat(internal3);
        const assign = parseFloat(assignment);
        
        if (int1 > 75 || int2 > 75 || int3 > 50 || assign > 50) {
          setToastMessage('Please enter valid marks (Internal 1 & 2: 0-75, Internal 3 & Assignment: 0-50)');
          setShowToast(true);
          return;
        }

        const totalInternalMarks = int1 + int2 + int3 + assign;
        const maxTheoryMarks = 75 + 75 + 50 + 50;
        const theoryInternal = (totalInternalMarks / maxTheoryMarks) * 40;
        
        setInternalMark(theoryInternal);
        break;

      case 'theoryCumLab':
        if (!internal1 || !internal2 || !internal3 || !assignment || !practicalMark) {
          setToastMessage('Please fill all required fields');
          setShowToast(true);
          return;
        }
        const int1Lab = parseFloat(internal1);
        const int2Lab = parseFloat(internal2);
        const int3Lab = parseFloat(internal3);
        const assignLab = parseFloat(assignment);
        const pracMark = parseFloat(practicalMark);
        
        if (int1Lab > 75 || int2Lab > 75 || int3Lab > 50 || assignLab > 50 || pracMark > 50) {
          setToastMessage('Please enter valid marks (Internal 1 & 2: 0-75, Internal 3 & Assignment & Practical: 0-50)');
          setShowToast(true);
          return;
        }

        const totalTheoryMarks = int1Lab + int2Lab + int3Lab + assignLab;
        const maxTheoryLabMarks = 75 + 75 + 50 + 50;
        const theoryComponent = (totalTheoryMarks / maxTheoryLabMarks) * 25;

        const practicalComponent = (pracMark / 50) * 25;

        const internalLab = theoryComponent + practicalComponent;
        setInternalMark(internalLab);
        break;

      case 'nptel':
        if (!nptelAssignment1 || !nptelAssignment2 || !nptelAssignment3 || !nptelAssignment4 || 
            !nptelAssignment5 || !nptelAssignment6 || !nptelAssignment7 || !nptelAssignment8) {
          setToastMessage('Please fill all assignment marks');
          setShowToast(true);
          return;
        }
        const assign1 = parseFloat(nptelAssignment1);
        const assign2 = parseFloat(nptelAssignment2);
        const assign3 = parseFloat(nptelAssignment3);
        const assign4 = parseFloat(nptelAssignment4);
        const assign5 = parseFloat(nptelAssignment5);
        const assign6 = parseFloat(nptelAssignment6);
        const assign7 = parseFloat(nptelAssignment7);
        const assign8 = parseFloat(nptelAssignment8);
        
        if (assign1 > 100 || assign2 > 100 || assign3 > 100 || assign4 > 100 || 
            assign5 > 100 || assign6 > 100 || assign7 > 100 || assign8 > 100) {
          setToastMessage('Please enter valid marks (0-100) for all assignments');
          setShowToast(true);
          return;
        }

        const totalAssignmentMarks = assign1 + assign2 + assign3 + assign4 + assign5 + assign6 + assign7 + assign8;
        const maxNptelMarks = 800; // 8 assignments * 100
        const nptelInternal = (totalAssignmentMarks / maxNptelMarks) * 25;
        
        setInternalMark(nptelInternal);
        break;

      case 'lab':
        if (!labInternal) {
          setToastMessage('Please enter internal lab mark');
          setShowToast(true);
          return;
        }
        const labInt = parseFloat(labInternal);
        if (labInt > 50) {
          setToastMessage('Please enter valid mark (0-50)');
          setShowToast(true);
          return;
        }
        // Convert internal mark from 50 to 25
        const labInternalConverted = (labInt / 50) * 25;
        setInternalMark(labInternalConverted);
        break;
    }
    setStep(2);
  };

  const handleCalculateRequired = () => {
    if (!selectedGrade) {
      setToastMessage('Please select a grade');
      setShowToast(true);
      return;
    }

    let minGrade = 0;
    switch (selectedGrade) {
      case 'pass': minGrade = 50; break;
      case 'B': minGrade = 51; break;
      case 'B+': minGrade = 61; break;
      case 'A': minGrade = 71; break;
      case 'A+': minGrade = 81; break;
      case 'O': minGrade = 91; break;
      default: minGrade = 50;
    }

    if (internalMark !== null) {
      let required = 0;
      
      if (courseType === 'nptel') {
        required = (minGrade - internalMark) / 0.75;
      } else if (courseType === 'lab') {
        required = (minGrade - internalMark) / 0.75;
      } else {
        required = calculateRequiredEndSemMark(internalMark, minGrade, courseType);
      }
      
      if (required > 100) {
        setToastMessage('You cannot achieve this grade. Please choose a lower grade.');
        setShowToast(true);
        setRequiredMark(null);
        setIsGradeCalculated(false);
      } else {
        const calculatedMark = Math.max(51, Math.ceil(required));
        setRequiredMark(calculatedMark);
        setDisplayedRequiredMark(calculatedMark);
        setDisplayedGrade(selectedGrade);
        setIsGradeCalculated(true);
      }
    }
  };

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
    setIsGradeCalculated(false);
  };

  const gradeOptions = [
    { value: 'pass', label: <span><span className="text-blue-600 font-semibold">Only Pass</span></span> },
    { value: 'B', label: <span><span className="text-blue-600 font-semibold">B</span> Grade</span> },
    { value: 'B+', label: <span><span className="text-blue-600 font-semibold">B+</span> Grade</span> },
    { value: 'A', label: <span><span className="text-blue-600 font-semibold">A</span> Grade</span> },
    { value: 'A+', label: <span><span className="text-blue-600 font-semibold">A+</span> Grade</span> },
    { value: 'O', label: <span><span className="text-blue-600 font-semibold">O</span> Grade</span> }
  ];

  if (showUserDetailsModal) {
    return (
      <UserDetailsModal
        isOpen={true}
        onClose={() => {
          setShowUserDetailsModal(false);
          setSelectedOption(null);
        }}
        onSubmit={handleUserDetailsSubmit}
        theme="blue"
      />
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg text-blue-600 hover:text-blue-800 transition-all duration-200 border border-blue-100 hover:border-blue-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Menu</span>
          </button>
          {/* {userDetails && (
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm font-medium">
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
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            End Sem Subject Mark Calculator
          </h2>

          {step === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    id="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Data Structures"
                  />
                </div>

                <div>
                  <label htmlFor="courseType" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Type
                  </label>
                  <select
                    id="courseType"
                    value={courseType}
                    onChange={(e) => handleOptionSelect(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="theory">Theory</option>
                    <option value="theoryCumLab">Theory cum Lab</option>
                    <option value="nptel">NPTEL</option>
                    <option value="lab">Lab Course</option>
                  </select>
                </div>

                {courseType === 'theory' && (
                  <>
                    <div>
                      <label htmlFor="internal1" className="block text-sm font-medium text-gray-700">
                        Internal 1 (out of 75)
                      </label>
                      <input
                        type="number"
                        id="internal1"
                        value={internal1}
                        onChange={(e) => setInternal1(e.target.value)}
                        min="0"
                        max="75"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="internal2" className="block text-sm font-medium text-gray-700">
                        Internal 2 (out of 75)
                      </label>
                      <input
                        type="number"
                        id="internal2"
                        value={internal2}
                        onChange={(e) => setInternal2(e.target.value)}
                        min="0"
                        max="75"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="internal3" className="block text-sm font-medium text-gray-700">
                        Internal 3 (out of 50)
                      </label>
                      <input
                        type="number"
                        id="internal3"
                        value={internal3}
                        onChange={(e) => setInternal3(e.target.value)}
                        min="0"
                        max="50"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="assignment" className="block text-sm font-medium text-gray-700">
                        Assignment (out of 50)
                      </label>
                      <input
                        type="number"
                        id="assignment"
                        value={assignment}
                        onChange={(e) => setAssignment(e.target.value)}
                        min="0"
                        max="50"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {courseType === 'theoryCumLab' && (
                  <>
                    <div>
                      <label htmlFor="internal1" className="block text-sm font-medium text-gray-700">
                        Internal 1 (out of 75)
                      </label>
                      <input
                        type="number"
                        id="internal1"
                        value={internal1}
                        onChange={(e) => setInternal1(e.target.value)}
                        min="0"
                        max="75"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="internal2" className="block text-sm font-medium text-gray-700">
                        Internal 2 (out of 75)
                      </label>
                      <input
                        type="number"
                        id="internal2"
                        value={internal2}
                        onChange={(e) => setInternal2(e.target.value)}
                        min="0"
                        max="75"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="internal3" className="block text-sm font-medium text-gray-700">
                        Internal 3 (out of 50)
                      </label>
                      <input
                        type="number"
                        id="internal3"
                        value={internal3}
                        onChange={(e) => setInternal3(e.target.value)}
                        min="0"
                        max="50"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="assignment" className="block text-sm font-medium text-gray-700">
                        Assignment (out of 50)
                      </label>
                      <input
                        type="number"
                        id="assignment"
                        value={assignment}
                        onChange={(e) => setAssignment(e.target.value)}
                        min="0"
                        max="50"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="practicalMark" className="block text-sm font-medium text-gray-700">
                        Practical Mark (out of 50)
                      </label>
                      <input
                        type="number"
                        id="practicalMark"
                        value={practicalMark}
                        onChange={(e) => setPracticalMark(e.target.value)}
                        min="0"
                        max="50"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {courseType === 'nptel' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nptelAssignment1" className="block text-sm font-medium text-gray-700">
                        Assignment 1 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment1"
                        value={nptelAssignment1}
                        onChange={(e) => setNptelAssignment1(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="nptelAssignment2" className="block text-sm font-medium text-gray-700">
                        Assignment 2 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment2"
                        value={nptelAssignment2}
                        onChange={(e) => setNptelAssignment2(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="nptelAssignment3" className="block text-sm font-medium text-gray-700">
                        Assignment 3 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment3"
                        value={nptelAssignment3}
                        onChange={(e) => setNptelAssignment3(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="nptelAssignment4" className="block text-sm font-medium text-gray-700">
                        Assignment 4 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment4"
                        value={nptelAssignment4}
                        onChange={(e) => setNptelAssignment4(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="nptelAssignment5" className="block text-sm font-medium text-gray-700">
                        Assignment 5 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment5"
                        value={nptelAssignment5}
                        onChange={(e) => setNptelAssignment5(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="nptelAssignment6" className="block text-sm font-medium text-gray-700">
                        Assignment 6 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment6"
                        value={nptelAssignment6}
                        onChange={(e) => setNptelAssignment6(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="nptelAssignment7" className="block text-sm font-medium text-gray-700">
                        Assignment 7 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment7"
                        value={nptelAssignment7}
                        onChange={(e) => setNptelAssignment7(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="nptelAssignment8" className="block text-sm font-medium text-gray-700">
                        Assignment 8 (out of 100)
                      </label>
                      <input
                        type="number"
                        id="nptelAssignment8"
                        value={nptelAssignment8}
                        onChange={(e) => setNptelAssignment8(e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {courseType === 'lab' && (
                  <div>
                    <label htmlFor="labInternal" className="block text-sm font-medium text-gray-700">
                      Internal Lab Mark (out of 50)
                    </label>
                    <input
                      type="number"
                      id="labInternal"
                      value={labInternal}
                      onChange={(e) => setLabInternal(e.target.value)}
                      min="0"
                      max="50"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleCalculateInternal}
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              >
                Calculate Internal Mark
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg text-blue-800">
                  Your internal mark is <span className="font-bold">{internalMark?.toFixed(2)}</span> out of {courseType === 'theory' ? '40' : courseType === 'theoryCumLab' ? '50' : courseType === 'lab' ? '25' : courseType === 'nptel' ? '25' : '100'}
                </p>
                {courseType === 'theory' && (
                  <p className="text-sm text-blue-600 mt-2">
                    {/* Note: Internal marks are calculated as (Internal 1 + 2 + 3 + Assignment) converted to a scale of 40 */}
                  </p>
                )}
                {courseType === 'theoryCumLab' && (
                  <p className="text-sm text-blue-600 mt-2">
                    {/* Note: Internal marks are calculated as (Theory component out of 25 + Practical component out of 25) */}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Which grade do you want to get in your end sem of the {subjectName}?
                </h3>
                <div className="space-y-2">
                  {gradeOptions.map((grade) => (
                    <label key={grade.value} className="block">
                      <input
                        type="radio"
                        name="grade"
                        value={grade.value}
                        checked={selectedGrade === grade.value}
                        onChange={() => handleGradeChange(grade.value)}
                        className="text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span>{grade.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCalculateRequired}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              >
                Calculate Required Mark
              </button>

              {requiredMark !== null && isGradeCalculated && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-lg text-green-800 text-center">
                    {courseType === 'nptel' ? (
                      <>
                        To get <span className="font-bold">{displayedGrade.toUpperCase()}</span> in {subjectName},
                        you need to score at least <span className="font-bold">{displayedRequiredMark?.toFixed(2)}</span> in your external exam
                      </>
                    ) : courseType === 'lab' ? (
                      <>
                        To get <span className="font-bold">{displayedGrade.toUpperCase()}</span> in {subjectName},
                        you need to score at least <span className="font-bold">{displayedRequiredMark?.toFixed(2)}</span> in your external exam
                      </>
                    ) : (
                      <>
                        To get that <span className="font-bold">{displayedGrade.toUpperCase()}</span> in <span className='font-bold'>{subjectName}</span>, you need to score at least <span className="font-bold">{displayedRequiredMark}</span> in your EndSem!
                      </>
                    )}
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setStep(1);
                  setSelectedGrade('');
                  setRequiredMark(null);
                  setInternal1('');
                  setInternal2('');
                  setInternal3('');
                  setAssignment('');
                  setPracticalMark('');
                  setNptelAssignment1('');
                  setNptelAssignment2('');
                  setNptelAssignment3('');
                  setNptelAssignment4('');
                  setNptelAssignment5('');
                  setNptelAssignment6('');
                  setNptelAssignment7('');
                  setNptelAssignment8('');
                  setLabInternal('');
                  setLabExternal('');
                }}
                className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
              >
                Calculate For Another Subject
              </button>
            </>
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

export default EndSemCalculator;