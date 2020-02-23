import Soundcloud from "soundcloud";
import { dispatch, getState } from "./store";

// Actions
import {
  ADD_TRACK,
  ADD_TRACKS,
  ADD_FAULTY_TRACK,
  ADD_FAULTY_TRACKS,
  ADD_USER
} from "./actions/apiActions";
import {
  FETCH_BASIC_PROFILE_INFO,
  CHANGE_USER
} from "./actions/profileActions";
import { DELETE_FROM_QUEUE } from "./actions/playerActions";

Soundcloud.initialize({
  client_id: "fa791b761f68cafa375ab5f7ea51927a",
  redirect_uri: "https://example.com/callback"
});

export const fetchTrack = async id => {
  // Getting data from Redux store
  let fetchedTracks = getState().api.tracks.fetched;
  let faultyTracks = getState().api.tracks.faulty;

  // If track has already been fetched before
  if (fetchTracks.has(id)) {
    return fetchedTracks.get(id);
  }

  // Run only if track is not faulty already
  if (!faultyTracks.includes(id)) {
    try {
      // Getting track from API
      let track = await Soundcloud.get(`/tracks/${id}`);
      // Saving fetched track
      dispatch(ADD_TRACK(id, track));
      // Returning fetched track
      return track;
    } catch (error) {
      // If there was an error during the fetch, add the track to unaccessible through API
      console.error(error);
      dispatch(ADD_FAULTY_TRACK(id));
      dispatch(DELETE_FROM_QUEUE(id));
    }
  }

  // Returning null if fetching had been unsuccessful :/
  return null;
};

export const fetchTracks = async ids => {
  // Getting data from Redux store
  let fetchedTracks = getState().api.tracks.fetched;
  let faultyTracks = getState().api.tracks.faulty;

  let tracks = new Map();
  let faulty = [];
  for (let id of ids) {
    // Run only if track is not faulty already
    if (!faultyTracks.includes(id)) {
      try {
        let track;
        // If track has already been fetched before
        if (fetchedTracks.has(id)) {
          // Getting track from Redux store
          track = fetchedTracks.get(id);
        } else {
          // Getting track from API
          track = await Soundcloud.get(`/tracks/${id}`);
        }
        tracks.set(id, track);
      } catch (error) {
        // If there was an error during the fetch, add the track to unaccessible through API
        console.error(error);
        faulty.push(id);
      }
    }
  }

  // Updating store
  if (tracks.size) {
    dispatch(ADD_TRACKS(tracks));
  }
  if (faulty.length) {
    dispatch(DELETE_FROM_QUEUE(faulty));
    dispatch(ADD_FAULTY_TRACKS(faulty));
  }

  // Returning obtained tracks
  return [...tracks.values()];
};

export const fetchUser = async id => {
  // Getting data from Redux store
  let fetchedUsers = getState().api.users.fetched;
  let user = null;

  // If user has already been fetched before
  if (fetchedUsers.has(id)) {
    user = fetchedUsers.get(id);
  } else {
    try {
      // Getting user from API
      user = await Soundcloud.get(`/users/${id}`);
      // Saving fetched user
      dispatch(ADD_USER(id, user));
    } catch (error) {
      console.error(error);
    }
  }

  // Changing current user
  dispatch(CHANGE_USER(user));

  // Fetching small portion of data about user
  dispatch(FETCH_BASIC_PROFILE_INFO());

  // Returning user, or null if fetching had been unsuccessful :/
  return user;
};

export default Soundcloud;
