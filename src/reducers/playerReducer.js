import { shuffleArray } from "../utils";

const defaultState = {
  volume: 0.5,
  maxVolume: 1,
  time: 0,
  duration: 0,
  player: null,
  playerState: "paused",
  currentTrackID: null,
  currentTrackIndex: null,
  loop: true,
  shuffle: false,
  queue: [],
  shuffledQueue: []
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

    case "UPDATE_TRACK":
      let index = state.queue.indexOf(action.payload);
      return {
        ...state,
        currentTrackID: action.payload,
        currentTrackIndex: index
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
        queue: [...action.payload],
        shuffledQueue: shuffleArray(
          [...action.payload],
          state.currentTrackIndex + 1
        )
      };

    case "TOGGLE_LOOP":
      return {
        ...state,
        loop: !state.loop
      };

    case "TOGGLE_SHUFFLE":
      return {
        ...state,
        shuffle: !state.shuffle,
        shuffledQueue: !state.shuffle
          ? shuffleArray([...state.queue], state.currentTrackIndex + 1)
          : [...state.shuffledQueue]
      };

    default:
      return { ...state };
  }
};

export default reducer;
