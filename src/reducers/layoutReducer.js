const defaultState = {
  queueActive: false,
  popups: new Map()
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

    case "UPDATE_POPUPS":
      return {
        ...state,
        popups: new Map([...action.payload])
      };

    default:
      return { ...state };
  }
};

export default reducer;
