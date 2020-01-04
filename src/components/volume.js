import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { CHANGE_VOLUME } from "../actions/playerActions";

// Assets
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
    this.props.changeVolume(event.target.value);
  }

  render() {
    let { props } = this;

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
              height: (props.currentVolume / props.maxVolume) * 80 + "px"
            }}
          ></div>
          <input
            type="range"
            orient="vertical"
            className="volume__line"
            max={props.maxVolume}
            min={0}
            step={props.maxVolume / 100}
            value={props.currentVolume}
            onChange={this.handleVolumeChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentVolume: state.player.volume,
  maxVolume: state.player.maxVolume
});

const mapDispatchToProps = dispatch => ({
  changeVolume: volume => {
    dispatch(CHANGE_VOLUME(volume));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Volume);
