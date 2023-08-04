import React, { useEffect, useRef, useState } from 'react';
import { EmitterSubscription } from 'react-native';

import PitchFinder from 'pitchfinder';
import { Text } from 'react-native-paper';

import {
  noteStrings,
  standardMiddleA,
} from '@/features/tuner/constants/notes.constants';
import testID from '@/features/tuner/constants/testIDs.constants';
import { en, pt } from '@/features/tuner/i18n/supportedLanguages';
import { TunerData } from '@/features/tuner/types/tunerData.interface';
import NoteFinder from '@/features/tuner/utils/noteFinder.util';
import {
  startRecording,
  stopRecording,
} from '@/features/tuner/utils/recorder.util';
import getI18n from '@/shared/utils/getI18n.util';

import TunerPermissionsHandler from '../../components/TunerPermissionsHandler';

import * as S from './styles';

const i18n = getI18n({ en, pt });
const initialTunerData: TunerData = {
  cents: 0,
  frequency: standardMiddleA,
  noteName: noteStrings[9],
  octave: 4,
};

function Tuner() {
  const [, setTunerData] = useState<TunerData>(initialTunerData);
  const [arePermissionsGranted, setArePermissionsGranted] = useState(false);

  const subscriptionRef = useRef<EmitterSubscription>();

  function initNoteDetection() {
    const noteFinder = new NoteFinder();
    const detectPitch = PitchFinder.YIN({ sampleRate: 22050 });

    const listener = startRecording(data => {
      const frequency = detectPitch(data);

      if (frequency) {
        const noteValue = noteFinder.getNoteValue(frequency);

        setTunerData({
          frequency,
          cents: noteFinder.getCents(frequency, noteValue),
          noteName: NoteFinder.getNoteName(noteValue),
          octave: NoteFinder.getOctave(noteValue),
        });
      }
    });

    subscriptionRef.current = listener;
  }

  useEffect(() => {
    if (arePermissionsGranted) initNoteDetection();

    return () => {
      if (arePermissionsGranted) stopRecording(subscriptionRef.current);
    };
  }, [arePermissionsGranted]);

  return (
    <S.MainContainer testID={testID.TUNER_SCREEN}>
      <S.HeaderContainer>
        <Text>{i18n.t('tunerScreen.header')}</Text>

        {/* INDICATOR */}
      </S.HeaderContainer>

      <TunerPermissionsHandler
        setArePermissionsGranted={setArePermissionsGranted}
      />
    </S.MainContainer>
  );
}

export default Tuner;
