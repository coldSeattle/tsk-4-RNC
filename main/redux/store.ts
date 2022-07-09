import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {rootReduver} from './reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReduver, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
