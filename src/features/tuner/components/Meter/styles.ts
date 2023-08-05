import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { css, styled } from 'styled-components/native';

import { BottomInfoTextContainerProps } from '@/features/tuner/types/bottomInfoTextContainerProps.interface';

export const Container = styled.View`
  justify-content: center;
`;

export const TopContainer = styled.View`
  ${({ theme }) => css`
    margin-bottom: ${theme.space.sizeMd};
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

export const GuideBall = styled.View``;

export const LargeNoteText = styled(Text).attrs({ variant: 'displayLarge' })`
  ${({ theme }) => css`
    font-size: 72px;
    font-family: ${theme.family.bold};
    padding-top: ${theme.space.sizeNano};
  `}
`;

export const AcidentalText = styled(Text).attrs({ variant: 'titleMedium' })`
  ${({ theme }) => css`
    font-family: ${theme.family.regular};
  `}
`;

export const OctaveText = styled(AcidentalText)`
  ${({ theme }) => css`
    position: absolute;
    bottom: -${theme.space.sizeQuarck};
    right: -${theme.space.sizeNano};
  `}
`;

export const InfoText = styled(Text).attrs({ variant: 'bodySmall' })`
  ${({ theme }) => css`
    font-family: ${theme.family.semibold};
  `}
`;

export const HelperText = styled(Text).attrs({ variant: 'labelSmall' })``;
