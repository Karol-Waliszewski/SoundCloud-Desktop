const defaultState = {
  user: null,
  tracks: { page: 0, collection: [] },
  playlists: { page: 0, collection: [] },
  followings: { page: 0, collection: [] },
  followers: { page: 0, collection: [] },
  favourites: { page: 0, collection: [] }
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
          page: action.payload.length
            ? state.tracks.page + 1
            : state.tracks.page,
          collection: [...state.tracks.collection, ...action.payload]
        }
      };
    case "CHANGE_PLAYLISTS":
      return {
        ...state,
        playlists: {
          page: action.payload.length
            ? state.tracks.page + 1
            : state.tracks.page,
          collection: [...state.playlists.collection, ...action.payload]
        }
      };
    case "CHANGE_FOLLOWINGS":
      return {
        ...state,
        followings: {
          page: action.payload.length
            ? state.tracks.page + 1
            : state.tracks.page,
          collection: [...state.followings.collection, ...action.payload]
        }
      };
    case "CHANGE_FOLLOWERS":
      return {
        ...state,
        followers: {
          page: action.payload.length
            ? state.tracks.page + 1
            : state.tracks.page,
          collection: [...state.followers.collection, ...action.payload]
        }
      };
    case "CHANGE_FAVOURITES":
      return {
        ...state,
        favourites: {
          page: action.payload.length
            ? state.tracks.page + 1
            : state.tracks.page,
          collection: [...state.favourites.collection, ...action.payload]
        }
      };

    default:
      return { ...state };
  }
};

export default reducer;
