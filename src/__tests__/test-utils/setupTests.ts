import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import * as mockRNLocalize from 'react-native-localize/mock';

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
