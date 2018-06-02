import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function movieReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEARCH_FIELD:
      return {...state, searchField: action.text}

    default:
      return state;
  }
}