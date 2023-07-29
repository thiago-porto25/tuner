import React from 'react';

import { ButtonProps, ModalProps, Text } from 'react-native-paper';

import { fireEvent, render, screen } from '@/__tests__/test-utils';
import ActionModal from '@/shared/components/ActionModal';
import testID from '@/shared/constants/testIDs.constants';
import { ActionModalProps } from '@/shared/types/actionModalProps.interface';

describe('ActionModal', () => {
  const mockModalProps: Omit<ModalProps, 'children'> = {
    visible: true,
    contentContainerStyle: { backgroundColor: 'red' },
    dismissable: true,
    dismissableBackButton: true,
    onDismiss: jest.fn(),
    overlayAccessibilityLabel: 'Overlay Accessibility Label',
    style: { marginTop: 10 },
    testID: 'action-modal',
    theme: undefined,
  };

  const mockButtonProps: ButtonProps[] = [
    { key: 'button1', onPress: jest.fn(), children: 'Button 1' },
    { key: 'button2', onPress: jest.fn(), children: 'Button 2' },
  ];

  const mockProps: ActionModalProps = {
    ...mockModalProps,
    title: 'Modal Title',
    description: 'Modal Description',
    buttons: mockButtonProps,
    showClose: true,
    closeModal: jest.fn(),
  };

  it('renders the ActionModal component with correct props when there is no children', () => {
    render(<ActionModal {...mockProps} />);

    const modalContainer = screen.getByTestId(mockModalProps.testID!);
    const closeButton = screen.getByTestId(testID.ACTION_MODAL_CLOSE_BUTTON);
    const title = screen.getByText(mockProps.title!);
    const description = screen.getByText(String(mockProps.description));
    const button1 = screen.getByText(String(mockButtonProps[0].children));
    const button2 = screen.getByText(String(mockButtonProps[1].children));

    expect(modalContainer).toBeTruthy();
    expect(closeButton).toBeTruthy();
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(button1).toBeTruthy();
    expect(button2).toBeTruthy();
  });

  it('renders the ActionModal component with custom components if the children prop is passed', () => {
    const mockText = 'Modal Children';

    render(
      <ActionModal {...mockProps}>
        <Text>{mockText}</Text>
      </ActionModal>,
    );

    const modalContainer = screen.getByTestId(mockModalProps.testID!);
    const children = screen.getByText(mockText);

    expect(modalContainer).toBeTruthy();
    expect(children).toBeTruthy();
  });

  it('calls the onClose method when close button is pressed', () => {
    render(<ActionModal {...mockProps} />);
    const closeButton = screen.getByTestId(testID.ACTION_MODAL_CLOSE_BUTTON);

    fireEvent.press(closeButton);

    expect(mockProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it('renders the ActionModal component with custom component as description if the description prop is a react node or an array of react nodes', () => {
    const mockDescriptionText = 'Modal Description';

    const mockDescription = <Text>{mockDescriptionText}</Text>;

    render(<ActionModal {...mockProps} description={mockDescription} />);

    const description = screen.getByText(mockDescriptionText);

    expect(description).toBeTruthy();
  });

  it('calls the onPress method of the buttons when they are pressed', () => {
    render(<ActionModal {...mockProps} />);
    const button1 = screen.getByText(String(mockButtonProps[0].children));
    const button2 = screen.getByText(String(mockButtonProps[1].children));

    fireEvent.press(button1);
    fireEvent.press(button2);

    expect(mockButtonProps[0].onPress).toHaveBeenCalledTimes(1);
    expect(mockButtonProps[1].onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without a close button if showClose prop is false', () => {
    render(<ActionModal {...mockProps} showClose={false} />);

    const closeButton = screen.queryByTestId(testID.ACTION_MODAL_CLOSE_BUTTON);
    expect(closeButton).toBeNull();
  });

  it('renders without a close button if closeModal prop is not defined', () => {
    render(<ActionModal {...mockProps} closeModal={undefined} />);

    const closeButton = screen.queryByTestId(testID.ACTION_MODAL_CLOSE_BUTTON);
    expect(closeButton).toBeNull();
  });

  it('matches the snapshot', () => {
    render(<ActionModal {...mockProps} />);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
