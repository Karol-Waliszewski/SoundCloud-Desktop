import uuid from "uuid/v4";

const defaultState = {
  query: "",
  queryID: uuid(),
  tracks: { href: null, collection: [], more: true },
  playlists: { href: null, collection: [], more: true },
  users: { href: null, collection: [], more: true },
  apiState: {
    tracks: {
      fetching: false,
      fullfilled: false
    },
    playlists: {
      fetching: false,
      fullfilled: false
    },
    users: {
      fetching: false,
      fullfilled: false
    }
  }
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_QUERY":
      if (action.payload.trim() === state.query.trim()) {
        return { ...state, query: action.payload };
      }
      return {
        ...defaultState,
        query: action.payload,
        queryID: uuid()
      };
    case "SEARCH_TRACKS_SUCCESS":
      let tracks = [...state.tracks.collection, ...action.payload.collection];
      return {
        ...state,
        tracks: {
          href: action.payload.href,
          collection: tracks,
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        },

        apiState: {
          ...state.apiState,
          tracks: { fullfilled: true, fetching: false }
        }
      };
    case "SEARCH_PLAYLISTS_SUCCESS":
      let playlists = [
        ...state.playlists.collection,
        ...action.payload.collection
      ];
      return {
        ...state,
        playlists: {
          href: action.payload.href,
          collection: playlists,
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        },
        apiState: {
          ...state.apiState,
          playlists: { fullfilled: true, fetching: false }
        }
      };
    case "SEARCH_USERS_SUCCESS":
      let users = [...state.users.collection, ...action.payload.collection];
      return {
        ...state,
        users: {
          href: action.payload.href,
          collection: users,
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        },
        apiState: {
          ...state.apiState,
          users: { fullfilled: true, fetching: false }
        }
      };
    case "SEARCH_TRACKS_FETCHING":
      return {
        ...state,
        apiState: {
          ...state.apiState,
          tracks: { fullfilled: false, fetching: true }
        }
      };
    case "SEARCH_PLAYLISTS_FETCHING":
      return {
        ...state,
        apiState: {
          ...state.apiState,
          playlists: { fullfilled: false, fetching: true }
        }
      };
    case "SEARCH_USERS_FETCHING":
      return {
        ...state,
        apiState: {
          ...state.apiState,
          users: { fullfilled: false, fetching: true }
        }
      };
    default:
      return { ...state };
  }
};

export default reducer;
