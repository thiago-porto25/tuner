import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { TunerState } from '@/features/tuner/types/tunerState.interface';

const initialState: TunerState = {
  arePermissionsGranted: false,
};

export const tunerSlice = createSlice({
  name: 'tuner',
  initialState,
  reducers: {
    setPermissionsAction: (state, data: PayloadAction<boolean>) => {
      state.arePermissionsGranted = data.payload;
    },
  },
});

export const { setPermissionsAction } = tunerSlice.actions;

export default tunerSlice.reducer;
