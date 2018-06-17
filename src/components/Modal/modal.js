import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ReactPlayer from 'react-player/lib/players/YouTube'
import DialogContent from '@material-ui/core/DialogContent';
import './modal.css'

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieVid: '',
    }
  }

  componentDidMount(){
    this.setState({movieVid: this.props.movieVid});
  }

  componentWillReceiveProps(nextProps) {    
    if(this.props.movieVid !== '' && this.props.movieVid !== nextProps.movieVid) {
      this.setState({movieVid: nextProps.movieVid});
    }
  }

  render() {
    const {open, close, movieVid} = this.props;
    // console.log(movieVid);
    
    return (
      <div>
        <Dialog
          modal="true"
          open={open}
          onClose={close}
          autoscrollbodycontent="true"
          maxWidth="md"
        >
          <DialogContent > 
            {
              this.state.movieVid !== '' && this.state.movieVid === movieVid
              ? (
                <div id='player'>
                    <ReactPlayer 
                      url={this.state.movieVid} 
                      playing={false} 
                      controls={true}
                    />
                  </div>
                  
                )
              : <h1>Loading..</h1>
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Modal;