export const messages = (state, {type, payload}) => {
  if (type === 'SUCCESS_FETCHED') {
    return {
      messages: {...state.messages, ...payload},
      ...state,
    };
  }
};
