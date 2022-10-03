import { DependencyList, useEffect } from 'react';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch, logoActionUpdate } from 'app/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLogoActionEffect = (dependencies?: DependencyList): void => {
  const dispatch = useAppDispatch();

  const deps = dependencies || [];

  useEffect(() => {
    dispatch(logoActionUpdate(true));
    setTimeout(() => dispatch(logoActionUpdate(false)), 700);
  }, [...deps]);
};
