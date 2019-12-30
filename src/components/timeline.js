import React, { Component } from "react";

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: 0,
      absoluteTime: 241
    };
  }

  handleTimeChange(event) {
    this.setState({ currentTime: event.target.value });
  }

  render() {
    let { state } = this;

    return (
      <div className="timeline">
        <p className="timeline__time--current">
          {parseInt(state.currentTime / 60)}:
          {state.currentTime % 60 < 10
            ? "0" + (state.currentTime % 60)
            : state.currentTime % 60}
        </p>
        <div className="timeline__wrapper">
          <div
            className="timeline__line--current"
            style={{
              width: (state.currentTime / state.absoluteTime) * 100 + "%"
            }}
          ></div>
          <input
            type="range"
            className="timeline__line"
            max={state.absoluteTime}
            min={0}
            value={state.currentTime}
            onChange={this.handleTimeChange.bind(this)}
          />
        </div>
        <p className="timeline__time">
          {parseInt(state.absoluteTime / 60)}:
          {state.absoluteTime % 60 < 10
            ? "0" + (state.absoluteTime % 60)
            : state.absoluteTime % 60}
        </p>
      </div>
    );
  }
}

export default Timeline;
