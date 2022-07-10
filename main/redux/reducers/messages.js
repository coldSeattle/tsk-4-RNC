import {FETCH_MESSAGES_SUCCESS} from '../actions';

export const messages = (state, {type, payload}) => {
  if (type === FETCH_MESSAGES_SUCCESS) {
    return {
      messages: payload,
      ...state,
    };
  }
  return {...state};
};
