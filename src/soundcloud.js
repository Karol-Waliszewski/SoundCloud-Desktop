import Soundcloud from "soundcloud";
import { dispatch, getState } from "./store";

// Actions
import {
  ADD_TRACK,
  ADD_TRACKS,
  ADD_FAULTY_TRACK,
  ADD_FAULTY_TRACKS
} from "./actions/apiActions";
import { DELETE_FROM_QUEUE } from "./actions/playerActions";

Soundcloud.initialize({
  client_id: "fa791b761f68cafa375ab5f7ea51927a",
  redirect_uri: "https://example.com/callback"
});

export const fetchTrack = async id => {
  // Getting data from Redux store
  let fetchedTracks = getState().api.fetched;
  let faultyTracks = getState().api.faulty;

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

export default Soundcloud;
