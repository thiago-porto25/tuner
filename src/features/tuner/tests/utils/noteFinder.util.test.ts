import NoteFinder from '@/features/tuner/utils/noteFinder.util';

describe('NoteFinder', () => {
  let noteFinder: NoteFinder;

  beforeEach(() => {
    noteFinder = new NoteFinder();
  });

  it('calculates the cents correctly', () => {
    const frequency = 440;
    const noteValue = 69; // Corresponds to A4

    const cents = noteFinder.getCents(frequency, noteValue);

    expect(cents).toBe(0);
  });

  it('calculates the note value correctly', () => {
    const frequency = 440;
    const expectedNoteValue = 69; // Corresponds to A4

    const noteValue = noteFinder.getNoteValue(frequency);

    expect(noteValue).toBe(expectedNoteValue);
  });

  it('returns the correct note name for a given note value', () => {
    const noteValue = 69; // Corresponds to A4
    const expectedNoteName = 'A';

    const noteName = NoteFinder.getNoteName(noteValue);

    expect(noteName).toBe(expectedNoteName);
  });

  it('returns the correct octave for a given note value', () => {
    const noteValue = 69; // Corresponds to A4
    const expectedOctave = 4;

    const octave = NoteFinder.getOctave(noteValue);

    expect(octave).toBe(expectedOctave);
  });

  it('uses custom middle A when provided', () => {
    const frequency = 216;
    const customMiddleA = 432;
    const noteFinderWithCustomMiddleA = new NoteFinder(customMiddleA);
    const expectedValue = 57;

    const noteValue = noteFinderWithCustomMiddleA.getNoteValue(frequency);

    expect(noteValue).toBe(expectedValue);
  });
});
