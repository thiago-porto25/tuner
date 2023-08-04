import React from 'react';
import RN from 'react-native';

import { act, render } from '@testing-library/react-native';

import App from '@/App';

const useColorSchemeSpy = jest.spyOn(RN, 'useColorScheme');

describe('App', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    useColorSchemeSpy.mockRestore();
  });

  it('renders correctly', async () => {
    render(<App />);

    await act(async () => {
      global.timeTravel(500);
    });
  });

  it('renders correctly and dark mode', async () => {
    useColorSchemeSpy.mockReturnValue('dark');

    render(<App />);

    await act(async () => {
      global.timeTravel(500);
    });
  });
});
