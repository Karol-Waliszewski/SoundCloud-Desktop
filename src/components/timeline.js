import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { CHANGE_TIME } from "../actions/playerActions";

class Timeline extends Component {
  handleTimeChange(event) {
    this.props.changeTime(event.target.value * 1000);
  }

  render() {
    let { props } = this;

    return (
      <div className="timeline">
        <p className="timeline__time--current">
          {parseInt(props.currentTime / 60)}:
          {props.currentTime % 60 < 10
            ? "0" + parseInt(props.currentTime % 60)
            : parseInt(props.currentTime % 60)}
        </p>
        <div className="timeline__wrapper">
          <div
            className="timeline__line--current"
            style={{
              width: (props.currentTime / props.duration) * 100 + "%"
            }}
          ></div>
          <input
            type="range"
            className="timeline__line"
            max={props.duration}
            min={0}
            value={props.currentTime}
            onChange={this.handleTimeChange.bind(this)}
          />
        </div>
        <p className="timeline__time">
          {parseInt(props.duration / 60)}:
          {props.duration % 60 < 10
            ? "0" + parseInt(props.duration % 60)
            : parseInt(props.duration % 60)}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTime: (state.player.time / 1000).toFixed(2),
  duration: (state.player.duration / 1000).toFixed(2)
});

const mapDispatchToProps = dispatch => ({
  changeTime: time => {
    dispatch(CHANGE_TIME(time));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
