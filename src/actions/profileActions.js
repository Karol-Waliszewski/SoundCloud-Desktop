import Soundcloud from "../soundcloud";

export const CHANGE_USER = user => ({
  type: "CHANGE_USER",
  payload: user
});

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
    let { user } = getState().profile;
    console.log("Checking current user...");
    return user != null ? user : false;
  };
};

export const FETCH_USER = id => {
  return async dispatch => {
    try {
      let user = await Soundcloud.get(`/users/${id}`);
      dispatch(CHANGE_USER(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const FETCH_TRACKS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    if (!user) {
      dispatch(CHANGE_TRACKS([]));
    } else {
      try {
        let page = getState().profile.tracks.page;
        let tracks = await Soundcloud.get(`/users/${user.id}/tracks`, {
          limit: 12,
          offset: page * 12
        });
        dispatch(CHANGE_TRACKS(tracks));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_PLAYLISTS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    if (!user) {
      dispatch(CHANGE_PLAYLISTS([]));
    } else {
      try {
        let page = getState().profile.playlists.page;
        let playlists = await Soundcloud.get(`/users/${user.id}/playlists`, {
          limit: 12,
          offset: page * 12
        });
        dispatch(CHANGE_PLAYLISTS(playlists));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_FOLLOWINGS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    if (!user) {
      dispatch(CHANGE_FOLLOWINGS([]));
    } else {
      try {
        let page = getState().profile.followings.page;
        let followings = await Soundcloud.get(`/users/${user.id}/followings`, {
          limit: 12,
          offset: page * 12
        });

        dispatch(CHANGE_FOLLOWINGS(followings.collection));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_FOLLOWERS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    if (!user) {
      dispatch(CHANGE_FOLLOWERS([]));
    } else {
      try {
        let page = getState().profile.followers.page;
        let followers = await Soundcloud.get(`/users/${user.id}/followers`, {
          limit: 12,
          offset: page * 12
        });
        dispatch(CHANGE_FOLLOWERS(followers.collection));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_FAVOURITES = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    if (!user) {
      dispatch(CHANGE_FAVOURITES([]));
    } else {
      try {
        let page = getState().profile.favourites.page;
        let favourites = await Soundcloud.get(`/users/${user.id}/favorites`, {
          limit: 12,
          offset: page * 12
        });
        console.log(favourites);
        dispatch(CHANGE_FAVOURITES(favourites));
      } catch (error) {
        console.error(error);
      }
    }
  };
};
