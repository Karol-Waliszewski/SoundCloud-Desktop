import Soundcloud from "soundcloud";

Soundcloud.initialize({
  client_id: "fa791b761f68cafa375ab5f7ea51927a",
  redirect_uri: "https://example.com/callback"
});

// console.log(
//   Soundcloud.resolve("https://soundcloud.com/dimo-yankov-1/last-airbender-lo-fi").then(
//     track => track
//   )
// );

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

export const ADD_TO_QUEUE = id => ({
  type: "ADD_TO_QUEUE",
  payload: id
});

export const ADD_AND_PLAY_TRACK = (id, play = false) => {
  return dispatch => {
    dispatch(ADD_TO_QUEUE(id));
    dispatch(PLAY_TRACK(id, play));
  };
};

export const PLAY_TRACK = (id, play = false) => {
  return (dispatch, getState) => {
    // Killing previous track
    if (getState().player.player) {
      getState().player.player.kill();
    }
    
    // Getting new track
    Soundcloud.stream(`/tracks/${id}`).then(function(player) {
      // Updating player
      dispatch(UPDATE_PLAYER(player));

      // Updating track info
      dispatch(UPDATE_TRACK(id));

      // triggering 'play-start' event
      player.play();

      player.on("state-change", state => {
        dispatch(CHANGE_STATE(state));
        if (
          state === "ended" &&
          getState().player.queue.length > getState().player.currentTrackIndex
        ) {
          //TODO: next song
          dispatch(
            PLAY_TRACK(
              getState().player.queue[getState().player.currentTrackIndex + 1],
              true
            )
          );
        }
      });

      player.on("play-start", () => {
        player.pause();
        player.seek(0);
        if (play === true) {
          player.play();
        }
        player.on("time", time => {
          dispatch(UPDATE_TIME(time));
        });
        dispatch(CHANGE_DURATION(player.getDuration()));
      });
    });
  };
};

export const CHANGE_TIME = time => {
  return (dispatch, getState) => {
    if (getState().player.player) {
      getState().player.player.seek(time);
    }
  };
};

export const STOP = () => {
  return (dispatch, getState) => {
    if (getState().player.player) {
      getState().player.player.pause();
    }
  };
};

export const START = () => {
  return (dispatch, getState) => {
    if (getState().player.player) {
      getState().player.player.play();
    }
  };
};
