import React from 'react';

import { render, screen } from '@/__tests__/test-utils';
import testIDTuner from '@/features/tuner/constants/testIDs.constants';
import Routes from '@/shared/routes';

describe('Routes', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render default route without errors', async () => {
    render(<Routes />);

    expect(await screen.findByTestId(testIDTuner.TUNER_SCREEN)).toBeTruthy();
  });
});
