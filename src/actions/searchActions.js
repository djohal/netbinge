import * as types from './actionTypes';

export function setSearchField(text) {
  return {
    type: types.SEARCH_FIELD,
    text
  };
}

export function searchChange(text) {
  return (dispatch) => {
    dispatch(setSearchField(text));
  }
};