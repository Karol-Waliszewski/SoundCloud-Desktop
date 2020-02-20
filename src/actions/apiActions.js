import SoundCloud from "../soundcloud";

export const ADD_TRACK = (id, track) => ({
  action: "ADD_TRACK",
  payload: {
    data: track,
    id
  }
});

export const ADD_TRACKS = tracks => ({
  action: "ADD_TRACKS",
  payload: tracks
});

export const ADD_FAULTY_TRACK = id => ({
  action: "ADD_FAULTY_TRACK",
  payload: id
});

export const ADD_FAULTY_TRACKS = ids => ({
  action: "ADD_FAULTY_TRACKS",
  payload: ids
});
