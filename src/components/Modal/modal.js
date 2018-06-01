import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ReactPlayer from 'react-player/lib/players/YouTube'
import DialogContent from '@material-ui/core/DialogContent';
import './modal.css'

export default class Modal extends React.Component {
  state = {
    open: false,
    cardId: '',
    cardVidLink: ''
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
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d4fbc0cd7f3b6b7ea3c3b8e5c74b8f46`)
      .then(response=> response.json())
      .then(res => {
        let youTubeLink = `https://www.youtube.com/watch?v=`;
        let trailer = res.results.filter(video => {
          return video.type.includes('Trailer');
        });
                
        this.setState({ cardVidLink: youTubeLink + trailer[0].key})
      });
  }

  render() {
    return (
      <div>
        <Dialog
          modal="true"
          open={this.state.open}
          onClose={this.handleClose}
          autoscrollbodycontent="true"
          maxWidth="md"
        >
          <DialogContent > 
            <div id='player'>
              <ReactPlayer 
                url={this.state.cardVidLink} 
                playing={false} 
                controls={true}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}