import React, { useEffect, useRef, useState } from 'react';
import { EmitterSubscription, PermissionsAndroid } from 'react-native';

import PitchFinder from 'pitchfinder';
import { Text } from 'react-native-paper';

import {
  noteStrings,
  standardMiddleA,
} from '@/features/tuner/constants/notes.constants';
import { en, pt } from '@/features/tuner/i18n/supportedLanguages';
import { TunerData } from '@/features/tuner/types/tunerData.interface';
import NoteFinder from '@/features/tuner/utils/noteFinder.util';
import {
  startRecording,
  stopRecording,
} from '@/features/tuner/utils/recorder.util';
import ActionModal from '@/shared/components/ActionModal';
import testID from '@/shared/constants/testIDs.constants';
import checkMultiplePermissions from '@/shared/utils/checkMultiplePermissions.util';
import getI18n from '@/shared/utils/getI18n.util';
import requestPermissions from '@/shared/utils/requestPermissions.util';

import * as S from './styles';

const i18n = getI18n({ en, pt });
const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];

function Tuner() {
  const [, setTunerData] = useState<TunerData>({
    cents: 0,
    frequency: standardMiddleA,
    noteName: noteStrings[9],
    octave: 4,
  });

  const [arePermissionsGranted, setArePermissionsGranted] = useState(false);
  const [isPermissionErrorModalVisible, setIsPermissionErrorModalVisible] =
    useState(false);
  const [isPermissionDeniedModalVisible, setIsPermissionDeniedModalVisible] =
    useState(false);

  const subscriptionRef = useRef<EmitterSubscription>();

  function initNoteDetection() {
    const noteFinder = new NoteFinder();
    const detectPitch = PitchFinder.YIN({ sampleRate: 22050 });

    const listener = startRecording(data => {
      const frequency = detectPitch(data);

      if (frequency) {
        const noteValue = noteFinder.getNoteValue(frequency);
        const cents = noteFinder.getCents(frequency, noteValue);
        const noteName = NoteFinder.getNoteName(noteValue);
        const octave = NoteFinder.getOctave(noteValue);

        setTunerData({
          frequency,
          cents,
          noteName,
          octave,
        });

        console.log(
          `note: ${noteName}${frequency}`,
          `cents: ${cents}`,
          `octave: ${octave}`,
        );
      }
    });

    subscriptionRef.current = listener;
  }

  function handlePermissionsSuccess(): void {
    setIsPermissionDeniedModalVisible(false);
    setIsPermissionErrorModalVisible(false);
    setArePermissionsGranted(true);
  }

  function handlePermissionsDenied(): void {
    setIsPermissionErrorModalVisible(false);
    setIsPermissionDeniedModalVisible(true);
  }

  function handlePermissionsError(): void {
    setIsPermissionDeniedModalVisible(false);
    setIsPermissionErrorModalVisible(true);
  }

  useEffect(() => {
    async function requestMandatoryPermissions(): Promise<void> {
      if (await checkMultiplePermissions(permissions)) {
        handlePermissionsSuccess();
        return;
      }

      await requestPermissions(
        permissions,
        handlePermissionsSuccess,
        handlePermissionsDenied,
        handlePermissionsError,
      );
    }

    requestMandatoryPermissions();
  }, []);

  useEffect(() => {
    if (arePermissionsGranted) initNoteDetection();

    return () => {
      if (arePermissionsGranted) stopRecording(subscriptionRef.current);
    };
  }, [arePermissionsGranted]);

  return (
    <S.MainContainer testID={testID.TUNER_SCREEN}>
      <S.HeaderContainer>
        <Text>{i18n.t('header')}</Text>

        {/* INDICATOR */}
      </S.HeaderContainer>

      <ActionModal
        visible={isPermissionDeniedModalVisible}
        dismissable={false}
        dismissableBackButton={false}
        overlayAccessibilityLabel="Modal backdrop. Does not close it.">
        <Text>{i18n.t('permissionDenied')}</Text>
      </ActionModal>

      <ActionModal
        visible={isPermissionErrorModalVisible}
        dismissable={false}
        dismissableBackButton={false}
        overlayAccessibilityLabel="Modal backdrop. Does not close it.">
        <Text>{i18n.t('permissionError')}</Text>
      </ActionModal>
    </S.MainContainer>
  );
}

export default Tuner;
