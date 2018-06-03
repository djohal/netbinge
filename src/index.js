import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import AppRoutes from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
