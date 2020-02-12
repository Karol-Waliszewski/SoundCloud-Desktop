const defaultState = {
  queueActive: false
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_QUEUE":
      return {
        ...state,
        queueActive: action.payload
      };

    case "TOGGLE_QUEUE":
      return {
        ...state,
        queueActive: !state.queueActive
      };

    default:
      return { ...state };
  }
};

export default reducer;
