const defaultState = {
  volume: 1,
  maxVolume:1,
  time: 0,
  state: "paused"
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_VOLUME":
      return {
        ...state,
        volume: action.payload
      };

    case "CHANGE_TIME":
      return {
        ...state,
        time: action.payload
      };

    case "CHANGE_STATE":
      return {
        ...state,
        state: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
