import React from 'react';

import { render, screen } from '@/__tests__/test-utils';
import routeNames from '@/shared/constants/routeNames.constants';
import Routes from '@/shared/routes';

describe('Routes', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should render default route without errors', () => {
    render(<Routes />);

    expect(screen.getByTestId(routeNames.TUNER)).toBeTruthy();
  });
});
