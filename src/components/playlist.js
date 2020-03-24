import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Assets
import dots from "../assets/dots.svg";
import { ReactComponent as PlayIcon } from "../assets/play.svg";

// Actions
import Soundcloud from "../soundcloud";
import {
  ADD_AND_PLAY_TRACK,
  ADD_TO_QUEUE,
  START_QUEUE
} from "../actions/playerActions";
import { Link } from "react-router-dom";

class Playlist extends Component {
  constructor() {
    super();
    this.state = { options: false };
  }

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

  addToQueue() {
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

          props.addToQueue(ids);

          alert("TODO: add entire playlist adding notification");
        }
      });
    }
  }

  toggleOptions(e) {
    e.stopPropagation();
    setTimeout(() => {
      this.setState({ options: !this.state.options });
    }, 100);
  }

  closeOptions() {
    setTimeout(() => {
      this.setState({ options: false });
    }, 100);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    let { props, state } = this;

    let image =
      props.artwork_url != null
        ? props.artwork_url.replace("large", "t300x300")
        : props.user.avatar_url.replace("large", "t300x300");

    let duration = props.duration / 1000;
    let hours = parseInt(duration / 3600);
    let minutes =
      (duration % 3600) / 60 < 10
        ? "0" + parseInt((duration % 3600) / 60)
        : parseInt((duration % 3600) / 60);
    let seconds =
      duration % 60 < 10
        ? "0" + parseInt(duration % 60)
        : parseInt(duration % 60);

    return (
      <div className="track">
        <div className="track__image" onClick={this.playPlaylist.bind(this)}  onMouseLeave={this.closeOptions.bind(this)}>
          <img className="track__thumbnail" src={image} alt="" />
          <div className="track__hover">
            <button className="track__play">
              <PlayIcon className="track__icon"></PlayIcon>
            </button>

            <div className="track__more">
              <button
                type="button"
                className="track__dots"
                title="More"
                onClick={this.toggleOptions.bind(this)}
                onBlur={this.closeOptions.bind(this)}
              >
                <img src={dots} alt="3 dots" />
              </button>
              {state.options && (
                <ul className="track__options" onClick={this.stopPropagation}>
                  <li>
                    <button
                      className="track__option"
                      onClick={this.addToQueue.bind(this)}
                    >
                      <img src="" alt="" className="track__icon--option" />
                      Add to Next up
                    </button>
                  </li>
                  <li>
                    <button className="track__option">
                      <img src="" alt="" className="track__icon--option" />
                      Add to playlists
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <span className="track__duration">
              {hours > 0 && hours + ":"}
              {minutes}:{seconds}
            </span>

            <span className="track__tracks">Tracks: {props.track_count}</span>
          </div>
        </div>
        <h4 className="track__title" onClick={this.playPlaylist.bind(this)}>
          {props.title}
        </h4>
        <Link className="track__author" to={`/profile/${props.user.id}`}>
          {props.user.username}
        </Link>
      </div>
    );
  }
}

Playlist.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  track_count: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  duration: PropTypes.number.isRequired,
  image: PropTypes.string,
  artwork_url: PropTypes.string
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
