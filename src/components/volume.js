import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { CHANGE_VOLUME, TOGGLE_VOLUME_MUTE } from "../actions/playerActions";

// Assets
import sound from "../assets/sound.svg";
import soundLow from "../assets/sound-low.svg";
import soundMute from "../assets/sound-mute.svg";

class Volume extends Component {
  constructor() {
    super();
    this.state = {
      currentVolume: 0,
      maxVolume: 100
    };
  }

  handleVolumeChange(event) {
    this.props.changeVolume(event.target.value);
  }

  render() {
    let { props } = this;
    let currentVolume = props.muted ? 0 : props.currentVolume;
    let icon =
      props.currentVolume == 0 || props.muted
        ? soundMute
        : props.currentVolume >= 0.5
        ? sound
        : soundLow;

    return (
      <div className="volume">
        <button className="volume__button" onClick={props.toggleMute}>
          <img src={icon} alt="volume" className="volume__icon" />
        </button>
        <div className="volume__wrapper">
          <div
            className="volume__line--current"
            orient="vertical"
            style={{
              height: (currentVolume / props.maxVolume) * 80 + "px"
            }}
          ></div>
          <input
            type="range"
            orient="vertical"
            className="volume__line"
            max={props.maxVolume}
            min={0}
            step={props.maxVolume / 100}
            value={currentVolume}
            onChange={this.handleVolumeChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentVolume: state.player.volume,
  maxVolume: state.player.maxVolume,
  muted: state.player.mute
});

const mapDispatchToProps = dispatch => ({
  changeVolume: volume => {
    dispatch(CHANGE_VOLUME(volume));
  },
  toggleMute: () => {
    dispatch(TOGGLE_VOLUME_MUTE());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Volume);
