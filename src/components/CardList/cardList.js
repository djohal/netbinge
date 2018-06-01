import React from 'react';
import MovieCard from '../Card/card';

const CardList = ({ movies }) => {
  return (
    <div className='wrapper'>
      {
        movies.map((movie, i) => {
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

export default CardList;