import React from 'react';
import {
  Linking,
  Permission,
  PermissionsAndroid,
  PermissionStatus,
} from 'react-native';

import MockDate from 'mockdate';
import RNExitApp from 'react-native-exit-app';

import { act, fireEvent, render, screen } from '@/__tests__/test-utils';
import TunerPermissionsHandler from '@/features/tuner/components/TunerPermissionsHandler';
import testID from '@/features/tuner/constants/testIDs.constants';

const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;

jest.mock(
  'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  () => ({
    check: jest.fn().mockResolvedValue(false),
    requestMultiple: jest.fn().mockResolvedValue({
      'android.permission.RECORD_AUDIO': 'granted',
    }),
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      NEVER_ASK_AGAIN: 'never_ask_again',
    },
    PERMISSIONS: {
      RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
    },
  }),
);

jest.mock('react-native//Libraries/Linking/Linking');

jest.mock('react-native-exit-app', () => ({
  exitApp: jest.fn(),
}));

describe('TunerPermissionsHandler', () => {
  const mockedPermissionsAndroid = PermissionsAndroid as jest.Mocked<
    typeof PermissionsAndroid
  >;
  const mockedLinking = Linking as jest.Mocked<typeof Linking>;

  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    MockDate.set(0);
  });

  afterEach(() => {
    mockedPermissionsAndroid.requestMultiple.mockReset();
    mockedPermissionsAndroid.check.mockReset();
    mockedLinking.openSettings.mockReset();
  });

  it('shows no modals if permissions are already accepted', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.DENIED,
    } as Required<{ [key in Permission]: PermissionStatus }>);
    mockedPermissionsAndroid.check.mockResolvedValueOnce(true);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    await act(async () => {
      global.timeTravel(500);
    });

    expect(
      screen.queryByTestId(testID.TUNER_DENIED_PERMISSION_MODAL),
    ).toBeNull();
    expect(
      screen.queryByTestId(
        testID.TUNER_NEVER_ASK_PERMISSION_MODAL_RETRY_BUTTON,
      ),
    ).toBeNull();
    expect(
      screen.queryByTestId(testID.TUNER_ERROR_PERMISSION_MODAL),
    ).toBeNull();
  });

  it('shows denied permission modal when the user denies permissions', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.DENIED,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    expect(
      await screen.findByTestId(testID.TUNER_DENIED_PERMISSION_MODAL),
    ).toBeTruthy();
  });

  it('shows permission error modal when an error occurs while requesting permissions', async () => {
    mockedPermissionsAndroid.requestMultiple.mockRejectedValueOnce(null);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    expect(
      await screen.findByTestId(testID.TUNER_ERROR_PERMISSION_MODAL),
    ).toBeTruthy();
  });

  it('shows never ask again permission modal when the user denies permissions more than once', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.DENIED,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    expect(
      await screen.findByTestId(testID.TUNER_DENIED_PERMISSION_MODAL),
    ).toBeTruthy();

    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    fireEvent.press(
      screen.getByTestId(testID.TUNER_DENIED_PERMISSION_MODAL_RETRY_BUTTON),
    );

    expect(
      await screen.findByTestId(
        testID.TUNER_NEVER_ASK_PERMISSION_MODAL_LEAVE_BUTTON,
      ),
    ).toBeTruthy();
  });

  it('handles retry of permissions correctly when the user denies permissions once', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.DENIED,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    expect(
      await screen.findByTestId(testID.TUNER_DENIED_PERMISSION_MODAL),
    ).toBeTruthy();

    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.GRANTED,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    fireEvent.press(
      screen.getByTestId(testID.TUNER_DENIED_PERMISSION_MODAL_RETRY_BUTTON),
    );

    await act(async () => {
      global.timeTravel(500);
    });

    expect(
      screen.queryByTestId(testID.TUNER_DENIED_PERMISSION_MODAL),
    ).toBeNull();
  });

  it('handles retry of permissions correctly when the user denies permissions more than once', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    expect(
      await screen.findByTestId(
        testID.TUNER_NEVER_ASK_PERMISSION_MODAL_LEAVE_BUTTON,
      ),
    ).toBeTruthy();

    fireEvent.press(
      screen.getByTestId(testID.TUNER_NEVER_ASK_PERMISSION_MODAL_RETRY_BUTTON),
    );

    expect(mockedLinking.openSettings).toHaveBeenCalledTimes(1);
  });

  it('handles retry of permissions correctly when an error occurs requesting permissions', async () => {
    mockedPermissionsAndroid.requestMultiple.mockRejectedValueOnce(null);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    expect(
      await screen.findByTestId(testID.TUNER_ERROR_PERMISSION_MODAL),
    ).toBeTruthy();

    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.GRANTED,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    fireEvent.press(
      screen.getByTestId(testID.TUNER_ERROR_PERMISSION_MODAL_RETRY_BUTTON),
    );

    await act(async () => {
      global.timeTravel(500);
    });

    expect(
      screen.queryByTestId(testID.TUNER_ERROR_PERMISSION_MODAL),
    ).toBeNull();
  });

  it('handles correctly press on the leave app button in denied and never ask again modals', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      [audioPermission]: PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
    } as Required<{ [key in Permission]: PermissionStatus }>);

    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    expect(
      await screen.findByTestId(
        testID.TUNER_NEVER_ASK_PERMISSION_MODAL_RETRY_BUTTON,
      ),
    ).toBeTruthy();

    fireEvent.press(
      screen.getByTestId(testID.TUNER_NEVER_ASK_PERMISSION_MODAL_LEAVE_BUTTON),
    );
    expect(RNExitApp.exitApp).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', async () => {
    render(<TunerPermissionsHandler setArePermissionsGranted={jest.fn} />);

    await act(async () => {
      global.timeTravel(500);
    });

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
