import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { PLAY_TRACK, STOP, START } from "../actions/playerActions";

// Assets
import dots from "../assets/queueDots.svg";
import drag from "../assets/drag.svg";
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
    if (typeof image === "string") {
      image = image.replace("large", "t300x300");
    }

    // Checking if active
    let active = props.currentID === props.id;

    // Rendering play button
    let playButton;
    if (active && props.playing) {
      playButton = (
        <button className="queueTrack__play" onClick={this.props.stop}>
          <PauseIcon className="queueTrack__icon"></PauseIcon>
        </button>
      );
    } else if (active) {
      playButton = (
        <button className="queueTrack__play" onClick={this.props.start}>
          <PlayIcon className="queueTrack__icon"></PlayIcon>
        </button>
      );
    } else {
      playButton = (
        <button
          className="queueTrack__play"
          onClick={this.playTrack.bind(this)}
        >
          <PlayIcon className="queueTrack__icon"></PlayIcon>
        </button>
      );
    }

    return (
      <div
        className={`queueTrack ${props.isDragging ? "drag" : ""} ${
          active ? "active" : ""
        }`}
        ref={props.innerRef}
        {...props.draggableProps}
      >
        <div className="queueTrack__drag" {...props.dragHandleProps}>
          <img src={drag} alt="" />
        </div>
        <div className="queueTrack__image">
          <img className="queueTrack__thumbnail" src={image} alt="" />
          <div className="queueTrack__hover">{playButton}</div>
        </div>
        <div className="queueTrack__data">
          <h4 className="queueTrack__title" onClick={this.playTrack.bind(this)}>
            {props.title}
          </h4>
          <Link className="queueTrack__author" to={`/profile/${props.user.id}`}>
            {props.user.username}
          </Link>
        </div>
        <span className="queueTrack__duration">
          {minutes}:{seconds}
        </span>
        <div className="queueTrack__more">
          <button
            type="button"
            className="queueTrack__dots"
            title="More"
            onClick={this.stopPropagation}
            onFocus={this.toggleOptions.bind(this)}
            onBlur={this.toggleOptions.bind(this)}
          >
            <img src={dots} alt="3 dots" />
          </button>
          {state.options && (
            <ul className="queueTrack__options" onClick={this.stopPropagation}>
              <li>
                <button className="queueTrack__option">
                  <img src="" alt="" className="queueTrack__icon--option" />
                  Add to playlists
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

Track.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  artwork_url: PropTypes.string,
  duration: PropTypes.number.isRequired,
  innerRef: PropTypes.any
};

const mapStateToProps = state => ({
  currentID: state.player.currentTrackID,
  playing: state.player.playerState === "playing" ? true : false
});

const mapDispatchToProps = dispatch => ({
  playTrack: (id, play) => {
    dispatch(PLAY_TRACK(id, play));
  },
  stop: () => {
    dispatch(STOP());
  },
  start: () => {
    dispatch(START());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
