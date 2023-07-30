import React from 'react';

import { Button, Modal, Portal } from 'react-native-paper';

import testIDs from '@/shared/constants/testIDs.constants';
import { ActionModalProps } from '@/shared/types/actionModalProps.interface';

import * as S from './styles';

export default function ActionModal({
  children,
  visible,
  contentContainerStyle = {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
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
    return btns.map(button => (
      <Button key={button.key} {...button}>
        {button.children}
      </Button>
    ));
  }

  return (
    <Portal>
      <Modal
        contentContainerStyle={contentContainerStyle}
        dismissable={dismissable}
        dismissableBackButton={dismissableBackButton}
        onDismiss={onDismiss}
        overlayAccessibilityLabel={overlayAccessibilityLabel}
        style={style}
        testID={testID}
        theme={theme}
        visible={visible}>
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
