import Soundcloud from "../soundcloud";
import axios from "axios";
import { deleteCopies } from "../utils";

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
      let currentCollection = getState().profile.tracks.collection;

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

      let concatCollection = [...currentCollection, ...tracks.collection];
      concatCollection = deleteCopies(concatCollection);

      // Update tracks
      dispatch(CHANGE_TRACKS(concatCollection, tracks.next_href));

      // Because API do not return equal 20 favs if they exist, use recursive call until it is necessary
      if (
        concatCollection.length < 12 &&
        tracks.collection.length > 0 &&
        tracks.next_href
      ) {
        dispatch(FETCH_TRACKS());
      }
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
      let currentCollection = getState().profile.playlists.collection;
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

      let concatCollection = [...currentCollection, ...playlists.collection];
      concatCollection = deleteCopies(concatCollection);

      await dispatch(CHANGE_PLAYLISTS(concatCollection, playlists.next_href));

      // Because API do not return equal 20 favs if they exist, use recursive call until it is necessary
      if (
        concatCollection.length < 12 &&
        playlists.collection.length > 0 &&
        playlists.next_href
      ) {
        dispatch(FETCH_PLAYLISTS());
      }
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
      let currentCollection = getState().profile.followings.collection;
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

      let concatCollection = [...currentCollection, ...followings.collection];
      concatCollection = deleteCopies(concatCollection);

      dispatch(CHANGE_FOLLOWINGS(concatCollection, followings.next_href));

      // Because API do not return equal 20 favs if they exist, use recursive call until it is necessary
      if (
        concatCollection.length < 12 &&
        followings.collection.length > 0 &&
        followings.next_href
      ) {
        dispatch(FETCH_FOLLOWINGS());
      }
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
      let currentCollection = getState().profile.followers.collection;
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

      let concatCollection = [...currentCollection, ...followers.collection];
      concatCollection = deleteCopies(concatCollection);

      dispatch(CHANGE_FOLLOWERS(concatCollection, followers.next_href));

      // Because API do not return equal 20 favs if they exist, use recursive call until it is necessary
      if (
        concatCollection.length < 12 &&
        followers.collection.length > 0 &&
        followers.next_href
      ) {
        dispatch(FETCH_FOLLOWERS());
      }
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
      let currentCollection = getState().profile.favourites.collection;
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

      let concatCollection = [...currentCollection, ...favourites.collection];
      concatCollection = deleteCopies(concatCollection);

      dispatch(CHANGE_FAVOURITES(concatCollection, favourites.next_href));

      // Because API do not return equal 20 favs if they exist, use recursive call until it is necessary
      if (
        concatCollection.length < 12 &&
        favourites.collection.length > 0 &&
        favourites.next_href
      ) {
        dispatch(FETCH_FAVOURITES());
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const FETCH_BASIC_PROFILE_INFO = () => dispatch => {
  dispatch(FETCH_TRACKS());
  dispatch(FETCH_PLAYLISTS());
  dispatch(FETCH_FAVOURITES());
  dispatch(FETCH_FOLLOWERS());
  dispatch(FETCH_FOLLOWINGS());
};
