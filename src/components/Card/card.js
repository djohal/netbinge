import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '../Modal/modal';
import './card.css'

function trunc (string, n) {
  return (string.length > n) ? string.substr(0, n-1) + ' ...' : string;
};

const MovieCard = ({ id, title, overview, image, date }) =>  { 
  image = `https://image.tmdb.org/t/p/w500${image}`;
  overview = trunc(overview, 150);

    return (
      <div className='cardDiv'>
        <Modal ref={instance => { this.child = instance; }} />
        <Card id="card" onClick={() => {
          this.child.getCardId(id);
          this.child.getVidLink(id);
          this.child.handleOpen();
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
        <Modal/>
      </div>
    );
  }

export default MovieCard;
