import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState } from '@/shared/store';

// Use throughout your app instead of plain `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
