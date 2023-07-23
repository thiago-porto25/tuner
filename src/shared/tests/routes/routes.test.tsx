import React from 'react';

import { render, screen } from '@/__tests__/test-utils';
import testID from '@/shared/constants/testIDs.constants';
import Routes from '@/shared/routes';

describe('Routes', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render default route without errors', () => {
    render(<Routes />);

    expect(screen.getByTestId(testID.TUNER_SCREEN)).toBeTruthy();
  });
});
