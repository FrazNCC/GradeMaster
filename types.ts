export interface Unit {
  id: string;
  name: string;
  grade: string;
  points: number;
}

export type QualificationType = string;

export type Subject = string;

export interface CalculationResult {
  totalPoints: number;
  grade: string;
}