const defaultState = {
  user: null,
  tracks: [],
  playlists: [],
  followings: [],
  followers: [],
  favourites: []
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_USER":
      return {
        ...state,
        // Changing current user info
        user: action.payload,
        // Reseting fetched arrays for previous user
        tracks: [],
        playlists: [],
        followings: [],
        followers: [],
        favourites: []
      };
    case "CHANGE_TRACKS":
      return {
        ...state,
        tracks: action.payload
      };
    case "CHANGE_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload
      };
    case "CHANGE_FOLLOWINGS":
      return {
        ...state,
        followings: action.payload
      };
    case "CHANGE_FOLLOWERS":
      return {
        ...state,
        followers: action.payload
      };
    case "CHANGE_FAVOURITES":
      return {
        ...state,
        favourites: action.payload
      };

    default:
      return { ...state };
  }
};

export default reducer;
