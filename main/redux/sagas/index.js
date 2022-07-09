import {put, takeEvery, all, call} from 'redux-saga/effects';
import {fetchMessagesAPI} from '../../api';
import {fetchMessagesFailure, fetchMessagesSuccess} from '../actions';

function* fetchMessagesSaga() {
  try {
    const response = yield call(fetchMessagesAPI);
    yield put(fetchMessagesSuccess(response));
  } catch (error) {
    yield put(fetchMessagesFailure(error.message));
  }
}

function* watchMessagesSaga() {
  yield takeEvery('MESSAGES_ASYNC', fetchMessagesSaga);
}

export default function* rootSaga() {
  yield all([watchMessagesSaga()]);
}
