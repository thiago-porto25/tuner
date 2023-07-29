import { EmitterSubscription } from 'react-native';

import Recording from 'react-native-recording';

import {
  startRecording,
  stopRecording,
} from '@/features/tuner/utils/recorder.util';

jest.mock('react-native-recording', () => ({
  init: jest.fn(),
  addRecordingEventListener: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
}));

describe('recording utils', () => {
  const MockedRecording = Recording as jest.Mocked<typeof Recording>;

  describe('startRecording', () => {
    const mockListenerCallback = jest.fn();
    let mockRecordingEventListener: EmitterSubscription;

    beforeEach(() => {
      MockedRecording.init.mockClear();
      MockedRecording.addRecordingEventListener.mockClear();
      MockedRecording.start.mockClear();

      mockRecordingEventListener = {
        remove: jest.fn(),
      } as Partial<EmitterSubscription> as EmitterSubscription;
      MockedRecording.addRecordingEventListener.mockReturnValue(
        mockRecordingEventListener,
      );

      startRecording(mockListenerCallback);
    });

    it('initializes the recording', () => {
      expect(MockedRecording.init).toHaveBeenCalledWith({
        bufferSize: 2048,
        sampleRate: 22050,
        bitsPerChannel: 16,
        channelsPerFrame: 1,
      });
    });

    it('adds the recording event listener', () => {
      expect(MockedRecording.addRecordingEventListener).toHaveBeenCalledWith(
        mockListenerCallback,
      );
    });

    it('starts the recording', () => {
      expect(MockedRecording.start).toHaveBeenCalled();
    });

    it('returns the recording event listener', () => {
      expect(MockedRecording.addRecordingEventListener).toHaveReturnedWith(
        mockRecordingEventListener,
      );
    });
  });

  describe('stopRecording', () => {
    let mockListener: EmitterSubscription;

    beforeEach(() => {
      MockedRecording.stop.mockClear();
      mockListener = {
        remove: jest.fn(),
      } as Partial<EmitterSubscription> as EmitterSubscription;
    });

    it('stops the recording', () => {
      stopRecording(mockListener);

      expect(MockedRecording.stop).toHaveBeenCalled();
    });

    it('removes the event listener if provided', () => {
      stopRecording(mockListener);

      expect(mockListener.remove).toHaveBeenCalled();
    });

    it('does not remove the event listener if not provided', () => {
      stopRecording();

      expect(mockListener.remove).not.toHaveBeenCalled();
    });
  });
});
