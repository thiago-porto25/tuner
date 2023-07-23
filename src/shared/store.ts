import { configureStore } from '@reduxjs/toolkit';

import preferencesSliceReducer from '@/features/preferences/store/preferences.slice';
import tunerSliceReducer from '@/features/tuner/store/tuner.slice';

export const store = configureStore({
  reducer: {
    tuner: tunerSliceReducer,
    preferences: preferencesSliceReducer,
  },
});

export type AppGetState = typeof store.getState;
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = typeof store.dispatch;
