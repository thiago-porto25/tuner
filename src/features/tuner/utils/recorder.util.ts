import { EmitterSubscription } from 'react-native';

import Recording from 'react-native-recording';

export function startRecording(
  listenerCallback: (data: Float32Array) => void,
): EmitterSubscription {
  Recording.init({
    bufferSize: 4096,
    sampleRate: 44100,
    bitsPerChannel: 16,
    channelsPerFrame: 1,
  });

  const listener = Recording.addRecordingEventListener(listenerCallback);
  Recording.start();

  return listener;
}

export function stopRecording(listener?: EmitterSubscription): void {
  Recording.stop();
  listener?.remove();
}
