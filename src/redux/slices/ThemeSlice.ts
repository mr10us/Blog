import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import type {UserType} from '../../types/UserType';
import { getFullName } from '../../utils/getFullName';

type ThemeSliceType = {
  current: "light" | "dark";
}

const initialState: ThemeSliceType = {
  current: "light"
};

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      const theme = action.payload;

      state.current = theme;
    },
  },
});

export const {setTheme} = ThemeSlice.actions;

export const selectCurrentTheme = (state: RootState) => state.theme.current;

export default ThemeSlice.reducer;
