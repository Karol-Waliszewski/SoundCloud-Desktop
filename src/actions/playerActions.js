import Soundcloud from "soundcloud";

Soundcloud.initialize({
  client_id: "fa791b761f68cafa375ab5f7ea51927a",
  redirect_uri: "https://example.com/callback"
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

export const PLAY_TRACK = id => {
  return dispatch => {
    Soundcloud.stream(`/tracks/${id}`).then(function(player) {
      dispatch(UPDATE_PLAYER(player));
      player.play();
      player.on("state-change", state => {
        dispatch(CHANGE_STATE(state));
      });
      player.on("play-start", () => {
        player.pause();
        player.seek(0);
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
