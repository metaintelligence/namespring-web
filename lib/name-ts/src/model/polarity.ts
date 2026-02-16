export class Polarity {
  static readonly Negative = new Polarity('Negative', '음');
  static readonly Positive = new Polarity('Positive', '양');
  private constructor(public readonly english: string, public readonly korean: string) {}

  static get(strokes: number): Polarity {
    return strokes % 2 === 1 ? Polarity.Positive : Polarity.Negative;
  }
}
