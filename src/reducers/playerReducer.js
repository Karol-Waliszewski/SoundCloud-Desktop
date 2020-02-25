const defaultState = {
  volume: 0.5,
  maxVolume: 1,
  mute: false,
  time: 0,
  duration: 0,
  player: null,
  playerState: "paused",
  currentTrackID: null,
  currentTrackIndex: { queue: null, active: null },
  loop: true,
  shuffle: false,
  queue: [],
  shuffledQueue: [],
  activeQueue: []
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_VOLUME":
      
      return {
        ...state,
        volume: action.payload,
        mute: false
      };

    case "TOGGLE_VOLUME_MUTE":
      return {
        ...state,
        mute: !state.mute
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

    case "UPDATE_TRACK":
      return {
        ...state,
        currentTrackID: action.payload
      };

    case "UPDATE_TRACK_INDEX":
      return {
        ...state,
        currentTrackIndex: {
          ...action.payload
        }
      };

    case "UPDATE_PLAYER":
      action.payload.setVolume(state.volume);

      return {
        ...state,
        player: action.payload
      };

    case "UPDATE_QUEUE":
      return {
        ...state,
        queue: [...action.payload]
      };

    case "UPDATE_SHUFFLED_QUEUE":
      return {
        ...state,
        shuffledQueue: [...action.payload]
      };

    case "UPDATE_ACTIVE_QUEUE":
      return {
        ...state,
        activeQueue: [...action.payload]
      };

    case "TOGGLE_LOOP":
      return {
        ...state,
        loop: !state.loop
      };

    case "TOGGLE_SHUFFLE":
      return {
        ...state,
        shuffle: !state.shuffle
      };

    default:
      return { ...state };
  }
};

export default reducer;
