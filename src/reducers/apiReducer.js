const defaultState = {
  tracks: {
    fetched: new Map(),
    faulty: []
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
            ...state.fetched,
            [action.payload.id, action.payload.data]
          ])
        }
      };

    case "ADD_TRACKS":
      return {
        ...state,
        tracks: {
          ...state.tracks,
          fetched: new Map([...state.fetched, ...action.payload]),
          
        }
      };
    case "ADD_FAULTY_TRACK":
      return {
        ...state,
        tracks: {
          ...state.tracks,
          faulty: [...state.fetchedIds, action.payload]
        }
      };
    case "ADD_FAULTY_TRACKS":
      return {
        ...state,
        tracks: {
          ...state.tracks,
          faulty: [...state.fetchedIds, ...action.payload]
        }
      };

    default:
      return { ...state };
  }
};

export default reducer;
