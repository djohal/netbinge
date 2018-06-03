import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as movieActions  from '../../actions/movieActions';
import './card.css'

function trunc (string, n) {
  return (string.length > n) ? string.substr(0, n-1) + ' ...' : string;
};

class MovieCard extends React.Component { 
  state = {
    cardId: '',
  };

  getCardId = (id) => {
    this.setState({cardId: id});
  }

  render() {
    let { id, title, overview, image, date } = this.props;
    image = `https://image.tmdb.org/t/p/w500${image}`;
    overview = trunc(overview, 150);
    return (
      <div className='cardDiv'>
        <Card id="card" onClick={() => {
          this.getCardId(id);
          this.props.history.push(`/movie/${id}`)
        }}>
          <CardHeader
            title={title}
            subheader={date}
          />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieCard));

