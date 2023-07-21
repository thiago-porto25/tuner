import React from 'react';
import reactNative from 'react-native';

import { render } from '@testing-library/react-native';

import App from '@/App';

const useColorSchemeSpy = jest.spyOn(reactNative, 'useColorScheme');

describe('App', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    useColorSchemeSpy.mockRestore();
  });

  it('renders correctly', () => {
    render(<App />);
  });

  it('renders correctly and dark mode', () => {
    useColorSchemeSpy.mockReturnValue('dark');

    render(<App />);
  });
});
