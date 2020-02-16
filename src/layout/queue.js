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
import InfiniteList from "../components/infiniteList";

// Assets
import close from "../assets/close.svg";

class Queue extends Component {
  constructor() {
    super();
    this.state = {
      queue: []
    };

    this.getTracks = this.getTracks.bind(this);
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

    return queue;
  }

  async getTracks(
    queue = this.props.queue,
    currentSize = this.state.queue.length
  ) {
    try {
      let tracks = await this.fetchTracks([...queue].splice(currentSize, 14));
      this.setState({
        queue: [...this.state.queue, ...tracks]
      });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.queue !== this.props.queue) {
      this.setState({ queue: [] });
      await this.getTracks(this.props.queue, 0);
    }
  }

  render() {
    let { props, state } = this;

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
        <div className="queue__list" id="queue">
          <InfiniteList
            more={props.queue.length != state.queue.length}
            list={state.queue}
            fetchFn={this.getTracks}
            component={Track}
            target={"queue"}
          ></InfiniteList>
        </div>
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
