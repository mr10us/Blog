import {selectCurrentTheme} from '../redux/slices/ThemeSlice';
import {useAppSelector} from './useAppSelector';

/**
 * Custom hook to get the current theme from the Redux store.
 *
 * @returns {string} The current theme from the Redux store.
 */
export const useTheme = () => {
  // Get the current theme from the Redux store using the `useAppSelector` hook.
  // The `selectCurrentTheme` function retrieves the current theme from the Redux store.
  const currentTheme = useAppSelector(state => selectCurrentTheme(state));

  // Return the current theme.
  return currentTheme;
};
