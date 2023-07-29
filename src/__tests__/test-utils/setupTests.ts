import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import MockDate from 'mockdate';
import * as mockRNLocalize from 'react-native-localize/mock';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-localize', () => mockRNLocalize);
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('i18n-js', () => ({
  __esModule: true,
  I18n: () => {
    return {
      t: jest.fn((str: string) => str),
    };
  },
}));
const frameTime = 10;

global.requestAnimationFrame = cb => {
  // Setting the timeout simulates a frame every 1/100th of a second
  setTimeout(cb, frameTime);
};

global.timeTravel = (time = frameTime) => {
  const tickTravel = () => {
    // The React Animations module looks at the elapsed time for each frame to calculate its
    // new position
    const now = Date.now();
    MockDate.set(new Date(now + frameTime));

    // Run the timers forward
    jest.advanceTimersByTime(frameTime);
  };

  // Step through each of the frames
  const frames = time / frameTime;
  let framesElapsed;
  for (framesElapsed = 0; framesElapsed < frames; framesElapsed++) {
    tickTravel();
  }
};

jest.mock(
  'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  () => {
    return {
      ...jest.requireActual(
        'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
      ),
      requestMultiple: jest.fn(),
      check: jest.fn(),
    };
  },
);
jest.mock('react-native//Libraries/EventEmitter/NativeEventEmitter');
