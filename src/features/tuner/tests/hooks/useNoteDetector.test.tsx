import React, { PropsWithChildren } from 'react';

import { PitchDetector } from 'pitchy';
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
const forFloat32ArraySpy = jest.spyOn(PitchDetector, 'forFloat32Array');
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
      startRecordingSpy.mock.calls[0][0](new Float32Array(2048));
    });
  }

  function createMockFindPitchResult(frequency: number, clarity: number = 1) {
    return jest.fn((inputLength: number) => ({
      findPitch: jest.fn(() => [frequency, clarity]),
      inputLength,
    })) as unknown as (inputLength: number) => PitchDetector<Float32Array>;
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
    forFloat32ArraySpy.mockImplementation(
      createMockFindPitchResult(standardMiddleA),
    );

    const { result } = renderUseNoteDetectorHook();

    await mockRecordingListenerEvent();

    expect(result.current.noteData).toEqual({
      frequency: standardMiddleA,
      cents: 0,
      noteName: 'A',
      octave: 4,
    });
  });

  it('returns note data when frequency is detected, custom middleA', async () => {
    const customA = 432;

    forFloat32ArraySpy.mockImplementation(createMockFindPitchResult(customA));

    const { result } = renderUseNoteDetectorHook(customA);

    await mockRecordingListenerEvent();

    expect(result.current.noteData).toEqual({
      frequency: customA,
      cents: 0,
      noteName: 'A',
      octave: 4,
    });
  });

  it('does not update noteData when no frequency is detected', async () => {
    forFloat32ArraySpy.mockImplementation(createMockFindPitchResult(0, 0));

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
