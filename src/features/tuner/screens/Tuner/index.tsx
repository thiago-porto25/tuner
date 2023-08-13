import React from 'react';

import { Text } from 'react-native-paper';

import Meter from '@/features/tuner/components/Meter';
import TunerPermissionsHandler from '@/features/tuner/components/TunerPermissionsHandler';
import testID from '@/features/tuner/constants/testIDs.constants';
import { en, pt } from '@/features/tuner/i18n/supportedLanguages';
import getI18n from '@/shared/utils/getI18n.util';

import * as S from './styles';

const i18n = getI18n({ en, pt });

function Tuner() {
  return (
    <S.MainContainer testID={testID.TUNER_SCREEN}>
      <S.HeaderContainer>
        <Text>{i18n.t('tunerScreen.header')}</Text>
      </S.HeaderContainer>

      <Meter />
      <TunerPermissionsHandler />
    </S.MainContainer>
  );
}

export default Tuner;
