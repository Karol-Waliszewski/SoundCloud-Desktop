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

export const FETCH_TRACK = id => async dispatch => {
  try {
    let track = await SoundCloud.get(`/tracks/${id}`);
    dispatch(ADD_TRACK(id, track));
  } catch (error) {
    console.error(error);
    dispatch(ADD_FAULTY_TRACK(id));
  }
};

export const FETCH_TRACKS = ids => async dispatch => {
  let tracks = [];
  for (let id of ids) {
    try {
      let track = await SoundCloud.get(`/tracks/${id}`);
      tracks.push(track);
    } catch (error) {
      console.error(error);
      dispatch(ADD_FAULTY_TRACK(id));
    }
  }
  dispatch(ADD_TRACKS(ids, tracks));
};
