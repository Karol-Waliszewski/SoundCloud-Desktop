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
    dispatch({
      type: "UPDATE_TRACK",
      payload: id
    });
    dispatch(
      UPDATE_TRACK_INDEX(
        getState().player.queue.indexOf(id),
        getState().player.activeQueue.indexOf(id)
      )
    );
  };
};

export const UPDATE_TRACK_INDEX = (queue, active) => ({
  type: "UPDATE_TRACK_INDEX",
  payload: { queue, active }
});

export const TOGGLE_SHUFFLE = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "TOGGLE_SHUFFLE"
    });
    if (getState().player.shuffle) {
      dispatch(UPDATE_SHUFFLED_QUEUE());
    }
    dispatch(UPDATE_ACTIVE_QUEUE());
    let id = getState().player.currentTrackID;
    dispatch(
      UPDATE_TRACK_INDEX(
        getState().player.queue.indexOf(id),
        getState().player.activeQueue.indexOf(id)
      )
    );
  };
};

export const UPDATE_QUEUE = queue => ({
  type: "UPDATE_QUEUE",
  payload: queue
});

export const UPDATE_SHUFFLED_QUEUE = (queue, i) => {
  return (dispatch, getState) => {
    if (!queue) {
      queue = getState().player.queue;
    }
    if (!i) {
      i = getState().player.currentTrackIndex.queue + 1;
    }
    dispatch({
      type: "UPDATE_SHUFFLED_QUEUE",
      payload: shuffleArray([...queue], i)
    });
  };
};

export const UPDATE_ACTIVE_QUEUE = () => {
  return (dispatch, getState) => {
    if (getState().player.shuffle) {
      dispatch({
        type: "UPDATE_ACTIVE_QUEUE",
        payload: getState().player.shuffledQueue
      });
    } else {
      dispatch({
        type: "UPDATE_ACTIVE_QUEUE",
        payload: getState().player.queue
      });
    }
  };
};

export const START_QUEUE = (queue, play = false) => {
  return (dispatch, getState) => {
    dispatch(UPDATE_QUEUE(queue));
    dispatch(UPDATE_SHUFFLED_QUEUE(queue, 0));
    let shuffledQueue = getState().player.shuffledQueue;
    if (queue.length > 0) {
      let shuffle = getState().player.shuffle;
      if (shuffle) {
        dispatch(PLAY_TRACK(shuffledQueue[0], play));
      } else {
        dispatch(PLAY_TRACK(queue[0], play));
      }
      
    }
    dispatch(UPDATE_ACTIVE_QUEUE());
  };
};

export const ADD_TO_QUEUE = id => {
  return (dispatch, getState) => {
    let q = [...getState().player.queue, id];
    dispatch(UPDATE_QUEUE(q));
    dispatch(UPDATE_SHUFFLED_QUEUE(q));
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

        // Playing another tracks
        let queue = [...getState().player.activeQueue];
        if (queue.length > 0) {
          let index = queue.indexOf(String(id));
          if (index >= 0) {
            queue.splice(index, 1);
          }

          dispatch(UPDATE_QUEUE(queue));
          dispatch(UPDATE_SHUFFLED_QUEUE(queue));
          dispatch(UPDATE_ACTIVE_QUEUE());
          index = index < queue.length - 1 ? index : queue.length - 1;
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
      } else if (state.player.loop) {
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
      if (0 < state.player.currentTrackIndex.active) {
        dispatch(
          PLAY_TRACK(
            state.player.activeQueue[state.player.currentTrackIndex.active - 1],
            play
          )
        );
      } else if (state.player.loop) {
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
