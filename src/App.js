import React, { Component } from 'react';
import NavBar from './components/NavBar/navBar';
import CardList from './components/CardList/cardList';
import Footer from './components/Footer/footer';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchField: '',
      moviesTypeData: ''
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=d4fbc0cd7f3b6b7ea3c3b8e5c74b8f46')
      .then(response=> response.json())
      .then(movies => {this.setState({ movies: movies.results})});
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  getMovieTypeData = (data) => {
    this.setState({moviesTypeData: data});
  }

  filterMovies = (movies, searchField) => {
    let filteredMovies = movies.filter(movie => {
      return movie.title.toLowerCase().includes(searchField.toLowerCase());
    });
    return filteredMovies;
  }

  render() {
    const { movies, searchField, moviesTypeData } = this.state;
    let filteredMovies;

    if(moviesTypeData.length) {
      if(searchField.length) {
        filteredMovies = this.filterMovies(moviesTypeData, searchField);
      } else {
        filteredMovies = moviesTypeData;
      }
    } else {
      filteredMovies = this.filterMovies(movies, searchField);
    }

    return (
      <div>
        <NavBar searchChange={this.onSearchChange} moviesTypeData={this.getMovieTypeData}/>
        <CardList movies={filteredMovies} />
        <Footer />
      </div>
    );
  }
}

export default App;