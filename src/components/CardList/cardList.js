import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as movieActions  from '../../actions/movieActions';
import * as searchActions  from '../../actions/searchActions';
import MovieCard from '../Card/card';

class CardList extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchField: '',
    }
  }
  
  componentDidMount() {
    this.props.movieActions.requestMovies('now_playing');
  }

  componentWillReceiveProps(props, nextProps) {
    if(props.moviesList && props.moviesList.length) {
      this.setState({movies: props.moviesList})
    }
    if(props.searchField && props.searchField !== '') {
      this.setState({ searchField: props.searchField })
    }
  }

  onSearchChange = (event) => {
    this.props.searchActions.searchChange(event.target.value);
  }

  onListClick = (list) => {
    this.props.movieActions.requestMovies(list);
  }

  filterMovies = (movies, searchField) => {
    let filteredMovies = movies.filter(movie => {
      return movie.title.toLowerCase().includes(searchField.toLowerCase());
    });
    return filteredMovies;
  }

  render() {
    const { movies, searchField } = this.state;
    let filteredMovies;
    
    searchField.length
      ? filteredMovies = this.filterMovies(movies, searchField)
      : filteredMovies = movies;
    return (
      <div className='wrapper'>
        {
          filteredMovies.map((movie, i) => {
            return (
              <MovieCard
                key={i}
                id={movie.id}
                title={movie.original_title}
                overview={movie.overview}
                image={movie.poster_path}
                date={movie.release_date}
                />
            );
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    moviesList: state.movies.moviesList,
    searchField: state.search.searchField
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);