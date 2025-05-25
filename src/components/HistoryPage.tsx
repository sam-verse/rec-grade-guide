import React, { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HistoryPageProps {
  onBack: () => void;
}

interface EndSemInputs {
  subjectName?: string;
  courseType?: string;
  internal1?: string | number;
  internal2?: string | number;
  internal3?: string | number;
  assignment?: string | number;
  selectedGrade?: string;
  nptelMark?: string | number;
  labInternal?: string | number;
  labExternal?: string | number;
  practical?: string | number;
  nptelAssignment1?: string | number;
  nptelAssignment2?: string | number;
  nptelAssignment3?: string | number;
  nptelAssignment4?: string | number;
  nptelAssignment5?: string | number;
  nptelAssignment6?: string | number;
  nptelAssignment7?: string | number;
  nptelAssignment8?: string | number;
  [key: string]: any; // For dynamic access
}

const viewLabels: Record<string, string> = { gpa: 'GPA', cgpa: 'CGPA', endSem: 'End-Sem' };

const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
  const { history, clearHistory } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'gpa' | 'cgpa' | 'endSem'>('all');

  const formattedHistory = useMemo(() => {
    const filtered = history.filter(item => 
      filter === 'all' ? true : item.view === filter
    );
    
    return filtered.map(item => ({
      ...item,
      date: new Date(item.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    }));
  }, [history, filter]);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center bg-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md text-yellow-600 hover:text-yellow-700 transition-all duration-200 border border-yellow-100 hover:border-yellow-200 hover:scale-[1.02] active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-medium">Back to Menu</span>
            </button>
          </div>
          {history.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="all">Types</option>
                  <option value="gpa">GPA</option>
                  <option value="cgpa">CGPA</option>
                  <option value="endSem">EndSem</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="px-3 py-1.5 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-lg border border-yellow-100">
                {formattedHistory.length} {formattedHistory.length === 1 ? 'Entry' : 'Entries'}
              </div>
              <button
                onClick={clearHistory}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-xl hover:shadow-md transition-all duration-200 flex items-center"
                disabled={history.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>
          )}
        </div>
        
        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No history yet</h3>
            <p className="text-gray-500">Your calculation history will appear here</p>
            <button
              onClick={onBack}
              className="mt-4 inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Make your first calculation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {formattedHistory.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col h-full min-h-[300px]">
                <header className="flex justify-between items-center p-5 pb-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
                      item.view === 'gpa' ? 'bg-blue-500' : 
                      item.view === 'cgpa' ? 'bg-purple-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-500">{item.date}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.view === 'gpa' ? 'bg-blue-50 text-blue-700' : 
                    item.view === 'cgpa' ? 'bg-purple-50 text-purple-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {viewLabels[item.view] || item.view}
                  </span>
                </header>
                <section className="p-5 pt-4 text-sm text-gray-800 flex-grow flex flex-col">
                  {item.view === 'gpa' && (
                    <div className="flex flex-col h-full">
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm flex-grow flex flex-col">
                        <div className="overflow-y-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-50 sticky top-0 z-10">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-blue-700 uppercase tracking-wider">Credit</th>
                                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-blue-700 uppercase tracking-wider">Grade</th>
                                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-blue-700 uppercase tracking-wider">Points</th>
                                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-blue-700 uppercase tracking-wider">Marks</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {(item.inputs as any[]).map((subject, index) => (
                                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {subject.name || `Subject ${index + 1}`}
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-gray-600 font-medium">
                                    {subject.credit || '-'}
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap text-center">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      subject.grade === 'O' ? 'bg-green-100 text-green-800' :
                                      subject.grade === 'A+' ? 'bg-blue-100 text-blue-800' :
                                      subject.grade === 'A' ? 'bg-indigo-100 text-indigo-800' :
                                      subject.grade === 'B+' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {subject.grade || 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap text-sm text-center font-semibold text-blue-700">
                                    {subject.gradePoint !== undefined ? subject.gradePoint.toFixed(2) : '-'}
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-gray-600 font-medium">
                                    {subject.totalMark !== undefined ? `${subject.totalMark.toFixed(2)}%` : '-'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {item.result && (
                          <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-blue-700">Total Credits</p>
                                <p className="text-xl font-bold text-blue-900">
                                  {(item.inputs as any[]).reduce((sum, subj) => sum + (parseFloat(subj.credit) || 0), 0)}
                                </p>
                              </div>
                              <div className="h-12 w-px bg-blue-200"></div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-blue-700">Semester GPA</p>
                                <p className="text-2xl font-extrabold text-blue-900">
                                  {typeof item.result === 'number' ? item.result.toFixed(2) : item.result}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {item.view === 'cgpa' && (
                    <div className="space-y-4 flex-grow flex flex-col">
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-purple-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Semester</th>
                              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-purple-700 uppercase tracking-wider">Credits</th>
                              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-purple-700 uppercase tracking-wider">GPA</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {(item.inputs as any[]).map((semester, index) => {
                              // Extract GPA value from different possible formats
                              let gpaValue = 0;
                              if (typeof semester === 'number') {
                                gpaValue = semester;
                              } else if (semester && typeof semester === 'object' && 'gpa' in semester) {
                                gpaValue = Number(semester.gpa) || 0;
                              } else if (Array.isArray(semester)) {
                                gpaValue = semester.length > 0 ? Number(semester[0]) || 0 : 0;
                              }

                              const gpaColor = gpaValue >= 9 ? 'bg-green-100 text-green-800' :
                                             gpaValue >= 8 ? 'bg-blue-100 text-blue-800' :
                                             gpaValue >= 7 ? 'bg-indigo-100 text-indigo-800' :
                                             'bg-yellow-100 text-yellow-800';

                              return (
                                <tr key={index} className="hover:bg-purple-50/30 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Semester {index + 1}
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-purple-600 font-medium">
                                    {typeof semester === 'object' && semester.credits ? semester.credits : '-'}
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap text-center">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${gpaColor}`}>
                                      {typeof gpaValue === 'number' && !isNaN(gpaValue) ? gpaValue.toFixed(2) : '0.00'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {item.result && (
                        <div className="mt-4 p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-purple-700">Total Credits</p>
                              <p className="text-xl font-bold text-purple-900">
                                {(item.inputs as any[]).reduce((sum, sem) => {
                                  const credits = typeof sem === 'object' ? sem.credits : 0;
                                  return sum + (parseFloat(credits) || 0);
                                }, 0)}
                              </p>
                            </div>
                            <div className="h-12 w-px bg-purple-200"></div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-purple-700">Cumulative GPA</p>
                              <p className="text-2xl font-extrabold text-purple-900">
                                {(() => {
                                  const cgpaValue = typeof item.result === 'object' 
                                    ? item.result?.cgpa 
                                    : item.result;
                                  return typeof cgpaValue === 'number' 
                                    ? cgpaValue.toFixed(2) 
                                    : '0.00';
                                })()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {item.view === 'endSem' && (
                    <div className="space-y-4 flex-grow flex flex-col">
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-amber-100">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-amber-00 uppercase tracking-wider">Component</th>
                              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-amber-700 uppercase tracking-wider">Marks</th>
                              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-amber-700 uppercase tracking-wider">Out of</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {(() => {
                              const inputs = item.inputs as EndSemInputs;
                              const courseType = inputs.courseType?.toUpperCase();
                              let rows: JSX.Element[] = [];
                              
                              // Common rows for all course types
                              if (inputs.subjectName) {
                                rows.push(
                                  <tr key="subject" className="bg-amber-50">
                                    <td colSpan={3} className="px-4 py-2 text-sm font-medium text-amber-800">
                                      {inputs.subjectName} ({courseType || 'N/A'})
                                    </td>
                                  </tr>
                                );
                              }

                              // For NPEL/NPTEL courses
                              if (['NPEL', 'NPTEL', 'nptel'].includes(inputs.courseType || '')) {
                                // Create a new array with just the subject row
                                const newRows = [];
                                
                                // Keep the subject row if it exists
                                if (inputs.subjectName) {
                                  newRows.push(
                                    <tr key="subject" className="bg-amber-50">
                                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-amber-800">
                                        {inputs.subjectName} ({courseType || 'N/A'})
                                      </td>
                                    </tr>
                                  );
                                }
                                
                                // Get all assignment marks (1-8)
                                const assignmentMarks = [
                                  { key: 'nptelAssignment1', label: 'Ass1' },
                                  { key: 'nptelAssignment2', label: 'Ass2' },
                                  { key: 'nptelAssignment3', label: 'Ass3' },
                                  { key: 'nptelAssignment4', label: 'Ass4' },
                                  { key: 'nptelAssignment5', label: 'Ass5' },
                                  { key: 'nptelAssignment6', label: 'Ass6' },
                                  { key: 'nptelAssignment7', label: 'Ass7' },
                                  { key: 'nptelAssignment8', label: 'Ass8' }
                                ].filter(({ key }) => inputs[key] !== undefined && inputs[key] !== '');
                          
                                // Calculate total marks and internal marks
                                const totalMarks = assignmentMarks.reduce((sum, { key }) => {
                                  return sum + (parseFloat(inputs[key] as string) || 0);
                                }, 0);
                                
                                const outOf25 = (totalMarks / 800 * 25).toFixed(2);
                                
                                // Add Internal Marks row with sum of assignments
                                newRows.push(
                                  <tr key="internal-marks">
                                    <td className="px-4 py-2 text-sm font-medium text-gray-900">Assignment Marks</td>
                                    <td className="px-3 py-2 text-sm text-center text-gray-600 font-medium">{totalMarks}</td>
                                    <td className="px-3 py-2 text-sm text-center text-gray-600">800</td>
                                  </tr>
                                );
                                
                                // Add Total Internal Marks row with calculation
                                newRows.push(
                                  <tr key="internal-total" className="border-t-2 border-gray-200">
                                    <td className="px-4 py-2 text-sm font-medium text-gray-900">Total Internal Marks</td>
                                    <td className="px-3 py-2 text-sm text-center font-medium text-amber-600">{outOf25}</td>
                                    <td className="px-3 py-2 text-sm text-center text-gray-600">25</td>
                                  </tr>
                                );
                                
                                // Skip any other processing for NPTEL courses
                                return newRows;
                              }

                        // For LAB courses
                        if (inputs.courseType === 'LAB' || inputs.courseType === 'LABORATORY' || inputs.courseType === 'LAB COURSE' || inputs.courseType === 'lab') {
                          // Create a new array with just the subject row
                          const newRows = [];
                          
                          // Keep the subject row if it exists
                          if (inputs.subjectName) {
                            newRows.push(
                              <tr key="subject" className="bg-amber-50">
                                <td colSpan={3} className="px-4 py-2 text-sm font-medium text-amber-800">
                                  {inputs.subjectName} ({courseType || 'N/A'})
                                </td>
                              </tr>
                            );
                          }
                          
                          const labMark = parseFloat(inputs.labInternal as string) || 0;
                          const outOf25 = (labMark / 50 * 25).toFixed(2);
                          
                          // Add lab-specific rows
                          newRows.push(
                            <tr key="lab-marks">
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">Internal Exam</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">{labMark}</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">50</td>
                            </tr>,
                            <tr key="lab-total" className="border-t-2 border-gray-200">
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">Internal Marks</td>
                              <td className="px-3 py-2 text-sm text-center font-medium text-amber-600">{outOf25}</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">25</td>
                            </tr>
                          );
                          
                          // Skip any other processing for LAB courses
                          return newRows;
                        }
                        
                        // For Theory Cum Lab courses
                        if (inputs.courseType === 'THEORYCUMLAB' || inputs.courseType === 'theoryCumLab' || inputs.courseType === 'Theory Cum Lab') {
                          // Parse all input values
                          const internal1 = parseFloat(inputs.internal1 as string) || 0;
                          
                          const internal2 = parseFloat(inputs.internal2 as string) || 0;
                          const internal3 = parseFloat(inputs.internal3 as string) || 0;
                          const assignment = parseFloat(inputs.assignment as string) || 0;
                          
                          // Get practical mark - try all possible fields
                          let practical = 0;
                          if (inputs.practical !== undefined) {
                            practical = typeof inputs.practical === 'number' 
                              ? inputs.practical 
                              : parseFloat(inputs.practical) || 0;
                          } else if (inputs.practicalMark !== undefined) {
                            practical = typeof inputs.practicalMark === 'number'
                              ? inputs.practicalMark
                              : parseFloat(inputs.practicalMark) || 0;
                          }
                          
                          // Calculate internal marks (sum of internal1,2,3 + assignment) / 250 * 25 + practical/2
                          const theoryMarks = (internal1 + internal2 + internal3 + assignment) / 250 * 25;
                          const practicalMarks = practical / 2;
                          const totalMarks = theoryMarks + practicalMarks;
                          
                          // Add individual marks
                          rows.push(
                            <tr key="theory-marks">
                              <td className="px-4 py-2 text-sm text-gray-500">CAT ( 1 + 2 + 3 ) + Assignment</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">
                                {internal1 + internal2 + internal3 + assignment}
                              </td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">25</td>
                            </tr>,
                            <tr key="practical-marks">
                              <td className="px-4 py-2 text-sm text-gray-500">Practical</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">{practical}</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">25</td>
                            </tr>,
                            <tr key="internal-total" className="border-t border-gray-200">
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">Total Internal Marks</td>
                              <td className="px-3 py-2 text-sm text-center font-medium text-amber-600">{totalMarks.toFixed(2)}</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">50</td>
                            </tr>
                          );
                        } else {
                          // For regular theory courses
                          const internal1 = parseFloat(inputs.internal1 as string) || 0;
                          const internal2 = parseFloat(inputs.internal2 as string) || 0;
                          const internal3 = parseFloat(inputs.internal3 as string) || 0;
                          const assignment = parseFloat(inputs.assignment as string) || 0;
                          const theoryTotal = internal1 + internal2 + internal3;
                          const totalMarks = (theoryTotal + assignment) / 250 * 40;
                          
                          // Add individual marks
                          rows.push(
                            <tr key="theory-marks">
                              <td className="px-4 py-2 text-sm text-gray-500">CAT ( 1 +2 + 3 )</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">{theoryTotal}</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">200</td>
                            </tr>,
                            <tr key="assignment-marks">
                              <td className="px-4 py-2 text-sm text-gray-500">Assignment</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">{assignment}</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">50</td>
                            </tr>,
                            <tr key="internal-total" className="border-t-2 border-gray-200">
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">Total Internal Marks (Sum/250*40)</td>
                              <td className="px-3 py-2 text-sm text-center font-medium text-amber-600">{totalMarks.toFixed(2)}</td>
                              <td className="px-3 py-2 text-sm text-center text-gray-600">40</td>
                            </tr>
                          );
                          return rows;
                        }
                        
                        return rows;
                      })()}
                          </tbody>
                        </table>
                      </div>
                      {item.result && (
                        <div className="mt-4 p-5 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-amber-700">Required End-Sem Marks</p>
                              <p className="text-2xl font-extrabold text-amber-900">
                                {typeof item.result === 'object' ? item.result.requiredMark : item.result} / 100
                              </p>
                            </div>
                            <div className="h-12 w-px bg-amber-200"></div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-amber-700">To achieve Grade</p>
                              <p className="text-2xl font-extrabold text-amber-900">
                                {(item.inputs as any).selectedGrade || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
