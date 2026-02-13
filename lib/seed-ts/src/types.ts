// Define basic naming input types
export interface UserInfo {
  lastName: string;
  firstName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  gender: 'male' | 'female';
}

export interface SeedResult {
  lastName: string;
  firstName: string;
  score: number;
  elements: string; // e.g., "Wood, Fire"
  interpretation: string;
}