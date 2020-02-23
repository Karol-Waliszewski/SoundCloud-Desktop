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

export const ADD_PLAYLIST = (id, playlist) => ({
  type: "ADD_PLAYLIST",
  payload: {
    data: playlist,
    id
  }
});

export const ADD_PLAYLISTS = playlists => ({
  type: "ADD_PLAYLISTS",
  payload: playlists
});

export const ADD_USER = (id, user) => ({
  type: "ADD_USER",
  payload: {
    data: user,
    id
  }
});

export const ADD_USERS = users => ({
  type: "ADD_USERS",
  payload: users
});
