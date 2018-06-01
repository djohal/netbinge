import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <AppBar position="static" style={{backgroundColor: "#212121"}}>
        <Toolbar style={{justifyContent:"center"}}>
          <p>© Dilpreet Johal | 2018</p>
          <i className="fa fa-github icon-spacing"></i>
          <i className="fa fa-linkedin icon-spacing"></i>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;