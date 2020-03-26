const defaultState = {
  user: null,
  tracks: { href: null, collection: [], more: true },
  playlists: { href: null, collection: [], more: true },
  followings: { href: null, collection: [], more: true },
  followers: { href: null, collection: [], more: true },
  favourites: { href: null, collection: [], more: true }
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_USER":
      return {
        // Reseting fetched arrays for previous user
        ...defaultState,
        // Changing current user info
        user: action.payload
      };
    case "CHANGE_TRACKS":
      return {
        ...state,
        tracks: {
          href: action.payload.href,
          collection: [...action.payload.collection],
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    case "CHANGE_PLAYLISTS":
      return {
        ...state,
        playlists: {
          href: action.payload.href,
          collection: [...action.payload.collection],
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    case "CHANGE_FOLLOWINGS":
      return {
        ...state,
        followings: {
          href: action.payload.href,
          collection: [...action.payload.collection],
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    case "CHANGE_FOLLOWERS":
      return {
        ...state,
        followers: {
          href: action.payload.href,
          collection: [...action.payload.collection],
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    case "CHANGE_FAVOURITES":
      return {
        ...state,
        favourites: {
          href: action.payload.href,
          collection: [...action.payload.collection],
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
