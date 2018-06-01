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

  onListClick = (list) => {
    let self = this;
    
    fetch(`https://api.themoviedb.org/3/movie/${list}?api_key=d4fbc0cd7f3b6b7ea3c3b8e5c74b8f46`)
        .then(response=> response.json())
        .then(movies => {self.props.moviesTypeData(movies.results)});
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <h2 className="tileHeader">NetBinge Movies</h2>
        <Divider className={classes.divider}/>
        <p className="listButton" onClick={() => {this.onListClick('now_playing')}}> Now Playing </p>
        <p className="listButton" onClick={() => {this.onListClick('popular')}}> Popular </p>
        <p className="listButton" onClick={() => {this.onListClick('top_rated')}}> Top Rated </p>
        <p className="listButton" onClick={() => {this.onListClick('upcoming')}}> Upcoming </p>
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
              <SearchBox searchChange={this.props.searchChange}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);