import { useCallback, useEffect, useRef, useState } from 'react';
import { EmitterSubscription } from 'react-native';

import { PitchDetector } from 'pitchy';

import {
  bufferSize,
  maxFrequency,
  minFrequency,
  sampleRate,
  standardMiddleA,
} from '@/features/tuner/constants/notes.constants';
import { selectArePermissionsGranted } from '@/features/tuner/store/selectors';
import { NoteData } from '@/features/tuner/types/noteData.interface';
import NoteFinder from '@/features/tuner/utils/noteFinder.util';
import {
  startRecording,
  stopRecording,
} from '@/features/tuner/utils/recorder.util';
import useAppSelector from '@/shared/hooks/useAppSelector';

export const initialNoteData: NoteData = {
  cents: 0,
  frequency: 0,
  noteName: '-',
  octave: 0,
};

export default function useNoteDetector(middleA: number = standardMiddleA) {
  const [noteData, setNoteData] = useState<NoteData>(initialNoteData);

  const subscriptionRef = useRef<EmitterSubscription>();

  const arePermissionsGranted = useAppSelector(selectArePermissionsGranted);

  const initNoteDetection = useCallback(() => {
    const noteFinder = new NoteFinder(middleA);
    const pitchy = PitchDetector.forFloat32Array(bufferSize);

    const listener = startRecording(data => {
      const result = pitchy.findPitch(data, sampleRate);

      const frequency = result[0];
      const clarity = result[1];

      if (
        frequency &&
        clarity > 0.93 &&
        frequency < maxFrequency &&
        frequency > minFrequency
      ) {
        const noteValue = noteFinder.getNoteValue(frequency);

        setNoteData({
          frequency,
          cents: noteFinder.getCents(frequency, noteValue),
          noteName: NoteFinder.getNoteName(noteValue),
          octave: NoteFinder.getOctave(noteValue),
        });
      }
    });

    subscriptionRef.current = listener;
  }, [middleA]);

  useEffect(() => {
    if (arePermissionsGranted) initNoteDetection();

    return () => {
      if (arePermissionsGranted) stopRecording(subscriptionRef.current);
    };
  }, [initNoteDetection, arePermissionsGranted]);

  return { noteData };
}
