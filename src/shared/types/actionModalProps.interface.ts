import React, { PropsWithChildren } from 'react';

import { ButtonProps, ModalProps } from 'react-native-paper';

export interface ActionModalProps
  extends Omit<ModalProps, 'children'>,
    PropsWithChildren {
  title?: string;
  description?: string | React.ReactNode | React.ReactNode[];
  buttons?: ButtonProps[];
  showClose?: boolean;
  closeModal?: () => void;
}
