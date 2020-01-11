import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import Soundcloud, {
  ADD_AND_PLAY_TRACK,
  ADD_TO_QUEUE,
  START_QUEUE
} from "../actions/playerActions";

class Playlist extends Component {
  playPlaylist() {
    let { props } = this;
    if (props.id) {
      Soundcloud.get(`/playlists/${props.id}/tracks`, {
        limit: 500
      }).then(tracks => {
        if (tracks) {
          // Get IDs of streamable tracks
          let ids = tracks
            .filter(track => track.streamable)
            .map(track => track.id);
          props.startQueue(ids, true);
        }
      });
    }
  }

  render() {
    let { props } = this;

    return (
      <div className="track">
        <div className="track__image" onClick={this.playPlaylist.bind(this)}>
          <img src={props.image} alt="" />
        </div>
        <h4 className="track__title" onClick={this.playPlaylist.bind(this)}>
          {props.title}
        </h4>
        <p className="track__author">{props.author}</p>
      </div>
    );
  }
}

Playlist.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  playTrack: (id, play) => {
    dispatch(ADD_AND_PLAY_TRACK(id, play));
  },
  addToQueue: id => {
    dispatch(ADD_TO_QUEUE(id));
  },
  startQueue: (queue, play) => {
    dispatch(START_QUEUE(queue, play));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
