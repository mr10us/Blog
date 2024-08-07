import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import { CommentType } from '../../types/CommentType';

type CommentSliceType = CommentType[];

const initialState: CommentSliceType = [];

export const CommentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<CommentType>) => {
      const comment = action.payload;

      state.push(comment);
    },
  },
});

export const {addComment} = CommentSlice.actions;


export const selectPosts = (state: RootState) => state.posts;
export const selectPostsCount = (state: RootState) => state.posts.length;

export default CommentSlice.reducer;
