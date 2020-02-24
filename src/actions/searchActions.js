import axios from "axios";
import Soundcloud from "soundcloud";

// Actions
import { ADD_PLAYLISTS, ADD_TRACKS, ADD_USERS } from "./apiActions";

export const CHANGE_QUERY = query => ({
  type: "CHANGE_QUERY",
  payload: query
});

export const SEARCH_TRACKS_SUCCESS = (tracks, href = null) => ({
  type: "SEARCH_TRACKS_SUCCESS",
  payload: { collection: tracks, href }
});

export const SEARCH_PLAYLISTS_SUCCESS = (playlists, href = null) => ({
  type: "SEARCH_PLAYLISTS_SUCCESS",
  payload: { collection: playlists, href }
});

export const SEARCH_USERS_SUCCESS = (followings, href = null) => ({
  type: "SEARCH_USERS_SUCCESS",
  payload: { collection: followings, href }
});

export const SEARCH_TRACKS_FETCHING = () => ({
  type: "SEARCH_TRACKS_FETCHING"
});

export const SEARCH_PLAYLISTS_FETCHING = () => ({
  type: "SEARCH_PLAYLISTS_FETCHING"
});

export const SEARCH_USERS_FETCHING = () => ({
  type: "SEARCH_USERS_FETCHING"
});

export const FIND_TRACKS = query => async (dispatch, getState) => {
  try {
    let href = getState().search.tracks.href;
    let preFetchQueryID = getState().search.queryID;
    let tracks;

    dispatch(SEARCH_TRACKS_FETCHING());

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
    let afterFetchQueryID = getState().search.queryID;

    if (tracks.collection.length) {
      // Saving fetched tracked to "session storage"
      let mapOfTracks = new Map();
      for (let track of tracks.collection) {
        mapOfTracks.set(track.id, track);
      }
      dispatch(ADD_TRACKS(mapOfTracks));
    }

    // Send data only if pre and after fetch IDs are the same
    if (preFetchQueryID === afterFetchQueryID) {
      dispatch(SEARCH_TRACKS_SUCCESS(tracks.collection, tracks.next_href));
    }
  } catch (error) {
    console.error(error);
  }
};

export const FIND_PLAYLISTS = query => async (dispatch, getState) => {
  try {
    let href = getState().search.playlists.href;
    let preFetchQueryID = getState().search.queryID;
    let playlists;

    dispatch(SEARCH_PLAYLISTS_FETCHING());

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

    let afterFetchQueryID = getState().search.queryID;

    if (playlists.collection.length) {
      // Saving fetched tracked to "session storage"
      let mapOfPlaylists = new Map();
      for (let playlist of playlists.collection) {
        mapOfPlaylists.set(playlist.id, playlist);
      }
      dispatch(ADD_PLAYLISTS(mapOfPlaylists));
    }

    // Send data only if pre and after fetch IDs are the same
    if (preFetchQueryID === afterFetchQueryID) {
      dispatch(
        SEARCH_PLAYLISTS_SUCCESS(playlists.collection, playlists.next_href)
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const FIND_USERS = query => async (dispatch, getState) => {
  try {
    let href = getState().search.users.href;
    let preFetchQueryID = getState().search.queryID;
    let users;

    dispatch(SEARCH_USERS_FETCHING());

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

    let afterFetchQueryID = getState().search.queryID;

    if (users.collection.length) {
      // Saving fetched tracked to "session storage"
      let mapOfUsers = new Map();
      for (let user of users.collection) {
        mapOfUsers.set(user.id, user);
      }
      dispatch(ADD_USERS(mapOfUsers));
    }

    // Send data only if pre and after fetch IDs are the same
    if (preFetchQueryID === afterFetchQueryID) {
      dispatch(SEARCH_USERS_SUCCESS(users.collection, users.next_href));
    }
  } catch (error) {
    console.error(error);
  }
};
