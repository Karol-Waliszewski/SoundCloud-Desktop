import Soundcloud from "../soundcloud";
import { shuffleArray } from "../utils";

export const TOGGLE_LOOP = () => ({
  type: "TOGGLE_LOOP"
});

export const CHANGE_VOLUME = volume => ({
  type: "CHANGE_VOLUME",
  payload: volume
});

export const UPDATE_TIME = time => ({
  type: "UPDATE_TIME",
  payload: time
});

export const CHANGE_DURATION = duration => ({
  type: "CHANGE_DURATION",
  payload: duration
});

export const CHANGE_STATE = state => ({
  type: "CHANGE_STATE",
  payload: state
});

export const UPDATE_PLAYER = player => ({
  type: "UPDATE_PLAYER",
  payload: player
});

export const UPDATE_TRACK = id => {
  return (dispatch, getState) => {
    // Updating current track id
    dispatch({
      type: "UPDATE_TRACK",
      payload: id
    });

    // Updating current tracks positions in queues
    dispatch(
      UPDATE_TRACK_INDEX(
        getState().player.queue.indexOf(id),
        getState().player.activeQueue.indexOf(id)
      )
    );
  };
};

// Updating current tracks positions in queues
export const UPDATE_TRACK_INDEX = (queue, active) => ({
  type: "UPDATE_TRACK_INDEX",
  payload: { queue, active }
});

export const UPDATE_TRACK_INDEX_AUTO = () => (dispatch, getState) => {
  // Update current track positions
  let id = getState().player.currentTrackID;
  dispatch(
    UPDATE_TRACK_INDEX(
      getState().player.queue.indexOf(id),
      getState().player.activeQueue.indexOf(id)
    )
  );
};

export const TOGGLE_SHUFFLE = () => {
  return (dispatch, getState) => {
    // Toggling whether queue is shuffled or not
    dispatch({
      type: "TOGGLE_SHUFFLE"
    });

    // If queue is to be shuffled, shuffle it
    if (getState().player.shuffle) {
      dispatch(UPDATE_SHUFFLED_QUEUE());
    }

    // Update active queue
    dispatch(UPDATE_ACTIVE_QUEUE());

    // Update current track positions
    dispatch(UPDATE_TRACK_INDEX_AUTO());
  };
};

export const UPDATE_QUEUE = queue => ({
  type: "UPDATE_QUEUE",
  payload: queue.filter(el => el != undefined)
});

export const UPDATE_SHUFFLED_QUEUE = (
  { queue, i, shuffle } = { queue: null, i: null, shuffle: true }
) => {
  return (dispatch, getState) => {
    // If queue parameter is empty, use current player queue
    if (!queue) {
      queue = getState().player.queue;
    }

    // If index parameter is not set, use current track position increased by 1
    if (!i) {
      i = getState().player.currentTrackIndex.queue + 1;
    }

    // If passed queue is to be shuffled, shuffle it
    if (shuffle) {
      dispatch({
        type: "UPDATE_SHUFFLED_QUEUE",
        payload: shuffleArray([...queue.filter(el => el != undefined)], i)
      });
    }
    // If queue don't have to be shuffled, just pass it to the reducer
    else {
      dispatch({
        type: "UPDATE_SHUFFLED_QUEUE",
        payload: [...queue.filter(el => el != undefined)]
      });
    }
  };
};

export const UPDATE_ACTIVE_QUEUE = () => {
  return (dispatch, getState) => {
    // If player's shuffle switch is true, active queue is the shuffled one
    if (getState().player.shuffle) {
      dispatch({
        type: "UPDATE_ACTIVE_QUEUE",
        payload: getState().player.shuffledQueue
      });
    }
    // If switch if false, active queue is normal queue
    else {
      dispatch({
        type: "UPDATE_ACTIVE_QUEUE",
        payload: getState().player.queue
      });
    }
  };
};

export const START_QUEUE = (queue, play = false) => {
  return (dispatch, getState) => {
    // Updating queues
    dispatch(UPDATE_QUEUE(queue));
    dispatch(UPDATE_SHUFFLED_QUEUE({ queue, i: 0 }));

    // Getting shuffled queue
    let shuffledQueue = getState().player.shuffledQueue;

    // Playing 1st track of the queue TODO: shuffle first track in shuffled queue.
    if (queue.length > 0) {
      let shuffle = getState().player.shuffle;
      if (shuffle) {
        dispatch(PLAY_TRACK(shuffledQueue[0], play));
      } else {
        dispatch(PLAY_TRACK(queue[0], play));
      }
    }

    // Updating active queue
    dispatch(UPDATE_ACTIVE_QUEUE());
  };
};

export const ADD_TO_QUEUE = id => {
  return (dispatch, getState) => {
    // Adding new track to queue
    let queue = [...getState().player.queue];
    let currentIndex = getState().player.currentTrackIndex.queue + 1 || 1;

    // Creating array of ids if only one was passed
    if (!Array.isArray(id)) {
      id = [id];
    }

    // Placing new element after current track
    let q = [
      ...[...queue].splice(0, currentIndex),
      ...id,
      ...[...queue].splice(currentIndex, queue.length - currentIndex)
    ];

    // Updating queue
    dispatch(UPDATE_QUEUE(q));

    // If active queue is shuffled, add new track after current element
    if (getState().player.shuffle) {
      // Adding new track to shuffled queue
      let shuffledIndex = getState().player.currentTrackIndex.active + 1 || 1;
      let shuffledQueue = [...getState().player.shuffledQueue];
      // Placing new element after current track
      let s = [
        ...[...shuffledQueue].splice(0, shuffledIndex),
        ...id,
        ...[...shuffledQueue].splice(
          shuffledIndex,
          queue.length - shuffledIndex
        )
      ];
      // Updating shuffled queue
      dispatch(UPDATE_SHUFFLED_QUEUE({ queue: s, shuffle: false }));
    } else {
      // Updating shuffled queue
      dispatch(UPDATE_SHUFFLED_QUEUE({ queue: q }));
    }
    dispatch(UPDATE_ACTIVE_QUEUE());
  };
};

var fetching = false;

export const PLAY_TRACK = (id, play = false) => {
  return async (dispatch, getState) => {
    // Prevent multiple calls at once
    if (!fetching && id) {
      fetching = true;

      // Getting new track
      try {
        let player = await Soundcloud.stream(`/tracks/${id}`);

        // Loading initials for player
        player.on("play-start", () => {
          // Killing previous player
          if (getState().player.player) {
            if (!getState().player.player.isDead()) {
              dispatch(CHANGE_TIME(0));
            }
            getState().player.player.kill();
          }

          // Updating player state
          if (play === false) {
            player.pause();
            player.seek(0);
            dispatch(CHANGE_STATE("paused"));
          } else {
            dispatch(CHANGE_STATE("playing"));
          }

          dispatch(CHANGE_DURATION(player.getDuration()));
        });

        // Triggering 'play-start' event
        await player.play();

        // Controlling state changes and music finishing
        player.on("state-change", state => {
          // Simply updates state
          dispatch(CHANGE_STATE(state));

          // When the track is finished
          if (
            state === "ended" &&
            getState().player.queue.length - 1 >
              getState().player.currentTrackIndex.active
          ) {
            dispatch(NEXT_TRACK(true));
          } else if (
            state === "ended" &&
            getState().player.queue.length > 0 &&
            getState().player.loop
          ) {
            dispatch(PLAY_TRACK(getState().player.queue[0], true));
          }
        });

        // Time change event handler
        let applyOnTimeEvent = function() {
          player.on("time", time => {
            updateTime(time);
          });
        };

        let updateTime = function(time) {
          dispatch(UPDATE_TIME(time));
          player.off("time");
          setTimeout(applyOnTimeEvent, 500);
        };

        applyOnTimeEvent();

        // Audio error event
        player.on("audio_error", err => {
          console.error(err);
        });

        // Updating player
        dispatch(UPDATE_PLAYER(player));

        // Updating track info
        dispatch(UPDATE_TRACK(id));

        fetching = false;
      } catch (err) {
        console.error(err);
        console.error("Selected track is probably unstreamable.");

        fetching = false;

        // Choosing next track to stream
        let queue = [...getState().player.activeQueue];
        if (queue.length > 0) {
          // Deleting faulty track
          let index = queue.indexOf(id);
          if (index >= 0) {
            queue.splice(index, 1);
          }

          // Updating queues
          dispatch(UPDATE_QUEUE(queue));
          dispatch(UPDATE_SHUFFLED_QUEUE({ queue }));
          dispatch(UPDATE_ACTIVE_QUEUE());
          index = index < queue.length - 1 ? index : queue.length - 1;
          // Playing another tracks
          dispatch(PLAY_TRACK(queue[index], play));
        }
      }

      fetching = false;
    }
  };
};

export const NEXT_TRACK = playing => {
  return (dispatch, getState) => {
    if (!fetching) {
      let state = getState();
      let play =
        state.player.playerState === "playing" || playing ? true : false;
      // If there is next track, play it
      if (
        state.player.activeQueue.length - 1 >
        state.player.currentTrackIndex.active
      ) {
        dispatch(
          PLAY_TRACK(
            state.player.activeQueue[state.player.currentTrackIndex.active + 1],
            play
          )
        );
      }
      // If it was the last track, but looping is active, play first track
      else if (state.player.loop) {
        dispatch(PLAY_TRACK(state.player.activeQueue[0], play));
      }
    }
  };
};

export const PREVIOUS_TRACK = playing => {
  return (dispatch, getState) => {
    if (!fetching) {
      let state = getState();
      let play =
        state.player.playerState === "playing" || playing ? true : false;
      // If there is previous track, play it
      if (0 < state.player.currentTrackIndex.active) {
        dispatch(
          PLAY_TRACK(
            state.player.activeQueue[state.player.currentTrackIndex.active - 1],
            play
          )
        );
      }
      // If it is the first track, but looping is active, play the last one
      else if (state.player.loop) {
        dispatch(
          PLAY_TRACK(
            state.player.activeQueue[state.player.activeQueue.length - 1],
            play
          )
        );
      }
    }
  };
};

export const ADD_AND_PLAY_TRACK = (id, play = false) => {
  return (dispatch, getState) => {
    // Preventing doubling track in queue
    if (!getState().player.queue.includes(id)) {
      dispatch(ADD_TO_QUEUE(id));
    }
    dispatch(PLAY_TRACK(id, play));
  };
};

export const CHANGE_TIME = time => {
  return (dispatch, getState) => {
    dispatch(UPDATE_TIME(time));
    let state = getState();
    if (state.player.player && state.player.playerState !== "dead") {
      state.player.player.seek(time);
    }
  };
};

export const STOP = () => {
  return (dispatch, getState) => {
    let state = getState();
    if (state.player.player && state.player.playerState !== "dead") {
      state.player.player.pause();
    }
  };
};

export const START = () => {
  return (dispatch, getState) => {
    let state = getState();
    if (state.player.player && state.player.playerState !== "dead") {
      state.player.player.play();
    }
  };
};
