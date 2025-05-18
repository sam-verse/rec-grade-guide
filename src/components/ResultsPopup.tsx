import React, { useRef } from 'react';
import { X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Subject } from '../types';

interface ResultsPopupProps {
  subjects: Subject[];
  gpa: number;
  onClose: () => void;
}

const ResultsPopup: React.FC<ResultsPopupProps> = ({ subjects, gpa, onClose }) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (tableRef.current) {
      try {
        const canvas = await html2canvas(tableRef.current);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'gpa-results.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-800">GPA Calculation Results</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div ref={tableRef} className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Point</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Mark</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map((subject, index) => (
                  <tr key={subject.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm text-gray-900">{subject.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{subject.credit}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{subject.grade}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{subject.gradePoint}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{subject.totalMark?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-green-50">
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-right text-sm font-medium text-gray-900">Semester GPA:</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-600">{gpa.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPopup; 