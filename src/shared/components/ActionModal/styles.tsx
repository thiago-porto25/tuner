import React from 'react';

import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styled } from 'styled-components/native';

interface ButtonContainerProps {
  isLast: boolean;
}

export const ActionModalContainer = styled.View``;

export const ButtonsContainer = styled.View``;

export const ButtonContainer = styled.View<ButtonContainerProps>``;

export const TextContainer = styled.View``;

export const Description = styled(Text)``;

export const DescriptionContainer = styled.View``;

export const Title = styled(Text)``;

export const CloseButton = styled.TouchableHighlight.attrs({
  children: <Icon name="close" size={24} />,
  hitSlop: 24,
})``;
