export interface ScoreDto {
  registrationNumber: string;
  math: number | null;
  literature: number | null;
  foreignLanguage: number | null;
  physics: number | null;
  chemistry: number | null;
  biology: number | null;
  history: number | null;
  geography: number | null;
  civicEducation: number | null;
  foreignLanguageCode: string | null;
  }
  
  export type SubjectStats = {
    level1Count: number; // ≥8
    level2Count: number; // 6-7.9
    level3Count: number; // 4-5.9
    level4Count: number; // <4
  };
  
  export type ScoreReportDto = {
    subjectStatistics: {
      [subject: string]: SubjectStats;
    };
  };
  
  export interface TopStudentADto {
    registrationNumber: string;
    math: number;
    physics: number;
    chemistry: number;
    totalScoreA: number;
  }
  
  export interface TopStudentBDto {
    registrationNumber: string;
    literature: number;
    history: number;
    geography: number;
    totalScore: number;
  }
  export interface ErrorDto {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
  }
  