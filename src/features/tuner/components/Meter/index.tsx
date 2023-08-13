import React from 'react';

import useNoteDetector from '@/features/tuner/hooks/useNoteDetector';

import * as S from './styles';

function Meter() {
  const {
    noteData: { cents, frequency, noteName, octave },
  } = useNoteDetector();

  return (
    <S.Container>
      <S.TopContainerWrapper>
        <S.TopContainer>
          <S.GuideBallWrapper>
            <S.GuideBallContainer>
              <S.GuideBall cents={cents} />
            </S.GuideBallContainer>
          </S.GuideBallWrapper>

          {generateMarks()}
          <S.Mark isPrimary size={6} />
          {generateMarks('right')}
        </S.TopContainer>
      </S.TopContainerWrapper>

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
          <S.LargeNoteText cents={cents}>{noteName}</S.LargeNoteText>
          <S.OctaveText cents={cents}>{octave}</S.OctaveText>
        </S.LargeNoteContainer>

        <S.BottomInfoTextContainer>
          <S.InfoText>{cents > 0 ? `+${cents}` : cents} cents</S.InfoText>
        </S.BottomInfoTextContainer>
      </S.BottomContainer>
    </S.Container>
  );
}

function generateMarks(direction: 'left' | 'right' = 'left') {
  const marksArray = Array.from({ length: 5 }, (_, index) => index + 1);

  const marks = marksArray.map(position => (
    <S.MarkContainer key={position}>
      {position === 1 && (
        <S.MarkTextContainer>
          <S.HelperText>{direction === 'left' ? '-' : '+'}50</S.HelperText>
        </S.MarkTextContainer>
      )}

      <S.Mark size={position} />
    </S.MarkContainer>
  ));

  return direction === 'left' ? marks : marks.reverse();
}

export default Meter;
