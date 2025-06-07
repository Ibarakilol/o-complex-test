import { useDispatch, useSelector, useStore } from 'react-redux';

import type { AppDispatch, AppStore, RootState } from '@/store';

const useAppStore = useStore.withTypes<AppStore>();
const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { useAppDispatch, useAppSelector, useAppStore };
