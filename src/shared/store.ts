import { configureStore } from '@reduxjs/toolkit';

import preferencesSliceReducer from '@/features/preferences/store/preferences.slice';

export const store = configureStore({
  reducer: {
    preferences: preferencesSliceReducer,
  },
});

export type AppGetState = typeof store.getState;
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = typeof store.dispatch;
