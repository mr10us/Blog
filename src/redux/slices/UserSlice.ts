import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import type {UserType} from '../../types/UserType';
import { getFullName } from '../../utils/getFullName';

type UserSliceType = {
  user: UserType | null;
}

const initialState: UserSliceType = {
  user: null
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      const user = action.payload;

      state.user = user;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {setUser, clearUser} = UserSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserFullName = (state: RootState) => getFullName(state.user.user);

export default UserSlice.reducer;
