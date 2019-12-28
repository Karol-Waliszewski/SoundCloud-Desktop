import React, { Component } from "react";

import Timeline from "./timeline";
import Volume from "./volume";

class Player extends Component {
  render() {
    return (
      <div className="player">
        <div className="player__row">
          <div className="player__buttons">
            <button className="player__button">
              <img src="" alt="" className="player__icon--small" />
            </button>
            <button className="player__button">
              <img src="" alt="" className="player__icon--small" />
            </button>
            <button className="player__button">
              <img src="" alt="" className="player__icon--small" />
            </button>
            <button className="player__button">
              <img src="" alt="" className="player__icon" />
            </button>
            <button className="player__button">
              <img src="" alt="" className="player__icon" />
            </button>
          </div>
          <Timeline></Timeline>
          <Volume></Volume>
          <div className="player__track">
            <div className="player__preview">
              <img src="" alt="" />
            </div>
            <h2 className="player__title">lorem ipsum</h2>
            <h3 className="player__author">author</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
