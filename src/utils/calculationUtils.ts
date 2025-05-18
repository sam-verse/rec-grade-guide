import { Subject, Semester } from '../types';

/**
 * Calculate internal mark based on internal exams and assignment
 */
export function calculateInternalMark(
  internal1: number, 
  internal2: number, 
  assignment: number, 
  courseType: string,
  endSem: number,
  practicalMark?: number
): number {
  const x = internal1 + internal2 + assignment;
  
  if (courseType === 'theory') {
    return (x/5) + (endSem * 0.6);
  } else if (courseType === 'theoryCumLab' && practicalMark !== undefined) {
    return (x/8) + (practicalMark/2) + (endSem * 0.5);
  } else if (courseType === 'nptel') {
    return internal1; // For NPTEL, just use the direct mark out of 100
  } else if (courseType === 'fullLab') {
    return internal1 + endSem; // For lab course, combine internal (25) and end practical (75)
  }
  
  return 0;
}

/**
 * Calculate the required end semester mark based on internal marks and desired grade
 */
export function calculateRequiredEndSemMark(
  internalMark: number, 
  minGradeMark: number, 
  courseType: string
): number {
  if (courseType === 'theory') {
    return (minGradeMark - internalMark) / 0.6;
  } else {
    // For theoryCumLab
    return (minGradeMark - internalMark) / 0.5;
  }
}

/**
 * Calculate grade point based on grade
 */
export function calculateGradePoint(grade: string): number {
  switch (grade) {
    case 'O': return 10;
    case 'A+': return 9;
    case 'A': return 8;
    case 'B+': return 7;
    case 'B': return 6;
    default: return 0; // RA (Reappear)
  }
}

/**
 * Calculate GPA based on subjects' grade points and credits
 */
export function calculateGPA(subjects: Subject[]): number {
  let totalCreditPoints = 0;
  let totalCredits = 0;

  subjects.forEach(subject => {
    if (subject.gradePoint !== null && subject.credit) {
      const credit = parseFloat(subject.credit);
      const gradePoint = subject.gradePoint;
      totalCreditPoints += gradePoint * credit;
      totalCredits += credit;
    }
  });

  if (totalCredits === 0) return 0;
  
  // Calculate GPA with 2 decimal places
  const gpa = totalCreditPoints / totalCredits;
  return Math.round(gpa * 100) / 100;
}

/**
 * Calculate CGPA based on semester GPAs and credits
 */
export function calculateCGPA(semesters: Semester[]): number {
  let totalCreditPoints = 0;
  let totalCredits = 0;

  semesters.forEach(semester => {
    const gpa = parseFloat(semester.gpa);
    const credits = parseFloat(semester.credits);
    
    totalCreditPoints += gpa * credits;
    totalCredits += credits;
  });

  return totalCredits > 0 ? totalCreditPoints / totalCredits : 0;
}