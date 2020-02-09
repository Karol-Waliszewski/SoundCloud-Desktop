import Soundcloud from "../soundcloud";

export const CHANGE_TRACKS = tracks => ({
  type: "CHANGE_TRACKS",
  payload: tracks
});

export const CHANGE_PLAYLISTS = playlists => ({
  type: "CHANGE_PLAYLISTS",
  payload: playlists
});

export const CHANGE_FOLLOWINGS = followings => ({
  type: "CHANGE_FOLLOWINGS",
  payload: followings
});

export const CHANGE_FOLLOWERS = followers => ({
  type: "CHANGE_FOLLOWERS",
  payload: followers
});

export const CHANGE_FAVOURITES = favourites => ({
  type: "CHANGE_FAVOURITES",
  payload: favourites
});

export const CHECK_USER = () => {
  return (dispatch, getState) => {
    let { user } = getState();
    return user == null ? true : false;
  };
};

export const FETCH_TRACKS = () => {
  return dispatch => {
    if (!dispatch(CHECK_USER())) {
      dispatch(CHANGE_TRACKS([]));
    } else {
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
