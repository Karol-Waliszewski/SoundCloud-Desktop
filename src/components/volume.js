import React, { Component } from "react";

import sound from "../assets/sound.svg";

class Volume extends Component {
  constructor() {
    super();
    this.state = {
      currentVolume: 0,
      maxVolume: 100
    };
  }

  handleVolumeChange(event) {
    this.setState({ currentVolume: event.target.value });
  }

  render() {
    let { state } = this;

    return (
      <div className="volume">
        <button className="volume__button">
          <img src={sound} alt="volume" className="volume__icon" />
        </button>
        <div className="volume__wrapper">
          <div
            className="volume__line--current"
            orient="vertical"
            style={{
              height: (state.currentVolume / state.maxVolume) *  80 + "px"
            }}
          ></div>
          <input
            type="range"
            orient="vertical"
            className="volume__line"
            max={state.maxVolume}
            min={0}
            value={state.currentVolume}
            onChange={this.handleVolumeChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Volume;
