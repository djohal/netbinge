import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import MovieDetail from './components/MovieDetail/movieDetail';
import CardList from './components/CardList/cardList';

export default () => {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/' component={CardList}/>
          <Route exact path='/movie/:id' component={MovieDetail}/>
        </Switch>
      </App>
    </BrowserRouter>
  )
}