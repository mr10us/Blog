import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {createPost, deletePost, editPost, getPosts} from '../../services/PostService';
import {
  fetchPosts,
  setPosts,
  setPost,
  updatePost,
  setIsLoadingPostsStart,
  setIsLoadingPostsFinish,
  setPostsError,
  addPost,
  setIsLoadingPostStart,
  setIsLoadingPostFinish,
  setPostError,
  removePost,
} from '../slices/PostSlice';
import type {PostType} from '../../types/PostType';
import {PayloadAction} from '@reduxjs/toolkit';

/**
 * Fetches posts from Firestore and updates the state with the fetched posts.
 *
 * @param {PayloadAction<void>} action - The action object containing the payload.
 * @returns {Generator} A generator object representing the function.
 */
export function* fetchPostsData() {
  try {
    // Set isLoading to true to indicate that posts are being fetched
    yield call(setIsLoadingPostsStart);

    // Fetch posts from Firestore
    const posts: PostType[] = yield call(getPosts);
    
    // Update the state with the fetched posts
    yield put(setPosts(posts));

    // Set isLoading to false to indicate that posts have been fetched
    yield call(setIsLoadingPostsFinish);
  } catch (error) {
    // Set an error message if there was an issue fetching the posts
    yield put(setPostsError('Error fetching posts'));
  } finally {
    // Set isLoading to false anyway to ensure isLoading is always in sync
    yield call(setIsLoadingPostsFinish);
  }
}

/**
 * Saga function to add a new post to Firestore.
 *
 * @param {PayloadAction<PostType>} action - The action object containing the payload
 * of type PostType.
 * @returns {Generator} A generator object representing the function.
 */
export function* addPostSaga(action: PayloadAction<PostType>) {
  try {
    // Set isLoading to true to indicate that a new post is being added
    yield put(setIsLoadingPostStart());

    // Call the createPost function to add the new post to Firestore
    yield call(createPost, action.payload);

    // Set isLoading to false to indicate that the new post has been added successfully
    yield put(setIsLoadingPostFinish());
  } catch (error: any) {
    // Set an error message if there was an issue adding the new post
    yield put(setPostError(error));
  } finally {
    // Set isLoading to false anyway to ensure isLoading is always in sync
    yield put(setIsLoadingPostFinish());
  }
}

/**
 * Saga function to edit a post in Firestore.
 *
 * @param {PayloadAction<Partial<PostType>>} action - The action object containing the payload
 * of type Partial<PostType>.
 * @returns {Generator} A generator object representing the function.
 */
export function* editPostSaga(action: PayloadAction<Pick<PostType, "id" | "title" | "content">>) {
  try {
    // Set isLoading to true to indicate that a post is being edited
    yield put(setIsLoadingPostStart());

    // Call the editPost function to edit the post in Firestore
    yield call(editPost, action.payload);

    // Set isLoading to false to indicate that the post has been edited successfully
    yield put(setIsLoadingPostFinish());
  } catch (error: any) {
    // Set an error message if there was an issue editing the post
    yield put(setPostError(error));
  } finally {
    // Set isLoading to false anyway to ensure isLoading is always in sync
    yield put(setIsLoadingPostFinish());
  }
}

/**
 * Saga function to delete a post from Firestore.
 *
 * @param {PayloadAction<PostType>} action - The action object containing the payload
 * of type PostType.
 * @returns {Generator} A generator object representing the function.
 */
export function* deletePostSaga(action: PayloadAction<string>) {
  try {
    // Set isLoading to true to indicate that a post is being deleted
    yield put(setIsLoadingPostStart());

    // Call the deletePost function to delete the post from Firestore
    yield call(deletePost, action.payload);

    // Set isLoading to false to indicate that the post has been deleted successfully
    yield put(setIsLoadingPostFinish());
  } catch (error: any) {
    // Set an error message if there was an issue deleting the post
    yield put(setPostError(error));
  } finally {
    // Set isLoading to false anyway to ensure isLoading is always in sync
    yield put(setIsLoadingPostFinish());
  }
}

/**
 * Root saga for handling all post related actions.
 * 
 * This saga listens for different actions and spawns
 * corresponding child sagas.
 */
function* PostsSaga() {
  // Watch for addPost action and spawn addPostSaga
  yield takeEvery(addPost.type, addPostSaga);

  // Watch for updatePost action and spawn editPostSaga
  yield takeEvery(updatePost.type, editPostSaga);

  // Watch for removePost action and spawn deletePostSaga
  yield takeEvery(removePost.type, deletePostSaga);

  // Watch for updatePost or addPost or removePost actions
  // and fetch posts data
  yield takeEvery(updatePost.type, fetchPostsData);
  yield takeEvery(addPost.type, fetchPostsData);
  yield takeEvery(removePost.type, fetchPostsData);

  // Watch for fetchPosts action and spawn fetchPostsData
  yield takeLatest(fetchPosts.type, fetchPostsData);
}

export default PostsSaga;
