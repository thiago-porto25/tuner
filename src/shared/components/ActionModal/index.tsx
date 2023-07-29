import React from 'react';

import { Button, Modal, Portal } from 'react-native-paper';

import testIDs from '@/shared/constants/testIDs.constants';
import { ActionModalProps } from '@/shared/types/actionModalProps.interface';

import * as S from './styles';

export default function ActionModal({
  children,
  visible,
  contentContainerStyle,
  dismissable,
  dismissableBackButton,
  onDismiss,
  overlayAccessibilityLabel,
  style,
  testID,
  theme,
  title,
  description,
  buttons,
  showClose,
  closeModal,
}: ActionModalProps) {
  function getDescription(desc: ActionModalProps['description']) {
    if (typeof desc === 'string') {
      return <S.Description>{desc}</S.Description>;
    }

    return desc;
  }

  function getButtons(btns: Required<ActionModalProps>['buttons']) {
    return btns.map((button, index) => (
      <S.ButtonContainer key={button.key} isLast={index === btns.length - 1}>
        <Button {...button}>{button.children}</Button>
      </S.ButtonContainer>
    ));
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={contentContainerStyle}
        dismissable={dismissable}
        dismissableBackButton={dismissableBackButton}
        onDismiss={onDismiss}
        overlayAccessibilityLabel={overlayAccessibilityLabel}
        style={style}
        testID={testID}
        theme={theme}>
        {children || (
          <S.ActionModalContainer>
            {showClose && closeModal && (
              <S.CloseButton
                onPress={closeModal}
                testID={testIDs.ACTION_MODAL_CLOSE_BUTTON}
              />
            )}

            <S.TextContainer>
              {title && <S.Title>{title}</S.Title>}

              {description && (
                <S.DescriptionContainer>
                  {getDescription(description)}
                </S.DescriptionContainer>
              )}
            </S.TextContainer>

            {buttons && (
              <S.ButtonsContainer>{getButtons(buttons)}</S.ButtonsContainer>
            )}
          </S.ActionModalContainer>
        )}
      </Modal>
    </Portal>
  );
}
