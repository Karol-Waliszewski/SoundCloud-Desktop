import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SoundCloud from "../soundcloud";

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

    this.getTracks = this.getTracks.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.fetchTracks = this.fetchTracks();
  }

  fetchTracks() {
    // Preventing fetching multiple times at once
    let fetching = false;
    return async (tracks) => {
      if (!fetching) {
        fetching = true;

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

        fetching = false;
        return queue;
      }
      return [];
    };
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
    if (
      prevProps.queue.length !== this.props.queue.length ||
      prevProps.shuffle !== this.props.shuffle
    ) {
      this.setState({ queue: [] });
      await this.getTracks(this.props.queue, 0);
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
    if (source.index == destination.index) {
      return;
    }

    // Reordering state
    let q = [...state.queue];
    let temp = q.splice(source.index, 1)[0];
    q.splice(destination.index, 0, temp);

    this.setState({ queue: q });

    // Reordering Redux store
    let queue = [...props.queue];
    let t = queue.splice(source.index, 1)[0];
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
                  hasMore={props.queue.length != state.queue.length}
                  loader={<h4>Loading...</h4>}
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
