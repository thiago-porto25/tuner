import React, { PropsWithChildren } from 'react';

import PitchFinder from 'pitchfinder';
import { Provider } from 'react-redux';

import { act, renderHook as initialRenderHook } from '@/__tests__/test-utils';
import { standardMiddleA } from '@/features/tuner/constants/notes.constants';
import useNoteDetector, {
  initialNoteData,
} from '@/features/tuner/hooks/useNoteDetector';
import * as selectors from '@/features/tuner/store/selectors';
import * as recordingUtils from '@/features/tuner/utils/recorder.util';
import { store } from '@/shared/store';

const startRecordingSpy = jest.spyOn(recordingUtils, 'startRecording');
const YINSpy = jest.spyOn(PitchFinder, 'YIN');
const stopRecordingSpy = jest.spyOn(recordingUtils, 'stopRecording');
const selectArePermissionsGrantedSpy = jest
  .spyOn(selectors, 'selectArePermissionsGranted')
  .mockImplementation(() => true);

jest.mock('react-native-recording', () => ({
  init: jest.fn(),
  addRecordingEventListener: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
}));

function Providers({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

function renderUseNoteDetectorHook(middleA?: number) {
  return initialRenderHook(() => useNoteDetector(middleA), {
    wrapper: Providers,
  });
}

describe('useNoteDetector', () => {
  async function mockRecordingListenerEvent() {
    await act(async () => {
      // This was the only way I could find to test the recording change event being called
      startRecordingSpy.mock.calls[0][0](new Float32Array());
    });
  }

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial note data', () => {
    const { result } = renderUseNoteDetectorHook();
    const { noteData } = result.current;

    expect(noteData).toEqual(initialNoteData);
  });

  it('returns note data when frequency is detected, default middleA', async () => {
    YINSpy.mockImplementation(() => jest.fn(() => standardMiddleA));

    const { result } = renderUseNoteDetectorHook();

    await mockRecordingListenerEvent();

    expect(result.current.noteData).toEqual({
      frequency: 440,
      cents: 0,
      noteName: 'A',
      octave: 4,
    });
  });

  it('returns note data when frequency is detected, custom middleA', async () => {
    const customA = 432;

    YINSpy.mockImplementation(jest.fn(() => jest.fn(() => customA)));

    const { result } = renderUseNoteDetectorHook(customA);

    await mockRecordingListenerEvent();

    expect(result.current.noteData).toEqual({
      frequency: 432,
      cents: 0,
      noteName: 'A',
      octave: 4,
    });
  });

  it('does not update noteData when no frequency is detected', async () => {
    YINSpy.mockImplementation(jest.fn(() => jest.fn(() => null)));

    const { result } = renderUseNoteDetectorHook();
    const { noteData } = result.current;

    await mockRecordingListenerEvent();

    expect(result.current.noteData).toEqual(noteData);
  });

  it('calls startRecordingSpy when permissions are granted', () => {
    selectArePermissionsGrantedSpy.mockImplementation(() => true);

    renderUseNoteDetectorHook();

    expect(startRecordingSpy).toHaveBeenCalled();
  });

  it('does not call startRecordingSpy when permissions are not granted', () => {
    selectArePermissionsGrantedSpy.mockImplementation(() => false);

    renderUseNoteDetectorHook();

    expect(startRecordingSpy).not.toHaveBeenCalled();
  });

  it('calls stopRecording when permissions are granted', () => {
    selectArePermissionsGrantedSpy.mockImplementation(() => true);

    const { unmount } = renderUseNoteDetectorHook();

    unmount();

    expect(stopRecordingSpy).toHaveBeenCalled();
  });

  it('does not call stopRecording when permissions are not granted', () => {
    selectArePermissionsGrantedSpy.mockImplementation(() => false);

    const { unmount } = renderUseNoteDetectorHook();

    unmount();

    expect(stopRecordingSpy).not.toHaveBeenCalled();
  });
});
