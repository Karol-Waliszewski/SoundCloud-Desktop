const defaultState = {
  user: null,
  tracks: { page: 0, collection: [], more: true },
  playlists: { page: 0, collection: [], more: true },
  followings: { page: 0, collection: [], more: true },
  followers: { page: 0, collection: [], more: true },
  favourites: { page: 0, collection: [], more: true }
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
          collection: [...state.tracks.collection, ...action.payload],
          more: action.payload.length < 12 ? false : true
        }
      };
    case "CHANGE_PLAYLISTS":
      return {
        ...state,
        playlists: {
          page: action.payload.length
            ? state.playlists.page + 1
            : state.playlists.page,
          collection: [...state.playlists.collection, ...action.payload],
          more: action.payload.length < 12 ? false : true
        }
      };
    case "CHANGE_FOLLOWINGS":
      return {
        ...state,
        followings: {
          page: action.payload.length
            ? state.followings.page + 1
            : state.followings.page,
          collection: [...state.followings.collection, ...action.payload],
          more: action.payload.length < 12 ? false : true
        }
      };
    case "CHANGE_FOLLOWERS":
      return {
        ...state,
        followers: {
          page: action.payload.length
            ? state.followers.page + 1
            : state.followers.page,
          collection: [...state.followers.collection, ...action.payload],
          more: action.payload.length < 12 ? false : true
        }
      };
    case "CHANGE_FAVOURITES":
      return {
        ...state,
        favourites: {
          page: action.payload.length
            ? state.favourites.page + 1
            : state.favourites.page,
          collection: [...state.favourites.collection, ...action.payload],
          more: action.payload.length < 12 ? false : true
        }
      };

    default:
      return { ...state };
  }
};

export default reducer;
