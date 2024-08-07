import {createAction, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import type {PostType} from '../../types/PostType';

export type QueryData = {
  isLoading: boolean;
  error: string;
  isError: boolean;
};
type PostSliceType = {
  posts: PostType[];
  lastUpdated: {post: PostType | null; queryData: QueryData};
};

const initialState: PostSliceType & QueryData = {
  posts: [],
  lastUpdated: {
    post: null,
    queryData: {
      isLoading: false,
      error: '',
      isError: false,
    },
  },
  isLoading: false,
  error: '',
  isError: false,
};

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    /**
     * Reducer function to set the posts state.
     *
     * @param {Object} state - The current state of the posts slice.
     * @param {PayloadAction<PostType[]>} action - The action containing the payload of type PostType[].
     * @return {void} This function does not return anything.
     */
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      // Destructure the payload from the action
      const posts = action.payload;

      // Set the posts state to the payload
      state.posts = posts;
    },
    /**
     * Reducer function to add a new post to the state.
     *
     * @param {Object} state - The current state of the posts slice.
     * @param {PayloadAction<PostType>} action - The action containing the payload
     * of type PostType.
     * @return {void} This function does not return anything.
     */
    addPost: (state, action: PayloadAction<PostType>) => {
      // Destructure the payload from the action
      const post = action.payload;

      // Create a new post object with a unique id, the title and content from the
      // payload, the current date and status, and set it to the last updated post state
      state.lastUpdated.post = {
        id: Date.now().toString(),
        title: post.title,
        content: post.content,
        created_at: new Date().toISOString(),
        active: true,
      };

      // Set the query data state to indicate that a new post is being added
      state.lastUpdated.queryData = {
        isLoading: true,
        error: '',
        isError: false,
      };
    },
    /**
     * Reducer function to update a post in the state.
     *
     * @param {Object} state - The current state of the posts slice.
     * @param {PayloadAction<PostType>} action - The action containing the payload
     * of type PostType.
     * @return {void} This function does not return anything.
     */
    updatePost: (state, action: PayloadAction<PostType>) => {
      // Destructure the payload from the action
      const post = action.payload;

      // Map over the posts array in the state and update the post with the same id
      // as the payload
      state.posts = state.posts.map(p =>
        p.id === post.id ? {...post, ...p} : p,
      );
    },
    /**
     * Reducer function to set the last updated post in the state.
     *
     * @param {Object} state - The current state of the posts slice.
     * @param {PayloadAction<PostType | null>} action - The action containing the payload
     * of type PostType or null. The payload represents the post to be set as the last updated post.
     * @return {void} This function does not return anything.
     */
    setPost: (state, action: PayloadAction<PostType | null>) => {
      // Destructure the payload from the action
      const post = action.payload;

      // Set the last updated post state to the payload
      state.lastUpdated.post = post;
    },
    /**
     * Reducer function to remove a post from the state.
     *
     * @param {Object} state - The current state of the posts slice.
     * @param {PayloadAction<string>} action - The action containing the payload
     * of type string, which is the id of the post to be removed.
     * @return {void} This function does not return anything.
     */
    removePost: (state, action: PayloadAction<string>) => {
      // Destructure the payload from the action
      const id = action.payload;

      // Filter the posts array in the state to remove the post with the same id
      // as the payload
      state.posts = state.posts.filter(post => post.id !== id);
    },

    // For PostType[]

    setIsLoadingPostsStart: state => {
      state.isLoading = true;
    },
    setIsLoadingPostsFinish: state => {
      state.isLoading = false;
    },

    /**
     * Reducer function to set the error and isError state when fetching posts.
     *
     * @param {Object} state - The current state of the posts slice.
     * @param {PayloadAction<null | string>} action - The action containing the payload
     * of type null or string, which represents the error.
     * @return {void} This function does not return anything.
     */
    setPostsError: (state, action: PayloadAction<null | string>) => {
      // Destructure the payload from the action
      const error = action.payload;

      // If there is an error, update the error and isError state
      if (error) {
        state.error = error; // Set the error state
        state.isError = true; // Set the isError state to true
      }
    },

    // For single PostType

    setIsLoadingPostStart: state => {
      state.lastUpdated.queryData.isLoading = true;
    },
    setIsLoadingPostFinish: state => {
      state.lastUpdated.queryData.isLoading = false;
    },

    /**
     * Reducer function to set the error and isError state when fetching a single post.
     *
     * @param {Object} state - The current state of the posts slice.
     * @param {PayloadAction<null | string>} action - The action containing the payload
     * of type null or string, which represents the error.
     * @return {void} This function does not return anything.
     */
    setPostError: (state, action: PayloadAction<null | Error>) => {
      // Destructure the payload from the action
      const error = action.payload;

      // If there is an error, update the error and isError state
      if (error) {
        // Set the error state
        state.lastUpdated.queryData.error = error.message || 'Unknown error';
        // Set the isError state to true
        state.lastUpdated.queryData.isError = true;
      }
    },
  },
});

export const {
  setPosts,
  addPost,
  setPost,
  updatePost,
  removePost,

  setIsLoadingPostsStart,
  setIsLoadingPostsFinish,
  setPostsError,

  setIsLoadingPostStart,
  setIsLoadingPostFinish,
  setPostError,
} = PostSlice.actions;

export const fetchPosts = createAction('posts/fetchPosts');

export const selectPosts = (state: RootState) => state.posts;
export const selectPost = (state: RootState) => state.posts.lastUpdated.post;
export const selectPostsCount = (state: RootState) => state.posts.posts.length;

export default PostSlice.reducer;
