import React from 'react';
import reactNative from 'react-native';

import { render, screen } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import App from '@/App';

const useColorSchemeSpy = jest.spyOn(reactNative, 'useColorScheme');

describe('App', () => {
  afterAll(() => {
    useColorSchemeSpy.mockRestore();
  });

  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('renders correctly with testing library', () => {
    render(<App />);

    expect(screen.getAllByText(/React Native/i, { exact: false })).toBeTruthy();
  });

  it('renders correctly with testing library and dark mode', () => {
    useColorSchemeSpy.mockReturnValue('dark');

    render(<App />);

    expect(screen.getAllByText(/React Native/i, { exact: false })).toBeTruthy();
  });
});
