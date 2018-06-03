import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as movieActions from '../../actions/movieActions';
import ReactPlayer from 'react-player/lib/players/YouTube'
// import './movieDetail.css'

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualVid: ''
    }
    if(!!this.props.location) {
      let id = this.props.location.pathname.match(/\d+/g).map(Number)[0];
      this.props.movieActions.requestMovieVideos(id);
    }
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.movieVid != null && this.props.movieVid !== nextProps.movieVid) {
      this.setState({actualVid: nextProps.movieVid});
    }
  }

  render() {
    return (
      <div id="player-wrapper">
        <div>
          {this.state.actualVid === '' ? <h1>Loading...</h1> : (
            <ReactPlayer 
              url={this.state.actualVid} 
              playing={false} 
              controls={true}
              id="player"
            />
          )}
        </div>
      </div>
    );
  }  
}

function mapStateToProps(state) {
  return {
    movieData: state.movies.movieData,
    movieVid: state.movies.movieVid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
