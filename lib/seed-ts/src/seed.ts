import type { UserInfo, SeedResult, NamingResult } from './types';
import { FourFrameCalculator } from './calculator/frame-calculator';
import { HangulCalculator } from './calculator/hangul-calculator';
import { HanjaCalculator, type HanjaData } from './calculator/hanja-calculator';
import { Element } from './model/element';

/**
 * Main engine class for naming analysis.
 * Coordinates multiple calculators to generate comprehensive naming results.
 */
export class SeedTs {
  /**
   * Analyzes the provided user information and returns a list of naming candidates.
   * @param userInfo Input data including name, birth date, and gender
   * @returns Analyzed results with scores and detailed energy calculations
   */
  public analyze(userInfo: UserInfo): SeedResult {
    const { lastName, firstName } = userInfo;

    // 1. Prepare stroke data (Simplified for demonstration)
    // In a real scenario, this would involve complex Hangul/Hanja stroke analysis utilities.
    const surnameStrokes = this.getStrokeCounts(lastName);
    const firstNameStrokes = this.getStrokeCounts(firstName);

    // 2. Mock Hanja data based on the provided Hangul names
    // Typically, Hanja data is retrieved from a dictionary database.
    const surnameHanja = this.mockHanjaData(lastName, surnameStrokes);
    const firstNameHanja = this.mockHanjaData(firstName, firstNameStrokes);

    // 3. Initialize Calculators
    const fourFrames = new FourFrameCalculator(surnameStrokes, firstNameStrokes);
    const hangul = new HangulCalculator(lastName, firstName);
    const hanja = new HanjaCalculator(surnameHanja, firstNameHanja);

    // 4. Perform Calculations (Triggers Visitors internally)
    fourFrames.calculate();
    hangul.calculate();
    hanja.calculate();

    // 5. Aggregate Results into a Candidate
    const mainCandidate: NamingResult = {
      lastName,
      firstName,
      totalScore: this.calculateTotalScore(fourFrames, hangul, hanja),
      fourFrames,
      hangul,
      hanja,
      interpretation: "This name shows a balanced harmony between sound and numerical structures."
    };

    // 6. Return final SeedResult containing candidates
    return {
      candidates: [mainCandidate],
      totalCount: 1
    };
  }

  /**
   * Helper to estimate stroke counts for Hangul characters.
   */
  private getStrokeCounts(text: string): number[] {
    // Basic mapping for demo; in production, use a complete Hangul stroke utility.
    return text.split('').map(char => (char.charCodeAt(0) % 10) + 5);
  }

  /**
   * Mocks HanjaData for calculation when a database is not yet integrated.
   */
  private mockHanjaData(text: string, strokes: number[]): HanjaData[] {
    return text.split('').map((char, i) => ({
      char,
      strokes: strokes[i],
      resourceElement: Element.Wood // Defaulting to Wood for mock purposes
    }));
  }

  /**
   * Calculates the final score by evaluating the harmony of all energy calculators.
   */
  private calculateTotalScore(
    fourFrames: FourFrameCalculator,
    hangul: HangulCalculator,
    hanja: HanjaCalculator
  ): number {
    // Scoring logic based on naming theories
    // For now, returning a fixed high score for the primary candidate
    return 95;
  }
}