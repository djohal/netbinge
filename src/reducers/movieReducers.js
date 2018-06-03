import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function movieReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MOVIES_SUCCESS:
      return {...state, moviesList: action.moviesList}

    case types.REQUEST_MOVIE_VIDEOS_SUCCESS:
      return {...state, movieVid: action.video}

    default:
      return state;
  }
}