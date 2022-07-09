export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_SUCCESS';

export function fetchMessagesSuccess(response) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    response,
  };
}

export function fetchMessagesFailure(error) {
  return {
    type: FETCH_MESSAGES_FAILURE,
    error,
  };
}

export function fetchMessagesRequest() {
  return {
    type: FETCH_MESSAGES_REQUEST,
  };
}
