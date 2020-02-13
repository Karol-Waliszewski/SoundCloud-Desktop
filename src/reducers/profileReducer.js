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
    case "CHANGE_FOLLOWINGS":
      let followings = [
        ...state.followings.collection,
        ...action.payload.collection
      ];
      return {
        ...state,
        followings: {
          href: action.payload.href,
          collection: followings,
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    case "CHANGE_FOLLOWERS":
      let followers = [
        ...state.followers.collection,
        ...action.payload.collection
      ];
      return {
        ...state,
        followers: {
          href: action.payload.href,
          collection: followers,
          more:
            Boolean(action.payload.href) &&
            Boolean(action.payload.collection.length)
        }
      };
    case "CHANGE_FAVOURITES":
      let favourites = [
        ...state.favourites.collection,
        ...action.payload.collection
      ];
      return {
        ...state,
        favourites: {
          href: action.payload.href,
          collection: favourites,
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
