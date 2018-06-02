import * as types from './actionTypes';

export function requestMoviesSuccess(moviesList) {
  return {
    type: types.REQUEST_MOVIES_SUCCESS,
    moviesList
  };
}

export function requestMovies(movieType) {
  return function(dispatch) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieType}?api_key=d4fbc0cd7f3b6b7ea3c3b8e5c74b8f46`)
      .then(response => response.json())
      .then(moviesList => {
        dispatch(requestMoviesSuccess(moviesList.results))
      })
      .catch(error => {
        throw (error);
      });
  }
};