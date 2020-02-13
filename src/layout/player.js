import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import Timeline from "../components/timeline";
import Volume from "../components/volume";

// Actions
import Soundcloud from "../soundcloud";
import {
  STOP,
  START,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  TOGGLE_LOOP
} from "../actions/playerActions";
import { TOGGLE_QUEUE } from "../actions/layoutActions";

// Assets
import previous from "../assets/previous.svg";
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import next from "../assets/next.svg";

// import { ReactComponent as Icon } from "../assets/previous.svg";
// import { ReactComponent as PlayIcon } from "../assets/play.svg";
// import { ReactComponent as NextIcon } from "../assets/next.svg";
import { ReactComponent as ShuffleIcon } from "../assets/shuffle.svg";
import { ReactComponent as RepeatIcon } from "../assets/repeat.svg";
import { ReactComponent as LikeIcon } from "../assets/like.svg";
import { ReactComponent as QueueIcon } from "../assets/queue.svg";

class Player extends Component {
  constructor() {
    super();
    this.state = { track: {} };
  }

  componentDidUpdate(prevProps) {
    if (this.props.trackID !== prevProps.trackID) {
      this.fetchTrack(this.props.trackID);
    }
  }

  fetchTrack(id) {
    Soundcloud.get(`/tracks/${id}`)
      .then(track => {
        this.setState({ track });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let { state, props } = this;

    let playStopButton =
      this.props.playerState === "playing" ? (
        <button className="player__button" onClick={this.props.stop}>
          <img src={pause} alt="stop" className="player__icon--small" />
        </button>
      ) : (
        <button className="player__button" onClick={this.props.start}>
          <img src={play} alt="play" className="player__icon--small" />
        </button>
      );

    return (
      <div className="player">
        <div className="player__row">
          <div className="player__buttons">
            <button className="player__button" onClick={props.previous}>
              <img
                src={previous}
                alt="previous"
                className="player__icon--small"
              />
            </button>
            {playStopButton}
            <button className="player__button" onClick={props.next}>
              <img src={next} alt="next" className="player__icon--small" />
            </button>
            <button className="player__button">
              <ShuffleIcon className="player__icon"></ShuffleIcon>
            </button>
            <button className="player__button" onClick={props.toggleRepeat}>
              <RepeatIcon
                className={`player__icon ${props.loop ? "active" : ""}`}
              ></RepeatIcon>
            </button>
          </div>
          <div className="player__timeline">
            <Timeline></Timeline>
          </div>
          <div className="player__volume">
            <Volume></Volume>
          </div>

          <div className="player__track">
            <div className="player__preview">
              <img src={state.track.artwork_url} alt="" />
            </div>
            <div className="player__info">
              <h2 className="player__title">{state.track.title}</h2>
              {state.track.user && (
                <Link
                  className="player__author"
                  to={`/profile/${state.track.user.id}`}
                >
                  {state.track.user.username}
                </Link>
              )}
            </div>
            <button className="player__like">
              <LikeIcon className="player__icon--xs active"></LikeIcon>
            </button>
            <button className="player__button" onClick={props.toggleQueue}>
              <QueueIcon
                className={`player__icon ${props.queueActive ? "active" : ""}`}
              ></QueueIcon>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerState: state.player.playerState,
  trackID: state.player.currentTrackID,
  loop: state.player.loop,
  queueActive: state.layout.queueActive
});

const mapDispatchToProps = dispatch => ({
  start: () => {
    dispatch(START());
  },
  stop: () => {
    dispatch(STOP());
  },
  next: () => {
    dispatch(NEXT_TRACK());
  },
  previous: () => {
    dispatch(PREVIOUS_TRACK());
  },
  toggleRepeat: () => {
    dispatch(TOGGLE_LOOP());
  },
  toggleQueue: () => {
    dispatch(TOGGLE_QUEUE());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
