import type { Status } from '@/shared/types/status.type';

export interface PreferencesState {
  status: Status;
  error: string | null;
}
