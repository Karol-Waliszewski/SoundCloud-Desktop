import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Timeline from "./timeline";
import Volume from "./volume";

// Actions
import Soundcloud, {
  STOP,
  START,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  TOGGLE_LOOP
} from "../actions/playerActions";

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
    Soundcloud.get(`/tracks/${id}`).then(track => {
      console.log(track);
      this.setState({ track });
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
                <h3 className="player__author">{state.track.user.username}</h3>
              )}
            </div>
            <button className="player__like">
              <LikeIcon className="player__icon--small active"></LikeIcon>
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
  loop: state.player.loop
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
