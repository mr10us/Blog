import {all, fork} from 'redux-saga/effects';
import PostsSaga from './PostsSaga';

export default function* rootSaga() {
  yield all([fork(PostsSaga)]);
}
