import { createSlice } from '@reduxjs/toolkit';

import type { PreferencesState } from '@/features/preferences/types/preferencesState.interface';

const initialState: PreferencesState = {
  status: 'idle',
  error: null,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    resetPreferencesStateAction: state => {
      state = initialState;
    },
  },
});

export const { resetPreferencesStateAction } = preferencesSlice.actions;

export default preferencesSlice.reducer;
