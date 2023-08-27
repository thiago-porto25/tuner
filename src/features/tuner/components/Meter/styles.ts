import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { css, styled } from 'styled-components/native';

import { BottomInfoTextContainerProps } from '@/features/tuner/types/bottomInfoTextContainerProps.interface';
import { GuideBallProps } from '@/features/tuner/types/guideBallProps.interface';
import { LargeNoteTextProps } from '@/features/tuner/types/largeNoteTextProps.interface';
import { MarkProps } from '@/features/tuner/types/markProps.interface';
import { MarkSizes } from '@/features/tuner/types/markSizes.interface';
import getColorByCents from '@/features/tuner/utils/getColorByCents.util';
import appTheme from '@/shared/theme';

const markSizes: MarkSizes = {
  1: appTheme.space.sizeSm,
  2: appTheme.space.sizeXl,
  3: appTheme.space.sizeXxl,
  4: appTheme.space.sizeXxxl,
  5: appTheme.space.sizeHuge,
  6: appTheme.space.sizeGiant,
};

export const Container = styled.View`
  justify-content: center;
`;

export const TopContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.space.sizeXxs};
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `}
`;

export const TopContainerWrapper = styled.View`
  ${({ theme }) => css`
    margin-bottom: ${theme.space.sizeMd};
    align-items: center;
  `}
`;

export const MarkContainer = styled.View``;

export const MarkTextContainer = styled.View`
  ${({ theme }) => css`
    position: absolute;
    top: -${theme.space.sizeXxs};
    left: -15px;
    width: 28px;
  `}
`;

export const CenterContainer = styled.View`
  ${({ theme }) => css`
    margin-bottom: ${theme.space.sizeXs};
    flex-direction: row;
    gap: ${theme.space.sizeNano};
    justify-content: space-between;
    align-items: center;
  `}
`;

export const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LargeNoteContainer = styled.View``;

export const BottomInfoTextContainer = styled.View<BottomInfoTextContainerProps>`
  flex: 1;
  align-items: ${({ isLeft }) => (isLeft ? 'flex-start' : 'flex-end')};
`;

export const AcidentalIcon = styled(Icon).attrs({
  color: 'black',
  size: 26,
})``;

export const Bar = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    height: 2px;
    width: 80%;
  `}
`;

export const GuideBallWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const GuideBallContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const GuideBall = styled.View<GuideBallProps>`
  ${({ cents, theme }) => css`
    position: absolute;
    width: ${theme.space.sizeXxs};
    height: ${theme.space.sizeXxs};
    border-radius: 50px;
    border: 2px solid ${theme.colors.dark};
    left: ${`${cents + 45.4}%`};
    background-color: ${getColorByCents(theme, cents)};
  `};
`;

export const Mark = styled.View<MarkProps>`
  ${({ theme, isPrimary, size }) => css`
    background-color: ${isPrimary
      ? theme.colors.primary
      : `${theme.colors.mediumDark}cc`};
    height: ${markSizes[size] || markSizes[6]};
    width: 2px;
  `}
`;

export const LargeNoteText = styled(Text).attrs({
  variant: 'displayLarge',
})<LargeNoteTextProps>`
  ${({ theme, cents }) => css`
    font-size: 72px;
    font-family: ${theme.family.bold};
    padding-top: ${theme.space.sizeXxxs};
    color: ${getColorByCents(theme, cents)};
    letter-spacing: -${theme.space.sizeNano};
  `}
`;

export const LargeNoteAccidentalText = styled(LargeNoteText)<
  Partial<LargeNoteTextProps>
>`
  ${({ theme }) => css`
    font-family: ${theme.family.accidental};
  `}
`;

export const AcidentalText = styled(Text).attrs({ variant: 'titleMedium' })`
  ${({ theme }) => css`
    font-family: ${theme.family.regular};
  `}
`;

export const OctaveText = styled(AcidentalText)<LargeNoteTextProps>`
  ${({ theme, cents }) => css`
    position: absolute;
    bottom: -${theme.space.sizeQuarck};
    right: -${theme.space.sizeNano};
    color: ${getColorByCents(theme, cents)};
  `}
`;

export const InfoText = styled(Text).attrs({ variant: 'bodySmall' })`
  ${({ theme }) => css`
    font-family: ${theme.family.semibold};
  `}
`;

export const HelperText = styled(Text).attrs({ variant: 'labelSmall' })``;
