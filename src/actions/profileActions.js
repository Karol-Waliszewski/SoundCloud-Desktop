import Soundcloud from "../soundcloud";
import axios from "axios";

// Actions
import { ADD_PLAYLISTS, ADD_TRACKS, ADD_USERS } from "./apiActions";

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
export const CHECK_USER = () => (dispatch, getState) => {
  let { user } = getState().profile;
  return user != null ? user : false;
};

export const FETCH_TRACKS = () => async (dispatch, getState) => {
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

      if (tracks.collection.length) {
        // Saving fetched tracked to "session storage"
        let mapOfTracks = new Map();
        for (let track of tracks.collection) {
          mapOfTracks.set(track.id, track);
        }
        dispatch(ADD_TRACKS(mapOfTracks));
      }

      // Update tracks
      dispatch(CHANGE_TRACKS(tracks.collection, tracks.next_href));
    } catch (error) {
      console.error(error);
    }
  }
};

export const FETCH_PLAYLISTS = () => async (dispatch, getState) => {
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

      if (playlists.collection.length) {
        // Saving fetched tracked to "session storage"
        let mapOfPlaylists = new Map();
        for (let playlist of playlists.collection) {
          mapOfPlaylists.set(playlist.id, playlist);
        }
        dispatch(ADD_PLAYLISTS(mapOfPlaylists));
      }

      dispatch(CHANGE_PLAYLISTS(playlists.collection, playlists.next_href));
    } catch (error) {
      console.error(error);
    }
  }
};

export const FETCH_FOLLOWINGS = () => async (dispatch, getState) => {
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

      if (followings.collection.length) {
        // Saving fetched tracked to "session storage"
        let mapOfUsers = new Map();
        for (let user of followings.collection) {
          mapOfUsers.set(user.id, user);
        }
        dispatch(ADD_USERS(mapOfUsers));
      }

      dispatch(CHANGE_FOLLOWINGS(followings.collection, followings.next_href));
    } catch (error) {
      console.error(error);
    }
  }
};

export const FETCH_FOLLOWERS = () => async (dispatch, getState) => {
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

      if (followers.collection.length) {
        // Saving fetched tracked to "session storage"
        let mapOfUsers = new Map();
        for (let user of followers.collection) {
          mapOfUsers.set(user.id, user);
        }
        dispatch(ADD_USERS(mapOfUsers));
      }

      dispatch(CHANGE_FOLLOWERS(followers.collection, followers.next_href));
    } catch (error) {
      console.error(error);
    }
  }
};

export const FETCH_FAVOURITES = () => async (dispatch, getState) => {
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

      if (favourites.collection.length) {
        // Saving fetched tracked to "session storage"
        let mapOfTracks = new Map();
        for (let track of favourites.collection) {
          mapOfTracks.set(track.id, track);
        }
        dispatch(ADD_TRACKS(mapOfTracks));
      }

      dispatch(CHANGE_FAVOURITES(favourites.collection, favourites.next_href));
    } catch (error) {
      console.error(error);
    }
  }
};

export const FETCH_BASIC_PROFILE_INFO = () => (dispatch) => {
  dispatch(FETCH_TRACKS());
  dispatch(FETCH_PLAYLISTS());
  dispatch(FETCH_FAVOURITES());
  dispatch(FETCH_FOLLOWERS());
  dispatch(FETCH_FOLLOWINGS());
}
