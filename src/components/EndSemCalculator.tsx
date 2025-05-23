import React, { useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { calculateInternalMark, calculateRequiredEndSemMark } from '../utils/calculationUtils';
import { Toast } from './Toast';

interface EndSemCalculatorProps {
  onBack: () => void;
}

const EndSemCalculator: React.FC<EndSemCalculatorProps> = ({ onBack }) => {
  const [subjectName, setSubjectName] = useState('');
  const [internal1, setInternal1] = useState('');
  const [internal2, setInternal2] = useState('');
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

  const handleCalculateInternal = () => {
    if (!subjectName) {
      setToastMessage('Please enter subject name');
      setShowToast(true);
      return;
    }

    switch (courseType) {
      case 'theory':
        if (!internal1 || !internal2 || !assignment) {
          setToastMessage('Please fill all required fields');
          setShowToast(true);
          return;
        }
        const int1 = parseFloat(internal1);
        const int2 = parseFloat(internal2);
        const assign = parseFloat(assignment);
        if (int1 > 75 || int2 > 75 || assign > 50) {
          setToastMessage('Please enter valid marks (Internal: 0-75, Assignment: 0-50)');
          setShowToast(true);
          return;
        }
        const internal = calculateInternalMark(int1, int2, assign, courseType, 0, 0);
        setInternalMark(internal);
        break;

      case 'theoryCumLab':
        if (!internal1 || !internal2 || !assignment || !practicalMark) {
          setToastMessage('Please fill all required fields');
          setShowToast(true);
          return;
        }
        const int1Lab = parseFloat(internal1);
        const int2Lab = parseFloat(internal2);
        const assignLab = parseFloat(assignment);
        const pracMark = parseFloat(practicalMark);
        if (int1Lab > 75 || int2Lab > 75 || assignLab > 50 || pracMark > 50) {
          setToastMessage('Please enter valid marks (Internal: 0-75, Assignment: 0-50, Practical: 0-50)');
          setShowToast(true);
          return;
        }
        const internalLab = ((int1Lab + int2Lab + assignLab) / 8) + (pracMark / 2);
        setInternalMark(internalLab);
        break;

      case 'nptel':
        if (!nptelMark) {
          setToastMessage('Please enter NPTEL mark');
          setShowToast(true);
          return;
        }
        const nptel = parseFloat(nptelMark);
        if (nptel > 100) {
          setToastMessage('Please enter valid mark (0-100)');
          setShowToast(true);
          return;
        }
        setInternalMark(nptel);
        break;

      case 'lab':
        if (!labInternal || !labExternal) {
          setToastMessage('Please fill all required fields');
          setShowToast(true);
          return;
        }
        const labInt = parseFloat(labInternal);
        const labExt = parseFloat(labExternal);
        if (labInt > 25 || labExt > 75) {
          setToastMessage('Please enter valid marks (Internal: 0-25, External: 0-75)');
          setShowToast(true);
          return;
        }
        const labTotal = labInt + labExt;
        setInternalMark(labTotal);
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
        required = minGrade;
      } else if (courseType === 'lab') {
        required = minGrade - internalMark;
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

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-xl mx-auto mt-4">
        <button
          onClick={onBack}
          className="flex items-center bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg text-blue-600 hover:text-blue-800 mb-6 transition-all duration-200 border border-blue-100 hover:border-blue-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-medium">Back to Menu</span>
        </button>

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
                    onChange={(e) => setCourseType(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="theory">Theory</option>
                    <option value="theoryCumLab">Theory cum Lab</option>
                   {/* <option value="nptel">NPTEL</option> */}
                    {/* <option value="lab">Lab Course</option> */}
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
                  <div>
                    <label htmlFor="nptelMark" className="block text-sm font-medium text-gray-700">
                      NPTEL Mark (out of 100)
                    </label>
                    <input
                      type="number"
                      id="nptelMark"
                      value={nptelMark}
                      onChange={(e) => setNptelMark(e.target.value)}
                      min="0"
                      max="100"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {courseType === 'lab' && (
                  <>
                    <div>
                      <label htmlFor="labInternal" className="block text-sm font-medium text-gray-700">
                        Internal Lab Mark (out of 25)
                      </label>
                      <input
                        type="number"
                        id="labInternal"
                        value={labInternal}
                        onChange={(e) => setLabInternal(e.target.value)}
                        min="0"
                        max="25"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="labExternal" className="block text-sm font-medium text-gray-700">
                        External Lab Mark (out of 75)
                      </label>
                      <input
                        type="number"
                        id="labExternal"
                        value={labExternal}
                        onChange={(e) => setLabExternal(e.target.value)}
                        min="0"
                        max="75"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
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
                  Your internal mark is <span className="font-bold">{internalMark}</span> out of {courseType === 'theory' ? '40' : courseType === 'theoryCumLab' ? '50' : courseType === 'lab' ? '100' : '100'}
                </p>
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
                      `Your NPTEL score of ${internalMark} is giving you ${displayedGrade.toUpperCase()} vibes ✨`
                    ) : courseType === 'lab' ? (
                      `Your lab score of ${internalMark} is totally ${displayedGrade.toUpperCase()} material 🔥`
                    ) : (
                      <>
                        To get that <span className="font-bold">{displayedGrade.toUpperCase()}</span> in <span className='font-bold'>{subjectName}</span>, you need to score at least <span className="font-bold">{displayedRequiredMark}</span> in your EndSem! Let's go! 💪
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
                  setAssignment('');
                  setPracticalMark('');
                  setNptelMark('');
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