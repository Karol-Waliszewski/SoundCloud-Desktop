import React, { Component } from "react";
import { connect } from "react-redux";
import SoundCloud from "../soundcloud";

// Actions
import { TOGGLE_QUEUE } from "../actions/layoutActions";
import {
  UPDATE_QUEUE,
  UPDATE_SHUFFLED_QUEUE,
  UPDATE_ACTIVE_QUEUE
} from "../actions/playerActions";

// Components
import Track from "../components/queueTrack";

// Assets
import close from "../assets/close.svg";

class Queue extends Component {
  constructor() {
    super();
    this.state = { queue: [] };
  }

  async fetchTracks(tracks) {
    //TODO: improve efficiency
    let queue = [];
    try {
      for (let t of tracks) {
        let track = await SoundCloud.get(`/tracks/${t}`);
        queue.push(track);
      }
    } catch (error) {
      console.log(error);
    }

    this.setState({ queue });
  }

  renderTracks() {
    return this.state.queue.map((track, i) => (
      <Track key={i} {...track}></Track>
    ));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.queue != newProps.queue) this.fetchTracks(newProps.queue);
  }

  componentDidMount() {
    this.fetchTracks(this.props.queue);
  }

  render() {
    let { props } = this;
    let list = this.renderTracks();

    return (
      <section className={`queue ${props.active ? "active" : ""}`}>
        <header className="queue__header">
          <h3 className="queue__heading">Next up</h3>
          <div className="queue__buttons">
            <button className="queue__clear" onClick={props.clearQueue}>
              Clear
            </button>
            <button className="queue__close" onClick={props.closeQueue}>
              <img src={close} alt="x (close)" />
            </button>
          </div>
        </header>
        <div className="queue__list">{list}</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  active: state.layout.queueActive,
  queue: state.player.activeQueue
});

const mapDispatchToProps = dispatch => ({
  closeQueue: () => {
    dispatch(TOGGLE_QUEUE());
  },
  clearQueue: () => {
    dispatch(UPDATE_QUEUE([]));
    dispatch(UPDATE_SHUFFLED_QUEUE([]));
    dispatch(UPDATE_ACTIVE_QUEUE());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
