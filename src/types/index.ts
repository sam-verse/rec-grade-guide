export interface Subject {
  id: number;
  name: string;
  internal1: string;
  internal2: string;
  assignment: string;
  courseType: string;
  credit: string;
  endSem: string;
  practicalMark?: string;
  isNPTEL: boolean;
  isFullLab: boolean;
  totalMark: number | null;
  grade: string;
  gradePoint: number | null;
}

export interface Semester {
  id: number;
  semesterNumber: number;
  gpa: string;
  credits: string;
}