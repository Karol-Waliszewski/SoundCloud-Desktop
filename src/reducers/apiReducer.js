const defaultState = {
  tracks: {
    fetched: new Map(),
    faulty: []
  },
  playlists: {
    fetched: new Map()
  },
  users: {
    fetched: new Map()
  }
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "ADD_TRACK":
      return {
        ...state,
        tracks: {
          ...state.tracks,
          fetched: new Map([
            ...state.tracks.fetched,
            [action.payload.id, action.payload.data]
          ])
        }
      };

    case "ADD_TRACKS":
      return {
        ...state,
        tracks: {
          ...state.tracks,
          fetched: new Map([...state.tracks.fetched, ...action.payload])
        }
      };

    case "ADD_PLAYLIST":
      return {
        ...state,
        playlists: {
          ...state.playlists,
          fetched: new Map([
            ...state.playlists.fetched,
            [action.payload.id, action.payload.data]
          ])
        }
      };

    case "ADD_PLAYLISTS":
      return {
        ...state,
        playlists: {
          ...state.playlists,
          fetched: new Map([...state.playlists.fetched, ...action.payload])
        }
      };

    case "ADD_USER":
      return {
        ...state,
        playlists: {
          ...state.users,
          fetched: new Map([
            ...state.users.fetched,
            [action.payload.id, action.payload.data]
          ])
        }
      };

    case "ADD_USERS":
      return {
        ...state,
        users: {
          ...state.users,
          fetched: new Map([...state.users.fetched, ...action.payload])
        }
      };

    case "ADD_FAULTY_TRACK":
      return {
        ...state,
        tracks: {
          ...state.tracks,
          faulty: [...state.tracks.faulty, action.payload]
        }
      };

    case "ADD_FAULTY_TRACKS":
      return {
        ...state,
        tracks: {
          ...state.tracks,
          faulty: [...state.tracks.faulty, ...action.payload]
        }
      };

    default:
      return { ...state };
  }
};

export default reducer;
