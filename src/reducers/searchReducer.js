import uuid from "uuid/v4";

const defaultState = {
  query: "",
  queryID: uuid(),
  tracks: { href: null, collection: [], more: true },
  playlists: { href: null, collection: [], more: true },
  users: { href: null, collection: [], more: true }
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
    case "CHANGE_TRACKS":
      let tracks = [...state.tracks.collection, ...action.payload.collection];
      return {
        ...state,
        tracks: {
          href: action.payload.href,
          collection: tracks,
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    case "CHANGE_PLAYLISTS":
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
        }
      };
    case "CHANGE_USERS":
      let users = [...state.users.collection, ...action.payload.collection];
      return {
        ...state,
        users: {
          href: action.payload.href,
          collection: users,
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    default:
      return { ...state };
  }
};

export default reducer;
