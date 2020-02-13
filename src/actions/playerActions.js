import Soundcloud from "../soundcloud";

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

export const UPDATE_TRACK = id => ({
  type: "UPDATE_TRACK",
  payload: id
});

export const UPDATE_QUEUE = queue => ({
  type: "UPDATE_QUEUE",
  payload: queue
});

export const START_QUEUE = (queue, play = false) => {
  return dispatch => {
    dispatch(UPDATE_QUEUE(queue));
    if (queue.length > 0) {
      dispatch(PLAY_TRACK(queue[0], play));
    }
  };
};

export const ADD_TO_QUEUE = id => ({
  type: "ADD_TO_QUEUE",
  payload: id
});

var fetching = false;

export const PLAY_TRACK = (id, play = false) => {
  return async (dispatch, getState) => {
    // Prevent multiple calls at once
    if (!fetching) {
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
              getState().player.currentTrackIndex
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
        let queue = [...getState().player.queue];
        if (queue.length > 0) {
          let index = queue.indexOf(id);
          if (index >= 0) {
            queue.splice(index, 1);
          }
          dispatch(UPDATE_QUEUE(queue));
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
      if (state.player.queue.length - 1 > state.player.currentTrackIndex) {
        dispatch(
          PLAY_TRACK(
            state.player.queue[state.player.currentTrackIndex + 1],
            play
          )
        );
      } else if (state.player.loop) {
        dispatch(PLAY_TRACK(state.player.queue[0], play));
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
      if (0 < state.player.currentTrackIndex) {
        dispatch(
          PLAY_TRACK(
            state.player.queue[state.player.currentTrackIndex - 1],
            play
          )
        );
      } else if (state.player.loop) {
        dispatch(
          PLAY_TRACK(state.player.queue[state.player.queue.length - 1], play)
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
