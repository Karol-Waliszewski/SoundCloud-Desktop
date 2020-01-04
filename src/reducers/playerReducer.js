const defaultState = {
  volume: 0.5,
  maxVolume: 1,
  time: 0,
  duration: 0,
  player: null,
  playerState: "paused"
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_VOLUME":
      if (state.player) {
        state.player.setVolume(state.volume);
      }
      return {
        ...state,
        volume: action.payload
      };

    case "UPDATE_TIME":
      return {
        ...state,
        time: action.payload
      };

    case "CHANGE_DURATION": {
      return {
        ...state,
        duration: action.payload
      };
    }

    case "CHANGE_STATE":
      return {
        ...state,
        playerState: action.payload
      };

    case "UPDATE_PLAYER":
      action.payload.setVolume(state.volume);
      //action.payload.play();
      return {
        ...state,
        player: action.payload
      };

    default:
      return { ...state };
  }
};

export default reducer;
