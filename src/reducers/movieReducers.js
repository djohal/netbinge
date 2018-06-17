import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function movieReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MOVIES_SUCCESS:
      return {...state, moviesList: action.moviesList}

    case types.REQUEST_MOVIE_VIDEOS_SUCCESS:
      return {...state, movieVid: action.video}

    case types.REQUEST_MOVIE_DETAILS_SUCCESS:
      return {...state, movieDetails: action.details}

    case types.REQUEST_MOVIE_CREDITS_SUCCESS:
      return {...state, movieCredits: action.credits}

    default:
      return state;
  }
}