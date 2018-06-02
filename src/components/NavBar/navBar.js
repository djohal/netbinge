import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import SearchBox from '../SearchBox/searchBox';

import './navBar.css';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  iconButton: {
    color: 'white'
  },
  divider: {
    marginBottom: '15px'
  }
});

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, searchChange, onListClick } = this.props;

    const sideList = (
      <div className={classes.list}>
        <h2 className="tileHeader">NetBinge Movies</h2>
        <Divider className={classes.divider}/>
        <p className="listButton" onClick={() => {onListClick('now_playing')}}> Now Playing </p>
        <p className="listButton" onClick={() => {onListClick('popular')}}> Popular </p>
        <p className="listButton" onClick={() => {onListClick('top_rated')}}> Top Rated </p>
        <p className="listButton" onClick={() => {onListClick('upcoming')}}> Upcoming </p>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: "#212121"}}>
          <Toolbar>
            <IconButton className={classes.iconButton} onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>
            <h1 className='flex'>NetBinge</h1>
              <SearchBox searchChange={searchChange}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);