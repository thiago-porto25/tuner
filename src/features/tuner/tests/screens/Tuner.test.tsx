import React from 'react';

import { act, render } from '@/__tests__/test-utils';
import Tuner from '@/features/tuner/screens/Tuner';

describe('Tuner', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should render correctly', async () => {
    render(<Tuner />);

    await act(async () => {
      global.timeTravel(500);
    });
  });
});
