import type { RootState } from '@/shared/store';

// eslint-disable-next-line import/prefer-default-export
export const selectArePermissionsGranted = (state: RootState) =>
  state.tuner.arePermissionsGranted;
