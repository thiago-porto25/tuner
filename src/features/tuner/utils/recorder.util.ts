import { EmitterSubscription } from 'react-native';

import Recording from 'react-native-recording';

import {
  bufferSize,
  sampleRate,
} from '@/features/tuner/constants/notes.constants';

export function startRecording(
  listenerCallback: (data: Float32Array) => void,
): EmitterSubscription {
  Recording.init({
    bufferSize,
    sampleRate,
  });

  const listener = Recording.addRecordingEventListener(listenerCallback);
  Recording.start();

  return listener;
}

export function stopRecording(listener?: EmitterSubscription): void {
  Recording.stop();
  listener?.remove();
}
