import {
  noteStrings,
  semitone,
  standardMiddleA,
} from '@/features/tuner/constants/notes.constants';

export default class NoteFinder {
  private readonly middleA: number;

  constructor(middleA: number = standardMiddleA) {
    this.middleA = middleA;
  }

  private getStandardFrequency(noteValue: number): number {
    return this.middleA * 2 ** ((noteValue - semitone) / 12);
  }

  public getCents(frequency: number, noteValue: number): number {
    return Math.floor(
      (1200 * Math.log(frequency / this.getStandardFrequency(noteValue))) /
        Math.log(2),
    );
  }

  public getNoteValue(frequency: number): number {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + semitone;
  }

  public static getNoteName(noteValue: number): string {
    return noteStrings[noteValue % 12];
  }

  public static getOctave(noteValue: number) {
    return Math.floor(noteValue / 12) - 1;
  }
}
