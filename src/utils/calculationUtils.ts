import { Subject, Semester } from '../types';

/**
 * Calculate internal mark based on internal exams and assignment
 */
export function calculateInternalMark(
  internal1: number, 
  internal2: number, 
  assignment: number, 
  courseType: string,
  internal3: number,
  practicalMark?: number
): number {
  if (courseType === 'theory') {
    // Calculate internal component out of 40
    const totalInternalMarks = internal1 + internal2 + internal3 + assignment;
    const maxPossibleMarks = 75 + 75 + 50 + 50; // 250 total possible marks
    const internalComponent = (totalInternalMarks / maxPossibleMarks) * 40;
    
    // Validate internal component doesn't exceed 40
    return Math.min(internalComponent, 40);
  } else if (courseType === 'theoryCumLab' && practicalMark !== undefined) {
    // Calculate theory component out of 25
    const totalTheoryMarks = internal1 + internal2 + internal3 + assignment;
    const maxTheoryMarks = 75 + 75 + 50 + 50; // 250 total possible marks
    const theoryComponent = (totalTheoryMarks / maxTheoryMarks) * 25;

    // Calculate practical component out of 25
    const practicalComponent = (practicalMark / 50) * 25;

    // Total internal marks out of 50
    const totalInternal = theoryComponent + practicalComponent;
    
    // Validate total internal doesn't exceed 50
    return Math.min(totalInternal, 50);
  } else if (courseType === 'nptel') {
    // For NPTEL, just use the direct mark out of 100
    return Math.min(internal1, 100);
  } else if (courseType === 'fullLab') {
    // For lab course, combine internal (25) and end practical (75)
    const total = internal1 + internal2;
    // Validate total doesn't exceed 100
    return Math.min(total, 100);
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
    const required = (minGradeMark - internalMark) / 0.6;
    // Validate end sem mark doesn't exceed 100
    return Math.min(required, 100);
  } else {
    // For theoryCumLab
    const required = (minGradeMark - internalMark) / 0.5;
    // Validate end sem mark doesn't exceed 100
    return Math.min(required, 100);
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