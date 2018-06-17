import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '../Modal/modal';
import * as movieActions  from '../../actions/movieActions';
import './card.css'

function trunc (string, n) {
  return (string.length > n) ? string.substr(0, n-1) + ' ...' : string;
};

class MovieCard extends React.Component { 
  state = {
    open: false,
    cardId: '',
    movieVid: ''
  };
  
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  getCardId = (id) => {
    this.setState({cardId: id});
  }

  getVidLink = (id) => {
    this.props.movieActions.requestMovieVideos(id);
    this.setState({movieVid: this.props.movieVid});
  }

  render() {
    let { id, title, overview, image, date } = this.props;
    image = `https://image.tmdb.org/t/p/w500${image}`;
    overview = trunc(overview, 150);
    return (
      <div className='cardDiv'>
        <Card id="card">
          <CardHeader
            title={title}
            subheader={date}
          />
          <div className="overlay"></div>
          <div className="trailer">
            <span className='button-span' onClick={() => {
              this.getCardId(id);
              this.getVidLink(id);
              this.handleOpen();
            }}> WATCH TRAILER </span>
          </div>
          <div className="details">
            <span className='button-span'> MORE DETAILS </span>
          </div>
          <CardMedia
            className='media'
            image={image}
            title={title}
          />
          <CardContent>
            <Typography component="p">
            {overview}
            </Typography>
          </CardContent>
        </Card>
        {          
          this.props.movieVid !== '' && this.props.movieVid !==  this.state.movieVid
            ? <Modal movieVid={this.props.movieVid} open={this.state.open} close={this.handleClose}/>
            : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    movieVid: state.movies.movieVid,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);