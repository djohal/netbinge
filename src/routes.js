import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import MovieDetail from './components/MovieDetail/movieDetail';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/movie/:id' component={MovieDetail}/>
      </Switch>
    </BrowserRouter>
  )
}