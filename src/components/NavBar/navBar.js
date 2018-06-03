import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import * as movieActions  from '../../actions/movieActions';
import * as searchActions  from '../../actions/searchActions';
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

  onSearchChange = (event) => {
    this.props.searchActions.searchChange(event.target.value);
  }

  onListClick = (list) => {
    this.props.movieActions.requestMovies(list);
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
              <SearchBox searchChange={this.onSearchChange}/>
          </Toolbar>
        </AppBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));