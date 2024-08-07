import {put, call, takeLatest} from 'redux-saga/effects';
import {editPostSaga} from '../../src/redux/saga/PostsSaga';
import {
  setPostError,
  setIsLoadingPostFinish,
  setIsLoadingPostStart,
  setPost,
} from '../../src/redux/slices/PostSlice';
import {editPost} from '../../src/services/PostService';
import {PayloadAction} from '@reduxjs/toolkit';
import {PostType} from '../../src/types/PostType';

describe('editPostSaga', () => {
  it('should handle successful edit', () => {
    const actionPayload: Pick<PostType, 'id' | 'title' | 'content'> = {
      id: 'post1',
      title: 'Updated Title',
      content: 'Updated Content',
    };
    const action: PayloadAction<typeof actionPayload> = {
      payload: actionPayload,
      type: setPost.type,
    };

    const gen = editPostSaga(action);

    expect(gen.next().value).toEqual(put(setIsLoadingPostStart()));
    expect(gen.next().value).toEqual(call(editPost, actionPayload));
    expect(gen.next({}).value).toEqual(put(setIsLoadingPostFinish()));
    expect(gen.next().done).toBe(true);
  });

  it('should handle error during edit', () => {
    const actionPayload: Pick<PostType, 'id' | 'title' | 'content'> = {
      id: 'post1',
      title: 'Updated Title',
      content: 'Updated Content',
    };
    const action: PayloadAction<typeof actionPayload> = {
      payload: actionPayload,
      type: setPost.type,
    };
    const error = new Error('Error editing post');

    const gen = editPostSaga(action);

    expect(gen.next().value).toEqual(put(setIsLoadingPostStart()));
    expect(gen.next().value).toEqual(call(editPost, actionPayload));
    expect(gen.throw(error).value).toEqual(put(setPostError(error)));
    expect(gen.next().done).toBe(true);
  });
});

