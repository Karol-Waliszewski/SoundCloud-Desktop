import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "react-loader-spinner";
import uuid from "uuid/v4";
import { fetchTracks } from "../soundcloud";

// Actions
import { TOGGLE_QUEUE } from "../actions/layoutActions";
import {
  UPDATE_QUEUE,
  UPDATE_SHUFFLED_QUEUE,
  UPDATE_ACTIVE_QUEUE,
  UPDATE_TRACK_INDEX_AUTO
} from "../actions/playerActions";

// Components
import Track from "../components/queueTrack";

// Assets
import close from "../assets/close.svg";

class Queue extends Component {
  constructor() {
    super();
    this.state = {
      queue: []
    };

    this.queueID = uuid();
    this.update = true;

    this.getTracks = this.getTracks.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.fetchTracks = this.fetchTracks();
  }

  fetchTracks() {
    // Preventing fetching multiple times at once
    let fetching = false;
    return async (tracks, id) => {
      if (!fetching) {
        // Preventing queue update while fetching
        this.update = false;
        fetching = true;

        let queue = await fetchTracks(tracks);

        fetching = false;
        this.update = true;

        // Only save result if 'queue session' id has not changed, otherwise data is already outdated
        if (this.queueID === id) {
          return queue;
        }
      }
      return [];
    };
  }

  async getTracks(
    queue = this.props.queue,
    currentSize = this.state.queue.length
  ) {
    try {
      // Getting new tracks
      let tracks = await this.fetchTracks(
        [...queue].splice(currentSize, 12),
        this.queueID
      );
      // Saving tracks to state
      this.setState({
        queue: [...this.state.queue, ...tracks]
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(prevProps) {
    // On Redux queue change and state update needed
    if (prevProps.queue !== this.props.queue && this.update) {
      // Create new 'queue session' id
      this.queueID = uuid();
      // Update state
      this.setState({
        queue: []
      });
      this.getTracks(this.props.queue, 0);
    } else if (!this.update) {
      this.update = true;
    }
  }

  onDragEnd(result) {
    let { props, state } = this;
    let { source, destination } = result;

    // If dropped outside a list
    if (!destination) {
      return;
    }

    // If dropped at the same place
    if (source.index === destination.index) {
      return;
    }

    // Reordering state
    let q = [...state.queue];
    let temp = q.splice(source.index, 1)[0];
    q.splice(destination.index, 0, temp);

    // Updating queue and preventing re-render
    this.setState({ queue: q, update: false });

    // Reordering Redux store
    let queue = [...props.queue];
    let t = queue.splice(source.index, 1)[0];
    // TODO: faulty array
    queue.splice(destination.index, 0, t);
    // If queue is shuffled right now
    if (props.shuffle) {
      props.updateShuffledQueue(queue);
    }
    // If queue is not shuffled
    else {
      props.updateQueue(queue);
    }

    // Updating current queue
    props.updateActiveQueue();

    // Updating indexes
    props.updateIndexes();
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="queue">
            {provided => (
              <div
                className="queue__list"
                id="queue"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <InfiniteScroll
                  scrollableTarget={"queue"}
                  dataLength={state.queue.length}
                  next={this.getTracks}
                  hasMore={props.queue.length !== state.queue.length}
                  loader={
                    <div className="queue__loader">
                      <Loader
                        type="Bars"
                        color="#FF7700"
                        height={30}
                        width={30}
                      ></Loader>
                    </div>
                  }
                  className="queue__infinite"
                >
                  {state.queue.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={String(item.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Track
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          {...item}
                          isDragging={snapshot.isDragging}
                        ></Track>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </InfiniteScroll>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  active: state.layout.queueActive,
  queue: state.player.activeQueue,
  currentTrack: state.player.currentTrackID,
  shuffle: state.player.shuffle
});

const mapDispatchToProps = dispatch => ({
  closeQueue: () => {
    dispatch(TOGGLE_QUEUE());
  },
  clearQueue: () => {
    dispatch(UPDATE_QUEUE([]));
    dispatch(UPDATE_SHUFFLED_QUEUE({ queue: [] }));
    dispatch(UPDATE_ACTIVE_QUEUE());
  },
  updateQueue: q => {
    dispatch(UPDATE_QUEUE(q));
  },
  updateShuffledQueue: q => {
    dispatch(UPDATE_SHUFFLED_QUEUE({ queue: q, shuffle: false }));
  },
  updateActiveQueue: () => {
    dispatch(UPDATE_ACTIVE_QUEUE());
  },
  updateIndexes: () => {
    dispatch(UPDATE_TRACK_INDEX_AUTO());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
