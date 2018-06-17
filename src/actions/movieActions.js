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

export function requestMovieVideosSuccess(video) {
  return {
    type: types.REQUEST_MOVIE_VIDEOS_SUCCESS,
    video
  };
}

export function requestMovieVideos(id) {
  return function(dispatch) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d4fbc0cd7f3b6b7ea3c3b8e5c74b8f46`)
      .then(response => response.json())
      .then(res => {
        let youTubeLink = `https://www.youtube.com/watch?v=`;
        let trailer = res.results.filter(video => {
          return video.type.includes('Trailer');
        });
        dispatch(requestMovieVideosSuccess(youTubeLink + trailer[0].key));
      })
      .catch(error => {
        throw (error);
      });
  }
};

export function requestMovieDetailsSuccess(details) {
  return {
    type: types.REQUEST_MOVIE_DETAILS_SUCCESS,
    details
  };
}

export function requestMovieDetails(id) {
  return function(dispatch) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d4fbc0cd7f3b6b7ea3c3b8e5c74b8f46`)
      .then(response => response.json())
      .then(res => {
        dispatch(requestMovieDetailsSuccess(res));
      })
      .catch(error => {
        throw (error);
      });
  }
};

export function requestMovieCreditsSuccess(credits) {
  return {
    type: types.REQUEST_MOVIE_CREDITS_SUCCESS,
    credits
  };
}

export function requestMovieCredits(id) {
  return function(dispatch) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=d4fbc0cd7f3b6b7ea3c3b8e5c74b8f46`)
      .then(response => response.json())
      .then(res => {
        dispatch(requestMovieCreditsSuccess(res));
      })
      .catch(error => {
        throw (error);
      });
  }
};