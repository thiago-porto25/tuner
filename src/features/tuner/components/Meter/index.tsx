import React from 'react';

import { Divider } from 'react-native-paper';

import { MeterProps } from '@/features/tuner/types/meterProps.interface';

import * as S from './styles';

function generateSticks() {
  return [0, 1, 2, 3, 5].map(v => <Divider key={v} />);
}

function Meter({ cents, frequency, noteName, octave }: MeterProps) {
  return (
    <S.Container>
      <S.TopContainer>
        <S.GuideBall />

        {generateSticks()}
        <Divider />
        {generateSticks()}
      </S.TopContainer>

      <S.CenterContainer>
        <S.AcidentalIcon name="music-accidental-flat" />

        <S.Bar />

        <S.AcidentalIcon name="music-accidental-sharp" />
      </S.CenterContainer>

      <S.BottomContainer>
        <S.BottomInfoTextContainer isLeft>
          <S.InfoText>Hz {frequency.toFixed(2)}</S.InfoText>
        </S.BottomInfoTextContainer>

        <S.LargeNoteContainer>
          <S.LargeNoteText>{noteName}</S.LargeNoteText>
          <S.OctaveText>{octave}</S.OctaveText>
        </S.LargeNoteContainer>

        <S.BottomInfoTextContainer>
          <S.InfoText>{cents > 0 ? `+${cents}` : cents} cents</S.InfoText>
        </S.BottomInfoTextContainer>
      </S.BottomContainer>
    </S.Container>
  );
}

export default Meter;
