import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {rootReducer} from './reducers';
import {configureStore, MiddlewareArray} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
