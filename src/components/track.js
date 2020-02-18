import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import {
  ADD_AND_PLAY_TRACK,
  ADD_TO_QUEUE,
  STOP,
  START
} from "../actions/playerActions";

// Assets
import dots from "../assets/dots.svg";
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { ReactComponent as PauseIcon } from "../assets/pause.svg";

class Track extends Component {
  constructor() {
    super();

    this.state = { options: false };
  }

  playTrack() {
    let { props } = this;
    if (props.id) {
      props.playTrack(props.id, true);
    }
  }

  addToQueue() {
    let { props } = this;
    if (props.id) {
      props.addToQueue(props.id);
    }
    alert("TODO: add notification");
  }

  toggleOptions() {
    setTimeout(() => {
      this.setState({ options: !this.state.options });
    }, 100);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    let { props, state } = this;

    // Getting duration
    let duration = props.duration / 1000;
    let minutes = parseInt(duration / 60);
    let seconds =
      duration % 60 < 10
        ? "0" + parseInt(duration % 60)
        : parseInt(duration % 60);

    // Getting image
    let image = props.artwork_url || props.user.avatar_url;
    if (typeof image == "string") {
      image = image.replace("large", "t300x300");
    }

    // Checking if active
    let active = props.currentID == props.id;

    // Rendering play button
    let playButton;
    if (active && props.playing) {
      playButton = (
        <button className="track__play" onClick={this.props.stop}>
          <PauseIcon className="track__icon"></PauseIcon>
        </button>
      );
    } else if (active) {
      playButton = (
        <button className="track__play" onClick={this.props.start}>
          <PlayIcon className="track__icon"></PlayIcon>
        </button>
      );
    } else {
      playButton = (
        <button className="track__play" onClick={this.playTrack.bind(this)}>
          <PlayIcon className="track__icon"></PlayIcon>
        </button>
      );
    }

    return (
      <div className="track">
        <div className="track__image">
          <img className="track__thumbnail" src={image} alt="" />
          <div className="track__hover">
            {playButton}

            <div className="track__more">
              <button
                type="button"
                className="track__dots"
                title="More"
                onClick={this.stopPropagation}
                onFocus={this.toggleOptions.bind(this)}
                onBlur={this.toggleOptions.bind(this)}
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
              {minutes}:{seconds}
            </span>
          </div>
        </div>
        <h4 className="track__title" onClick={this.playTrack.bind(this)}>
          {props.title}
        </h4>
        <Link className="track__author" to={`/profile/${props.user.id}`}>
          {props.user.username}
        </Link>
      </div>
    );
  }
}

Track.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  artwork_url: PropTypes.string,
  duration: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  currentID: state.player.currentTrackID,
  playing: state.player.playerState == "playing" ? true : false
});

const mapDispatchToProps = dispatch => ({
  playTrack: (id, play) => {
    dispatch(ADD_AND_PLAY_TRACK(id, play));
  },
  addToQueue: id => {
    dispatch(ADD_TO_QUEUE(id));
  },
  stop: () => {
    dispatch(STOP());
  },
  start: () => {
    dispatch(START());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
