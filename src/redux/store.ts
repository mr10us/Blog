import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postReducer from './slices/PostSlice';
import userReducer from './slices/UserSlice';
import commentsReducer from './slices/CommentSlice';
import themeReducer from './slices/ThemeSlice';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postReducer,
    theme: themeReducer,
    // user: userReducer, TODO: implement logic
    // comments: commentsReducer, TODO: implement logic
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
