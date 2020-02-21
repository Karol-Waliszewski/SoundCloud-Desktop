import axios, { CancelToken } from "axios";
import Soundcloud from "soundcloud";

// TODO: fetching more than 12 results

export const CHANGE_QUERY = query => ({
  type: "CHANGE_QUERY",
  payload: query
});

export const CHANGE_TRACKS = (tracks, href = null) => ({
  type: "CHANGE_TRACKS",
  payload: { collection: tracks, href }
});

export const CHANGE_PLAYLISTS = (playlists, href = null) => ({
  type: "CHANGE_PLAYLISTS",
  payload: { collection: playlists, href }
});

export const CHANGE_USERS = (followings, href = null) => ({
  type: "CHANGE_USERS",
  payload: { collection: followings, href }
});

export const FIND_TRACKS = query => async (dispatch, getState) => {
  try {
    let href = getState().search.tracks.href;
    let tracks;
    // If it is the first fetch for the user, do not use linked partitioning
    if (href == null) {
      tracks = await Soundcloud.get("/tracks", {
        q: query,
        limit: 12,
        linked_partitioning: true
      });
    }
    // If it is next fetch, use obtained href from previous fetch
    else {
      tracks = await axios.get(href);
      tracks = tracks.data;
    }
    dispatch(CHANGE_TRACKS(tracks.collection, tracks.next_href));
  } catch (error) {
    console.error(error);
  }
};

export const FIND_PLAYLISTS = query => async (dispatch, getState) => {
  try {
    let href = getState().search.playlists.href;
    let playlists;
    // If it is the first fetch for the user, do not use linked partitioning
    if (href == null) {
      playlists = await Soundcloud.get("/playlists", {
        q: query,
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
};

export const FIND_USERS = query => async (dispatch, getState) => {
  try {
    let href = getState().search.users.href;
    let users;
    // If it is the first fetch for the user, do not use linked partitioning
    if (href == null) {
      users = await Soundcloud.get("/users", {
        q: query,
        limit: 12,
        linked_partitioning: true
      });
    }
    // If it is next fetch, use obtained href from previous fetch
    else {
      users = await axios.get(href);
      users = users.data;
    }
    dispatch(CHANGE_USERS(users.collection, users.next_href));
  } catch (error) {
    console.error(error);
  }
};
