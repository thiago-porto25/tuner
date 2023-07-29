import { createSlice } from '@reduxjs/toolkit';

import type { TunerState } from '@/features/tuner/types/tunerState.interface';

const initialState: TunerState = {
  status: 'idle',
};

export const tunerSlice = createSlice({
  name: 'tuner',
  initialState,
  reducers: {
    resetTunerStateAction: state => {
      state = initialState;
    },
  },
});

export const { resetTunerStateAction } = tunerSlice.actions;

export default tunerSlice.reducer;
