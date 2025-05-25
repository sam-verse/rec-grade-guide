import React, { useState } from 'react';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (details: { name: string; department: string; yearOfStudy: string }) => void;
  onSubmit?: (details: { name: string; department: string; yearOfStudy: string }) => void;
  theme?: string;
}

const themeConfig: Record<string, { headerBg: string; headerText: string; focusBorder: string; focusRing: string; submitBg: string; inputBg?: string; }> = {
  blue: {
    headerBg: 'bg-blue-600',
    headerText: 'text-blue-100',
    focusBorder: 'focus:border-blue-500',
    focusRing: 'focus:ring-blue-500',
    submitBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    inputBg: 'bg-blue-50'
  },
  green: {
    headerBg: 'bg-green-600',
    headerText: 'text-green-100',
    focusBorder: 'focus:border-green-500',
    focusRing: 'focus:ring-green-500',
    submitBg: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    inputBg: 'bg-green-50'
  },
  purple: {
    headerBg: 'bg-purple-600',
    headerText: 'text-purple-100',
    focusBorder: 'focus:border-purple-500',
    focusRing: 'focus:ring-purple-500',
    submitBg: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    inputBg: 'bg-purple-50'
  },
  orange: {
    headerBg: 'bg-orange-600',
    headerText: 'text-orange-100',
    focusBorder: 'focus:border-orange-500',
    focusRing: 'focus:ring-orange-500',
    submitBg: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
    inputBg: 'bg-orange-50'
  }
}

// TODO: replace with your Apps Script Web App URL
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz4a2aPrLZkiNBBCQy3WWMdLcXP7_Bz-evdK2IZEbieqL0_44HEIh-YGlAzCN0XE0QP/exec';

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSubmit,
  theme = 'blue'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    yearOfStudy: ''
  });

  const cfg = themeConfig[theme] || themeConfig.blue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send data to Google Sheet via Apps Script
    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(() => console.log('Sheet: data sent (no-cors mode)'))
    .catch(err => console.error('Sheet error:', err));

    if (onLoginSuccess) {
      onLoginSuccess(formData);
    }
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      name: '',
      department: '',
      yearOfStudy: ''
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 transform transition-all duration-300 ease-in-out scale-100">
        <div className={`${cfg.headerBg} rounded-t-lg px-6 py-4`}>
          <h2 className="text-xl font-semibold text-white">Welcome to Grade Guide</h2>
          <p className={`${cfg.headerText} mt-1`}>Please enter your details to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 ${cfg.inputBg} ${cfg.focusBorder} ${cfg.focusRing} transition-colors duration-200`}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <div className="relative mt-1">
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className={`block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 pr-8 ${cfg.inputBg} ${cfg.focusBorder} ${cfg.focusRing} transition-colors duration-200 appearance-none`}
              >
                <option value="">Select Department</option>
                <option value="AIDS">Artificial Intelligence & Data Science</option>
<option value="AIML">Artificial Intelligence & Machine Learning</option>
<option value="aeronautical">Aeronautical Engineering</option>
<option value="AUTO">Automobile Engineering</option>
<option value="BME">Biomedical Engineering</option>
<option value="BTE">Biotechnology</option>
<option value="CHEM">Chemical Engineering</option>
<option value="CIVIL">Civil Engineering</option>
<option value="CSBS">Computer Science & Business Systems</option>
<option value="CSC">Computer Science & Engineering Cyber Security</option>
<option value="CSE">Computer Science & Engineering</option>
<option value="CSD">Computer Science & Design</option>
<option value="ECE">Electronics & Communication Engineering</option>
<option value="EEE">Electrical & Electronics Engineering</option>
<option value="FT">Food Technology</option>
<option value="IT">Information Technology</option>
<option value="MECH">Mechanical Engineering</option>
<option value="MCT">Mechatronics Engineering</option>
<option value="R&A">Robotics & Automation</option>

              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
              Year of Study
            </label>
            <div className="relative mt-1">
              <select
                id="yearOfStudy"
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
                className={`block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 pr-8 ${cfg.inputBg} ${cfg.focusBorder} ${cfg.focusRing} transition-colors duration-200 appearance-none`}
              >
                <option value="">Select Year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white ${cfg.submitBg} rounded-md focus:outline-none transition-colors duration-200`}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsModal; 