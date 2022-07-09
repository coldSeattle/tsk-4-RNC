import {put, takeEvery, all, call} from 'redux-saga/effects';
import {fetchMessagesAPI} from '../../api';
import {createTable, getDBConnection, saveMessages} from '../../db-service';
import {fetchMessagesFailure, fetchMessagesSuccess} from '../actions';

function* fetchMessagesSaga() {
  try {
    const response = yield call(fetchMessagesAPI);

    const db = yield call(getDBConnection);
    yield call(createTable, db);
    yield put(fetchMessagesSuccess(response));
    yield call(saveMessages, db, response);
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
