import React from 'react';

import { render } from '@/__tests__/test-utils';
import Meter from '@/features/tuner/components/Meter';

describe('Meter', () => {
  it('should render correctly', () => {
    render(<Meter cents={1} frequency={220.17} noteName="A" octave={3} />);
  });
});
