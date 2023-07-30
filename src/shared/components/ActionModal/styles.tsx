import React from 'react';

import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { css } from 'styled-components/native';

export const ActionModalContainer = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
    justify-content: space-between;
    padding: ${theme.space.sizeXxs};
    width: 100%;
    min-height: 256px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  `}
`;

export const ButtonsContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.space.sizeNano};
  `}
`;

export const TextContainer = styled.View`
  ${({ theme }) => css`
    margin-bottom: ${theme.space.sizeXxs};
    margin-top: ${theme.space.sizeXxxs};
  `}
`;

export const Description = styled(Text)``;

export const DescriptionContainer = styled.View``;

export const Title = styled(Text).attrs({
  variant: 'titleLarge',
})`
  ${({ theme }) => css`
    font-family: ${theme.family.bold};
    margin-bottom: ${theme.space.sizeNano};
  `}
`;

export const CloseButton = styled.TouchableOpacity.attrs({
  children: <Icon color="black" name="close" size={24} />,
  hitSlop: 32,
})`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.space.sizeXxxs};
    right: ${theme.space.sizeXxxs};
    z-index: 1;
  `}
`;
