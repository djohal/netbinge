import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import * as movieActions from '../../actions/movieActions';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GenreIcon from '@material-ui/icons/LocalOffer';
import ReleaseDate from '@material-ui/icons/DateRange';
import RunTime from '@material-ui/icons/AccessTime';
import Countries from '@material-ui/icons/Public';
import Budget from '@material-ui/icons/AttachMoney';
import Cast from '@material-ui/icons/People';
import './movieDetail.css'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
});

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualVid: '',
      movieDetails: {},
      movieCast: [],
      poster: '',
      genres: []
    }
    if(!!this.props.location) {
      let id = this.props.location.pathname.match(/\d+/g).map(Number)[0];
      this.props.movieActions.requestMovieVideos(id);
      this.props.movieActions.requestMovieDetails(id);
      this.props.movieActions.requestMovieCredits(id);
    }
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.movieVid != null && this.props.movieVid !== nextProps.movieVid) {
      this.setState({actualVid: nextProps.movieVid});
    }

    if(this.props.movieDetails != null && this.props.movieDetails !== nextProps.movieDetails) {
      this.setState({movieDetails: nextProps.movieDetails});
      this.setState({poster: nextProps.movieDetails.poster_path});
      this.setState({genres: nextProps.movieDetails.genres});
    }
    if(this.props.movieCredits != null && this.props.movieCredits !== nextProps.movieCredits) {
      this.setState({movieCast: nextProps.movieCredits.cast});
    }
  }

  render() {
    let image = 'https://image.tmdb.org/t/p/original';
    const {poster, movieDetails, movieCast, genres} = this.state;
    const { classes } = this.props;
    console.log(movieDetails);
    
    return (
      Object.keys(movieDetails).length === 0 || poster === '' || movieCast.length === 0 || genres.length === 0 ? <h1>Loading...</h1> : (
        <div id="movieDetail-wrapper">
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <img id='poster' alt='' src={`${image}${movieDetails.poster_path}`} />
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.root}>
              <Typography variant="headline" component="h3">
                Overview
              </Typography>
              <Typography component="p">
                {movieDetails.overview}
              </Typography>
              </Paper>
              <br />
              <Paper className={classes.root}>
              <Typography variant="headline" component="h3">
                Details
              </Typography>
              <Typography component="p">
                <div className='details-row'>
                  <GenreIcon />
                  {
                    genres.map((genre, i) => (
                      <span className='badge' key={i}> {genre.name}</span>
                    ))
                  }
                </div>
              </Typography>
              <Typography component="p">
                <div className='details-row'>
                  <ReleaseDate />
                  {movieDetails.release_date}
                </div>
              </Typography>
              <Typography component="p">
                <div className='details-row'>
                  <RunTime />
                  {movieDetails.runtime} mins
                </div>
              </Typography>
              <Typography component="p">
                <div className='details-row'>
                  <Countries />
                  {
                    movieDetails.production_countries.map((country, i) => (
                      <span className='badge blackBadge' key={i}> {country.iso_3166_1} </span>
                    ))
                  }
                </div>
              </Typography>
              <Typography component="p">
                <div className='details-row'>
                  <Budget />
                  $ {(movieDetails.budget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
                </div>
              </Typography>
              <Typography component="p">
                <div className='details-row'>
                  <Cast />
                  {
                    movieCast.map((credits, i) => (
                      credits.name + ', '
                    ))
                  }
                </div>
              </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    );
  }  
}

function mapStateToProps(state) {
  return {
    movieDetails: state.movies.movieDetails,
    movieCredits: state.movies.movieCredits,
    movieVid: state.movies.movieVid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
  };
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MovieDetail));
