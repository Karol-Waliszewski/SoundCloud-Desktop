import Soundcloud from "../soundcloud";
import axios from "axios";

export const CHANGE_USER = user => ({
  type: "CHANGE_USER",
  payload: user
});

export const CHANGE_TRACKS = (tracks, href = null) => ({
  type: "CHANGE_TRACKS",
  payload: { collection: tracks, href }
});

export const CHANGE_PLAYLISTS = (playlists, href = null) => ({
  type: "CHANGE_PLAYLISTS",
  payload: { collection: playlists, href }
});

export const CHANGE_FOLLOWINGS = (followings, href = null) => ({
  type: "CHANGE_FOLLOWINGS",
  payload: { collection: followings, href }
});

export const CHANGE_FOLLOWERS = (followers, href = null) => ({
  type: "CHANGE_FOLLOWERS",
  payload: { collection: followers, href }
});

export const CHANGE_FAVOURITES = (favourites, href = null) => ({
  type: "CHANGE_FAVOURITES",
  payload: { collection: favourites, href }
});

// Checking if some user has been fetched before and it is possible to get some user id
export const CHECK_USER = () => {
  return (dispatch, getState) => {
    let { user } = getState().profile;
    return user != null ? user : false;
  };
};

export const FETCH_USER = id => {
  return async dispatch => {
    try {
      let user = await Soundcloud.get(`/users/${id}`);
      dispatch(CHANGE_USER(user));
      // Fetching small portion of data about user
      dispatch(FETCH_TRACKS());
      dispatch(FETCH_PLAYLISTS());
      dispatch(FETCH_FAVOURITES());
      dispatch(FETCH_FOLLOWERS());
      dispatch(FETCH_FOLLOWINGS());
    } catch (error) {
      console.error(error);
    }
  };
};

export const FETCH_TRACKS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    // If user has not been found, sent empty array
    if (!user) {
      dispatch(CHANGE_TRACKS([]));
    } else {
      try {
        let href = getState().profile.tracks.href;
        let tracks;
        // If it is the first fetch for the user, do not use linked partitioning
        if (href == null) {
          tracks = await Soundcloud.get(`/users/${user.id}/tracks`, {
            limit: 12,
            linked_partitioning: true
          });
        }
        // If it is next fetch, use obtained href from previous fetch
        else {
          tracks = await axios.get(href);
          tracks = tracks.data;
        }

        // Update tracks
        dispatch(CHANGE_TRACKS(tracks.collection, tracks.next_href));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_PLAYLISTS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    // If user has not been found, sent empty array
    if (!user) {
      dispatch(CHANGE_PLAYLISTS([]));
    } else {
      try {
        let href = getState().profile.playlists.href;
        let playlists;
        // If it is the first fetch for the user, do not use linked partitioning
        if (href == null) {
          playlists = await Soundcloud.get(`/users/${user.id}/playlists`, {
            limit: 12,
            linked_partitioning: true
          });
        }
        // If it is next fetch, use obtained href from previous fetch
        else {
          playlists = await axios.get(href);
          playlists = playlists.data;
        }
        dispatch(CHANGE_PLAYLISTS(playlists.collection, playlists.next_href));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_FOLLOWINGS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    // If user has not been found, sent empty array
    if (!user) {
      dispatch(CHANGE_FOLLOWINGS([]));
    } else {
      try {
        let href = getState().profile.followings.href;
        let followings;
        // If it is the first fetch for the user, do not use linked partitioning
        if (href == null) {
          followings = await Soundcloud.get(`/users/${user.id}/followings`, {
            limit: 12,
            linked_partitioning: true
          });
        }
        // If it is next fetch, use obtained href from previous fetch
        else {
          followings = await axios.get(href);
          followings = followings.data;
        }
        dispatch(
          CHANGE_FOLLOWINGS(followings.collection, followings.next_href)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_FOLLOWERS = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    // If user has not been found, sent empty array
    if (!user) {
      dispatch(CHANGE_FOLLOWERS([]));
    } else {
      try {
        let href = getState().profile.followers.href;
        let followers;
        // If it is the first fetch for the user, do not use linked partitioning
        if (href == null) {
          followers = await Soundcloud.get(`/users/${user.id}/followers`, {
            limit: 12,
            linked_partitioning: true
          });
        }
        // If it is next fetch, use obtained href from previous fetch
        else {
          followers = await axios.get(href);
          followers = followers.data;
        }
        dispatch(CHANGE_FOLLOWERS(followers.collection, followers.next_href));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const FETCH_FAVOURITES = () => {
  return async (dispatch, getState) => {
    let user = dispatch(CHECK_USER());
    // If user has not been found, sent empty array
    if (!user) {
      dispatch(CHANGE_FAVOURITES([]));
    } else {
      try {
        let href = getState().profile.favourites.href;
        let favourites;
        // If it is the first fetch for the user, do not use linked partitioning
        if (href == null) {
          favourites = await Soundcloud.get(`/users/${user.id}/favorites`, {
            limit: 12,
            linked_partitioning: true
          });
        }
        // If it is next fetch, use obtained href from previous fetch
        else {
          favourites = await axios.get(href);
          favourites = favourites.data;
        }
        dispatch(
          CHANGE_FAVOURITES(favourites.collection, favourites.next_href)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
};
