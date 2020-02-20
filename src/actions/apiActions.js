import SoundCloud from "../soundcloud";

export const ADD_TRACK = (id, track) => ({
  type: "ADD_TRACK",
  payload: {
    data: track,
    id
  }
});

export const ADD_TRACKS = tracks => ({
  type: "ADD_TRACKS",
  payload: tracks
});

export const ADD_FAULTY_TRACK = id => ({
  type: "ADD_FAULTY_TRACK",
  payload: id
});

export const ADD_FAULTY_TRACKS = ids => ({
  type: "ADD_FAULTY_TRACKS",
  payload: ids
});
