import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Timeline from "./timeline";
import Volume from "./volume";

// Assets
import previous from "../assets/previous.svg";
import play from "../assets/play.svg";
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
    this.state = {
      isPlaying: false
    };
  }

  render() {
    let playStopButton = this.state.isPlaying ? (
      <button className="player__button">
        <img src={play} alt="stop" className="player__icon--small" />
      </button>
    ) : (
      <button className="player__button">
        <img src={play} alt="play" className="player__icon--small" />
      </button>
    );

    return (
      <div className="player">
        <div className="player__row">
          <div className="player__buttons">
            <button className="player__button">
              <img
                src={previous}
                alt="previous"
                className="player__icon--small"
              />
            </button>
            {playStopButton}
            <button className="player__button">
              <img src={next} alt="next" className="player__icon--small" />
            </button>
            <button className="player__button">
              <ShuffleIcon className="player__icon"></ShuffleIcon>
            </button>
            <button className="player__button">
              <RepeatIcon className="player__icon"></RepeatIcon>
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
              <img src="" alt="" />
            </div>
            <div className="player__info">
              <h2 className="player__title">lorem ipsum lorem ipsum</h2>
              <h3 className="player__author">author</h3>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
