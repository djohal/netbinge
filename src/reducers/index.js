import { combineReducers } from 'redux';
import movies from './movieReducers';
import search from './searchReducers';

const rootReducer  = combineReducers({
  movies,
  search
});

export default rootReducer;
