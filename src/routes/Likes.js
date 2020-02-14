import React from "react";
import { connect } from "react-redux";

import SoundCloud from "../soundcloud";

class Likes extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: [],
      shuffled: [],
      active: []
    };
  }

  async fetchTracks() {
    let queue = [],
      shuffled = [],
      active = [];
    for (let t of this.props.queue) {
      let track = await SoundCloud.get(`/tracks/${t}`);
      queue.push(track.title);
    }
    for (let t of this.props.shuffled) {
      let track = await SoundCloud.get(`/tracks/${t}`);
      shuffled.push(track.title);
    }
    for (let t of this.props.active) {
      let track = await SoundCloud.get(`/tracks/${t}`);
      active.push(track.title);
    }
    this.setState({ queue, shuffled, active });
  }

  componentWillReceiveProps() {
    this.fetchTracks();
  }

  componentDidMount() {
    this.fetchTracks();
  }

  render() {
    this.fetchTracks();
    let { state } = this;
    return (
      <div className="sandbox">
        <ul>
          {state.queue.map(el => (
            <p>{el}</p>
          ))}
        </ul>
        <hr />
        <ul>
          {state.shuffled.map(el => (
            <p>{el}</p>
          ))}
        </ul>
        <hr />
        <ul>
          {state.active.map(el => (
            <p>{el}</p>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  queue: state.player.queue,
  shuffled: state.player.shuffledQueue,
  active: state.player.activeQueue
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
