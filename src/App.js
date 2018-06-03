import React from 'react';
import { withRouter } from 'react-router';
import NavBar from './components/NavBar/navBar';
import Footer from './components/Footer/footer';

const App = (props) => {
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
}

export default withRouter(App);